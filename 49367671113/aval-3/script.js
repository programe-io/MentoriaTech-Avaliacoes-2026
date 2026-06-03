document.addEventListener("DOMContentLoaded", () => {
    const botao = document.getElementById("btnMensagem");
    const mensagem = document.getElementById("mensagem");

    botao.addEventListener("click", () => {
        mensagem.innerHTML = `
            <strong>Reflexão:</strong> O livro mostra que nem sempre nossos
            planos acontecem como imaginamos, mas isso pode fazer parte de um
            propósito maior para nossas vidas.
        `;
    });
});