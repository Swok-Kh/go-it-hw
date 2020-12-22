const findLongestWord = function (string) {
  // твой код
  const tempArray = Array.from(string.split(' '));
  let longestWord = tempArray[0];
  for (let i = 1; i < tempArray.length; i += 1) {
    if (longestWord.length > tempArray[i].length) {
      continue;
    }
    longestWord = tempArray[i];
  }
  return longestWord;
};

/*
 * Вызовы функции для проверки работоспособности твоей реализации.
 */
console.log(findLongestWord('The quick brown fox jumped over the lazy dog')); // 'jumped'

console.log(findLongestWord('Google do a roll')); // 'Google'

console.log(findLongestWord('May the force be with you')); // 'force'
