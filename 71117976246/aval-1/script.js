const botao = document.getElementById("btnMensagem");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", () => {
    mensagem.innerHTML = `
        ⚽ Minha maior motivação é continuar aprendendo,
        evoluindo no futebol, nos estudos e na tecnologia,
        buscando sempre alcançar meus objetivos!
    `;
});