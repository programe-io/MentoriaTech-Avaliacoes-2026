// Aguarda o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
    const botao = document.getElementById('botao-clique');
    const mensagem = document.getElementById('mensagem');

    // Adiciona evento de clique ao botão
    botao.addEventListener('click', () => {
        // Mostra a mensagem tirando a classe 'escondido' e adicionando 'sucesso'
        mensagem.classList.remove('escondido');
        mensagem.classList.add('sucesso');
        
        // Desabilita o botão após o clique
        botao.textContent = "Concluído!";
        botao.style.backgroundColor = "#7f8c8d";
        botao.disabled = true;
    });
});
