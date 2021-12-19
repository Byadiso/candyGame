// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)
  let n = A.length;
  for (var i = 0; i < n; i++) {
    let isArrangeWell = [];
    let relocations = 0;

    let firstElement = A.shift();
    let secondElement = A.filter((elt) => elt === A[i + 1])[0];

    let SumOfArranged = sum(firstElement, secondElement);

    if ((SumOfArranged < 0 && firstElement < 0) || SumOfArranged === 0) {
      //let create new arr whithout first element

      let newArray = shiftFirstElToEnd(A, firstElement);

      for (var k = 0; k < n - 1; k++) {
        let isFirst = newArray.shift();
        let isSecond = newArray.indexOf(isFirst);
        let sumOf = sum(isFirst, isSecond);
        if (sumOf < 0 && isFirst < 0) {
          return relocations + 1 + " second check";
        }
      }
      console.log(newArray + " array to check again");
      console.log(isArrangeWell + " array checked");

      return relocations + 1 + " negative need to shift the first number!!!!!!";
    }

    let arrayTocheck = [];
    arrayTocheck.push(firstElement, secondElement);

    console.log(arrayTocheck + " array to compare");
    return relocations + " this one is okey";
  }
}

//return first element at the end
let shiftFirstElToEnd = (thatArray, firstElement) => {
  let newArr = thatArray.filter(function (item) {
    return item !== thatArray.includes(firstElement);
  });

  let firstElementAtEnd = [...newArr, firstElement];

  console.log(firstElementAtEnd + " first element at the end");
  console.log(newArr + " array without first element");
  return firstElementAtEnd;
};

//return sum of first and second
let sum = (first, second) => {
  let array = [];
  array.push(first, second);
  let sum = array.reduce(function (a, b) {
    return a + b;
  }, 0);

  console.log(sum + " Total sum");
  return sum;
};

let arrayA = [-1, -1, -1, 1, 1, 1];
let arrayB = [5, -2, 1, 4, 2];

console.log(solution(arrayA));
console.log(solution(arrayB));
