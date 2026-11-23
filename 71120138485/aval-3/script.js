const btnCalcular = document.getElementById("btnCalcular");
const resultado = document.getElementById("resultado");

function calcularMDC(a, b) {
    while (b !== 0) {
        let resto = a % b;
        a = b;
        b = resto;
    }

    return a;
}

function calcularMMC(a, b) {
    return (a * b) / calcularMDC(a, b);
}

btnCalcular.addEventListener("click", () => {
    const num1 = Number(document.getElementById("num1").value);
    const num2 = Number(document.getElementById("num2").value);

    if (!num1 || !num2) {
        resultado.textContent = "Digite dois números válidos!";
        return;
    }

    const mmc = calcularMMC(num1, num2);

    resultado.textContent = `MMC(${num1}, ${num2}) = ${mmc}`;
});