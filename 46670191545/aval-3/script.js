/* ==========================================================================
   11. INTERAÇÕES VISUAIS E FINALIZAÇÃO (JAVASCRIPT)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Monitora e configura todos os posts que já vieram prontos no HTML
    const postsIniciais = document.querySelectorAll('.post');
    postsIniciais.forEach(post => {
        configurarPost(post);
    });

    // 2. Ativa o botão de criar novas postagens
    inicializarNovaPublicacao();
});

/* ==========================================================================
   FUNÇÃO CENTRAL DE CONFIGURAÇÃO (CURTIR E COMENTAR)
   ========================================================================== */
function configurarPost(post) {
    
    // ----------------------------------------------------------------------
    // A. GERENCIAMENTO DE CURTIDAS (LIKE)
    // ----------------------------------------------------------------------
    const botaoCurtir = post.querySelector('.post-actions .btn-action:first-child');
    let curtido = false;
    
    botaoCurtir.innerHTML = `👍 Curtir`;

    botaoCurtir.addEventListener('click', () => {
        curtido = !curtido;
        
        if (curtido) {
            botaoCurtir.style.color = '#1877f2'; // Azul de destaque
            botaoCurtir.innerHTML = `<strong>👍 Curtido</strong>`;
        } else {
            botaoCurtir.style.color = '#65676b'; // Cinza original
            botaoCurtir.innerHTML = `👍 Curtir`;
        }
    });

    // ----------------------------------------------------------------------
    // B. SISTEMA DE COMENTÁRIOS DINDÂMICOS
    // ----------------------------------------------------------------------
    const botaoComentar = post.querySelector('.post-actions .btn-action:last-child');
    botaoComentar.innerHTML = `💬 Comentar`;

    // Cria a caixa container que guardará a lista de comentários
    const areaComentarios = document.createElement('div');
    areaComentarios.className = 'post-comments-container';
    areaComentarios.style.display = 'none'; // Começa oculta
    areaComentarios.style.paddingTop = '0.8rem';
    areaComentarios.style.borderTop = '1px solid #e4e6eb';
    areaComentarios.style.marginTop = '0.5rem';

    // Cria o campo de entrada para o usuário digitar
    const campoTexto = document.createElement('input');
    campoTexto.type = 'text';
    campoTexto.placeholder = 'Escreva um comentário e aperte Enter...';
    campoTexto.style.width = '100%';
    campoTexto.style.padding = '0.5rem 0.8rem';
    campoTexto.style.border = '1px solid #bdc3c7';
    campoTexto.style.borderRadius = '20px';
    campoTexto.style.backgroundColor = '#f0f2f5';
    campoTexto.style.outline = 'none';

    // Monta a estrutura injetando os elementos dentro do artigo do post
    areaComentarios.appendChild(campoTexto);
    post.appendChild(areaComentarios);

    // Alterna a exibição da barra de comentários ao clicar no botão
    botaoComentar.addEventListener('click', () => {
        if (areaComentarios.style.display === 'none') {
            areaComentarios.style.display = 'block';
            campoTexto.focus(); // Coloca o cursor automaticamente na caixa
        } else {
            areaComentarios.style.display = 'none';
        }
    });

    // Escuta o teclado para enviar o comentário ao pressionar a tecla "Enter"
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
            campoTexto.value = ''; // Reseta o campo de texto
        }
    });
}

/* ==========================================================================
   3. CRIAÇÃO DE NOVA PUBLICAÇÃO (EM TEMPO REAL)
   ========================================================================== */
function inicializarNovaPublicacao() {
    const botaoPublicar = document.querySelector('.btn-publish');
    const feed = document.querySelector('.feed');

    if (botaoPublicar) {
        botaoPublicar.addEventListener('click', () => {
            // Abre uma caixa de diálogo nativa do navegador para receber o texto
            const textoDoPost = prompt('O que você está pensando?');

            // Só cria o post se o usuário digitou algo válido
            if (textoDoPost && textoDoPost.trim() !== '') {
                const novoPost = document.createElement('article');
                novoPost.className = 'post';

                // Clona a estrutura exata do card do HTML
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

                // Adiciona o novo card logo no topo do feed
                feed.insertBefore(novoPost, feed.firstChild);

                // Configura os eventos isoladamente apenas para esta nova publicação
                configurarPost(novoPost);
            }
        });
    }
}
