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

let state = "initial";

const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener("click", handleEvent);
});

function handleEvent(event) {
    let display = document.getElementById("display")
    display.textContent += event.target.innerText;
    // if (state === "initial" && event.target.class === "number") {
    //     num1 += event.target.innerText;
    // }
    // else if (state === "initial" && event.target.class === "operator") {
    //     operator = event.target.innerText;
    //     state = "operate";
    // }
    // else if (state === "operate" && event.target.class === "number") {
    //     num2 += event.target.innerText;
    // }
    // else if (event.target.class === "evaluate") {
    //     let result = operate(num1, operator, num2);
    // }
}

    // if (state === "initial" && event.target.class === "number") {
    //     num1 += event.target;
    //     console.log(num1);
    //     // text = num1;
    // } else if (state === "initial" && event.target.class === "operator") {
    //     operator = event.target;
    //     console.log(num1 + operator)
    //     // state = "operate";
    //     // text += operator;
    // } else if (state === "operate" && event.target.class === "number") {
    //     num2 += event.target;
    //     console.log(num1 + operator + num2)
    //     // text += num2;
    // } else if (event.target.class === "evaluate") {
    //     let result = operate(num1, operator, num2);
    //     console.log(result)
    //     // text = result;
    // }
    // })
