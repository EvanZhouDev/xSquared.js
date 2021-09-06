import { factor, solveQuadratic } from "../index.js";

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
    if (
        isNaN(parseInt(x2Input.value)) == false &&
        isNaN(parseInt(xInput.value)) == false &&
        isNaN(parseInt(constantInput.value)) == false
    ) {
        let mainSolution = MathJax.Hub.getAllJax("mainSolution")[0];
        let factoredSolution = MathJax.Hub.getAllJax("factoredSolution")[0];
        let solvedQuadratic = solveQuadratic(
            x2Input.value,
            xInput.value,
            constantInput.value,
            true,
            true,
            0
        );
        let formatted;

        if (solvedQuadratic.length > 2) {
            if (solvedQuadratic[2] == 1) {
                formatted =
                "text(The solution is: ) " +
                solvedQuadratic[0] +
                "+-" +
                (solvedQuadratic[1][0] == 1 ? "" : solvedQuadratic[1][0]) +
                (solvedQuadratic[3] ? "i" : "") +
                "sqrt " +
                solvedQuadratic[1][1];
            } else {
                formatted =
                    "text(The solution is: ) (" +
                    solvedQuadratic[0] +
                    "+-" +
                    (solvedQuadratic[1][0] == 1 ? "" : solvedQuadratic[1][0]) +
                    (solvedQuadratic[3] ? "i" : "") +
                    "sqrt " +
                    solvedQuadratic[1][1] +
                    ") / " +
                    solvedQuadratic[2];
            }
        } else {
            if (typeof(solvedQuadratic[0]) == "object") {
                if (solvedQuadratic.legth < 3) {
                    solvedQuadratic[0] = solvedQuadratic[0][1] + "/" + solvedQuadratic[0][2];
                }else{
                    solvedQuadratic[0] = solvedQuadratic[0][0] + solvedQuadratic[0][1] + "/" + solvedQuadratic[0][2];
                }
            }
            if (typeof(solvedQuadratic[1]) == "object") {
                if (solvedQuadratic.legth < 3) {
                    solvedQuadratic[1] = solvedQuadratic[1][1] + "/" + solvedQuadratic[1][2];
                }else{
                    solvedQuadratic[1] = solvedQuadratic[1][0] + solvedQuadratic[1][1] + "/" + solvedQuadratic[1][2];
                }
            }
            formatted =
                "text(The solutions are: ) {" +
                solvedQuadratic[0] +
                ", " +
                solvedQuadratic[1] +
                "}";
        }
        let factored = factor(x2Input.value, xInput.value, constantInput.value);
        if (factored !== undefined) {
            factored =
                "text(The factored version would be: ) (" +
                (factored[0][0] == 1 ? "" : factored[0][0]) +
                "x" +
                (factored[0][1] > 0 ? "+" : "") +
                factored[0][1] +
                ")(" +
                (factored[1][0] == 1 ? "" : factored[1][0]) +
                "x" +
                (factored[1][1] > 0 ? "+" : "") +
                factored[1][1] +
                ")";
        }else{
            factored = "text(There is no factored solution for this case)"
        }
        MathJax.Hub.Queue(["Text", mainSolution, formatted]);
        MathJax.Hub.Queue(["Text", factoredSolution, factored]);
    }
};

updateSolution();
