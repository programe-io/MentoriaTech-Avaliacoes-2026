
const formulario = document.getElementById("formIMC");

// Calcular o IMC
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    // Receber os dados
    const nome = document.getElementById("nome").value.trim();
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);

    // Validar os dados
    if (
        nome === "" ||
        !Number.isFinite(peso) ||
        !Number.isFinite(altura) ||
        peso <= 0 ||
        altura <= 0
    ) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Calcular IMC
    const imc = peso / (altura * altura);

    // Exibir informações
    document.getElementById("nomePaciente").textContent = nome;

    document.getElementById("imcPaciente").textContent =
        imc.toFixed(2);

    document.getElementById("statusCalculo").textContent =
        "Concluído";

    document.getElementById("mensagem").innerHTML = `
        <strong>Nome do paciente:</strong> ${nome}<br>
        <strong>Peso informado:</strong> ${peso} kg<br>
        <strong>Altura informada:</strong> ${altura} m<br>
        <strong>Fórmula:</strong> peso ÷ (altura × altura)<br>
        <strong>Resultado do IMC:</strong> ${imc.toFixed(2)}<br><br>
        O cálculo foi realizado com sucesso.
        A interpretação do IMC depende da idade e de avaliação adequada.
    `;
});
