
// =================================
// MARVEL NEWS - FRANCISQUIM
// =================================

const campoPesquisa = document.getElementById('pesquisa');

const botoesFiltro = document.querySelectorAll('.filtro');

const filmes = document.querySelectorAll('.feed-card');

const semResultados = document.getElementById('semResultados');

let categoriaAtual = 'todos';

// FUNÇÃO DE PESQUISA E FILTRO

function atualizarFeed() {

    const texto = campoPesquisa.value.toLowerCase();

    let encontrados = 0;

    filmes.forEach((filme) => {

        const conteudo = filme.innerText.toLowerCase();

        const categorias = filme.dataset.categoria.split(' ');

        const encontrouTexto = conteudo.includes(texto);

        const encontrouCategoria =
            categoriaAtual === 'todos' ||
            categorias.includes(categoriaAtual);

        if (encontrouTexto && encontrouCategoria) {

            filme.style.display = 'block';

            encontrados++;

        } else {

            filme.style.display = 'none';

        }

    });

    semResultados.style.display =
        encontrados === 0 ? 'block' : 'none';

}

// PESQUISA EM TEMPO REAL

campoPesquisa.addEventListener('input', atualizarFeed);

// FILTROS

botoesFiltro.forEach((botao) => {

    botao.addEventListener('click', () => {

        botoesFiltro.forEach((item) => {
            item.classList.remove('ativo');
        });

        botao.classList.add('ativo');

        categoriaAtual = botao.dataset.filtro;

        atualizarFeed();

    });

});

// ANIMAÇÃO DOS CARDS

const observador = new IntersectionObserver((entradas) => {

    entradas.forEach((entrada) => {

        if (entrada.isIntersecting) {

            entrada.target.style.opacity = '1';

            entrada.target.style.transform = 'translateY(0)';

            observador.unobserve(entrada.target);

        }

    });

}, { threshold: 0.1 });

filmes.forEach((filme) => {

    filme.style.opacity = '0';

    filme.style.transform = 'translateY(25px)';

    filme.style.transition = 'opacity .6s, transform .6s';

    observador.observe(filme);

});

// AVISO SE ALGUM POSTER NÃO CARREGAR

document.querySelectorAll('.poster-container img').forEach((imagem) => {

    imagem.addEventListener('error', () => {

        imagem.style.display = 'none';

        const aviso = document.createElement('div');

        aviso.textContent = 'POSTER INDISPONÍVEL';

        aviso.style.cssText = `
            color: white;
            font-family: Orbitron, sans-serif;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            background: #251014;
        `;

        imagem.parentElement.appendChild(aviso);

    });

});

console.log('MARVEL NEWS - Francisquim carregado!');
