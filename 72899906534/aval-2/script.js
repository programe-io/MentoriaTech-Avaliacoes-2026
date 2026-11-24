
const currentDisplay = document.getElementById("current");
const previousDisplay = document.getElementById("previous");

let currentNumber = "0";
let previousNumber = "";
let operation = null;
let resetScreen = false;

function updateDisplay() {
    currentDisplay.innerText = currentNumber;

    if (operation !== null) {
        previousDisplay.innerText =
            `${previousNumber} ${getSymbol(operation)}`;
    } else {
        previousDisplay.innerText = "";
    }
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

function appendNumber(number) {
    if (currentNumber === "Erro") {
        currentNumber = "0";
    }

    if (resetScreen) {
        currentNumber = number;
        resetScreen = false;
    } else {
        if (currentNumber === "0") {
            currentNumber = number;
        } else {
            currentNumber += number;
        }
    }

    updateDisplay();
}

function appendDecimal() {
    if (currentNumber === "Erro") {
        currentNumber = "0";
    }

    if (resetScreen) {
        currentNumber = "0.";
        resetScreen = false;
    } else if (!currentNumber.includes(".")) {
        currentNumber += ".";
    }

    updateDisplay();
}

function chooseOperation(op) {
    if (currentNumber === "Erro") return;

    if (operation !== null && !resetScreen) {
        calculate();
    }

    previousNumber = currentNumber;
    operation = op;
    resetScreen = true;

    updateDisplay();
}

function calculate() {
    if (operation === null || resetScreen) return;

    const first = parseFloat(previousNumber);
    const second = parseFloat(currentNumber);

    let result;

    switch (operation) {
        case "+":
            result = first + second;
            break;

        case "-":
            result = first - second;
            break;

        case "*":
            result = first * second;
            break;

        case "/":
            if (second === 0) {
                currentNumber = "Erro";
                operation = null;
                previousNumber = "";
                resetScreen = true;
                updateDisplay();
                return;
            }
            result = first / second;
            break;
    }

    currentNumber = String(Number(result.toPrecision(12)));

    operation = null;
    previousNumber = "";
    resetScreen = true;

    updateDisplay();
}

function clearDisplay() {
    currentNumber = "0";
    previousNumber = "";
    operation = null;
    resetScreen = false;

    updateDisplay();
}

function deleteNumber() {
    if (currentNumber === "Erro" || resetScreen) {
        currentNumber = "0";
        resetScreen = false;
    } else {
        currentNumber = currentNumber.slice(0, -1);

        if (currentNumber === "" || currentNumber === "-") {
            currentNumber = "0";
        }
    }

    updateDisplay();
}

function percentage() {
    if (currentNumber === "Erro") return;

    currentNumber = String(
        Number((parseFloat(currentNumber) / 100).toPrecision(12))
    );

    updateDisplay();
}

// Permite utilizar o teclado do computador.
document.addEventListener("keydown", (event) => {
    if (event.key >= "0" && event.key <= "9") {
        appendNumber(event.key);
    }

    if (event.key === ".") {
        appendDecimal();
    }

    if (["+", "-", "*", "/"].includes(event.key)) {
        chooseOperation(event.key);
    }

    if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
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

updateDisplay();
