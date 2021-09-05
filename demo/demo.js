import { factor, solveQuadratic } from "../index.js";

let a = 1;
let b = 3;
let c = -15;

let x2Input = document.getElementById("x2Input");
let xInput = document.getElementById("xInput");
let constantInput = document.getElementById("constantInput");

x2Input.addEventListener("change", function () {
    updateSolution();
});

xInput.addEventListener("change", function () {
    // let math = MathJax.Hub.getAllJax("x2")[0];
    // if (xInput.value < 0) {
    //     MathJax.Hub.Queue(["Text", math, "x^2-"]);
    //     xInput.value = Math.abs(xInput.value);
    // }else{
    //     MathJax.Hub.Queue(["Text", math, "x^2+"]);
    // }
    updateSolution();
});

constantInput.addEventListener("change", function () {
    // let math = MathJax.Hub.getAllJax("x")[0];
    // console.log(constantInput.value < 0);
    // if (constantInput.value < 0) {
    //     MathJax.Hub.Queue(["Text", math, "x-"]);
    //     constantInput.value = Math.abs(constantInput.value);
    // }else{
    //     MathJax.Hub.Queue(["Text", math, "x+"]);
    // }
    updateSolution();
});

let updateSolution = () => {
    console.log(parseInt(x2Input.value) !== NaN);
    if (isNaN(parseInt(x2Input.value)) == false && isNaN(parseInt(xInput.value)) == false && isNaN(parseInt(constantInput.value)) == false) {
        console.log("hi")
        let math = MathJax.Hub.getAllJax("mainSolution")[0];
        let solvedQuadratic = solveQuadratic(x2Input.value, xInput.value, constantInput.value);
        let formatted;
        if (solvedQuadratic.length > 2) {
            if (solvedQuadratic[2] == 1) {
                formatted = (solvedQuadratic[0] + "+-" + ((solvedQuadratic[1][0] == 1) ? "" : solvedQuadratic[1][0]) + "sqrt " + solvedQuadratic[1][1]);
            }else{
                formatted = ("(" + solvedQuadratic[0] + "+-" + ((solvedQuadratic[1][0] == 1) ? "" : solvedQuadratic[1][0]) + "sqrt " + solvedQuadratic[1][1] + ") / " + solvedQuadratic[2]);

            }
        }else{
            formatted = ("{" + solvedQuadratic[0] + ", " + solvedQuadratic[1] + "}");
        }
        MathJax.Hub.Queue(["Text", math, formatted]);
    }
}

updateSolution();

console.log(solveQuadratic(1, -2, -15));
