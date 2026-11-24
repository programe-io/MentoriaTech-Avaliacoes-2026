
// Selecionar os elementos
const campoBusca = document.getElementById("campoBusca");
const botaoBusca = document.getElementById("botaoBusca");
const botoesFiltro = document.querySelectorAll(".filtro");
const posts = document.querySelectorAll(".post");
const mensagemVazia = document.getElementById("mensagemVazia");

// Categoria selecionada
let categoriaSelecionada = "Todas";

// Função para pesquisar e filtrar publicações
function filtrarPosts() {

    const pesquisa = campoBusca.value.toLowerCase().trim();

    let encontrados = 0;

    posts.forEach(post => {

        const titulo = post.querySelector("h3").textContent.toLowerCase();
        const texto = post.querySelector("p:not(.data)").textContent.toLowerCase();
        const categoria = post.querySelector(".categoria").textContent;

        const correspondePesquisa =
            titulo.includes(pesquisa) || texto.includes(pesquisa);

        const correspondeCategoria =
            categoriaSelecionada === "Todas" ||
            categoria === categoriaSelecionada;

        if (correspondePesquisa && correspondeCategoria) {
            post.style.display = "block";
            encontrados++;
        } else {
            post.style.display = "none";
        }

    });

    // Mostrar mensagem se não houver resultados
    mensagemVazia.hidden = encontrados !== 0;
}

// Botão de pesquisa
botaoBusca.addEventListener("click", filtrarPosts);

// Pesquisar enquanto digita
campoBusca.addEventListener("input", filtrarPosts);

// Filtrar por categoria
botoesFiltro.forEach(botao => {

    botao.addEventListener("click", () => {

        categoriaSelecionada = botao.dataset.categoria;

        filtrarPosts();

    });

});

// Atualizar ano automaticamente
document.getElementById("ano").textContent =
    new Date().getFullYear();

