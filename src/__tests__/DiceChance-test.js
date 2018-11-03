const DiceChance = require('../DiceChance');
const Tokens = require('../Tokens');

const formula2D6 = '2d6';

it('can parse formula', () => {
  const parsed2D6 = DiceChance.parse(formula2D6);
  expect(parsed2D6 instanceof Tokens.Dice);
  expect(parsed2D6.value instanceof Tokens.Dice);
  expect(parsed2D6.value.diceAmount.value).toBe(2);
  expect(parsed2D6.value.diceSides.value).toBe(6);
});

it('can roll with a formula', () => {
  let rolled2D6 = DiceChance.roll(formula2D6);
  expect(rolled2D6).toBeGreaterThanOrEqual(2);
  expect(rolled2D6).toBeLessThanOrEqual(12);

  rolled2D6 = DiceChance.roll(DiceChance.parse(formula2D6));
  expect(rolled2D6).toBeGreaterThanOrEqual(2);
  expect(rolled2D6).toBeLessThanOrEqual(12);
});

it('can analyze formula', () => {
  let analyzed2D6 = DiceChance.analyze(formula2D6);
  expect(analyzed2D6).toEqual({
    '2': 1,
    '3': 2,
    '4': 3,
    '5': 4,
    '6': 5,
    '7': 6,
    '8': 5,
    '9': 4,
    '10': 3,
    '11': 2,
    '12': 1,
  });

  analyzed2D6 = DiceChance.analyze(DiceChance.parse(formula2D6));
  expect(analyzed2D6).toEqual({
    '2': 1,
    '3': 2,
    '4': 3,
    '5': 4,
    '6': 5,
    '7': 6,
    '8': 5,
    '9': 4,
    '10': 3,
    '11': 2,
    '12': 1,
  });
});
