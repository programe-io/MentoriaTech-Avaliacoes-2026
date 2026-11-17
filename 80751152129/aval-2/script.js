// Aguarda o carregamento completo do HTML antes de rodar o script
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Seleciona os elementos da página
    const botaoPrincipal = document.querySelector('button');
    const tituloPrincipal = document.querySelector('header h1');
    const conteudoMain = document.querySelector('main');

    // 2. Cria e adiciona um contador de cliques
    let contadorCliques = 0;

    if (botaoPrincipal) {
        // Remove o atributo onclick antigo do HTML, se existir
        botaoPrincipal.removeAttribute('onclick');

        botaoPrincipal.addEventListener('click', () => {
            contadorCliques++;
            botaoPrincipal.textContent = `Você clicou ${contadorCliques} vez(es)!`;
            
            // Muda o título após 3 cliques
            if (contadorCliques === 3) {
                tituloPrincipal.textContent = 'Você descobriu a interação com JS!';
            }
        });
    }

    // 3. Cria dinamicamente um botão para Modo Escuro (Dark Mode)
    const botaoTema = document.createElement('button');
    botaoTema.textContent = 'Alternar Modo Escuro';
    botaoTema.style.marginLeft = '10px';
    botaoTema.style.backgroundColor = '#343a40';

    let modoEscuroAtivo = false;

    botaoTema.addEventListener('click', () => {
        modoEscuroAtivo = !modoEscuroAtivo;

        if (modoEscuroAtivo) {
            document.body.style.backgroundColor = '#121212';
            document.body.style.color = '#f4f4f9';
            conteudoMain.style.backgroundColor = '#1e1e1e';
            botaoTema.textContent = 'Alternar Modo Claro';
            botaoTema.style.backgroundColor = '#6c757d';
        } else {
            document.body.style.backgroundColor = '#f4f4f9';
            document.body.style.color = '#333333';
            conteudoMain.style.backgroundColor = '#ffffff';
            botaoTema.textContent = 'Alternar Modo Escuro';
            botaoTema.style.backgroundColor = '#343a40';
        }
    });

    // Adiciona o botão de tema ao lado do botão principal
    if (conteudoMain) {
        conteudoMain.appendChild(botaoTema);
    }
});
