const btnPublicar = document.querySelector('.new-post button');
const textarea = document.querySelector('.new-post textarea');
const main = document.querySelector('main');

btnPublicar.addEventListener('click', () => {
    const texto = textarea.value.trim();
    
    if (texto === '') return;

    const novoPost = document.createElement('article');
    novoPost.classList.add('post');

    novoPost.innerHTML = `
        <div class="user-info">
            <div class="avatar"></div>
            <strong>Dev User</strong>
        </div>
        <p>${texto}</p>
        <div class="actions">
            <button class="btn-curtir">Curtir</button>
            <button>Comentar</button>
        </div>
    `;

    main.appendChild(novoPost);
    textarea.value = '';