// @flow strict

import type { Formula } from './Tokens';

const { Dice, Arithmetic } = require('./Tokens');

const memoizedFactorialNumbers = [1];

function factorial(n: number): number {
  return n in memoizedFactorialNumbers
    ? memoizedFactorialNumbers[n]
    : (memoizedFactorialNumbers[n] = n * factorial(n - 1));
}

function combination(n: number, k: number): number {
  return Math.round(factorial(n) / factorial(k) / factorial(n - k));
}

const Analyzer = {
  analyzeDice(dice: Dice): { [number]: number } {
    // Algorithm: https://math.stackexchange.com/a/28861/
    const result = {};
    const n = dice.diceAmount.value;
    const m = dice.diceSides.value - 1;

    if (n === 0 || m === 0) {
      return {};
    }

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
  },

  analyzeFormula(formula: Formula): { [number]: number } {
    let formulaValue = formula.value;
    let modifier = 0;
    while (formulaValue instanceof Arithmetic) {
      switch (formulaValue.operator) {
        case '+':
          modifier += formulaValue.rightValue;
          break;
        case '-':
          modifier -= formulaValue.rightValue;
          break;
      }
      formulaValue = formulaValue.leftValue;
    }

    let result = {};
    if (formulaValue instanceof Dice) {
      result = Analyzer.analyzeDice(formulaValue);
    }
    if (modifier !== 0) {
      const keys = Object.keys(result).map((stringValue) => {
        return parseInt(stringValue, 10);
      });
      const sortedKeys =
        modifier > 0 ? keys.sort((x, y) => y - x) : keys.sort((x, y) => x - y);
      sortedKeys.forEach((key) => {
        result[key + modifier] = result[key];
        delete result[key];
      });
    }

    return result;
  },
};

module.exports = Analyzer;
