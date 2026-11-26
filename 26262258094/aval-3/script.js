
// CURTIR PUBLICAÇÃO
document.querySelectorAll('.like-btn').forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('liked');

        if (button.classList.contains('liked')) {
            button.classList.remove('bx-heart');
            button.classList.add('bxs-heart');
            button.style.color = '#ed4956';
        } else {
            button.classList.remove('bxs-heart');
            button.classList.add('bx-heart');
            button.style.color = '#262626';
        }
    });
});


// SALVAR PUBLICAÇÃO
document.querySelectorAll('.save-btn').forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('saved');

        if (button.classList.contains('saved')) {
            button.classList.remove('bx-bookmark');
            button.classList.add('bxs-bookmark');
        } else {
            button.classList.remove('bxs-bookmark');
            button.classList.add('bx-bookmark');
        }
    });
});


// SEGUIR USUÁRIO
document.querySelectorAll('.follow-btn').forEach(button => {
    button.addEventListener('click', () => {
        if (button.textContent === 'Seguir') {
            button.textContent = 'Seguindo';
            button.style.color = '#262626';
        } else {
            button.textContent = 'Seguir';
            button.style.color = '#0095f6';
        }
    });
});


// COMENTÁRIOS
document.querySelectorAll('.comment-form').forEach(form => {
    form.addEventListener('submit', event => {
        event.preventDefault();

        const input = form.querySelector('input');
        const post = form.closest('.post');
        const comments = post.querySelector('.comments');

        const text = input.value.trim();

        if (text === '') return;

        const comment = document.createElement('p');
        comment.innerHTML = `<strong>Você</strong> ${escapeHTML(text)}`;

        comments.appendChild(comment);

        input.value = '';
    });
});


// PROTEGER TEXTO DOS COMENTÁRIOS
function escapeHTML(text) {
    const element = document.createElement('div');
    element.textContent = text;
    return element.innerHTML;
}


// STORIES
document.querySelectorAll('.story').forEach(story => {
    story.addEventListener('click', () => {
        const username = story.querySelector('p').textContent;

        alert('Você está visualizando o story de ' + username);
    });
});


// DUPLO CLIQUE PARA CURTIR
document.querySelectorAll('.post-image').forEach(image => {
    image.addEventListener('dblclick', () => {
        const post = image.closest('.post');
        const likeButton = post.querySelector('.like-btn');

        if (!likeButton.classList.contains('liked')) {
            likeButton.click();
        }
    });
});


// MENU MOBILE
const menuButton = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');

if (menuButton && sidebar) {
    menuButton.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}
