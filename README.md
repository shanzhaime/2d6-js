# dice-chance [![Build Status](https://travis-ci.org/shanzhaime/dice-chance.svg?branch=master)](https://travis-ci.org/shanzhaime/dice-chance) [![codecov](https://codecov.io/gh/shanzhaime/dice-chance/branch/master/graph/badge.svg)](https://codecov.io/gh/shanzhaime/dice-chance)

This is a dice rolling and analysis library. The goal is to accept a dice rolling formula and calculate the probability distribution.

## Roadmap

These are the dice rolling formulas that will be supported through versions:

### v1

This version aims to support the very simple use case: roll a die with `x` sides `y` times. Accepted formula looks like `2d6`: rolling 6-side die 2 times.

### v2

This version aims to support modifiers on top of previous version. Accepted formula looks like `2d6 + 3`.

### v3

This version aims to support multiple dices of different number of sides. Accepted formula looks like `2d6 + 1d10 + 3`.

### v4+

Priority for future versions are undetermined.

## API

Call `DiceChance.roll` to roll dice with acceptable formula. Examples:

```
DiceChance.roll('1d6'); // A number between 1 and 6
DiceChance.roll('2d6'); // A number between 2 and 12
```

Call `DiceChance.analyze` to calculate the probability distribution of an acceptable formula. Examples:

```
DiceChance.analyze('1d6');
// { '1': 1, '2': 1, '3': 1, '4': 1, '5': 1, '6': 1 }

DiceChance.analyze('2d6');
// { '2': 1,
//   '3': 2,
//   '4': 3,
//   '5': 4,
//   '6': 5,
//   '7': 6,
//   '8': 5,
//   '9': 4,
//   '10': 3,
//   '11': 2,
//   '12': 1 }
```
