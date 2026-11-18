const formulario = document.getElementById("imcForm");

const resultado = document.getElementById("resultado");
const valorIMC = document.getElementById("imcValue");
const titulo = document.getElementById("resultTitle");
const descricao = document.getElementById("resultDescription");
const emoji = document.getElementById("resultEmoji");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Capturando os valores
    const idade = Number(document.getElementById("idade").value);
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);

    // Validando os dados
    if (
        !Number.isFinite(idade) ||
        !Number.isFinite(peso) ||
        !Number.isFinite(altura) ||
        idade < 1 ||
        idade > 120 ||
        peso <= 0 ||
        altura < 0.5 ||
        altura > 2.8
    ) {
        alert("Por favor, preencha os campos com valores válidos.");
        return;
    }

    // Calculando o IMC
    const imc = peso / (altura * altura);

    // Exibindo o resultado
    resultado.classList.remove("hidden");

    if (idade < 20) {

        valorIMC.textContent = imc.toFixed(1);

        titulo.textContent = "Seu resultado precisa de uma avaliação especial!";

        emoji.textContent = "🌱";

        descricao.textContent =
            "Na infância e adolescência, o IMC deve ser interpretado considerando a idade e o sexo, utilizando curvas de crescimento. Por isso, este resultado não pode ser classificado pelas faixas de adultos. Converse com um profissional de saúde para uma avaliação adequada.";

    } else {

        valorIMC.textContent = imc.toFixed(1);

        emoji.textContent = "🌟";

        if (imc < 18.5) {

            titulo.textContent = "Abaixo da faixa de referência";

            emoji.textContent = "🌱";

            descricao.textContent =
                "Seu IMC está abaixo da faixa de referência para adultos. Esse resultado sozinho não determina seu estado de saúde. Um profissional pode ajudar a avaliar seu contexto individual.";

        } else if (imc < 25) {

            titulo.textContent = "Faixa de referência";

            emoji.textContent = "🌻";

            descricao.textContent =
                "Seu IMC está dentro da faixa de referência para adultos. Lembre-se: o IMC é apenas um indicador e não avalia todos os aspectos da saúde.";

        } else if (imc < 30) {

            titulo.textContent = "Acima da faixa de referência";

            emoji.textContent = "🌿";

            descricao.textContent =
                "Seu IMC está acima da faixa de referência para adultos. Isso não significa necessariamente um problema de saúde. Uma avaliação individual pode trazer informações mais completas.";

        } else {

            titulo.textContent = "IMC elevado";

            emoji.textContent = "💚";

            descricao.textContent =
                "Seu IMC está na faixa de obesidade segundo a classificação para adultos. O resultado não é um diagnóstico. Procure orientação de um profissional de saúde para uma avaliação individual.";

        }

    }

    // Leva o usuário até o resultado
    resultado.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });

});
