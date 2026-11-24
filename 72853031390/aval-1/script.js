
let currentValue = "0";
let previousValue = null;
let operator = null;
let resetDisplay = false;

const display = document.getElementById("display");

function updateDisplay() {
    display.textContent = currentValue;
}

function addNumber(number) {
    if (currentValue === "Erro") {
        clearAll();
    }

    if (resetDisplay) {
        currentValue = number;
        resetDisplay = false;
    } else {
        currentValue = currentValue === "0"
            ? number
            : currentValue + number;
    }

    updateDisplay();
}

function addDecimal() {
    if (resetDisplay) {
        currentValue = "0";
        resetDisplay = false;
    }

    if (!currentValue.includes(".")) {
        currentValue += ".";
    }

    updateDisplay();
}

function setOperator(op) {
    if (currentValue === "Erro") return;

    if (operator !== null && !resetDisplay) {
        calculate();
    }

    previousValue = parseFloat(currentValue);
    operator = op;
    resetDisplay = true;
}

function calculate() {
    if (operator === null || previousValue === null) return;

    const current = parseFloat(currentValue);
    let result;

    switch (operator) {
        case "+":
            result = previousValue + current;
            break;

        case "-":
            result = previousValue - current;
            break;

        case "*":
            result = previousValue * current;
            break;

        case "/":
            result = current === 0
                ? "Erro"
                : previousValue / current;
            break;
    }

    currentValue = result === "Erro"
        ? "Erro"
        : String(Number(result.toFixed(10)));

    operator = null;
    previousValue = null;
    resetDisplay = true;

    updateDisplay();
}

function percentage() {
    if (currentValue === "Erro") return;

    currentValue = String(parseFloat(currentValue) / 100);
    updateDisplay();
}

function clearAll() {
    currentValue = "0";
    previousValue = null;
    operator = null;
    resetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    if (currentValue === "Erro" || resetDisplay) {
        clearAll();
        return;
    }

    currentValue = currentValue.length > 1
        ? currentValue.slice(0, -1)
        : "0";

    updateDisplay();
}
