document.addEventListener('DOMContentLoaded', () => {
    const btnPublicar = document.getElementById('btn-publicar');
    const campoTextoPost = document.getElementById('texto-post');
    const feedContainer = document.getElementById('feed-container');

    // Função para criar nova publicação da Sophia
    function criarPublicacao() {
        const texto = campoTextoPost.value.trim();

        if (texto === '') {
            campoTextoPost.focus();
            return;
        }

        const novoPost = document.createElement('article');
        novoPost.classList.add('post');

        novoPost.innerHTML = `
            <div class="post-header">
                <div class="avatar">S</div>
                <div class="user-info">
                    <strong>Sophia</strong>
                    <span>agora mesmo</span>
                </div>
            </div>
            <p class="post-text"></p>
            <div class="post-actions">
                <button class="btn-curtir" type="button" data-curtidas="0">Curtir (0)</button>
                <button class="btn-comentar" type="button">Comentar</button>
            </div>
            <div class="comentarios-area"></div>
        `;

        novoPost.querySelector('.post-text').textContent = texto;
        feedContainer.prepend(novoPost);

        // Limpa a caixa de texto após publicar
        campoTextoPost.value = '';
    }

    btnPublicar.addEventListener('click', criarPublicacao);

    // Eventos dentro do feed (Curtir e Comentar)
    feedContainer.addEventListener('click', (event) => {
        const alvo = event.target;

        // 1. Botão Curtir
        if (alvo.classList.contains('btn-curtir')) {
            let curtidas = parseInt(alvo.getAttribute('data-curtidas'), 10) || 0;

            if (alvo.classList.contains('curtido')) {
                curtidas--;
                alvo.classList.remove('curtido');
            } else {
                curtidas++;
                alvo.classList.add('curtido');
            }

            alvo.setAttribute('data-curtidas', curtidas);
            alvo.textContent = `Curtir (${curtidas})`;
        }

        // 2. Botão Comentar (abre campo de digitação dentro do card)
        if (alvo.classList.contains('btn-comentar')) {
            const post = alvo.closest('.post');
            const areaComentarios = post.querySelector('.comentarios-area');

            // Evita abrir dois formulários no mesmo post
            if (areaComentarios.querySelector('.comentario-form')) {
                areaComentarios.querySelector('.comentario-input').focus();
                return;
            }

            const form = document.createElement('div');
            form.classList.add('comentario-form');
            form.innerHTML = `
                <input type="text" class="comentario-input" placeholder="Escreva um comentário como Sophia...">
                <button type="button" class="btn-enviar-comentario">Enviar</button>
            `;

            areaComentarios.prepend(form);
            form.querySelector('.comentario-input').focus();
        }

        // 3. Botão Enviar Comentário
        if (alvo.classList.contains('btn-enviar-comentario')) {
            const form = alvo.closest('.comentario-form');
            const input = form.querySelector('.comentario-input');
            const textoComentario = input.value.trim();

            if (textoComentario !== '') {
                const areaComentarios = alvo.closest('.comentarios-area');
                const item = document.createElement('div');
                item.classList.add('comentario-item');

                const autor = document.createElement('strong');
                autor.textContent = 'Sophia: ';

                item.appendChild(autor);
                item.appendChild(document.createTextNode(textoComentario));

                areaComentarios.appendChild(item);
                form.remove();
            }
        }
    });
});