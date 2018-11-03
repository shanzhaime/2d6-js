const Analyzer = require('../Analyzer');
const { Dice, DiceAmount, DiceSides } = require('../Tokens');

const parsed1D6 = new Dice(new DiceAmount(1), new DiceSides(6));
const parsed2D6 = new Dice(new DiceAmount(2), new DiceSides(6));
const parsed3D4 = new Dice(new DiceAmount(3), new DiceSides(4));
const parsed4D20 = new Dice(new DiceAmount(4), new DiceSides(20));

it('can parse single dice multiple rolls', () => {
  const analyzed1D6 = Analyzer.analyzeDice(parsed1D6);
  expect(analyzed1D6).toEqual({
    '1': 1,
    '2': 1,
    '3': 1,
    '4': 1,
    '5': 1,
    '6': 1,
  });

  const analyzed2D6 = Analyzer.analyzeDice(parsed2D6);
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

  const analyzed3D4 = Analyzer.analyzeDice(parsed3D4);
  expect(analyzed3D4).toEqual({
    '3': 1,
    '4': 3,
    '5': 6,
    '6': 10,
    '7': 12,
    '8': 12,
    '9': 10,
    '10': 6,
    '11': 3,
    '12': 1,
  });

  const analyzed4D20 = Analyzer.analyzeDice(parsed4D20);
  expect(analyzed4D20).toEqual({
    '4': 1,
    '5': 4,
    '6': 10,
    '7': 20,
    '8': 35,
    '9': 56,
    '10': 84,
    '11': 120,
    '12': 165,
    '13': 220,
    '14': 286,
    '15': 364,
    '16': 455,
    '17': 560,
    '18': 680,
    '19': 816,
    '20': 969,
    '21': 1140,
    '22': 1330,
    '23': 1540,
    '24': 1767,
    '25': 2008,
    '26': 2260,
    '27': 2520,
    '28': 2785,
    '29': 3052,
    '30': 3318,
    '31': 3580,
    '32': 3835,
    '33': 4080,
    '34': 4312,
    '35': 4528,
    '36': 4725,
    '37': 4900,
    '38': 5050,
    '39': 5172,
    '40': 5263,
    '41': 5320,
    '42': 5340,
    '43': 5320,
    '44': 5263,
    '45': 5172,
    '46': 5050,
    '47': 4900,
    '48': 4725,
    '49': 4528,
    '50': 4312,
    '51': 4080,
    '52': 3835,
    '53': 3580,
    '54': 3318,
    '55': 3052,
    '56': 2785,
    '57': 2520,
    '58': 2260,
    '59': 2008,
    '60': 1767,
    '61': 1540,
    '62': 1330,
    '63': 1140,
    '64': 969,
    '65': 816,
    '66': 680,
    '67': 560,
    '68': 455,
    '69': 364,
    '70': 286,
    '71': 220,
    '72': 165,
    '73': 120,
    '74': 84,
    '75': 56,
    '76': 35,
    '77': 20,
    '78': 10,
    '79': 4,
    '80': 1,
  });
});
