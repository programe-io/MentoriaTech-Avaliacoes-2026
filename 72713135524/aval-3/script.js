// ===================================
// MENTORIA TECH 💜💙
// ===================================

document.addEventListener("DOMContentLoaded", function () {

    // Seleciona todas as perguntas
    const perguntas = document.querySelectorAll("h3");

    perguntas.forEach(function (pergunta) {

        // Identifica a resposta logo após a pergunta
        const resposta = pergunta.nextElementSibling;

        if (!resposta || resposta.tagName !== "P") {
            return;
        }

        // Prepara a pergunta para receber cliques
        pergunta.style.cursor = "pointer";
        pergunta.setAttribute("tabindex", "0");
        pergunta.setAttribute("role", "button");
        pergunta.setAttribute("aria-expanded", "true");

        // Adiciona um indicador visual
        pergunta.textContent = "＋ " + pergunta.textContent;

        function alternarResposta() {
            const estaAberta =
                pergunta.getAttribute("aria-expanded") === "true";

            resposta.hidden = estaAberta;

            pergunta.setAttribute(
                "aria-expanded",
                String(!estaAberta)
            );

            pergunta.textContent =
                (estaAberta ? "＋ " : "− ") +
                pergunta.textContent.replace(/^[＋−]\s*/, "");
        }

        // Abre ou fecha ao clicar
        pergunta.addEventListener("click", alternarResposta);

        // Permite usar Enter ou espaço pelo teclado
        pergunta.addEventListener("keydown", function (evento) {
            if (evento.key === "Enter" || evento.key === " ") {
                evento.preventDefault();
                alternarResposta();
            }
        });
    });

    // Atualiza o ano no rodapé, se houver o elemento
    const ano = document.getElementById("ano");

    if (ano) {
        ano.textContent = new Date().getFullYear();
    }

    console.log("Mentoria Tech carregada com sucesso!");
});