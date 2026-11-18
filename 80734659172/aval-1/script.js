// 1. Alternar Tema Azul Claro / Azul Escuro
const btnTema = document.getElementById('btn-tema');
btnTema.addEventListener('click', () => {
    document.body.classList.toggle('modo-escuro');
    
    if (document.body.classList.contains('modo-escuro')) {
        btnTema.textContent = 'Modo Azul Claro';
    } else {
        btnTema.textContent = 'Modo Azul Escuro';
    }
});

// 2. Sistema de Curtidas nos Posts
function curtirPost(botao) {
    const contadorSpan = botao.querySelector('span');
    let curtidas = parseInt(contadorSpan.textContent);
    curtidas++;
    contadorSpan.textContent = curtidas;
}

// 3. Filtro por Categoria na Barra Lateral
function filtrarCategoria(categoria) {
    const posts = document.querySelectorAll('.post');
    
    posts.forEach(post => {
        const catPost = post.getAttribute('data-categoria');
        if (categoria === 'todos' || catPost === categoria) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}

// 4. Busca em Tempo Real pelo Título ou Conteúdo
const campoBusca = document.getElementById('campo-busca');
campoBusca.addEventListener('input', (evento) => {
    const termo = evento.target.value.toLowerCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        const titulo = post.querySelector('h2').textContent.toLowerCase();
        const texto = post.querySelector('p:not(.meta-post)').textContent.toLowerCase();
        
        if (titulo.includes(termo) || texto.includes(termo)) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
});

// 5. Publicar Novo Post pelo Formulário
const formPost = document.getElementById('form-post');
const listaPosts = document.getElementById('lista-posts');

formPost.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const titulo = document.getElementById('titulo-post').value;
    const categoriaSelect = document.getElementById('categoria-post');
    const categoriaValor = categoriaSelect.value;
    const categoriaTexto = categoriaSelect.options[categoriaSelect.selectedIndex].text;
    const conteudo = document.getElementById('conteudo-post').value;

    const dataAtual = new Date().toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const novoArtigo = document.createElement('article');
    novoArtigo.classList.add('post');
    novoArtigo.setAttribute('data-categoria', categoriaValor);

    novoArtigo.innerHTML = `
        <span class="tag-categoria">${categoriaTexto}</span>
        <h2>${titulo}</h2>
        <p class="meta-post">Publicado em ${dataAtual} por <strong>Wendriam</strong></p>
        <p>${conteudo}</p>
        <div class="acoes-post">
            <button class="btn-curtir" onclick="curtirPost(this)">Curtir (<span>0</span>)</button>
        </div>
    `;

    // Adiciona o novo post no topo da lista
    listaPosts.prepend(novoArtigo);

    // Limpa o formulário
    formPost.reset();
});