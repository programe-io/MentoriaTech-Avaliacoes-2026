let quantidade = 0;
let categoriaAtual = "todos";

const contador = document.getElementById("contador");
const busca = document.getElementById("busca");
const produtos = document.querySelectorAll(".produto");
const filtros = document.querySelectorAll(".filtro");
const mensagem = document.getElementById("mensagem");

function avisar(texto) {
    mensagem.textContent = texto;
    mensagem.classList.add("mostrar");

    setTimeout(() => {
        mensagem.classList.remove("mostrar");
    }, 2500);
}

// Adicionar produtos à sacola
document.querySelectorAll(".comprar").forEach(botao => {
    botao.addEventListener("click", () => {
        quantidade++;
        contador.textContent = quantidade;
        avisar("Perfume adicionado à sua sacola! ♡");
    });
});

// Filtrar perfumes
filtros.forEach(botao => {
    botao.addEventListener("click", () => {
        filtros.forEach(f => f.classList.remove("ativo"));
        botao.classList.add("ativo");

        categoriaAtual = botao.dataset.filtro;
        filtrarProdutos();
    });
});

// Pesquisar perfumes
busca.addEventListener("input", filtrarProdutos);

function filtrarProdutos() {
    const texto = busca.value.toLowerCase();
    let encontrados = 0;

    produtos.forEach(produto => {
        const nome = produto.dataset.nome;
        const categoria = produto.dataset.categoria;

        const correspondeNome = nome.includes(texto);
        const correspondeCategoria =
            categoriaAtual === "todos" ||
            categoria === categoriaAtual;

        const mostrar = correspondeNome && correspondeCategoria;

        produto.hidden = !mostrar;

        if (mostrar) encontrados++;
    });

    document.getElementById("semResultado").hidden =
        encontrados > 0;
}

// Cadastro de e-mail
document.getElementById("formulario").addEventListener("submit", evento => {
    evento.preventDefault();
    avisar("Cadastro recebido com sucesso! ♡");
    evento.target.reset();
});