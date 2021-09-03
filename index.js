let findSum = (factors1, factors2, sum) => {
    for (let [i, x] of factors1.factors.entries()) {
        for (let [si, sx] of factors2.factors.entries()) {
            let factorsMax1 = factors1.num;
            let factorsMax2 = factors2.num;
            let xPrime = factorsMax1 / x;
            let sxPrime = factorsMax2 / sx;
            if (x * sx + xPrime * sxPrime == sum) {
                return [
                    [x, sxPrime],
                    [xPrime, sx],
                ];
            }
            if (x * sxPrime + xPrime * sx == sum) {
                return [
                    [x, sx],
                    [xPrime, sxPrime],
                ];
            }
        }
    }
};

let factor = (num) => {
    var output = [];

    for (var i = 1; i <= Math.sqrt(Math.abs(num)); i++) {
        if (num % i === 0) {
            output.push(i);
            output.push(-i);
        }
    }

    if (output.length === 0) {
        output.push(num);
    }

    return { factors: output, num: num };
};

let solveQuadratic = (
    a,
    b,
    c,
    convertToFrac = true,
    convertToMixedNumber = true,
    convertToFracThreshold = 0
) => {
    let reduce = (n, d) => {
        var gcd = function gcd(a, b) {
            return b ? gcd(b, a % b) : a;
        };
        gcd = gcd(n, d);
        return [n / gcd, d / gcd];
    }

    let improperFractionToMixedNumber = (n, d) => {
        i = parseInt(n / d);
        n -= i * d;
        return [i, Math.abs(n), Math.abs(d)];
    }

    let frac1;
    let frac2;

    let solution1 = (-b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
    if (
        (solution1 * Math.pow(10, convertToFracThreshold)) % 1 !== 0 &&
        convertToFrac
    ) {
        frac1 = reduce(-b + Math.sqrt(Math.pow(b, 2) - 4 * a * c), 2 * a);
        if (convertToMixedNumber) {
            solution1 = improperFractionToMixedNumber(frac1[0], frac1[1]);
        } else {
            solution1 = frac1;
        }
        console.log(frac1);
    }

    let solution2 = (-b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
    if (
        (solution2 * Math.pow(10, convertToFracThreshold)) % 1 !== 0 &&
        convertToFrac
        ) {
            frac2 = reduce(-b - Math.sqrt(Math.pow(b, 2) - 4 * a * c), 2 * a);
        console.log(frac2);
        if (convertToMixedNumber) {
            solution2 = improperFractionToMixedNumber(frac2[0], frac2[1]);
        } else {
            solution2 = frac2;
        }
    }

    return [solution1, solution2];
};

let a = 8;
let b = 10;
let c = -25;

console.log(factor(a));
console.log(factor(c));
console.log(findSum(factor(a), factor(c), b));
// console.log(solveQuadratic(a, b, c));
