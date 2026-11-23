
const formulario = document.querySelector("#form-imc");

const resultado = document.querySelector("#resultado");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Receber os dados do formulário
    const nome = document.querySelector("#nome").value.trim();

    const peso = Number(document.querySelector("#peso").value);

    const altura = Number(document.querySelector("#altura").value);

    // Validar os dados
    if (nome === "") {
        alert("Informe o nome do paciente!");
        return;
    }

    if (peso <= 0 || altura <= 0) {
        alert("Informe um peso e uma altura válidos!");
        return;
    }

    // Calcular o IMC
    const imc = peso / (altura * altura);

    // Exibir os resultados
    document.querySelector("#resultado-nome").textContent =
        "Paciente: " + nome;

    document.querySelector("#resultado-peso").textContent =
        "Peso: " + peso.toFixed(1) + " kg";

    document.querySelector("#resultado-altura").textContent =
        "Altura: " + altura.toFixed(2) + " m";

    document.querySelector("#resultado-imc").textContent =
        "IMC: " + imc.toFixed(2);

    resultado.hidden = false;

});
