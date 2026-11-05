// Sistema de Filtro por Categoria Dinâmico
const botoesFiltro = document.querySelectorAll('.filtro-btn');
const posts = document.querySelectorAll('.post');

botoesFiltro.forEach((botao) => {
    botao.addEventListener('click', () => {
        // 1. Alterar a classe ativa nos botões da navbar
        botoesFiltro.forEach(b => b.classList.remove('active'));
        botao.classList.add('active');

        // 2. Pegar a categoria selecionada
        const categoriaSelecionada = botao.getAttribute('data-categoria');

        // 3. Esconder ou mostrar os posts baseado na categoria
        posts.forEach((post) => {
            const categoriaPost = post.getAttribute('data-categoria');

            if (categoriaSelecionada === 'todos' || categoriaSelecionada === categoriaPost) {
                post.style.display = 'flex'; // Exibe o post
            } else {
                post.style.display = 'none'; // Esconde o post
            }
        });
    });
});
