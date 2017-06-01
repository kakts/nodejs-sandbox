const async_hooks = require('async_hooks');

// Return the ID of the current execution context;
const cid = async_hooks.currentId();

// Return the ID of the handle responsible for triggering the callback of the current execution scope to callback
const tid = async_hooks.triggerId();

// Create a new AsynkHook instance. All of these callback are optional.
const asyncHook = async_hooks.createHook({ init, before, after, destroy});

console.error("---asyncHook", asyncHook)
// Allow callbacks of this AsyncHook instance to call.
// This is not an implicit action after running the constructor,
// and must be explicitly run to begin executing callbacks
asyncHook.enable();

// Disable listening for new asynchronous events
asyncHook.disable();

// init is called during object construction. The resource may not have
// completed construction when this callback runs, therefore all fields of the
// resource referenced by "asyncId" may not have been populated.
function init(asyncId, type, triggerId, resource) {
  console.log("------- init called", asyncId, type, triggerId, resource);
}

// before is called just before the resource's callback is called. It can be called 0-N times for handles,
// and will be called exactly 1 time for requests.
function before(asyncId) {
  console.log("------ before called", asyncId);
}

// after is called just after the resource's callback has finished
function after(asyncId) {
  console.log("------ after called", asyncId);
}

// destroy is called when an AsyncWrap instance is destroyed.
function destroy(asyncId) {
  console.log("------ destroy called", asyncId);
}

function test(a, callback) {
  console.error("---a", a);
  callback(null, a);
};

test("test", function(err, result) {
  console.error("----err", err, result);
  process.nextTick()
})
