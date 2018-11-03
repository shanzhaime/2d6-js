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
});
