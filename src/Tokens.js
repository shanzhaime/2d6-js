// @flow strict

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

module.exports = {
  DiceAmount,
  DiceSides,
  Dice
};
