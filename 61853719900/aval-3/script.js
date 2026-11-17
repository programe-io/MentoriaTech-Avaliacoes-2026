document.querySelectorAll('.btn-like').forEach(botao => {

    botao.addEventListener('click', function () {

        const icone = this.querySelector('i');
        const postagem = this.closest('article');
        const contador = postagem.querySelector('.likes-count');

        let curtidas = Number(contador.dataset.likes);

        if (this.classList.contains('liked')) {

            curtidas--;

            this.classList.remove('liked');
            icone.classList.replace('bxs-heart', 'bx-heart');
            icone.style.color = '';

        } else {

            curtidas++;

            this.classList.add('liked');
            icone.classList.replace('bx-heart', 'bxs-heart');
            icone.style.color = '#ed4956';

        }

        contador.dataset.likes = curtidas;
        contador.textContent = curtidas.toLocaleString('pt-BR') + ' curtidas';

    });

});


// 2. SALVAR PUBLICAÇÃO

document.querySelectorAll('.btn-save').forEach(botao => {

    botao.addEventListener('click', function () {

        const icone = this.querySelector('i');

        if (this.classList.contains('saved')) {

            this.classList.remove('saved');
            icone.classList.replace('bxs-bookmark', 'bx-bookmark');

        } else {

            this.classList.add('saved');
            icone.classList.replace('bx-bookmark', 'bxs-bookmark');

        }

    });

});


// 3. SEGUIR USUÁRIOS

document.querySelectorAll('.btn-follow').forEach(botao => {

    botao.addEventListener('click', function () {

        if (this.textContent.trim() === 'Seguir') {

            this.textContent = 'Seguindo';
            this.style.color = '#6b7280';

        } else {

            this.textContent = 'Seguir';
            this.style.color = '#3b82f6';

        }

    });

});


// 4. MOSTRAR COMENTÁRIOS

document.querySelectorAll('.btn-comments').forEach(botao => {

    botao.addEventListener('click', function () {

        const postagem = this.closest('article');

        const area = postagem.querySelector('.comments-area');

        area.classList.toggle('hidden');

    });

});


// 5. ADICIONAR COMENTÁRIOS

document.querySelectorAll('.comment-form').forEach(formulario => {

    formulario.addEventListener('submit', function (evento) {

        evento.preventDefault();

        const postagem = this.closest('article');

        const campo = this.querySelector('input');

        const lista = postagem.querySelector('.comments-list');

        const texto = campo.value.trim();

        if (texto === '') return;

        const comentario = document.createElement('p');

        comentario.className = 'text-sm mt-2';

        const usuario = document.createElement('strong');

        usuario.textContent = 'Você ';

        comentario.appendChild(usuario);
        comentario.appendChild(document.createTextNode(texto));

        lista.appendChild(comentario);

        campo.value = '';

    });

});


// 6. BOTÃO SEU STORY

document.querySelectorAll('.btn-story').forEach(botao => {

    botao.addEventListener('click', function () {

        alert('Área de adicionar story!');

    });

});


// 7. MENU DE OPÇÕES

document.querySelectorAll('.btn-options').forEach(botao => {

    botao.addEventListener('click', function () {

        alert('Opções da publicação');

    });

});


// 8. PESQUISA

const campoPesquisa = document.querySelector('.search-input');

if (campoPesquisa) {

    campoPesquisa.addEventListener('input', function () {

        const pesquisa = this.value.toLowerCase();

        document.querySelectorAll('article').forEach(postagem => {

            const conteudo = postagem.textContent.toLowerCase();

            postagem.style.display =
                conteudo.includes(pesquisa) ? '' : 'none';

        });

    });

}


// 9. BOTÃO DE COMPARTILHAR

document.querySelectorAll('.btn-share').forEach(botao => {

    botao.addEventListener('click', async function () {

        const postagem = this.closest('article');

        const texto = postagem.querySelector('.description').textContent;

        if (navigator.share) {

            try {

                await navigator.share({
                    title: 'Publicação do Instagram',
                    text: texto
                });

            } catch (erro) {

                console.log('Compartilhamento cancelado.');

            }

        } else {

            alert('Compartilhamento não disponível neste navegador.');

        }

    });

});


// ==========================================
// FIM DO JAVASCRIPT
// ==========================================
