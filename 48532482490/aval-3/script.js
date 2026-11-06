```javascript
// ======================================
// LEX CRIMINAL - JAVASCRIPT
// ======================================


// ALTERNAR TEMA CLARO E ESCURO

function toggleDark() {
    document.body.classList.toggle('dark');

    const ativo = document.body.classList.contains('dark');

    localStorage.setItem('lex-tema', ativo ? 'dark' : 'light');
}

// Recuperar tema salvo
if (localStorage.getItem('lex-tema') === 'dark') {
    document.body.classList.add('dark');
}


// CURTIR E DESCURTIR PUBLICAÇÕES

function likePost(button) {

    const post = button.closest('.post');
    const likes = post.querySelector('.likes');

    if (!likes.dataset.original) {
        likes.dataset.original = likes.textContent.replace(/\D/g, '');
    }

    const original = Number(likes.dataset.original);

    if (button.classList.contains('liked')) {

        button.classList.remove('liked');
        button.innerHTML = '♡';

        likes.textContent =
            (original - 1).toLocaleString('pt-BR') + ' curtidas';

    } else {

        button.classList.add('liked');
        button.innerHTML = '♥';

        likes.textContent =
            (original + 1).toLocaleString('pt-BR') + ' curtidas';

    }
}


// SALVAR PUBLICAÇÕES

function savePost(button) {

    button.classList.toggle('liked');

    if (button.classList.contains('liked')) {
        button.textContent = '▣';
        button.title = 'Publicação salva';
    } else {
        button.textContent = '♧';
        button.title = 'Salvar publicação';
    }

}


// FOCAR NO CAMPO DE COMENTÁRIO

function focusComment(button) {

    const post = button.closest('.post');

    post.querySelector('.comment-box input').focus();

}


// ADICIONAR COMENTÁRIOS

function addComment(button) {

    const input = button.previousElementSibling;
    const texto = input.value.trim();

    if (texto === '') {
        return;
    }

    const post = button.closest('.post');
    const conteudo = post.querySelector('.post-content');

    const comentario = document.createElement('p');
    comentario.className = 'caption';

    const usuario = document.createElement('strong');
    usuario.textContent = 'advogado.criminal';

    comentario.appendChild(usuario);

    comentario.appendChild(
        document.createTextNode(' ' + texto)
    );

    conteudo.appendChild(comentario);

    input.value = '';

}


// SEGUIR E DEIXAR DE SEGUIR

function follow(button) {

    if (button.textContent.trim() === 'Seguir') {

        button.textContent = 'Seguindo';

    } else {

        button.textContent = 'Seguir';

    }

}


// PUBLICAR NOVO CONTEÚDO

function publishPost() {

    const text = document.getElementById('postText');
    const imageInput = document.getElementById('imageInput');

    const texto = text.value.trim();
    const arquivo = imageInput.files[0];

    if (!texto && !arquivo) {

        alert('Escreva uma publicação ou selecione uma imagem!');

        return;
    }

    if (arquivo && !arquivo.type.startsWith('image/')) {

        alert('Selecione um arquivo de imagem válido.');

        return;
    }

    const post = document.createElement('article');

    post.className = 'post';

    // CABEÇALHO

    const header = document.createElement('div');

    header.className = 'post-header';

    header.innerHTML = `
        <img src="https://i.pravatar.cc/100?img=12">

        <div class="user-info">
            <strong>advogado.criminal</strong>
            <small>Publicação recente</small>
        </div>

        <span class="more">···</span>
    `;

    post.appendChild(header);


    // IMAGEM

    if (arquivo) {

        const image = document.createElement('img');

        image.className = 'post-image';

        image.src = URL.createObjectURL(arquivo);

        image.alt = 'Imagem da publicação';

        post.appendChild(image);

    }


    // BOTÕES DE INTERAÇÃO

    const actions = document.createElement('div');

    actions.className = 'post-actions';

    actions.innerHTML = `
        <button class="action" onclick="likePost(this)">♡</button>

        <button class="action" onclick="focusComment(this)">♧</button>

        <button class="action">➤</button>

        <button class="action save" onclick="savePost(this)">♧</button>
    `;

    post.appendChild(actions);


    // CONTEÚDO

    const content = document.createElement('div');

    content.className = 'post-content';

    const category = document.createElement('span');

    category.className = 'category';

    category.textContent = 'Direito Criminal';

    const likes = document.createElement('p');

    likes.className = 'likes';

    likes.textContent = '0 curtidas';

    const caption = document.createElement('p');

    caption.className = 'caption';

    const username = document.createElement('strong');

    username.textContent = 'advogado.criminal';

    caption.appendChild(username);

    caption.appendChild(
        document.createTextNode(' ' + texto)
    );

    const time = document.createElement('p');

    time.className = 'time';

    time.textContent = 'AGORA MESMO';

    content.append(
        category,
        likes,
        caption,
        time
    );

    post.appendChild(content);


    // CAMPO DE COMENTÁRIO

    const commentBox = document.createElement('div');

    commentBox.className = 'comment-box';

    commentBox.innerHTML = `
        <input placeholder="Adicione um comentário...">

        <button onclick="addComment(this)">
            Publicar
        </button>
    `;

    post.appendChild(commentBox);


    // INSERIR NO FEED

    const main = document.querySelector('main');

    const createPost = document.querySelector('.create-post');

    main.insertBefore(
        post,
        createPost.nextElementSibling
    );


    // LIMPAR CAMPOS

    text.value = '';

    imageInput.value = '';

}


// VISUALIZAR STORIES

document.querySelectorAll('.story').forEach(story => {

    story.addEventListener('click', () => {

        const nome = story.querySelector('p').textContent;

        alert('Story de: ' + nome);

    });

});


// ENTER PARA PUBLICAR COMENTÁRIOS

document.addEventListener('keydown', function(event) {

    if (
        event.key === 'Enter' &&
        event.target.matches('.comment-box input')
    ) {

        event.preventDefault();

        event.target
            .nextElementSibling
            .click();

    }

});


// FINALIZADO
console.log('LEX CRIMINAL iniciado com sucesso!');
```