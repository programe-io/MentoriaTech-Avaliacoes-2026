const formulario = document.getElementById("formIMC");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);

    if (!nome || !Number.isFinite(peso) ||
        !Number.isFinite(altura) || peso <= 0 || altura <= 0) {
        alert("Por favor, informe dados válidos!");
        return;
    }

    // Cálculo do IMC
    const imc = peso / (altura * altura);

    let classificacao = "";

    // Classificação do IMC para adultos
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

    // Exibição do resultado
    document.getElementById("resultado").innerHTML = `
        <h2>Resultado do IMC</h2>
        <p><strong>Paciente:</strong> ${nome.replace(/[&<>"']/g, "")}</p>
        <p><strong>Peso:</strong> ${peso} kg</p>
        <p><strong>Altura:</strong> ${altura} m</p>
        <p><strong>IMC:</strong> ${imc.toFixed(2)}</p>
        <h3>${classificacao}</h3>
        <p>Resultado calculado com sucesso!</p>
    `;
});