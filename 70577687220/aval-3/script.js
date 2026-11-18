const formulario = document.getElementById("formIMC");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Receber os dados do paciente
    const nome = document.getElementById("nome").value.trim();
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);

    // Verificar os dados
    if (!nome || !Number.isFinite(peso) ||
        !Number.isFinite(altura) || peso <= 0 || altura <= 0) {

        alert("Por favor, informe dados válidos!");
        return;
    }

    // Calcular o IMC
    const imc = peso / (altura * altura);

    // Classificar o IMC
    let classificacao = "";
    let mensagem = "";

    if (imc < 18.5) {

        classificacao = "Abaixo do peso";
        mensagem = "Seu peso está abaixo da faixa de referência.";

    } else if (imc < 25) {

        classificacao = "Peso adequado";
        mensagem = "Seu IMC está dentro da faixa de referência.";

    } else if (imc < 30) {

        classificacao = "Sobrepeso";
        mensagem = "Seu IMC está acima da faixa de referência.";

    } else if (imc < 35) {

        classificacao = "Obesidade Grau I";
        mensagem = "Seu IMC indica obesidade grau I.";

    } else if (imc < 40) {

        classificacao = "Obesidade Grau II";
        mensagem = "Seu IMC indica obesidade grau II.";

    } else {

        classificacao = "Obesidade Grau III";
        mensagem = "Seu IMC indica obesidade grau III.";

    }

    // Exibir o resultado
    const resultado = document.getElementById("resultado");

    resultado.style.display = "block";

    resultado.innerHTML = `
        <h2>Resultado do Paciente</h2>

        <p><strong>Nome:</strong> ${nome}</p>

        <p><strong>Peso:</strong> ${peso.toFixed(1)} kg</p>

        <p><strong>Altura:</strong> ${altura.toFixed(2)} m</p>

        <p><strong>IMC:</strong> ${imc.toFixed(2)}</p>

        <p><strong>Classificação:</strong> ${classificacao}</p>

        <p>${mensagem}</p>

        <button onclick="limparFormulario()">
            Novo Cálculo
        </button>
    `;

});

// Limpar os campos para um novo cálculo
function limparFormulario() {

    formulario.reset();

    document.getElementById("resultado").style.display = "none";

}