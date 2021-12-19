const arr = [-1, -1, -5, 1, 1, -1, 1, -2];
const arr1 = [5, -2, 1, 4, 2];
const arr2 = [10, -11, 2, -4, 2];
const lessSum = (arr = []) => {
  let Count = 0;
  let i = 0;
  let j = arr.length + 1;
  while (i < j) {
    let sum = arr[i] + arr[j];
    if (sum <= 0) {
      i++;
      console.log("yes");
      Count++;
      console.log(arr[i]);
      console.log(arr[j]);
    } else {
      j--;
    }
  }
  return Count;
};
console.log(lessSum(arr));
console.log(lessSum(arr1));
console.log(lessSum(arr2));
