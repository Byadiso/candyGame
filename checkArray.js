function missingNumbers(arr, brr) {
  // Write your code here
  let missingArray = [];

  var difference = arr.filter((x) => brr.indexOf(x) === -1);
  console.log(difference);
  //   missingArray.push(difference);

  //   return missingArray;
}

let arr = [2, 4, 5, 6, 7, 10];
let brr = [1, 2, 3, 4, 5, 7, 8];

console.log(missingNumbers(arr, brr));
