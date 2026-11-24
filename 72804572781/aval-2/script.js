
const result = document.getElementById("result");
const previous = document.getElementById("previous");

let firstNumber = null;
let operator = null;
let shouldReset = false;

function appendNumber(number) {

    if (shouldReset) {
        result.value = "0";
        shouldReset = false;
    }

    if (number === "." && result.value.includes(".")) {
        return;
    }

    if (result.value === "0" && number !== ".") {
        result.value = number;
    } else {
        result.value += number;
    }
}

function chooseOperator(op) {

    if (operator !== null && !shouldReset) {
        calculate();
    }

    firstNumber = parseFloat(result.value);
    operator = op;

    previous.textContent =
        `${firstNumber} ${getSymbol(op)}`;

    shouldReset = true;
}

function calculate() {

    if (operator === null || firstNumber === null) {
        return;
    }

    const secondNumber = parseFloat(result.value);
    let answer;

    switch (operator) {

        case "+":
            answer = firstNumber + secondNumber;
            break;

        case "-":
            answer = firstNumber - secondNumber;
            break;

        case "*":
            answer = firstNumber * secondNumber;
            break;

        case "/":
            if (secondNumber === 0) {
                result.value = "Erro";
                previous.textContent = "Divisão por zero";
                operator = null;
                firstNumber = null;
                shouldReset = true;
                return;
            }

            answer = firstNumber / secondNumber;
            break;
    }

    previous.textContent =
        `${firstNumber} ${getSymbol(operator)} ${secondNumber} =`;

    result.value = Number(answer.toPrecision(12)).toString();

    operator = null;
    firstNumber = null;
    shouldReset = true;
}

function getSymbol(op) {
    const symbols = {
        "+": "+",
        "-": "−",
        "*": "×",
        "/": "÷"
    };

    return symbols[op];
}

function clearDisplay() {
    result.value = "0";
    previous.textContent = "";
    firstNumber = null;
    operator = null;
    shouldReset = false;
}

function deleteNumber() {

    if (shouldReset) {
        result.value = "0";
        shouldReset = false;
        return;
    }

    result.value = result.value.slice(0, -1) || "0";
}

function percentage() {
    result.value = (
        parseFloat(result.value) / 100
    ).toString();
    shouldReset = true;
}

// Teclado do computador
document.addEventListener("keydown", function(event) {

    if (/^[0-9.]$/.test(event.key)) {
        appendNumber(event.key);
    }

    if (["+", "-", "*", "/"].includes(event.key)) {
        chooseOperator(event.key);
    }

    if (event.key === "Enter" || event.key === "=") {
        calculate();
    }

    if (event.key === "Backspace") {
        deleteNumber();
    }

    if (event.key === "Escape") {
        clearDisplay();
    }

    if (event.key === "%") {
        percentage();
    }

});
