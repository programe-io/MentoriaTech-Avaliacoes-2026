
const peso = document.getElementById("peso");
const altura = document.getElementById("altura");
const idade = document.getElementById("idade");
const sexo = document.getElementById("sexo");

const resultado = document.getElementById("resultado");
const valor = document.getElementById("valor");
const classificacao = document.getElementById("classificacao");
const mensagem = document.getElementById("mensagem");
const progresso = document.getElementById("progresso");

document.getElementById("calcular")
    .addEventListener("click", calcularIMC);

document.getElementById("limpar")
    .addEventListener("click", limpar);

function calcularIMC() {

    const p = Number(peso.value);
    const a = Number(altura.value);
    const i = Number(idade.value);
    const s = sexo.value;

    if (
        !peso.value || !altura.value || !idade.value || !s ||
        !Number.isFinite(p) || !Number.isFinite(a) ||
        !Number.isFinite(i) ||
        p <= 0 || a <= 0 || i <= 0 ||
        p > 500 || a > 3 || i > 120
    ) {
        alert("Preencha todos os campos com valores válidos!");
        return;
    }

    const imc = p / (a * a);

    valor.textContent = imc.toFixed(2);

    // Classificação de referência para adultos
    if (i < 20) {
        classificacao.textContent = "Avaliação por idade";
        mensagem.textContent =
            "Para pessoas menores de 20 anos, o IMC deve ser avaliado considerando idade e sexo, por meio das curvas de crescimento.";
        progresso.style.width = "0%";

    } else {

        let categoria;
        let descricao;

        if (imc < 18.5) {
            categoria = "Abaixo do peso";
            descricao = "Abaixo da faixa de referência para adultos.";
        } else if (imc < 25) {
            categoria = "Peso adequado";
            descricao = "Dentro da faixa de referência para adultos.";
        } else if (imc < 30) {
            categoria = "Sobrepeso";
            descricao = "Acima da faixa de referência para adultos.";
        } else if (imc < 35) {
            categoria = "Obesidade grau I";
            descricao = "Procure orientação de um profissional de saúde.";
        } else if (imc < 40) {
            categoria = "Obesidade grau II";
            descricao = "Procure orientação de um profissional de saúde.";
        } else {
            categoria = "Obesidade grau III";
            descricao = "Procure orientação de um profissional de saúde.";
        }

        classificacao.textContent = categoria;
        mensagem.textContent = descricao;

        const percentual = Math.min(
            Math.max((imc / 50) * 100, 5), 100
        );

        progresso.style.width = percentual + "%";
    }

    resultado.hidden = false;

    resultado.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}

function limpar() {

    peso.value = "";
    altura.value = "";
    idade.value = "";
    sexo.value = "";

    valor.textContent = "0.00";
    classificacao.textContent = "";
    mensagem.textContent = "";
    progresso.style.width = "0%";

    resultado.hidden = true;

    peso.focus();
}