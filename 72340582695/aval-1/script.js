function dark() {
    document.body.classList.toggle("dark-mode");
}

function calcularArea() {
    let inputBase = document.getElementById("base");
    let inputAltura = document.getElementById("altura");
    let resultado = document.getElementById("resultado");

    let base = Number(inputBase.value);
    let altura = Number(inputAltura.value);

    if (isNaN(base) || isNaN(altura) || base <= 0 || altura <= 0) {
        resultado.innerText = "Digite valores válidos";
        return;
    }

    let area = base * altura;

    resultado.innerText = "Área do retângulo é: " + area + " m²";

    inputBase.value = "";
    inputAltura.value = "";
}