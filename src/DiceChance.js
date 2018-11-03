// @flow strict

import type { Dice } from './Tokens';

const Parser = require('./Parser');
const Analyzer = require('./Analyzer');

const DiceChance = {
  parse: function(formula: string): Dice {
    return Parser.parseFormula(formula);
  },

  roll: function(formula: string | Dice) {
    let parsedFormula;
    if (typeof formula === 'string') {
      parsedFormula = Parser.parseFormula(formula);
    } else {
      parsedFormula = formula;
    }

    let result = 0;
    for (let i = 0; i < parsedFormula.diceAmount.value; i++) {
      result += Math.floor(Math.random() * parsedFormula.diceSides.value) + 1;
    }
    return result;
  },

  analyze: function(formula: string | Dice) {
    let parsedFormula;
    if (typeof formula === 'string') {
      parsedFormula = Parser.parseFormula(formula);
    } else {
      parsedFormula = formula;
    }
    return Analyzer.analyzeDice(parsedFormula);
  },
};

module.exports = DiceChance;
