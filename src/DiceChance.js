// @flow strict

const {
  DiceAmount,
  DiceSides,
  Dices,
} = require('./Tokens');

const dicePattern = /(\d+)d(\d+)/;

const DiceChance = {
  parse: function(formula: string): Dices {
    const matches = formula.match(dicePattern);
    if (!matches) {
      throw new Error('Invalid formula.');
    }

    const [
      whole,
      amount,
      sides,
    ] = matches;

    if (whole !== formula) {
      throw new Error('Invalid formula');
    }

    return new Dices(
      new DiceAmount(parseInt(amount, 10)),
      new DiceSides(parseInt(sides, 10)),
    );
  },
};

module.exports = DiceChance;
