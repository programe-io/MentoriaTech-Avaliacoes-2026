const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");

const nomeInput = document.getElementById("nome");
const pesoInput = document.getElementById("peso");
const alturaInput = document.getElementById("altura");

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nome = nomeInput.value.trim();
    const peso = Number(pesoInput.value);
    const altura = Number(alturaInput.value);

    // Validar os dados informados
    if (!nome || nome.length > 100) {
        alert("Informe um nome válido para o paciente.");
        nomeInput.focus();
        return;
    }

    if (!Number.isFinite(peso) || peso <= 0 || peso > 500) {
        alert("Informe um peso válido entre 0,1 e 500 kg.");
        pesoInput.focus();
        return;
    }

    if (
        !Number.isFinite(altura) ||
        altura <= 0 ||
        altura > 2.7
    ) {
        alert("Informe uma altura válida em metros.");
        alturaInput.focus();
        return;
    }

    // Calcular o IMC
    const imc = peso / (altura * altura);

    // Exibir os dados do paciente
    document.getElementById("resultadoNome").textContent = nome;

    document.getElementById("resultadoPeso").textContent =
        peso.toLocaleString("pt-BR") + " kg";

    document.getElementById("resultadoAltura").textContent =
        altura.toLocaleString("pt-BR") + " m";

    document.getElementById("valorIMC").textContent =
        imc.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

    // Classificação de referência para adultos
    let classificacao;
    let informacao;

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
        informacao =
            "O resultado está abaixo da faixa de referência para adultos. " +
            "Uma avaliação profissional pode ajudar a compreender o estado nutricional.";
    } else if (imc < 25) {
        classificacao = "Peso adequado";
        informacao =
            "O resultado está na faixa de referência de IMC para adultos. " +
            "O IMC, sozinho, não determina o estado geral de saúde.";
    } else if (imc < 30) {
        classificacao = "Sobrepeso";
        informacao =
            "O resultado está na faixa de sobrepeso para adultos. " +
            "Considere uma avaliação individual com um profissional de saúde.";
    } else if (imc < 35) {
        classificacao = "Obesidade grau I";
        informacao =
            "O resultado está na faixa de obesidade grau I para adultos. " +
            "Procure orientação de um profissional de saúde para uma avaliação completa.";
    } else if (imc < 40) {
        classificacao = "Obesidade grau II";
        informacao =
            "O resultado está na faixa de obesidade grau II para adultos. " +
            "É recomendada uma avaliação individual com um profissional de saúde.";
    } else {
        classificacao = "Obesidade grau III";
        informacao =
            "O resultado está na faixa de obesidade grau III para adultos. " +
            "Procure um profissional de saúde para avaliar suas necessidades individuais.";
    }

    document.getElementById("classificacao").textContent =
        classificacao;

    document.getElementById("informacaoIMC").textContent =
        informacao;

    // Mostrar o resultado na página
    resultado.hidden = false;

    // Levar o resultado para a área visível da tela
    resultado.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

// Limpar o formulário e ocultar o resultado
formulario.addEventListener("reset", function () {
    resultado.hidden = true;
});