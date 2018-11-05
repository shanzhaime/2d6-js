const DiceChance = require('../DiceChance');
const Tokens = require('../Tokens');

const formula2D6 = '2d6';
const formula2D6Plus4 = '2d6 + 4';
const formula3D4Minus3 = '3d4 - 3';
const rollTimes = 10000;

it('can parse formula', () => {
  const parsed2D6 = DiceChance.parse(formula2D6);
  expect(parsed2D6 instanceof Tokens.Dice);
  expect(parsed2D6.value instanceof Tokens.Dice);
  expect(parsed2D6.value.diceAmount.value).toBe(2);
  expect(parsed2D6.value.diceSides.value).toBe(6);

  const parsed2D6Plus4 = DiceChance.parse(formula2D6Plus4);
  expect(parsed2D6Plus4 instanceof Tokens.Formula);
  expect(parsed2D6Plus4.value instanceof Tokens.Arithmetic);
  expect(parsed2D6Plus4.value.leftValue instanceof Tokens.Dice);
  expect(parsed2D6Plus4.value.leftValue.diceAmount.value).toBe(2);
  expect(parsed2D6Plus4.value.leftValue.diceSides.value).toBe(6);
  expect(parsed2D6Plus4.value.rightValue).toBe(4);
  expect(parsed2D6Plus4.value.operator).toBe('+');
});

it('can roll with a formula', () => {
  let rolled2D6 = DiceChance.roll(formula2D6);
  expect(rolled2D6).toBeGreaterThanOrEqual(2);
  expect(rolled2D6).toBeLessThanOrEqual(12);

  const parsed2D6 = DiceChance.parse(formula2D6);
  for (let i = 0; i < rollTimes; i++) {
    rolled2D6 = DiceChance.roll(parsed2D6);
    expect(rolled2D6).toBeGreaterThanOrEqual(2);
    expect(rolled2D6).toBeLessThanOrEqual(12);
  }

  let rolled2D6Plus4 = DiceChance.roll(formula2D6Plus4);
  expect(rolled2D6Plus4).toBeGreaterThanOrEqual(6);
  expect(rolled2D6Plus4).toBeLessThanOrEqual(16);

  const parsed2D6Plus4 = DiceChance.parse(formula2D6Plus4);
  for (let i = 0; i < rollTimes; i++) {
    rolled2D6Plus4 = DiceChance.roll(parsed2D6Plus4);
    expect(rolled2D6Plus4).toBeGreaterThanOrEqual(6);
    expect(rolled2D6Plus4).toBeLessThanOrEqual(16);
  }

  let rolled3D4Minus3 = DiceChance.roll(formula3D4Minus3);
  expect(rolled3D4Minus3).toBeGreaterThanOrEqual(0);
  expect(rolled3D4Minus3).toBeLessThanOrEqual(9);

  const parsed3D4Minus3 = DiceChance.parse(formula3D4Minus3);
  for (let i = 0; i < rollTimes; i++) {
    rolled3D4Minus3 = DiceChance.roll(parsed3D4Minus3);
    expect(rolled3D4Minus3).toBeGreaterThanOrEqual(0);
    expect(rolled3D4Minus3).toBeLessThanOrEqual(9);
  }
});

it('can analyze formula', () => {
  let analyzed2D6Plus4 = DiceChance.analyze(formula2D6Plus4);
  expect(analyzed2D6Plus4).toEqual({
    '6': 1,
    '7': 2,
    '8': 3,
    '9': 4,
    '10': 5,
    '11': 6,
    '12': 5,
    '13': 4,
    '14': 3,
    '15': 2,
    '16': 1,
  });

  analyzed2D6Plus4 = DiceChance.analyze(DiceChance.parse(formula2D6Plus4));
  expect(analyzed2D6Plus4).toEqual({
    '6': 1,
    '7': 2,
    '8': 3,
    '9': 4,
    '10': 5,
    '11': 6,
    '12': 5,
    '13': 4,
    '14': 3,
    '15': 2,
    '16': 1,
  });
});
