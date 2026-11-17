
document.addEventListener("DOMContentLoaded", function () {

    // LOCALIZAR OS ELEMENTOS DO HTML

    const formulario = document.getElementById("formulario");

    const resultado = document.getElementById("resultado");

    const mensagem = document.getElementById("mensagem");

    const valorIMC = document.getElementById("valorIMC");

    const classificacao = document.getElementById("classificacao");

    const orientacao = document.getElementById("orientacao");


    // BOTÃO REVELAR IMC

    formulario.addEventListener("submit", function (event) {

        event.preventDefault();

        // RECEBER DADOS DO PACIENTE

        const nome = document.getElementById("nome").value.trim();

        const peso = Number(document.getElementById("peso").value);

        const altura = Number(document.getElementById("altura").value);


        // VALIDAR INFORMAÇÕES

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


        // CALCULAR IMC

        const imc = peso / (altura * altura);


        // VARIÁVEIS DE CLASSIFICAÇÃO

        let faixa = "";

        let mensagemSaude = "";


        // VERIFICAR CLASSIFICAÇÃO DO IMC

        if (imc < 18.5) {

            faixa = "Abaixo do peso";

            mensagemSaude =
                "Seu IMC está abaixo da faixa de referência para adultos. Considere procurar orientação profissional.";

        }

        else if (imc < 25) {

            faixa = "Peso adequado";

            mensagemSaude =
                "Seu IMC está na faixa de referência para adultos. Continue cuidando da sua saúde e bem-estar!";

        }

        else if (imc < 30) {

            faixa = "Sobrepeso";

            mensagemSaude =
                "Seu IMC está acima da faixa de referência. Uma avaliação profissional pode ajudar a compreender melhor sua saúde.";

        }

        else if (imc < 35) {

            faixa = "Obesidade grau I";

            mensagemSaude =
                "É importante procurar orientação de um profissional de saúde para uma avaliação individualizada.";

        }

        else if (imc < 40) {

            faixa = "Obesidade grau II";

            mensagemSaude =
                "Procure acompanhamento profissional para avaliar sua saúde e receber orientações adequadas.";

        }

        else {

            faixa = "Obesidade grau III";

            mensagemSaude =
                "Seu resultado indica a importância de uma avaliação profissional individualizada.";

        }


        // MOSTRAR RESULTADO NA TELA

        mensagem.textContent =
            "Aprendiz " + nome + ", seu registro foi revelado!";

        valorIMC.textContent =
            imc.toFixed(2);

        classificacao.textContent =
            faixa;

        orientacao.textContent =
            mensagemSaude;


        // REMOVER A CLASSE QUE ESCONDE O RESULTADO

        resultado.classList.remove("oculto");


        // LEVAR A TELA ATÉ O RESULTADO

        resultado.scrollIntoView({

            behavior: "smooth",

            block: "center"

        });

    });


    // BOTÃO LIMPAR

    formulario.addEventListener("reset", function () {

        resultado.classList.add("oculto");

    });

});
