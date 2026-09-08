const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");
const sentimentoPrincipal = document.getElementById("sentimentoPrincipal");
const pontuacoes = document.getElementById("pontuacoes");

formulario.addEventListener("submit", function(event) {

```
event.preventDefault();

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

const respostas = {};

// Verificar se todas as perguntas foram respondidas
for (let i = 1; i <= 24; i++) {

    const resposta = document.querySelector(
        `input[name="q${i}"]:checked`
    );

    if (!resposta) {
        alert("⚠️ Responda todas as perguntas antes de enviar!");
        return;
    }

    respostas[i] = Number(resposta.value);
}

// Calcular pontuações
const resultados = {};

for (let sentimento in sentimentos) {

    let total = 0;

    sentimentos[sentimento].forEach(function(pergunta) {
        total += respostas[pergunta];
    });

    resultados[sentimento] = total;
}

// Encontrar o sentimento predominante
let sentimentoMaior = "";
let maiorPontuacao = 0;

for (let sentimento in resultados) {

    if (resultados[sentimento] > maiorPontuacao) {
        maiorPontuacao = resultados[sentimento];
        sentimentoMaior = sentimento;
    }
}

// Resumo da personalidade
let resumo = "";

if (sentimentoMaior.includes("Alegria")) {
    resumo = "Você é uma pessoa alegre, positiva e gosta de aproveitar os bons momentos da vida.";
}

else if (sentimentoMaior.includes("Tristeza")) {
    resumo = "Você é uma pessoa sensível, reflexiva e costuma sentir as situações de maneira intensa.";
}

else if (sentimentoMaior.includes("Amor")) {
    resumo = "Você é uma pessoa carinhosa, afetiva e valoriza muito as pessoas que fazem parte da sua vida.";
}

else if (sentimentoMaior.includes("Raiva")) {
    resumo = "Você possui emoções intensas, é direto(a) e costuma demonstrar quando alguma situação incomoda você.";
}

else if (sentimentoMaior.includes("Medo")) {
    resumo = "Você é uma pessoa cuidadosa, observadora e costuma analisar os riscos antes de tomar decisões.";
}

else if (sentimentoMaior.includes("Tranquilidade")) {
    resumo = "Você é uma pessoa calma, equilibrada e prefere resolver os problemas com paciência.";
}

else if (sentimentoMaior.includes("Confiança")) {
    resumo = "Você é uma pessoa determinada, segura de si e acredita na própria capacidade de superar desafios.";
}

else if (sentimentoMaior.includes("Empatia")) {
    resumo = "Você é uma pessoa compreensiva, atenciosa e costuma se preocupar com os sentimentos das outras pessoas.";
}

// Mostrar sentimento predominante e resumo
sentimentoPrincipal.innerHTML = `
    <p>❤️ <strong>${sentimentoMaior}</strong></p>

    <p>
        Seu sentimento que prevalece possui
        <strong>${maiorPontuacao}/15</strong> pontos.
    </p>

    <div class="resumo">
        <h3>🧠 Resumo da sua personalidade</h3>
        <p>${resumo}</p>
    </div>
`;

// Limpar pontuações anteriores
pontuacoes.innerHTML = `
    <h3>📊 Escala dos sentimentos</h3>
`;

// Mostrar escala de todos os sentimentos
for (let sentimento in resultados) {

    const pontos = resultados[sentimento];

    const porcentagem = (pontos / 15) * 100;

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

// Mostrar resultado
resultado.style.display = "block";

// Ir até o resultado
resultado.scrollIntoView({
    behavior: "smooth"
});
```

});
