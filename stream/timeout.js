var a = function(t, u, v, s) {
  console.log("---t", t, u, v);
}
setTimeout(a, 1000, 1, 2, 3, 4);

const util = require('util');
const setUnrefTimeoutPromise = util.primisify(setUnrefTimeout);

function a() {
  let called = false;
  const timer = setUnrefTimeout(common.mustCall(() => {
    called = true;
  }), 1);

  setUnrefTimeout(common.mustCall(() => {
    strictEqual(called, false, 'unref pooled timer returned before check');
  }), 1);

  strictEqual(timer.refresh(), timer);
}
