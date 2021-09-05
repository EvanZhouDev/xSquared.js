/**
 * Factors a quadratic of the form ax^2+bx+c.
 * 
 * @param {number} a - The a coefficient.
 * @param {number} b - The b coefficient.
 * @param {number} c - The constant.
 * 
 * @returns {Array} The factored quadratic in the form [[a, b],[c, d]], as (ax+b)(cx+d)
 */
let factor = (a, b, c) => {
    // Factors a number
    let factorNum = (num) => {
        var output = [];

        // Finds the correct numbers
        for (var i = 1; i <= Math.sqrt(Math.abs(num)); i++) {
            if (num % i === 0) {
                output.push(i);
                output.push(-i);
            }
        }

        // If there is no applicable numbers, return the number itself
        if (output.length === 0) {
            output.push(num);
        }

        return output;
    };

    // Finds factors of both a and c
    let factors1 = factorNum(a);
    let factors2 = factorNum(c);

    // Finds the sum target
    let sum = b;

    // Loops through the factors to find a valid pair
    for (let [_i, x] of factors1.entries()) {
        for (let [_si, sx] of factors2.entries()) {
            // Finds the original number
            let xPrime = a / x;
            let sxPrime = c / sx;

            // Checks first valid sum
            if (x * sx + xPrime * sxPrime == sum) {
                return [
                    [x, sxPrime],
                    [xPrime, sx],
                ];
            }

            // Checks other sum
            if (x * sxPrime + xPrime * sx == sum) {
                return [
                    [x, sx],
                    [xPrime, sxPrime],
                ];
            }
        }
    }
};

/**
 * Solves a quadratic of the form ax^2+bx+c.
 * 
 * @param {number} a - The a coefficient.
 * @param {number} b - The b coefficient.
 * @param {number} c - The constant.
 * @param {boolean} convertToFrac - Convert the answers to fractions?
 * @param {boolean} convertToMixedNumber - Convert the fractions to mixed numbers?
 * @param {number} convertToFracThreshold - To what decimal place should it convert to a fraction?
 * 
 * @returns {Array} The solved quadratic. Can be array of both solutions if both solutions are simple. Otherwise, it will be an array in the form [a, [b, c], d, imaginary?] as (a + b√c)/d
 */
let solveQuadratic = (
    a,
    b,
    c,
    convertToFrac = true,
    convertToMixedNumber = true,
    convertToFracThreshold = 0
) => {
    // Finds the discriminant of the quadratic equation
    let discrim = Math.pow(b, 2) - 4 * a * c;

    // Whether or not the result will be imaginary
    let imaginary = false;

    // Reduces a fraction
    let reduce = (n, d, findGcd = false) => {
        let gcd = function gcd(a, b) {
            return b ? gcd(b, a % b) : a;
        };
        gcd = gcd(n, d);
        if (findGcd) {
            return gcd;
        } else {
            return [n / gcd, d / gcd];
        }
    };

    // Converts an improper fraction to mixed number
    let improperFractionToMixedNumber = (n, d) => {
        let i = parseInt(n / d);
        n -= i * d;
        return [i, Math.abs(n), Math.abs(d)];
    };

    // Simplifies a square root
    let simplifySquareRoot = (n) => {
        let outside_root = 1;
        let inside_root = Math.abs(n);
        let d = 2;
        while (d * d <= inside_root) {
            if (inside_root % (d * d) == 0) {
                inside_root = inside_root / (d * d);
                outside_root = outside_root * d;
            } else {
                d = d + 1;
            }
        }
        return [outside_root, inside_root];
    };

    // If the discriminant is negative, then the output will be imaginary
    if (discrim < 0) {
        imaginary = true;
    }

    // Pair is factorable in rational numbers numbers
    if (Math.round(Math.sqrt(discrim)) === Math.sqrt(discrim)) {
        // Two solutions
        let frac1;
        let frac2;

        let solution1 = (-b + Math.sqrt(discrim)) / (2 * a);
        if (
            (solution1 * Math.pow(10, convertToFracThreshold)) % 1 !== 0 &&
            convertToFrac
        ) {
            frac1 = reduce(-b + Math.sqrt(discrim), 2 * a);
            if (convertToMixedNumber) {
                solution1 = improperFractionToMixedNumber(frac1[0], frac1[1]);
            } else {
                solution1 = frac1;
            }
        }

        let solution2 = (-b - Math.sqrt(discrim)) / (2 * a);
        if (
            (solution2 * Math.pow(10, convertToFracThreshold)) % 1 !== 0 &&
            convertToFrac
        ) {
            frac2 = reduce(-b - Math.sqrt(discrim), 2 * a);
            if (convertToMixedNumber) {
                solution2 = improperFractionToMixedNumber(frac2[0], frac2[1]);
            } else {
                solution2 = frac2;
            }
        }

        return [solution1, solution2];
    } else { // If the solutions are complex
        let solution = [-b, simplifySquareRoot(discrim), 2 * a, imaginary];
        if (
            reduce(solution[0], solution[2], true) !== 1 &&
            reduce(solution[1][0], solution[2], true) !== 1
        ) {
            let calcGcd;
            if (solution[0] / solution[2] >= solution[1][0] / solution[2]) {
                calcGcd = reduce(solution[1][0], solution[2], true);
            } else {
                calcGcd = reduce(solution[0], solution[2], true);
            }
            solution[0] = solution[0] / calcGcd;
            solution[1][0] = solution[1][0] / calcGcd;
            solution[2] = solution[2] / calcGcd;
        }
        return solution;
    }
};

// Export two functions
export { factor, solveQuadratic };
