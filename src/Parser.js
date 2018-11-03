// @flow strict

const {
  DiceAmount,
  DiceSides,
  Dice,
  Arithmetic,
  Formula,
} = require('./Tokens');

const formulaPattern = /^\s*(\d+)d(\d+)\s*((?:[\+-]\s*\d+\s*)*)$/;
const arithmeticPattern = /^([+-])\s*(\d+)\s*/;

const Parser = {
  parseFormula(formula: string): Formula {
    const matches = formula.match(formulaPattern);
    if (!matches) {
      throw new Error('Invalid formula.');
    }

    const [whole, amount, sides, remaining] = matches;

    const dice = new Dice(
      new DiceAmount(parseInt(amount, 10)),
      new DiceSides(parseInt(sides, 10)),
    );

    if (remaining === '') {
      return new Formula(dice);
    } else {
      let remainingArithmetic = remaining;
      let arithmetic;
      while (remainingArithmetic !== '') {
        remainingArithmetic = remainingArithmetic.replace(
          arithmeticPattern,
          (whole, operator, value) => {
            arithmetic = new Arithmetic(
              arithmetic ? arithmetic : dice,
              parseInt(value, 10),
              operator,
            );
            return '';
          },
        );
      }
      if (arithmetic) {
        return new Formula(arithmetic);
      } else {
        throw new Error('Impossible branch.');
      }
    }
  },
};

module.exports = Parser;
