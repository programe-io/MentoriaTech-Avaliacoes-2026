const btnPublicar = document.getElementById('btnPublicar');
const postInput = document.getElementById('postInput');
const feedContainer = document.getElementById('feedContainer');

btnPublicar.addEventListener('click', function() {

    const textoPost = postInput.value.trim();

    if (textoPost === '') {
        alert('Escreva alguma coisa antes de publicar!');
        return;
    }

    const novoCard = document.createElement('div');
    novoCard.classList.add('feed-card');

    const cabecalho = document.createElement('div');
    cabecalho.classList.add('feed-header');

    const avatar = document.createElement('div');
    avatar.classList.add('avatar');
    avatar.textContent = 'M';

    const detalhes = document.createElement('div');
    detalhes.classList.add('feed-user-details');

    const nome = document.createElement('strong');
    nome.textContent = 'Maria';

    const horario = document.createElement('span');
    horario.classList.add('time');
    horario.textContent = 'Agora mesmo';

    detalhes.appendChild(nome);
    detalhes.appendChild(horario);

    cabecalho.appendChild(avatar);
    cabecalho.appendChild(detalhes);

    const texto = document.createElement('p');
    texto.classList.add('feed-text');
    texto.textContent = textoPost;

    const acoes = document.createElement('div');
    acoes.classList.add('feed-actions');

    const curtir = document.createElement('button');
    curtir.classList.add('action-btn');
    curtir.textContent = 'Curtir';

    const comentar = document.createElement('button');
    comentar.classList.add('action-btn');
    comentar.textContent = 'Comentar';

    acoes.appendChild(curtir);
    acoes.appendChild(comentar);

    novoCard.appendChild(cabecalho);
    novoCard.appendChild(texto);
    novoCard.appendChild(acoes);

    feedContainer.prepend(novoCard);

    postInput.value = '';
});