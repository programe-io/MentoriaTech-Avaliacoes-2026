
const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Receber os dados do paciente
    const nome = document.getElementById("nome").value.trim();
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);

    // Validar os campos
    if (nome === "" || !Number.isFinite(peso) ||
        !Number.isFinite(altura) || peso <= 0 || altura <= 0) {

        resultado.textContent = "Preencha todos os campos corretamente!";
        return;
    }

    // Calcular o IMC
    const imc = peso / (altura * altura);

    // Exibir o resultado
    resultado.textContent =
        "Paciente: " + nome +
        " | IMC calculado: " + imc.toFixed(2);

});
