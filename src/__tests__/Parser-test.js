const Parser = require('../Parser');
const Tokens = require('../Tokens');

const formula1D6 = '1d6';
const formula2D6 = '2d6';
const formula3D4 = '3d4';
const formula4D20 = '4d20';

it('can parse single dice multiple rolls', () => {
  const parsed1D6 = Parser.parseFormula(formula1D6);
  expect(parsed1D6 instanceof Tokens.Dice);
  expect(parsed1D6.diceAmount.value).toBe(1);
  expect(parsed1D6.diceSides.value).toBe(6);

  const parsed2D6 = Parser.parseFormula(formula2D6);
  expect(parsed2D6 instanceof Tokens.Dice);
  expect(parsed2D6.diceAmount.value).toBe(2);
  expect(parsed2D6.diceSides.value).toBe(6);

  const parsed3D4 = Parser.parseFormula(formula3D4);
  expect(parsed3D4 instanceof Tokens.Dice);
  expect(parsed3D4.diceAmount.value).toBe(3);
  expect(parsed3D4.diceSides.value).toBe(4);

  const parsed4D20 = Parser.parseFormula(formula4D20);
  expect(parsed4D20 instanceof Tokens.Dice);
  expect(parsed4D20.diceAmount.value).toBe(4);
  expect(parsed4D20.diceSides.value).toBe(20);
});

it('throws if formula is not single dice', () => {
  expect(() => {
    Parser.parseFormula('2d');
  }).toThrow();

  expect(() => {
    Parser.parseFormula('d6');
  }).toThrow();

  expect(() => {
    Parser.parseFormula('42');
  }).toThrow();

  expect(() => {
    Parser.parseFormula('2d6+3');
  }).toThrow();
});
