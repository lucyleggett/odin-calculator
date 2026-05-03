function add(...numbers) {
    if (numbers.length === 0) return 0;
    return numbers.reduce((acc, curr) => acc + curr, 0);
}

function subtract(...numbers) {
    if (numbers.length === 0) return 0;
    return numbers.reduce((acc, curr) => acc - curr, 0);
}

function multiply(...numbers) {
    if (numbers.length === 0) return 0;
    return numbers.reduce((acc, curr) => acc * curr, 1);
}

function divide(...numbers) {
    if (numbers.length === 0) return 0;
    return numbers.reduce((acc, curr) => acc / curr);
}

let num1;
let num2;
let operator;

function operate(num1, operator, num2) {
    if (operator === "+"){
        add(num1, num2);
    } else if (operator === "-") {
        subtract(num1, num2);
    } else if (operator === "×") {
        multiply(num1, num2);
    } else if (operator === "÷") {
        divide(num1,num2);
    }
}
let clickCount = 0;

const buttons = document.querySelector("button")
buttons.addEventListener("click",(event) => {
    clickCount++

    if (clickCount === 1 && event.target.class === "number") {
        num1 = event.target;
    } else if (clickCount === 2 && event.target.class === "operator") {
        operator = event.target;
    } else if (clickCount === 3 && event.target.class === "number") {
        num2 = event.target;
    }
})

function evaluate
