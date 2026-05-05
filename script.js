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
let num2 = "";
let operator;

let state = "initial";
let result = "";

function operate(num1, num2, operator) {
    let output;
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
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
let currButton;
let prevButton;

buttons.forEach(button => {
    button.addEventListener("click", (event) => {
        if (button.classList.contains("all-clear")){
            allClear();
        }
        else {
            handleEvent(event);
        }
    });
});

let display = document.getElementById("display")

const decimalButton = document.getElementById("decimal");

function disableDecimal() {
    decimalButton.disabled = true;
}

function enableDecimal() {
    decimalButton.disabled = false;
}

const numberButtons = document.getElementsByClassName("number");

function disableNumberButtons() {
    for (let numberButton of numberButtons) {
        numberButton.disabled = true;
    }
}

function enableNumberButtons() {
    for (let numberButton of numberButtons) {
        numberButton.disabled = false;
    }
}

function handleEvent(event){
    if (state === "initial"){
        enableDecimal();
        if (event.target.classList.contains("number")){
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
        } else if (event.target.classList.contains("evaluate")){
            result = num1;
            display.textContent = result;
        }
    }
    else if (state === "operate"){
        enableDecimal();
        if (event.target.classList.contains("number")){
            if (num2.includes(".")){
                disableDecimal();
                num2 += event.target.innerText;
                display.textContent += event.target.innerText;
            } else {
                num2 += event.target.innerText;
                display.textContent += event.target.innerText;
            }
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
                num2 = "";
                result = ""
            }
        } else if (event.target.classList.contains("evaluate")){
            result = operate(num1, num2, operator);
            display.textContent = result;
            disableNumberButtons();
            num1 = result;
            num2 = "";
        }
    }
}

function allClear(){
    num1 = "";
    num2 = "";
    display.textContent = "";
    state = "initial";
}