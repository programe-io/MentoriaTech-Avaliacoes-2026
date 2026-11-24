
const formulario = document.getElementById("formIMC");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Receber os dados do paciente
    let nome = document.getElementById("nome").value;
    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("altura").value);

    // Verificar os dados
    if (nome.trim() === "" || peso <= 0 || altura <= 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Calcular o IMC
    let imc = peso / (altura * altura);

    // Exibir resultado
    let resultado = document.getElementById("resultado");

    resultado.style.display = "block";

    resultado.innerHTML = `
        <h3>Resultado do paciente</h3>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Peso:</strong> ${peso} kg</p>
        <p><strong>Altura:</strong> ${altura} m</p>
        <p><strong>IMC calculado:</strong> ${imc.toFixed(2)}</p>
        <p>Para interpretar o resultado em adolescentes,
        é necessário considerar a idade e o sexo,
        com avaliação adequada de saúde.</p>
    `;

});
