
function calcularIMC() {
    let nome = document.getElementById("nome").value.trim();
    let peso = Number(document.getElementById("peso").value);
    let altura = Number(document.getElementById("altura").value);

    let resultado = document.getElementById("resultado");

    if (
        nome === "" ||
        document.getElementById("peso").value === "" ||
        document.getElementById("altura").value === "" ||
        !Number.isFinite(peso) ||
        !Number.isFinite(altura) ||
        peso <= 0 ||
        altura <= 0
    ) {
        resultado.innerHTML = "Preencha todos os campos corretamente!";
        return;
    }

    let imc = peso / (altura * altura);

    resultado.innerHTML =
        "<h3>Resultado do cálculo</h3>" +
        "<p>Paciente: " + nome + "</p>" +
        "<p>Peso: " + peso + " kg</p>" +
        "<p>Altura: " + altura + " m</p>" +
        "<p>IMC: " + imc.toFixed(2) + "</p>";
}
