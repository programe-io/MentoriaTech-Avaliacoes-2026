
// SISTEMA DE CURTIDAS

document.querySelectorAll('.like').forEach(button => {
    button.addEventListener('click', () => {
        const post = button.closest('.post');
        const likes = post.querySelector('.likes');

        let count = Number(
            likes.dataset.count || likes.textContent.replace(/\D/g, '')
        );

        if (button.classList.contains('liked')) {
            button.classList.remove('liked');
            button.textContent = '♡';
            count--;
        } else {
            button.classList.add('liked');
            button.textContent = '♥';
            count++;
        }

        likes.dataset.count = count;
        likes.textContent = count.toLocaleString('pt-BR') + ' curtidas';
    });
});


// SISTEMA DE COMENTÁRIOS

document.querySelectorAll('.comment-form').forEach(form => {
    form.addEventListener('submit', event => {
        event.preventDefault();

        const input = form.querySelector('input');

        if (!input.value.trim()) return;

        const comment = document.createElement('p');
        const username = document.createElement('b');

        username.textContent = 'fiel_user ';
        comment.append(username, document.createTextNode(input.value));

        form.parentElement.querySelector('.comments').appendChild(comment);

        input.value = '';
    });
});


// MODAL DE PUBLICAÇÃO

const modal = document.getElementById('modal');

document.getElementById('newPostBtn').onclick = () => {
    modal.classList.add('open');
};

document.getElementById('closeModal').onclick = () => {
    modal.classList.remove('open');
};


// CRIAR PUBLICAÇÃO

document.getElementById('publish').onclick = () => {
    const caption = document.getElementById('caption');
    const imageInput = document.getElementById('imageInput');

    const file = imageInput.files[0];

    if (!caption.value.trim() && !file) {
        alert('Adicione um texto ou uma imagem!');
        return;
    }

    const post = document.createElement('article');
    post.className = 'post';

    const header = document.createElement('div');
    header.className = 'post-header';
    header.innerHTML = `
        <div class="avatar">F</div>
        <div>
            <strong>fiel_user</strong>
            <p>Agora</p>
        </div>
    `;

    post.appendChild(header);

    if (file) {
        const image = document.createElement('img');
        image.src = URL.createObjectURL(file);
        image.style.width = '100%';
        post.appendChild(image);
    }

    const description = document.createElement('div');
    description.className = 'post-description';

    const text = document.createElement('p');
    const bold = document.createElement('b');

    bold.textContent = 'fiel_user ';
    text.append(bold, document.createTextNode(caption.value));

    description.appendChild(text);
    post.appendChild(description);

    document.getElementById('posts').prepend(post);

    caption.value = '';
    imageInput.value = '';

    modal.classList.remove('open');
};


// PESQUISA

document.getElementById('searchInput').addEventListener('input', event => {
    const search = event.target.value.toLowerCase();

    document.querySelectorAll('#posts .post').forEach(post => {
        post.style.display = post.textContent.toLowerCase().includes(search)
            ? ''
            : 'none';
    });
});
