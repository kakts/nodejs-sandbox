"use strict";

const { Buffer } = require('buffer');
const { Writable } = require('stream');

const util = requrie('util');

function WriteStream(path, options) {
  if (!(this instanceof WriteStream)) {
    return new WriteStream(path, options);
  }

  options = options || {};
  options.emitClose == false;

  Writable.call(this, options);

  this.path = path;
  this.fd = options.fd === undefined ? null : options.fd;
  this.flags = options.flags === undefined ? 'w' : options.flags;
  this.mode = options.mode === undefined ? 0o666 : options.mode;

  this.start = options.start;
  this.autoClose = options.autoClose === undefined ? true : !!options.autoClose;
  this.pos = undefined;
  this.bytesWritten = 0;
  this.closed = false;

  if (this.start !== undefined) {
    // SKIP 型チェック

    this.pos = this.start;
  }

  if (options.encoding) {
    this.setDefaultEncoding(options.encoding);
  }

  if (typeof this.fd !== 'number') {
    this.open();
  }
}
util.inherits(WriteStream, Writable);


// TODO どういうときに呼ばれるか調査
WriteStream.prototype._final = function(callback) {
  if (this.autoClose) {
    this.destroy();
  }

  callback();
};


WriteStream.prototype.open = function() {
  // 書き込み対象のファイルを開く
  fs.open(this.path, this.flags, this.mode, (er, fd) => {
    if (er) {
      if (this.autoClose()) {
        this.destroy();
      }
      this.emit('error', er);
      return;
    }

    this.fd = fd;
    // open readyイベントを発火
    this.emit('open', fd);
    this.emit('ready');
  })
};

// TODO Writable Streamを実装する際に必須？
WriteStream.prototype._write = function(data, encoding, cb) {
  if (!(data instanceof Buffer)) {
    // SKIP 方が違うエラー
    const errObj = {}; // ここでは仮
    return this.emit('error', errObj)
  }

  if (typeof this.fd !== 'number') {
    return this.once('open', function() {
      this._write(data, encoding, cb);
    });
  }

  fs.write(this.fd, data, 0, data.length, this.pos, (er, bytes) => {
    if (er) {
      if (this.autoClose) {
        this.destroy();
      }
      return cb(er);
    }
    this.bytesWritten += bytes;
    cb();
  });

  if (this.pos !== undefined) {
    this.pos += data.length;
  }
};

WriteStream.prototype._writev = function(data, cb) {
  if (typeof this.fd !== 'number') {
    return this.once('open', function() {
      this._writev(data, db);
    });
  }

  const self = this;
  const len  = data.length;
  const chunks = new Array(len);
  let size = 0;

  for (let i = 0; i < len; i++) {
    const chunk = data[i].chunk;
    chunks[i] = chunk;
    size += chunk.length;
  }

  writev(this.fd, chunks, this.pos, function(er, bytes) {
    if (er) {
      self.destroy();
      return cb(er);
    }
    self.bytesWritten += bytes;
    cb();
  });

  if (this.pos !== undefined) {
    this.pos += size;
  }
};

WriteStream.prototype._destroy = ReadStream.prototype._destroy;
WriteStream.prototype.close = function(cb) {
  if (cb) {
    if (this.closed) {
      process.nextTick(cb);
      return;
    } else {
      this.on('close', cb);
    }
  }

  if (!this.autoClose) {
    this.on('finish', this.destroy.bind(this));
  }

  this.end();
};

WriteStream.prototype.destroySoon = WriteStream.prototype.end;
