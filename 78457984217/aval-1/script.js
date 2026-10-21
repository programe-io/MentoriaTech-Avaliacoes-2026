// Seleciona os elementos da página pelo ID ou classe
const botao = document.getElementById('meuBotao');
const mensagem = document.getElementById('minhaMensagem');

// Adiciona um "ouvinte de evento" para o clique no botão
botao.addEventListener('click', function() {
    // Altera o texto do parágrafo quando o botão for clicado
        mensagem.textContent = 'Você clicou no botão! O JavaScript está funcionando.';
            
                // Altera a cor do texto para dar um feedback visual
                    mensagem.style.color = '#007bff';
                    });
                    