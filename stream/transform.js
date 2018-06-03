const { Transform } = require('stream');

const t = function() {
  return new Transform({
    transform: function(chunk, encoding, callback) {
      console.log('----transform called');
      this.push(chunk);
      callback(null, chunk);
    },
    flush: function(chunk, encoding, callback) {

    }
  })
}
