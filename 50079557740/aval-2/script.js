// Seleciona os elementos principais da página
const btnPublicar = document.querySelector('.new-post button');
const main = document.querySelector('main');

// 1. Funcionalidade de criar nova postagem
btnPublicar.addEventListener('click', () => {
    const texto = prompt('O que você está pensando sobre a PBR, Gustavo?');
    
    // Só publica se o usuário digitar algo válido
    if (texto && texto.trim() !== '') {
        const novoPost = document.createElement('article');
        novoPost.classList.add('post');

        novoPost.innerHTML = `
            <div class="post-header">
                <div class="avatar">GL</div>
                <div>
                    <strong>Gustavo Lopes</strong>
                    <span>agora mesmo</span>
                </div>
            </div>
            <div class="post-text">
                <p>${texto}</p>
            </div>
            <div class="post-actions">
                <button class="btn-curtir">Curtir</button>
                <button class="btn-comentar">Comentar</button>
            </div>
        `;

        // Insere a nova postagem logo abaixo da área de "Nova Publicação"
        const secaoNovaPostagem = document.querySelector('.new-post');
        secaoNovaPostagem.insertAdjacentElement('afterend', novoPost);
    }
});

// 2. Funcionalidade de Curtir e Comentar (funciona também para posts novos)
main.addEventListener('click', (event) => {
    const elementoClicado = event.target;

    // Ação do botão Curtir
    if (elementoClicado.tagName === 'BUTTON' && elementoClicado.textContent.includes('Curtir')) {
        elementoClicado.classList.toggle('curtido');
        
        if (elementoClicado.classList.contains('curtido')) {
            elementoClicado.textContent = 'Curtido ❤️';
        } else {
            elementoClicado.textContent = 'Curtir';
        }
    }

    // Ação do botão Comentar
    if (elementoClicado.tagName === 'BUTTON' && elementoClicado.textContent === 'Comentar') {
        const comentario = prompt('Digite seu comentário:');
        
        if (comentario && comentario.trim() !== '') {
            const postAtual = elementoClicado.closest('.post');
            const pComentario = document.createElement('p');
            pComentario.style.marginTop = '12px';
            pComentario.style.fontSize = '14px';
            pComentario.style.color = '#ff6666';
            pComentario.innerHTML = `<strong>Gustavo Lopes:</strong> ${comentario}`;
            
            postAtual.appendChild(pComentario);
        }
    }
});