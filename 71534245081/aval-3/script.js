
const formulario = document.getElementById("formIMC");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Receber os dados do paciente
    const nome = document.getElementById("nome").value.trim();
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);

    // Validar os dados
    if (nome === "" || peso <= 0 || altura <= 0 ||
        !Number.isFinite(peso) || !Number.isFinite(altura)) {

        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Calcular o IMC
    const imc = peso / (altura * altura);

    // Classificar o IMC
    let classificacao = "";
    let informacao = "";

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
        informacao = "O resultado indica peso abaixo da faixa de referência.";
    }
    else if (imc < 25) {
        classificacao = "Peso adequado";
        informacao = "O resultado está na faixa de referência.";
    }
    else if (imc < 30) {
        classificacao = "Sobrepeso";
        informacao = "O resultado indica peso acima da faixa de referência.";
    }
    else if (imc < 35) {
        classificacao = "Obesidade grau I";
        informacao = "O resultado indica obesidade grau I.";
    }
    else if (imc < 40) {
        classificacao = "Obesidade grau II";
        informacao = "O resultado indica obesidade grau II.";
    }
    else {
        classificacao = "Obesidade grau III";
        informacao = "O resultado indica obesidade grau III.";
    }

    // Exibir os resultados na tela
    document.getElementById("resultadoNome").textContent =
        "Paciente: " + nome;

    document.getElementById("resultadoPeso").textContent =
        "Peso: " + peso + " kg";

    document.getElementById("resultadoAltura").textContent =
        "Altura: " + altura + " m";

    document.getElementById("valorIMC").textContent =
        "IMC: " + imc.toFixed(2);

    document.getElementById("classificacao").textContent =
        "Classificação: " + classificacao;

    document.getElementById("informacao").textContent =
        informacao;

    document.getElementById("resultado").hidden = false;

});


// Limpar os campos
function limparFormulario() {

    formulario.reset();

    document.getElementById("resultado").hidden = true;

}
