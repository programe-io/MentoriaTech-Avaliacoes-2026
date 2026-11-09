
// MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", () => {
    console.log("Página carregada com sucesso!");

    alert("Bem-vindo ao projeto: Combate à Desinformação!");
});

// INTERAÇÃO DO BOTÃO
function responder() {
    const mensagem = document.getElementById("mensagem");

    mensagem.innerHTML =
        "Excelente! Verificar as fontes é essencial para combater as notícias falsas.";

    mensagem.style.color = "#38bdf8";
    mensagem.style.fontWeight = "bold";
}

// QUIZ INTERATIVO
function verificarResposta(resposta) {
    const resultado = document.getElementById("resultado");

    if (resposta === "correta") {
        resultado.innerHTML =
            "✅ Parabéns! Você sabe identificar a importância da informação verdadeira.";

        resultado.style.color = "#22c55e";
    } else {
        resultado.innerHTML =
            "❌ Cuidado! Sempre verifique a fonte antes de compartilhar.";

        resultado.style.color = "#ef4444";
    }
}

// ANIMAÇÃO DOS CARTÕES
const cartoes = document.querySelectorAll(".card");

cartoes.forEach((cartao, indice) => {
    cartao.style.animationDelay = `${indice * 0.3}s`;

    cartao.addEventListener("mouseenter", () => {
        cartao.style.transform = "scale(1.03)";
    });

    cartao.addEventListener("mouseleave", () => {
        cartao.style.transform = "scale(1)";
    });
});

// DATA AUTOMÁTICA NO RODAPÉ
const ano = new Date().getFullYear();

const rodape = document.querySelector("footer");

if (rodape) {
    rodape.innerHTML += `<p>Projeto educativo © ${ano}</p>`;
}
