const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");
const sentimentoPrincipal = document.getElementById("sentimentoPrincipal");
const pontuacoes = document.getElementById("pontuacoes");

formulario.addEventListener("submit", function(event) {
event.preventDefault();

```
// Lista dos sentimentos
const sentimentos = {
    "😊 Alegria": [1, 2, 3],
    "😢 Tristeza": [4, 5, 6],
    "❤️ Amor e carinho": [7, 8, 9],
    "😡 Raiva": [10, 11, 12],
    "😨 Medo": [13, 14, 15],
    "😌 Tranquilidade": [16, 17, 18],
    "😎 Confiança": [19, 20, 21],
    "🤝 Empatia": [22, 23, 24]
};

// Armazena as respostas
let respostas = {};

// Verifica todas as perguntas
for (let i = 1; i <= 24; i++) {

    let resposta = document.querySelector(
        `input[name="q${i}"]:checked`
    );

    if (!resposta) {
        alert("Por favor, responda todas as perguntas.");
        return;
    }

    respostas[i] = Number(resposta.value);
}

// Calcula a pontuação de cada sentimento
let resultados = {};

for (let sentimento in sentimentos) {

    let total = 0;

    for (let pergunta of sentimentos[sentimento]) {
        total += respostas[pergunta];
    }

    resultados[sentimento] = total;
}

// Descobre o sentimento com maior pontuação
let maiorSentimento = "";
let maiorPontuacao = 0;

for (let sentimento in resultados) {

    if (resultados[sentimento] > maiorPontuacao) {
        maiorPontuacao = resultados[sentimento];
        maiorSentimento = sentimento;
    }
}

// Mostra o resultado principal
sentimentoPrincipal.innerHTML = `
    Seu sentimento predominante é:

    <br>

    <strong>${maiorSentimento}</strong>

    <br><br>

    Pontuação:
    <strong>${maiorPontuacao}/15</strong>
`;

// Limpa os resultados anteriores
pontuacoes.innerHTML = "";

// Exibe a pontuação de todos os sentimentos
for (let sentimento in resultados) {

    let pontos = resultados[sentimento];

    let porcentagem = (pontos / 15) * 100;

    pontuacoes.innerHTML += `
        <div class="pontuacao">

            <strong>${sentimento}</strong>

            <span>${pontos}/15</span>

            <div class="barra">

                <div
                    class="progresso"
                    style="width: ${porcentagem}%">
                </div>

            </div>

        </div>
    `;
}

// Exibe a área de resultado
resultado.style.display = "block";

// Leva a tela até o resultado
resultado.scrollIntoView({
    behavior: "smooth"
});
```

});
