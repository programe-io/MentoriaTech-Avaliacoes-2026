
/* ============================= */
/* MENTORIA TECH - JAVASCRIPT */
/* ============================= */

// Seleciona todas as perguntas
const perguntas = document.querySelectorAll(".pergunta");

// Percorre todas as perguntas
perguntas.forEach((pergunta) => {

    // Seleciona o título
    const titulo = pergunta.querySelector("h3");

    // Seleciona a resposta
    const resposta = pergunta.querySelector("p");

    // Esconde a resposta inicialmente
    resposta.style.display = "none";

    // Adiciona um indicador visual de clique
    titulo.style.cursor = "pointer";

    // Evento de clique na pergunta
    titulo.addEventListener("click", () => {

        // Verifica se a resposta está fechada
        const estaFechada = resposta.style.display === "none";

        // Fecha todas as respostas
        perguntas.forEach((outraPergunta) => {

            const outroTitulo = outraPergunta.querySelector("h3");
            const outraResposta = outraPergunta.querySelector("p");

            outraResposta.style.display = "none";
            outroTitulo.style.color = "#25d9c2";

        });

        // Se estava fechada, abre a resposta selecionada
        if (estaFechada) {

            resposta.style.display = "block";
            titulo.style.color = "#ffffff";

        }

    });

});

// Mensagem de inicialização
console.log("Mentoria Tech carregada com sucesso!");

console.log("15 perguntas disponíveis para estudo.");

// Mensagem de boas-vindas
window.addEventListener("load", () => {
    console.log("Bem-vindo ao projeto Mentoria Tech!");
});
