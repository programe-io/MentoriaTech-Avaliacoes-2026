// Função que alterna a classe "dark-mode" no corpo da página
function alternarTema() {
    const body = document.body;
    const botao = document.getElementById('btn-tema');

    // Liga/Desliga a classe .dark-mode no HTML
    body.classList.toggle('dark-mode');

    // Altera o texto do botão para combinar com o modo ativo
    if (body.classList.contains('dark-mode')) {
        botao.innerText = "Modo Claro ☀️";
    } else {
        botao.innerText = "Mudar Tema 🌙";
    }
}