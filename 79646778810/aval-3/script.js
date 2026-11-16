// Seleciona o botão e o parágrafo pelo ID
const botao = document.getElementById('meuBotao');
const mensagem = document.getElementById('mensagem');

// Adiciona um evento de clique ao botão
botao.addEventListener('click', function() {
    mensagem.textContent = 'Você clicou no botão! O JavaScript funcionou com sucesso.';
        mensagem.style.color = '#28a745';
            mensagem.style.fontWeight = 'bold';
            });
            