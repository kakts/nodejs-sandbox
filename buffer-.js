
// creates a zero-filled Buffer of length 10
const buf1 = Buffer.alloc(10);

const buf2 = Buffer.alloc(10, 1);

const buf3 = Buffer.allocUnsafe(10);

// creates a Buffer containing [0x1, 0x2, 0x3]
const buf4 = Buffer.from([1, 2, 3]);

// Creates a Buffer containing ASCII bytes[0x75, 0x66, 0x73, 0x74]
const buf5 = Buffer.from('test');

// Creates a Buffer containing UTF-8 bytes [0x74, 0xc3, 0xa9, 0x73, 0x74].
const buf6 = Buffer.from('tést', 'utf8');

const buf = Buffer.from('hello world', 'ascii');

// Prints: 68656c6c6f20776f726c64
console.log(buf.toString('hex'));

// Prints: aGVsbG8gd29ybGQ=
console.log(buf.toString('base64'));
