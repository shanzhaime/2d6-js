// @flow strict

type Operator = '+' | '-';

class DiceAmount {
  value: number;

  constructor(amount: number) {
    this.value = amount;
  }
}

class DiceSides {
  value: number;

  constructor(sides: number) {
    this.value = sides;
  }
}

class Dice {
  diceAmount: DiceAmount;
  diceSides: DiceSides;

  constructor(diceAmount: DiceAmount, diceSides: DiceSides) {
    this.diceAmount = diceAmount;
    this.diceSides = diceSides;
  }
}

class Arithmetic {
  leftValue: Dice | Arithmetic;
  rightValue: number;
  operator: Operator;

  constructor(
    leftValue: Dice | Arithmetic,
    rightValue: number,
    operator: Operator,
  ) {
    this.leftValue = leftValue;
    this.rightValue = rightValue;
    this.operator = operator;
  }
}

class Formula {
  value: Dice | Arithmetic;

  constructor(formula: Dice | Arithmetic) {
    this.value = formula;
  }
}

module.exports = {
  DiceAmount,
  DiceSides,
  Dice,
  Arithmetic,
  Formula,
};
