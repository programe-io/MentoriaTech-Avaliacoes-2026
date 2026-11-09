/**
 * Altera a identidade visual do blog aplicando classes de tema baseadas
 * nos icônicos personagens da Turma da Mônica.
 * @param {string} nomePersonagem - O nome do personagem escolhido ('monica', 'cebolinha', etc)
 */
function mudarTema(nomePersonagem) {
    // Captura o elemento body do documento
    const corpoPagina = document.body;
    
    // Lista de todas as classes de temas disponíveis
    const temasDisponiveis = ['tema-monica', 'tema-cebolinha', 'tema-magali', 'tema-cascao'];
    
    // Remove qualquer classe de tema ativa anteriormente
    temasDisponiveis.forEach(tema => {
        corpoPagina.classList.remove(tema);
    });
    
    // Adiciona a nova classe correspondente ao personagem selecionado
    corpoPagina.classList.add(`tema-${nomePersonagem}`);
    
    // Atualiza o estado visual dos botões seletores
    const botoes = document.querySelectorAll('.btn-personagem');
    botoes.forEach(botao => {
        botao.classList.remove('active');
    });
    
    // Marca o botão clicado como ativo
    const botaoAtivo = document.querySelector(`.btn-personagem.${nomePersonagem}`);
    if (botaoAtivo) {
        botaoAtivo.classList.add('active');
    }
}

// Pequena surpresa: Se o leitor clicar no painel do sumário, 
// a página emite um log simulando um easter egg do gibi!
document.querySelector('.sidebar-gibi').addEventListener('click', function() {
    console.log("Ei! Não pule as páginas do Almanaque! Leia tudo na ordem! 😉");
});
