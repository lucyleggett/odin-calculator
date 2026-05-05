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
let result;

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
        output = divide(num1, num2);
    }
    return output.toFixed(5);
}

const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener("click", (event) => {
        handleEvent(event);
    });
});

let display = document.getElementById("display")

function handleEvent(event){
    if (state === "initial"){
        if (event.target.classList.contains("number")){
            num1 += event.target.innerText;
            display.textContent += event.target.innerText;
        } else if (event.target.classList.contains("operator")){
            state = "operate";
            operator = event.target.innerText;
            display.textContent += event.target.innerText;
        }
    }
    else if (state === "operate"){
        if (event.target.classList.contains("number")){
            num2 += event.target.innerText;
            display.textContent += event.target.innerText;
        } else if (event.target.classList.contains("operator")){
            result = operate(num1, num2, operator);
            operator = event.target.innerText;
            display.textContent = result + operator;
            num1 = result;
            num2 = "";
        } else if (event.target.classList.contains("evaluate")){
            result = operate(num1, num2, operator);
            display.textContent = result;
        }
    }
}