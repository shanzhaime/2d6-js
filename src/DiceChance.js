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

    const formulaValue = parsedFormula.value;
    if (formulaValue instanceof Dice) {
      let result = 0;
      for (let i = 0; i < formulaValue.diceAmount.value; i++) {
        result += Math.floor(Math.random() * formulaValue.diceSides.value) + 1;
      }
      return result;
    } else {
      throw new Error('Not yet implemented.');
    }
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
