'use strict'
const sta = require("simple-statistics");

const arr1 = [1, 5, -10, 100, 2];

// get the minimum value
console.log(sta.min(arr1));

// get the maximum value
console.log(sta.max(arr1));


const arr2 = [1, 2, 3, 4, 5, 6];
// get the sum value of array
console.log(sta.sum(arr2));


const arr3 = [2, 4, 4, 4, 5, 5, 7, 9];
// get the variance
console.log(sta.variance(arr3));

console.log(sta.standardDeviation(arr3));
