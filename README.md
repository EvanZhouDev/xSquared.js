# xSquared.js
A small library, made to factor & solve quadratic equations.

## Usage
There are two functions. ```factor()```, and ```solveQuadratic()```. It's that simple.

## factor()
This is used to factor a quadratic. It accepts parameters in the format of a, b, and c. Each one of those indicates a coefficient or constant in the quadratic equation, formatted like this: ax^2+bx+c.
It returns a 2D array in the format of ```[[a, b],[c, d]]```, which can be written as (ax+b)(cx+d).

```javascript
import { factor } from "../xSquared.js";

let a = 1;
let b = -2;
let c = -15;

console.log(factor(a, b, c));

// [[1, -5],[1, 3]]
```

## solveQuadratic()
This is used to factor a quadratic.
There is two possibilities for an output. If the solution is simple (i.e. no radicals), it will return a array in the format ```[solution1, solution2]```.

```javascript
import { solveQuadratic } from "../index.js";

let a = 1;
let b = -2;
let c = -15;

console.log(solveQuadratic(a, b, c));

// [5, -3]
```

However, if the solution is complex (i.e. with radicals), then it will return the solution in the format [a, [b, c], d, bool]. This can be formatted to (a+-b√c)/d.
If the boolean is true, then the radical is imaginary.

```javascript
import { solveQuadratic } from "../index.js";

let a = 1;
let b = 11;
let c = 6;

console.log(solveQuadratic(a, b, c));

// [-11, [1, 73], 4, false]
```

## Parameters for SolveQuadratic()
### a, b, c
The first three parameters are in the format of a, b, and c. Each one of those indicates a coefficient or constant in the quadratic equation, formatted like this: ax^2+bx+c.



### convertToFrac
Whether or not to convert the numbers in the solved quadratic into fractions.

```javascript
import { solveQuadratic } from "../index.js";

let a = 6;
let b = -13;
let c = 3;

console.log(solveQuadratic(a, b, c, false, false, 0)); // [1.5, 0.666666666...]
console.log(solveQuadratic(a, b, c, true, false, 0)); // [[3, 2], [2, 3]]
```

### convertToMixedNumber
Whether or not to convert to a mixed number.

```javascript
import { solveQuadratic } from "../index.js";

let a = 6;
let b = -13;
let c = 3;

console.log(solveQuadratic(a, b, c, true, false, 0)); // [[3, 2], [2, 3]]
console.log(solveQuadratic(a, b, c, true, true, 0)); // [[1, 1, 2], [2, 3]]
```
### convertToFracThreshold
When to convert to a fraction.

```javascript
import { solveQuadratic } from "../index.js";

let a = 6;
let b = -13;
let c = 3;

console.log(solveQuadratic(a, b, c, true, true, 0)); // [[1, 1, 2], [2, 3]]
console.log(solveQuadratic(a, b, c, true, true, 1)); // [1.5, [2, 3]]
```

### Fractions & Mixed Numbers
You may notice that under any return statments, it gives you an array of 2-3 length instead of a number. This is a fraction. Fraction arrays of length 2 are formatted like this: ```[numerator, denominator]```. Fraction arrays of length 3—mixed numbers—are formatted like this: ```[whole number, numerator, demonimator]```
