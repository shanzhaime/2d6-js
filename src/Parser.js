// @flow strict

const { DiceAmount, DiceSides, Dice } = require('./Tokens');

const dicePattern = /(\d+)d(\d+)/;

const Parser = {
  parseFormula(formula: string) {
    const matches = formula.match(dicePattern);
    if (!matches) {
      throw new Error('Invalid formula.');
    }

    const [whole, amount, sides] = matches;

    if (whole !== formula) {
      throw new Error('Invalid formula');
    }

    return new Dice(
      new DiceAmount(parseInt(amount, 10)),
      new DiceSides(parseInt(sides, 10)),
    );
  },
};

module.exports = Parser;
