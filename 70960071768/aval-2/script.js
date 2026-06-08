// 1. GARANTIA DE CARREGAMENTO (Obrigatório para evitar erros de elemento nulo)
document.addEventListener("DOMContentLoaded", () => {
    console.log("Blog carregado com sucesso e pronto para interações!");

    // Chamada das funções do nosso blog
    inicializarCurtidas();
});

// 2. FUNÇÃO DE INTERATIVIDADE (Exemplo: Sistema de curtir postagens)
function inicializarCurtidas() {
    // Seleciona todos os botões de curtir da página
    const botoesCurtir = document.querySelectorAll(".btn-curtir");

    botoesCurtir.forEach(botao => {
        botao.addEventListener("click", () => {
            // Captura o contador de texto dentro do botão (ou próximo a ele)
            const contador = botao.querySelector(".contador-likes");
            
            // Converte o texto atual em número e soma +1
            let curtidasAtuais = parseInt(contador.textContent);
            curtidasAtuais++;
            
            // Atualiza a tela com o novo valor
            contador.textContent = curtidasAtuais;

            // Efeito visual simples de feedback
            botao.style.color = "#e74c3c"; // Muda a cor para vermelho
            botao.disabled = true; // Opcional: impede de curtir mais de uma vez seguida
        });
    });
}