let produtos = [];
let produtoEditando = null;

// Elementos HTML
const form = document.getElementById("formProduto");
const descricao = document.getElementById("descricao");
const quantidade = document.getElementById("quantidade");
const valor = document.getElementById("valor");

const listaProdutos = document.getElementById("listaProdutos");
const mensagemVazia = document.getElementById("mensagemVazia");
const busca = document.getElementById("busca");

const totalProdutos = document.getElementById("totalProdutos");
const totalQuantidade = document.getElementById("totalQuantidade");
const valorEstoque = document.getElementById("valorEstoque");


// Cadastrar ou editar produto
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = descricao.value.trim();
    const qtd = Number(quantidade.value);
    const preco = Number(valor.value);

    // Validação
    if (nome.length < 5) {
        alert("A descrição deve ter no mínimo 5 caracteres.");
        return;
    }

    if (qtd < 0 || quantidade.value === "") {
        alert("Informe uma quantidade válida.");
        return;
    }

    if (preco < 0 || valor.value === "") {
        alert("Informe um valor válido.");
        return;
    }


    // Editar produto
    if (produtoEditando !== null) {

        const produto = produtos.find(
            produto => produto.codigo === produtoEditando
        );

        produto.descricao = nome;
        produto.quantidade = qtd;
        produto.valor = preco;

        produtoEditando = null;

        document.querySelector(".btn-primary").textContent =
            "Cadastrar Produto";

    } else {

        // Criar novo produto
        const novoProduto = {
            codigo: produtos.length + 1,
            descricao: nome,
            quantidade: qtd,
            valor: preco
        };

        produtos.push(novoProduto);
    }

    form.reset();

    mostrarProdutos();

});


// Mostrar produtos
function mostrarProdutos() {

    listaProdutos.innerHTML = "";

    const textoBusca = busca.value.toLowerCase();

    const produtosFiltrados = produtos.filter(produto =>
        produto.descricao.toLowerCase().includes(textoBusca)
    );


    if (produtosFiltrados.length === 0) {

        mensagemVazia.style.display = "block";

    } else {

        mensagemVazia.style.display = "none";

    }


    produtosFiltrados.forEach(produto => {

        const linha = document.createElement("tr");

        const total = produto.quantidade * produto.valor;

        linha.innerHTML = `
            <td>${produto.codigo}</td>

            <td>${produto.descricao}</td>

            <td>${produto.quantidade}</td>

            <td>${formatarMoeda(produto.valor)}</td>

            <td>${formatarMoeda(total)}</td>

            <td>
                <div class="acoes">

                    <button
                        class="btn-editar"
                        onclick="editarProduto(${produto.codigo})">
                        Editar
                    </button>

                    <button
                        class="btn-excluir"
                        onclick="excluirProduto(${produto.codigo})">
                        Excluir
                    </button>

                </div>
            </td>
        `;

        listaProdutos.appendChild(linha);

    });

    atualizarResumo();

}


// Editar produto
function editarProduto(codigo) {

    const produto = produtos.find(
        produto => produto.codigo === codigo
    );

    if (!produto) {
        return;
    }

    descricao.value = produto.descricao;
    quantidade.value = produto.quantidade;
    valor.value = produto.valor;

    produtoEditando = codigo;

    document.querySelector(".btn-primary").textContent =
        "Salvar Alterações";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// Excluir produto
function excluirProduto(codigo) {

    const confirmar = confirm(
        "Deseja realmente excluir este produto?"
    );

    if (!confirmar) {
        return;
    }

    produtos = produtos.filter(
        produto => produto.codigo !== codigo
    );

    mostrarProdutos();

}


// Buscar produto
busca.addEventListener("input", function() {

    mostrarProdutos();

});


// Atualizar resumo
function atualizarResumo() {

    let quantidadeTotal = 0;
    let valorTotal = 0;

    produtos.forEach(produto => {

        quantidadeTotal += produto.quantidade;

        valorTotal += produto.quantidade * produto.valor;

    });

    totalProdutos.textContent = produtos.length;

    totalQuantidade.textContent = quantidadeTotal;

    valorEstoque.textContent = formatarMoeda(valorTotal);

}


// Formatar moeda
function formatarMoeda(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


// Inicializar
mostrarProdutos();