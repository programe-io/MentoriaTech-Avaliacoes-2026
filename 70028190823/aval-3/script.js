
const formulario = document.getElementById("formIMC");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Receber os dados do paciente
    const nome = document.getElementById("nome").value.trim();
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);

    // Validar os dados
    if (!nome || !Number.isFinite(peso) ||
        !Number.isFinite(altura) || peso <= 0 || altura <= 0) {

        alert("Por favor, informe todos os dados corretamente!");
        return;
    }

    // Calcular o IMC
    const imc = peso / (altura * altura);

    // Definir classificação
    let classificacao;

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
    } else if (imc < 25) {
        classificacao = "Peso normal";
    } else if (imc < 30) {
        classificacao = "Sobrepeso";
    } else if (imc < 35) {
        classificacao = "Obesidade grau I";
    } else if (imc < 40) {
        classificacao = "Obesidade grau II";
    } else {
        classificacao = "Obesidade grau III";
    }

    // Exibir informações do paciente
    document.getElementById("resNome").textContent = nome;

    document.getElementById("resPeso").textContent =
        peso.toFixed(1);

    document.getElementById("resAltura").textContent =
        altura.toFixed(2);

    document.getElementById("resIMC").textContent =
        imc.toFixed(2);

    document.getElementById("classificacao").textContent =
        classificacao;

    // Mostrar resultado
    document.getElementById("resultado").hidden = false;

});

// Limpar formulário para novo cálculo
document.getElementById("limpar").addEventListener("click", function() {

    formulario.reset();

    document.getElementById("resultado").hidden = true;

});
