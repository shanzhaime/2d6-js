const Analyzer = require('../Analyzer');
const {
  DiceAmount,
  DiceSides,
  Dice,
  Arithmetic,
  Formula,
} = require('../Tokens');

describe('analyze dice (v1)', () => {
  const parsed1D6 = new Dice(new DiceAmount(1), new DiceSides(6));
  const parsed2D6 = new Dice(new DiceAmount(2), new DiceSides(6));
  const parsed3D4 = new Dice(new DiceAmount(3), new DiceSides(4));
  const parsed4D20 = new Dice(new DiceAmount(4), new DiceSides(20));
  const parsed0D6 = new Dice(new DiceAmount(0), new DiceSides(6));
  const parsed2D0 = new Dice(new DiceAmount(2), new DiceSides(0));

  it('can analyze a single dice multiple rolls', () => {
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

  it('can handle 0 dice', () => {
    const analyzed0D6 = Analyzer.analyzeDice(parsed0D6);
    expect(analyzed0D6).toEqual({});
  });

  it('can handle 0 side dice', () => {
    const analyzed2D0 = Analyzer.analyzeDice(parsed2D0);
    expect(analyzed2D0).toEqual({});
  });
});

describe('analyze formula (v2)', () => {
  const parsed1D6 = new Formula(new Dice(new DiceAmount(1), new DiceSides(6)));
  const parsed2D6Plus4 = new Formula(
    new Arithmetic(new Dice(new DiceAmount(2), new DiceSides(6)), 4, '+'),
  );
  const parsed3D4Minus3 = new Formula(
    new Arithmetic(new Dice(new DiceAmount(3), new DiceSides(4)), 3, '-'),
  );
  const parsed4D20Minus5Plus12 = new Formula(
    new Arithmetic(
      new Arithmetic(new Dice(new DiceAmount(4), new DiceSides(20)), 5, '-'),
      12,
      '+',
    ),
  );

  it('can analyze a single dice without modifier', () => {
    const analyzed1D6 = Analyzer.analyzeFormula(parsed1D6);
    expect(analyzed1D6).toEqual({
      '1': 1,
      '2': 1,
      '3': 1,
      '4': 1,
      '5': 1,
      '6': 1,
    });
  });

  it('can analyze a single dice with plus modifier', () => {
    let analyzed2D6Plus4 = Analyzer.analyzeFormula(parsed2D6Plus4);
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

  it('can analyze a single dice with minus modifier', () => {
    let analyzed3D4Minus3 = Analyzer.analyzeFormula(parsed3D4Minus3);
    expect(analyzed3D4Minus3).toEqual({
      '0': 1,
      '1': 3,
      '2': 6,
      '3': 10,
      '4': 12,
      '5': 12,
      '6': 10,
      '7': 6,
      '8': 3,
      '9': 1,
    });
  });

  it('can analyze a single dice with multiple modifiers', () => {
    let analyzed4D20Minus5Plus12 = Analyzer.analyzeFormula(
      parsed4D20Minus5Plus12,
    );
    expect(analyzed4D20Minus5Plus12).toEqual({
      '11': 1,
      '12': 4,
      '13': 10,
      '14': 20,
      '15': 35,
      '16': 56,
      '17': 84,
      '18': 120,
      '19': 165,
      '20': 220,
      '21': 286,
      '22': 364,
      '23': 455,
      '24': 560,
      '25': 680,
      '26': 816,
      '27': 969,
      '28': 1140,
      '29': 1330,
      '30': 1540,
      '31': 1767,
      '32': 2008,
      '33': 2260,
      '34': 2520,
      '35': 2785,
      '36': 3052,
      '37': 3318,
      '38': 3580,
      '39': 3835,
      '40': 4080,
      '41': 4312,
      '42': 4528,
      '43': 4725,
      '44': 4900,
      '45': 5050,
      '46': 5172,
      '47': 5263,
      '48': 5320,
      '49': 5340,
      '50': 5320,
      '51': 5263,
      '52': 5172,
      '53': 5050,
      '54': 4900,
      '55': 4725,
      '56': 4528,
      '57': 4312,
      '58': 4080,
      '59': 3835,
      '60': 3580,
      '61': 3318,
      '62': 3052,
      '63': 2785,
      '64': 2520,
      '65': 2260,
      '66': 2008,
      '67': 1767,
      '68': 1540,
      '69': 1330,
      '70': 1140,
      '71': 969,
      '72': 816,
      '73': 680,
      '74': 560,
      '75': 455,
      '76': 364,
      '77': 286,
      '78': 220,
      '79': 165,
      '80': 120,
      '81': 84,
      '82': 56,
      '83': 35,
      '84': 20,
      '85': 10,
      '86': 4,
      '87': 1,
    });
  });
});
