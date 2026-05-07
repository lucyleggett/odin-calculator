function add(...numbers) {
    if (numbers.length === 0) return 0;
    return numbers.reduce((acc, curr) => acc + curr, 0);
}

function subtract(...numbers) {
    if (numbers.length === 0) return 0;
    return numbers.reduce((acc, curr) => acc - curr);
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
let num1State;
let num2 = "";
let operator;

let result = "";

let display = document.getElementById("display");
let state = "initial";

function initializeDisplay() {
    display.textContent = "0"
    num1 = 0;
}

document.addEventListener("DOMContentLoaded", () => {
    initializeDisplay();
});

function operate(num1, num2, operator) {
    let output;
    num1 = +num1;
    num2 = +num2;
    if (operator === "+"){
        output = add(num1, num2);
    } else if (operator === "-") {
        output = subtract(num1, num2);
    } else if (operator === "×") {
        output = multiply(num1, num2);
    } else if (operator === "÷") {
        if(num2 === 0) {
            output = 0;
            return display.textContent = "Sorry, no can do!";
        } else{
            output = divide(num1, num2);
        }
    }
    rounded = Math.round(output * 100000) / 100000;
    return output = rounded;
}

const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener("click", (event) => {
        if (button.id === "all-clear") {
            allClear();
            enableNumberButtons();
        } else if (button.id === "clear") {
            clear();
        } else if (button.id === "smiley") {
            surprise();
        } else {
            handleEvent(event);
        }
    });
});

const keyMap = {
    "Enter": "evaluate",
    "=": "evaluate",
    "Clear": "all-clear",
    "Backspace": "clear",
    "Delete": "clear",
    "0": "0",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "+": "add",
    "Add": "add",
    "-": "subtract",
    "Subtract": "subtract",
    "/": "divide",
    "Divide": "divide",
    "*": "multiply",
    "Multiply": "multiply",
    "Decimal": "decimal",
    ".": "decimal",
}

document.addEventListener("keydown", (event) => {
    const buttonId = keyMap[event.key];

    if (buttonId) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.click();
        }
    }
})

function disableDecimal() {
    const decimalButton = document.getElementById("decimal");
    decimalButton.disabled = true;
}

function enableDecimal() {
    const decimalButton = document.getElementById("decimal");
    decimalButton.disabled = false;
}

function disableNumberButtons() {
    const numberButtons = document.getElementsByClassName("number");
    for (let numberButton of numberButtons) {
        numberButton.disabled = true;
    }
}

function enableNumberButtons() {
    const numberButtons = document.getElementsByClassName("number");
    for (let numberButton of numberButtons) {
        numberButton.disabled = false;
    }
}

function disableEval() {
    const evalButton = document.getElementById("evaluate");
    evalButton.disabled = true;
}

function enableEval() {
    const evalButton = document.getElementById("evaluate");
    evalButton.disabled = false;
}

function handleEvent(event){
    if (state === "surprise"){
        allClear();
    }
    if (state === "initial"){
        enableDecimal();
        if (event.target.classList.contains("number")){
            if (num1 === 0) {
                num1 = "";
                display.textContent = "";
            }
            if (num1.includes(".")){
                disableDecimal();
                num1 += event.target.innerText;
                display.textContent += event.target.innerText;
            } else {
                num1 += event.target.innerText;
                display.textContent += event.target.innerText;
            }
        } else if (event.target.classList.contains("operator")){
            state = "operate";
            operator = event.target.innerText;
            display.textContent += event.target.innerText;
        } else if (event.target.id === "evaluate"){
            result = num1;
            display.textContent = result;
        }
    }
    else if (state === "operate"){
        enableDecimal();
        if (event.target.classList.contains("number")){
            enableEval();
            if (num2.includes(".")){
                disableDecimal();
            } else { }
            num2 += event.target.innerText;
            display.textContent += event.target.innerText;
        } else if (event.target.classList.contains("operator")){
            enableNumberButtons();
            if (num2 === ""){
                display.textContent -= operator;
                operator = event.target.innerText;
                display.textContent = num1 + event.target.innerText;
            } else {
                result = operate(num1, num2, operator);
                operator = event.target.innerText;
                display.textContent = result + operator;
                num1 = result;
                num1State = "ineditable";
                num2 = "";
                result = ""
                disableEval();
            }
        } else if (event.target.id === "evaluate"){
            result = operate(num1, num2, operator);
            display.textContent = result;
            disableNumberButtons();
            num1 = result;
            num1State = "ineditable";
            num2 = "";
            disableEval();
        }
    }
}

function allClear() {
    num1 = "";
    num2 = "";
    display.textContent = "";
    state = "initial";
    initializeDisplay();
}

function clear() {
    const prevButton = display.textContent.at(-1);
    const operatorSet = /[+\-×÷]/;
    const numberSet = /[0123456789]/;
    const workingCalc = display.textContent.slice();

    if (state === "surprise") {
        allClear();
    }
    else if (prevButton === "=") {
        //Do nothing; not a valid action to undo;
    } else {
        if (operatorSet.test(prevButton)) {
            display.textContent = display.textContent.slice(0, -1);
            operator = "";
        } else if (numberSet.test(prevButton)) { 
            if (operatorSet.test(workingCalc)) {
                num2 = num2.slice(0, -1);
                display.textContent = display.textContent.slice(0, -1);
            } else {
                if (num1State !== "ineditable"){
                    num1 = num1.slice(0, -1);
                    display.textContent = display.textContent.slice(0, -1);
                    state = "initial";
                }
            }
        }
    }
}

function surprise() {
    allClear();
    display.textContent = "🩷";
    num1 = "";
    num2 = "";
    prevButton = "";
    result = "";
    state = "surprise";
}