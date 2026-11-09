/* ==========================================================================
   11. INTERAÇÕES VISUAIS E FINALIZAÇÃO (JAVASCRIPT)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    inicializarCurtidas();
    inicializarComentarios();
    inicializarNovaPublicacao();
});

/* ==========================================================================
   1. GERENCIAMENTO DE CURTIDAS
   ========================================================================== */
function inicializarCurtidas() {
    // Seleciona o primeiro botão (Curtir) dentro da área de ações de cada post
    const botoesCurtir = document.querySelectorAll('.post-actions .btn-action:first-child');

    botoesCurtir.forEach(botao => {
        let curtido = false;
        
        // Insere o emoji de joinha mantendo o texto original
        botao.innerHTML = `👍 Curtir`;

        botao.addEventListener('click', () => {
            curtido = !curtido;
            
            if (curtido) {
                botao.style.color = '#1877f2'; // Azul das redes sociais
                botao.innerHTML = `<strong>👍 Curtido</strong>`;
            } else {
                botao.style.color = '#65676b'; // Volta para o cinza original
                botao.innerHTML = `👍 Curtir`;
            }
        });
    });
}

/* ==========================================================================
   2. SISTEMA DE COMENTÁRIOS
   ========================================================================== */
function inicializarComentarios() {
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        // Seleciona o segundo botão (Comentar)
        const botaoComentar = post.querySelector('.post-actions .btn-action:last-child');
        botaoComentar.innerHTML = `💬 Comentar`;

        // Cria a caixa que guardará os comentários enviados
        const areaComentarios = document.createElement('div');
        areaComentarios.className = 'post-comments-container';
        areaComentarios.style.display = 'none'; // Inicialmente escondida
        areaComentarios.style.paddingTop = '0.8rem';
        areaComentarios.style.borderTop = '1px solid #e4e6eb';
        areaComentarios.style.marginTop = '0.5rem';

        // Cria o campo de texto para digitação
        const campoTexto = document.createElement('input');
        campoTexto.type = 'text';
        campoTexto.placeholder = 'Escreva um comentário...';
        campoTexto.style.width = '100%';
        campoTexto.style.padding = '0.5rem 0.8rem';
        campoTexto.style.border = '1px solid #bdc3c7';
        campoTexto.style.borderRadius = '20px';
        campoTexto.style.backgroundColor = '#f0f2f5';
        campoTexto.style.outline = 'none';

        areaComentarios.appendChild(campoTexto);
        post.appendChild(areaComentarios);

        // Alterna a exibição do campo ao clicar em Comentar
        botaoComentar.addEventListener('click', () => {
            if (areaComentarios.style.display === 'none') {
                areaComentarios.style.display = 'block';
                campoTexto.focus();
            } else {
                areaComentarios.style.display = 'none';
            }
        });

        // Evento para enviar o comentário ao pressionar "Enter"
        campoTexto.addEventListener('keypress', (evento) => {
            if (evento.key === 'Enter' && campoTexto.value.trim() !== '') {
                const caixaComentario = document.createElement('div');
                caixaComentario.style.backgroundColor = '#f0f2f5';
                caixaComentario.style.padding = '0.5rem 0.8rem';
                caixaComentario.style.borderRadius = '12px';
                caixaComentario.style.fontSize = '0.85rem';
                caixaComentario.style.marginTop = '0.5rem';
                caixaComentario.innerHTML = `<strong>Você:</strong> ${campoTexto.value}`;
                
                areaComentarios.appendChild(caixaComentario);
                campoTexto.value = ''; // Limpa a caixa
            }
        });
    });
}

/* ==========================================================================
   3. CRIAÇÃO DE NOVA PUBLICAÇÃO (DINÂMICA)
   ========================================================================== */
function inicializarNovaPublicacao() {
    const botaoPublicar = document.querySelector('.btn-publish');
    const feed = document.querySelector('.feed');

    if (botaoPublicar) {
        botaoPublicar.addEventListener('click', () => {
            // Abre uma caixa de entrada de texto no navegador
            const textoDoPost = prompt('O que você está pensando?');

            if (textoDoPost && textoDoPost.trim() !== '') {
                // Cria a estrutura exata do <article> do feed
                const novoPost = document.createElement('article');
                novoPost.className = 'post';

                novoPost.innerHTML = `
                    <div class="post-header">
                        <div class="avatar">U</div>
                        <div class="user-info">
                            <strong>Seu Nome</strong>
                            <span class="post-time">agora mesmo</span>
                        </div>
                    </div>
                    <div class="post-text">
                        <p>${textoDoPost}</p>
                    </div>
                    <div class="post-actions">
                        <button type="button" class="btn-action">Curtir</button>
                        <button type="button" class="btn-action">Comentar</button>
                    </div>
                `;

                // Insere o novo post no topo do feed
                feed.insertBefore(novoPost, feed.firstChild);

                // Re-executa as funções para aplicar os eventos nos novos botões criados
                inicializarCurtidas();
                inicializarComentarios();
            }
        });
    }
}
