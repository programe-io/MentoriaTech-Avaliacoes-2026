// --- LÓGICA 1: BOTÕES DE CURTIR (Event Delegation para funcionar com novos posts) ---
const listaPosts = document.getElementById('lista-posts');

listaPosts.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-curtir') || event.target.closest('.btn-curtir')) {
        const botao = event.target.classList.contains('btn-curtir') ? event.target : event.target.closest('.btn-curtir');
        const spanContador = botao.querySelector('span');
        let contador = parseInt(spanContador.textContent);
        contador++;
        spanContador.textContent = contador;
    }
});

// --- LÓGICA 2: ALTERNAR MODO ESCURO (Dark Mode) ---
const btnTema = document.getElementById('btn-tema');

btnTema.addEventListener('click', () => {
    const temaAtual = document.documentElement.getAttribute('data-theme');
    
    if (temaAtual === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        btnTema.textContent = '🌙 Modo Escuro';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        btnTema.textContent = '☀️ Modo Claro';
    }
});

// --- LÓGICA 3: CRIAR NOVO POST ---
const formNovoPost = document.getElementById('form-novo-post');

formNovoPost.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede a página de recarregar

    const titulo = document.getElementById('titulo').value;
    const conteudo = document.getElementById('conteudo').value;
    
    // Formata a data atual por extenso
    const hoje = new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });

    // Cria a estrutura HTML do novo post
    const novoPost = document.createElement('article');
    novoPost.classList.add('post');
    novoPost.innerHTML = `
        <h2 class="post-titulo">${titulo}</h2>
        <span class="data">Publicado em ${hoje}</span>
        <p>${conteudo}</p>
        <button class="btn-curtir">Curtir (<span>0</span>)</button>
    `;

    // Insere o novo post no topo da lista
    listaPosts.prepend(novoPost);

    // Limpa o formulário após a publicação
    formNovoPost.reset();
});

// --- LÓGICA 4: BARRA DE PESQUISA (Filtro Dinâmico) ---
const inputBusca = document.getElementById('input-busca');

inputBusca.addEventListener('input', () => {
    const termoPesquisa = inputBusca.value.toLowerCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach((post) => {
        const tituloPost = post.querySelector('.post-titulo').textContent.toLowerCase();
        
        // Se o título incluir o termo digitado, exibe o post; senão, esconde
        if (tituloPost.includes(termoPesquisa)) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
});
