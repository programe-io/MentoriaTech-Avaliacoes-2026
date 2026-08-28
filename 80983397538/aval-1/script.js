// ===============================
// AVALIAÇÃO DE DESENVOLVIMENTO WEB
// ===============================

function corrigir() {

const nome = document.getElementById("nome").value.trim();

// Verifica se o aluno informou o nome
if (nome === "") {
    alert("Por favor, informe seu nome antes de continuar!");
    document.getElementById("nome").focus();
    return;
}

// Respostas corretas
const respostas = {
    q1: "C",
    q2: "A",
    q3: "D",
    q4: "B",
    q5: "A",
    q6: "C",
    q7: "B",
    q8: "D"
};

let acertos = 0;
let respondidas = 0;

// Verifica cada questão
for (let questao in respostas) {

    const resposta =
        document.querySelector(
            'input[name="' + questao + '"]:checked'
        );

    if (resposta) {

        respondidas++;

        if (resposta.value === respostas[questao]) {
            acertos++;
        }
    }
}

// Cada questão vale 1,25 ponto
const nota = acertos * 1.25;

// Porcentagem de aproveitamento
const porcentagem = (acertos / 8) * 100;

// Mensagem de acordo com o desempenho
let mensagem;

if (acertos === 8) {
    mensagem = "🏆 Excelente! Você dominou o conteúdo!";
} 
else if (acertos >= 6) {
    mensagem = "🌟 Muito bom! Seu desempenho foi ótimo!";
} 
else if (acertos >= 4) {
    mensagem = "👍 Bom trabalho! Continue estudando.";
} 
else {
    mensagem = "📚 Você precisa revisar alguns conteúdos.";
}

// Mostra o resultado
const resultado = document.getElementById("resultado");
const mensagemHTML = document.getElementById("mensagem");

resultado.style.display = "block";

mensagemHTML.innerHTML = `
    <strong>${nome}</strong><br><br>

    <span>Questões respondidas: ${respondidas}/8</span><br>

    <span>Acertos: ${acertos}/8</span><br>

    <span>Nota: ${nota.toFixed(1)}</span><br>

    <span>Aproveitamento: ${porcentagem.toFixed(0)}%</span>

    <br><br>

    <strong>${mensagem}</strong>
`;

// Rola suavemente até o resultado
resultado.scrollIntoView({
    behavior: "smooth",
    block: "center"
});

// Desabilita o botão depois da correção
const botao = document.querySelector("button");

if (botao) {
    botao.disabled = true;
    botao.innerText = "Avaliação finalizada";
}

}