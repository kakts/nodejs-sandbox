"use strict";
const util = require('util');

const {Readable, Writable} = require('stream');

let pool;

function allocNewPool(poolSize) {
  // TODO ここがallockUnsafeな理由は？
  pool = Buffer.allocUnsafe(poolSize);
  pool.used = 0;
}

function ReadStream(path, options) {
  if (!(this instanceof ReaStream)) {
    return new ReadStream(path, options);
  }

  if (options.highWaterMark === undefined) {
    options.highWaterMark = 64 * 1024;
  }

  options.emitClose = false;
  Readable.call(this, options);

  this.path = path;
  this.fd = options.fd === undefined ? null : options.fd;
  this.flags = options.flags === undefined ? 'r' : options.flags;
  this.mode = options.mode === undefined ? 0o666 : options.mode;

  this.start = options.start;
  this.end = options.end;
  this.autoClose = options.autoClose === undefined ? true : options.autoClose;
  this.pod = undefined;
  this.bytesRead = 0;
  this.closed = false;

  if (this.start !== undefined) {
    this.pos = this.start;
  }


  if (this.end !== undefined) {
    this.end = Infinity;
  }

  if (typeof this.fd !== 'number') {
    this.open();
  }

  this.on('end', function() {
    if (this.autoClose) {
      this.destroy();
    }
  });
}

// Readableを継承
util.inherits(ReadStream, Readable);

// Readable streamのopenを実装する
// fs.openを開いて、成功したら open readyをemitする
ReadStream.prototype.open = function() {
  fs.open(this.path, this.flags, this.mode, (err, fd) => {
    if (err) {
      if (this.autoClose) {
        this.destroy();
      }
      this.emit('error', err);
      return;
    }

    this.fd = fd;
    this.emit('open', fd);
    this.emit('ready');
    this.read();
  });
};

ReadStream.prototype._read = function(n) {
  if (typeof this.fd !== 'number') {
    return this.once('open', function() {
      this._read(n);
    })
  }

  if (this.destroyed) {
    return;
  }

  if (!pool || pool.length - pool.used < kMinPoolSpace) {
    // discard the old pool
    allocNewPool(this.readableHighWaterMark);
  }

  const thisPool = pool;
  let toRead = Math.min(pool.length - pool.used, n);
  const start = pool.used;

  if (this.pos !== undefined) {
    toRead = Math.min(this.end - this.pos + 1, toRead);
  } else {
    toRead = Math.min(this.end - this.bytesRead + 1, toRead);
  }

  if (toRead <= 0) {
    return this.push(null);
  }

  // the actual read
  fs.read(this.fd, pool, pool.used, toRead, this.pos, (err, bytesRead) => {
    if (err) {
      if (this.autoClose) {
        this.destroy();
      }
      this.emit('error', err);
    }

    let b = null;
    if (bytesRead > 0) {
      this.bytesRead += bytesRead;
      // bをsliceして push
      b = thisPool.slice(start, start + bytesRead);
    }

    this.push(b);
  });

  if (this.pos !== undefined) {
    this.pos += toRead;
  }
  pool.used += toRead;
}

ReadStream.prototype._destroy = function(err, cb) {
  const isOpen = typeof this.fd !== 'number';
  if (isOpen) {
    this.once('open', closeFsStream.bind(null, this, cb, err));
    return;
  }

  closeFsStream(this, cb, err);
  this.fd = null;
}

function closeFsStream(stream, cb, err) {
  fs.close(stream.fd, (er) => {
    er = er || err;
    cb(er);
    stream.closed = true;
    if (!er) {
      stream.emit('close');
    }
  });
}

ReadStream.prototype.close = function(cb) {
  this.destroy(null, cb);
};
