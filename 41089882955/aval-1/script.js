document.addEventListener("DOMContentLoaded", () => {
    const botoes = document.querySelectorAll(".btn-leia-mais");

    botoes.forEach((botao) => {
        botao.addEventListener("click", (evento) => {
            const tituloPost = evento.target.parentElement.querySelector("h2").innerText;
            alert(`Você clicou para ler mais sobre: "${tituloPost}". Esta página de conteúdo completo será criada em breve!`);
        });
    });
});