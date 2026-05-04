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

let num1 = "";
let num2 = "";
let operator;

let state = "initial";
let result;

function operate(num1, num2, operator) {
    let output;
    if (operator === "add"){
        output = add(num1, num2);
    } else if (operator === "subtract") {
        output = subtract(num1, num2);
    } else if (operator === "multiply") {
        output = multiply(num1, num2);
    } else if (operator === "divide") {
        output = divide(num1, num2);
    }
    resetState(output);
    result = output;
}

function resetState(output) {
    state = "initial";
    num1 = output;
    num2 = "";
}

const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener("click", (event) => {
        handleEvent(event);
        updateDisplay(event);
    });
});

let display = document.getElementById("display")

function updateDisplay(event) {
    if (state != "evaluate") {
        display.textContent += event.target.innerText;
    }
    else if (state === "evaluate") {
        display.textContent = result;
}}

function handleEvent(event) {
    if (state === "initial") {
        if (event.target.classList.contains("number")) {
            num1 += event.target.innerText;
            num1 = parseFloat(num1);
        }
        else if (event.target.classList.contains("operator")) {
        state = "operate";
        operator = event.target.id;
        }
    }
    else if (state === "operate") {
        if (event.target.classList.contains("number")) {
            num2 += event.target.innerText;
            num2 = parseFloat(num2);
        }
        else if (event.target.classList.contains("operator")) {
            state = "evaluate";
            result = operate(num1, num2, operator);
            operator = event.target.id;
        }
        else if (event.target.classList.contains("evaluate")) {
            state = "evaluate";
            result = operate(num1, num2, operator);
        }
    }
    else if (event.target.classList.contains("evaluate")) {
        state = "evaluate";
        operate(num1, num2, operator);
    }
    else if (state === "evaluate"){
        if (event.target.classList.contains("number")) {
            state = "operate";
        }
    }
}