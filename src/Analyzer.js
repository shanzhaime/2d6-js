// @flow strict

import type { Dice } from "./Tokens";

const memoizedFactorialNumbers = [1];

function factorial(n: number): number {
  return n in memoizedFactorialNumbers
    ? memoizedFactorialNumbers[n]
    : (memoizedFactorialNumbers[n] = n * factorial(n - 1));
}

function combination(n: number, k: number): number {
  return factorial(n) / factorial(k) / factorial(n - k);
}

const Analyzer = {
  analyzeDice(dice: Dice): { [number]: number } {
    // Algorithm: https://math.stackexchange.com/a/28861/
    const result = {};
    const n = dice.diceAmount.value;
    const m = dice.diceSides.value - 1;
    for (let k = 0; k < n * m + 1; k++) {
      let sum = 0;
      for (let s = 0; s < Math.floor(k / (m + 1)) + 1; s++) {
        sum +=
          Math.pow(-1, s) *
          combination(n, s) *
          combination(k - s * (m + 1) + n - 1, n - 1);
      }
      result[k + n] = sum;
    }
    return result;
  }
};

module.exports = Analyzer;
