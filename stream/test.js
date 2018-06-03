var a = function(a, b, c, d) {
  console.log("---", arguments.length);
  console.log(arguments[1]);
}


var t = [1, 2, 3];
a(...t);

a(1, null);
