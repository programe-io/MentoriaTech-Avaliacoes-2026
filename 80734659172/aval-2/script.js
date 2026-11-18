// 1. Alternar Tema Claro / Azul Noturno
const btnTema = document.getElementById('btn-tema');
btnTema.addEventListener('click', () => {
    document.body.classList.toggle('modo-escuro');
    btnTema.textContent = document.body.classList.contains('modo-escuro') 
        ? '☀️ Claro' 
        : '🌙 Noturno';
});

// 2. Curtir Post
function curtirPost(botao) {
    const span = botao.querySelector('span');
    span.textContent = parseInt(span.textContent) + 1;
}

// 3. Abrir/Fechar Área de Comentários
function toggleComentarios(botao) {
    const postCorpo = botao.closest('.post-corpo');
    const areaComentarios = postCorpo.querySelector('.area-comentarios');
    areaComentarios.style.display = areaComentarios.style.display === 'none' ? 'block' : 'none';
}

// 4. Adicionar Comentário no Post
function adicionarComentario(botao) {
    const form = botao.parentElement;
    const input = form.querySelector('input');
    const texto = input.value.trim();

    if (texto !== '') {
        const lista = form.previousElementSibling;
        const p = document.createElement('p');
        p.innerHTML = `<strong>Visitante:</strong> ${texto}`;
        lista.appendChild(p);
        input.value = '';
    }
}

// 5. Filtrar por Categoria
function filtrarCategoria(categoria, botaoClicado) {
    // Atualiza estilo do botão ativo
    document.querySelectorAll('.botoes-categoria button').forEach(btn => {
        btn.classList.remove('ativo');
    });
    botaoClicado.classList.add('ativo');

    // Filtra os artigos
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        const cat = post.getAttribute('data-categoria');
        post.style.display = (categoria === 'todos' || cat === categoria) ? 'block' : 'none';
    });
}

// 6. Buscar em Tempo Real
const campoBusca = document.getElementById('campo-busca');
campoBusca.addEventListener('input', (e) => {
    const termo = e.target.value.toLowerCase();
    document.querySelectorAll('.post').forEach(post => {
        const titulo = post.querySelector('h2').textContent.toLowerCase();
        const texto = post.querySelector('p').textContent.toLowerCase();
        post.style.display = (titulo.includes(termo) || texto.includes(termo)) ? 'block' : 'none';
    });
});

// 7. Publicar Novo Post pelo Formulário
const formPost = document.getElementById('form-post');
const listaPosts = document.getElementById('lista-posts');

formPost.addEventListener('submit', (e) => {
    e.preventDefault();

    const titulo = document.getElementById('titulo-post').value;
    const selectCat = document.getElementById('categoria-post');
    const catValor = selectCat.value;
    const catNome = selectCat.options[selectCat.selectedIndex].text;
    const conteudo = document.getElementById('conteudo-post').value;

    const novoPost = document.createElement('article');
    novoPost.className = 'post';
    novoPost.setAttribute('data-categoria', catValor);

    novoPost.innerHTML = `
        <div class="post-corpo">
            <span class="badge-categoria" style="position: static; display: inline-block; margin-bottom: 12px;">${catNome}</span>
            <div class="post-meta">
                <span>Por <strong>Wendriam (16 anos)</strong></span>
                <span>•</span>
                <span>Agora mesmo</span>
            </div>
            <h2>${titulo}</h2>
            <p>${conteudo}</p>
            <div class="post-rodape">
                <button class="btn-like" onclick="curtirPost(this)">💙 Curtir (<span>0</span>)</button>
                <button class="btn-comentar" onclick="toggleComentarios(this)">💬 Comentar</button>
            </div>
            <div class="area-comentarios" style="display: none;">
                <div class="lista-comentarios"></div>
                <div class="form-comentario">
                    <input type="text" placeholder="Escreva um comentário...">
                    <button onclick="adicionarComentario(this)">Enviar</button>
                </div>
            </div>
        </div>
    `;

    listaPosts.prepend(novoPost);
    formPost.reset();
});