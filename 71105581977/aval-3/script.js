
const formulario = document.getElementById("formIMC");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    // Receber os dados do paciente
    const nome = document.getElementById("nome").value.trim();
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);

    // Validar informações
    if (nome === "" || peso <= 0 || altura <= 0) {
        alert("Preencha todos os dados corretamente!");
        return;
    }

    // Calcular o IMC
    const imc = peso / (altura * altura);

    // Classificar o IMC
    let classificacao;

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
    } else if (imc < 25) {
        classificacao = "Peso normal";
    } else if (imc < 30) {
        classificacao = "Sobrepeso";
    } else {
        classificacao = "Obesidade";
    }

    // Exibir informações
    document.getElementById("nomePaciente").textContent = nome;

    document.getElementById("imcPaciente").textContent =
        imc.toFixed(2);

    document.getElementById("classificacao").textContent =
        classificacao;

    document.getElementById("mensagem").innerHTML = `
        <strong>Paciente:</strong> ${nome}<br>
        <strong>Peso:</strong> ${peso} kg<br>
        <strong>Altura:</strong> ${altura} m<br>
        <strong>IMC:</strong> ${imc.toFixed(2)}<br>
        <strong>Classificação:</strong> ${classificacao}
    `;
});
