// @flow strict

import type { Formula } from './Tokens';

const { Dice, Arithmetic } = require('./Tokens');
const Parser = require('./Parser');
const Analyzer = require('./Analyzer');

const DiceChance = {
  parse: function(formula: string): Formula {
    return Parser.parseFormula(formula);
  },

  roll: function(formula: string | Formula) {
    let parsedFormula;
    if (typeof formula === 'string') {
      parsedFormula = Parser.parseFormula(formula);
    } else {
      parsedFormula = formula;
    }

    let formulaValue = parsedFormula.value;
    let result = 0;
    while (formulaValue instanceof Arithmetic) {
      switch (formulaValue.operator) {
        case '+':
          result += formulaValue.rightValue;
          break;
        case '-':
          result -= formulaValue.rightValue;
          break;
      }
      formulaValue = formulaValue.leftValue;
    }
    if (formulaValue instanceof Dice) {
      for (let i = 0; i < formulaValue.diceAmount.value; i++) {
        result += Math.floor(Math.random() * formulaValue.diceSides.value) + 1;
      }
    }
    return result;
  },

  analyze: function(formula: string | Formula) {
    let parsedFormula;
    if (typeof formula === 'string') {
      parsedFormula = Parser.parseFormula(formula);
    } else {
      parsedFormula = formula;
    }
    const formulaValue = parsedFormula.value;
    if (formulaValue instanceof Dice) {
      return Analyzer.analyzeDice(formulaValue);
    } else {
      throw new Error('Not yet implemented.');
    }
  },
};

module.exports = DiceChance;
