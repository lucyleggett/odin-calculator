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

function operate(num1, num2, operator) {
    let result;
    if (operator === "add"){
        return result = add(num1, num2);
    } else if (operator === "subtract") {
        return result = subtract(num1, num2);
    } else if (operator === "multiply") {
        return result = multiply(num1, num2);
    } else if (operator === "divide") {
        return result = divide(num1, num2);
    }
    state = initial;
}

let state = "initial";

const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener("click", (event) => {
        handleEvent(event);
        updateDisplay(event);
    });
});

let display = document.getElementById("display")

function updateDisplay(event) {
    if (state === "initial" || state === "operate") {
        display.textContent += event.target.innerText;
    }
    else if (state === "evaluate") {
        display.textContent = result;
}}

let result;
let operatorCount = 0;

function handleEvent(event) {
    if (state === "initial" && event.target.classList.contains("number")) {
        num1 += event.target.innerText;
        num1 = parseFloat(num1);
    }
    if (event.target.classList.contains("operator")) {
        state = "operate";
        operatorCount++
        operator = event.target.id;
    }
    if (state === "operate" && event.target.classList.contains("number")) {
        num2 += event.target.innerText;
        num2 = parseFloat(num2);
    }
    if (event.target.classList.contains("evaluate") || operatorCount > 1) {
        state = "evaluate";
        result = operate(num1, num2, operator);
        num1 = result;
    }
}