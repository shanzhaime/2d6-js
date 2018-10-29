// @flow strict

const { DiceAmount, DiceSides, Dice } = require("./Tokens");

const dicePattern = /(\d+)d(\d+)/;

const DiceChance = {
  parse: function(formula: string): Dice {
    const matches = formula.match(dicePattern);
    if (!matches) {
      throw new Error("Invalid formula.");
    }

    const [whole, amount, sides] = matches;

    if (whole !== formula) {
      throw new Error("Invalid formula");
    }

    return new Dice(
      new DiceAmount(parseInt(amount, 10)),
      new DiceSides(parseInt(sides, 10))
    );
  },

  roll: function(formula: string | Dice) {
    let parsedFormula;
    if (typeof formula === "string") {
      parsedFormula = DiceChance.parse(formula);
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
    if (typeof formula === "string") {
      parsedFormula = DiceChance.parse(formula);
    } else {
      parsedFormula = formula;
    }
  }
};

module.exports = DiceChance;
