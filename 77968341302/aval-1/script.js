// 1. Sistema de Curtidas nos Posts
function curtirPost(botao) {
    const contador = botao.querySelector('span');
    let curtidas = parseInt(contador.innerText);
    curtidas++;
    contador.innerText = curtidas;
}

// 2. Alternar Modo Claro / Modo Escuro
const btnTema = document.getElementById('btn-tema');
btnTema.addEventListener('click', (e) => {
    e.preventDefault();
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        btnTema.innerText = 'Modo Claro';
    } else {
        btnTema.innerText = 'Modo Escuro';
    }
});

// 3. Mostrar/Ocultar Formulário de Nova Postagem
const btnAbrirForm = document.getElementById('btn-abrir-form');
const formContainer = document.getElementById('form-container');

btnAbrirForm.addEventListener('click', (e) => {
    e.preventDefault();
    formContainer.classList.toggle('hidden');
});

// 4. Adicionar Nova Postagem Dinamicamente com autoria de Anna Letícia
const postForm = document.getElementById('post-form');

postForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const titulo = document.getElementById('post-titulo').value;
    const categoria = document.getElementById('post-categoria').value;
    const conteudo = document.getElementById('post-conteudo').value;
    
    const dataAtual = new Date().toLocaleDateString('pt-BR', {
        day: '2-digit', month: 'short', year: 'numeric'
    });

    const novoArtigo = document.createElement('article');
    novoArtigo.setAttribute('data-categoria', categoria);
    novoArtigo.innerHTML = `
        <h2>${titulo.toUpperCase()}</h2>
        <h5>Anna Letícia, ${dataAtual} • Categoria: ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}</h5>
        <div class="fakeimg" style="height: 200px;">Nova Imagem</div>
        <p>${conteudo}</p>
        <button class="btn-curtir" onclick="curtirPost(this)">Curtir (<span>0</span>)</button>
    `;

    formContainer.insertAdjacentElement('afterend', novoArtigo);

    postForm.reset();
    formContainer.classList.add('hidden');
});

// 5. Filtro de Categorias no Menu de Navegação
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');

        const filtro = link.getAttribute('data-filter');
        const artigos = document.querySelectorAll('main article');

        artigos.forEach(artigo => {
            if (filtro === 'todos' || artigo.getAttribute('data-categoria') === filtro) {
                artigo.style.display = 'block';
            } else {
                artigo.style.display = 'none';
            }
        });
    });
});