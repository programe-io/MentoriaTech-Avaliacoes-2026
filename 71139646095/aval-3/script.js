
const formulario = document.getElementById("formIMC");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);

    if (nome.length < 2) {
        alert("Digite um nome válido.");
        return;
    }

    if (peso <= 0 || altura <= 0 ||
        !Number.isFinite(peso) || !Number.isFinite(altura)) {
        alert("Informe um peso e uma altura válidos.");
        return;
    }

    // Cálculo do IMC
    const imc = peso / (altura * altura);

    let classificacao;

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
    } else if (imc < 25) {
        classificacao = "Peso adequado";
    } else if (imc < 30) {
        classificacao = "Sobrepeso";
    } else if (imc < 35) {
        classificacao = "Obesidade grau I";
    } else if (imc < 40) {
        classificacao = "Obesidade grau II";
    } else {
        classificacao = "Obesidade grau III";
    }

    // Exibir resultado
    resultado.style.display = "block";

    resultado.innerHTML = `
        <h2>Resultado do IMC</h2>

        <p><strong>Paciente:</strong> ${nome.replace(/[&<>"']/g, "")}</p>

        <p><strong>Peso:</strong> ${peso.toFixed(1)} kg</p>

        <p><strong>Altura:</strong> ${altura.toFixed(2)} m</p>

        <p><strong>IMC:</strong> ${imc.toFixed(2)}</p>

        <p><strong>Classificação:</strong> ${classificacao}</p>
    `;

});

formulario.addEventListener("reset", function() {
    resultado.style.display = "none";
    resultado.innerHTML = "";
});
