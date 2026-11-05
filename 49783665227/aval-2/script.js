// CURTIR E DESCURTIR
let curtiu = false;
let currentLikes = 1248;

function toggleLike() {

    const likeBtn = document.getElementById('like-btn');
    const likesCount = document.getElementById('likes-count');

    if (!curtiu) {
        curtiu = true;
        currentLikes++;

        likeBtn.classList.remove('far');
        likeBtn.classList.add('fas', 'liked');

    } else {
        curtiu = false;
        currentLikes--;

        likeBtn.classList.remove('fas', 'liked');
        likeBtn.classList.add('far');
    }

    likesCount.textContent =
        currentLikes.toLocaleString('pt-BR');
}

// ADICIONAR COMENTÁRIO
function addComment() {

    const input = document.getElementById('comment-input');
    const commentsList = document.getElementById('comments-list');

    const texto = input.value.trim();

    if (texto === '') {
        alert('Digite um comentário primeiro!');
        return;
    }

    const novoComentario = document.createElement('div');
    novoComentario.classList.add('comment');

    const usuario = document.createElement('span');
    usuario.textContent = 'dudaaraujo_v';

    novoComentario.appendChild(usuario);
    novoComentario.appendChild(
        document.createTextNode(texto)
    );

    commentsList.appendChild(novoComentario);

    input.value = '';
}

// VOLTAR AO INÍCIO
function irInicio() {
    document.querySelector('.feed-content')
        .scrollTo({top: 0, behavior: 'smooth'});
}
