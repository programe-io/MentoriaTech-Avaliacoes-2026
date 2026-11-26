
// FEED DE NOTÍCIAS MARVEL

const pesquisa = document.getElementById('pesquisa');

const botoesFiltro = document.querySelectorAll('.filtro');

const noticiasFeed = document.querySelectorAll('.feed-card');

const semResultados = document.getElementById('semResultados');

let filtroAtual = 'todos';

// Função para pesquisar e filtrar notícias
function filtrarNoticias() {

    const texto = pesquisa.value.toLowerCase();

    let quantidade = 0;

    noticiasFeed.forEach((noticia) => {

        const conteudo = noticia.innerText.toLowerCase();

        const categoria = noticia.dataset.categoria;

        const correspondeTexto = conteudo.includes(texto);

        const correspondeFiltro =
            filtroAtual === 'todos' ||
            categoria === filtroAtual;

        if (correspondeTexto && correspondeFiltro) {

            noticia.style.display = 'block';

            quantidade++;

        } else {

            noticia.style.display = 'none';

        }

    });

    semResultados.style.display =
        quantidade === 0 ? 'block' : 'none';

}

// Pesquisa enquanto digita
pesquisa.addEventListener('input', filtrarNoticias);

// Botões de categorias
botoesFiltro.forEach((botao) => {

    botao.addEventListener('click', () => {

        botoesFiltro.forEach((b) => {
            b.classList.remove('ativo');
        });

        botao.classList.add('ativo');

        filtroAtual = botao.dataset.filtro;

        filtrarNoticias();

    });

});

console.log("Feed Marvel carregado com sucesso!");
