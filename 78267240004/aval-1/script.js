// Pegar elementos da página
const botao = document.getElementById('meuBotao');
const mensagem = document.getElementById('mensagem');

// Evento de clique no botão
botao.addEventListener('click', function() {
    mensagem.textContent = 'Você clicou no botão! 🎉';
        mensagem.style.color = '#2f855a';
            mensagem.style.fontWeight = 'bold';
            });
            