// Array que armazena os produtos
let produtos = [];

// Elementos do HTML
const form = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");
const totalProdutos = document.getElementById("totalProdutos");
const valorTotal = document.getElementById("valorTotal");


// Cadastrar produto
form.addEventListener("submit", function (event) {

    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    // Verificar se o código já existe
    const produtoExiste = produtos.some(produto => produto.codigo === codigo);

    if (produtoExiste) {
        alert("Já existe um produto com esse código!");
        return;
    }

    // Criar produto
    const produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    // Limpar formulário
    form.reset();

    atualizarLista();
});


// Mostrar produtos na tela
function atualizarLista() {

    listaProdutos.innerHTML = "";

    if (produtos.length === 0) {

        listaProdutos.innerHTML = `
            <p class="vazio">
                Nenhum produto cadastrado.
            </p>
        `;

    } else {

        produtos.forEach((produto, index) => {

            const elemento = document.createElement("div");

            elemento.classList.add("produto");

            elemento.innerHTML = `
                <div class="codigo">
                    #${produto.codigo}
                </div>

                <div class="descricao">
                    ${produto.descricao}
                </div>

                <div class="info">
                    <span>Quantidade</span>
                    <strong>${produto.quantidade}</strong>
                </div>

                <div class="info">
                    <span>Valor</span>
                    <strong>${formatarMoeda(produto.valor)}</strong>
                </div>

                <div class="acoes">
                    <button 
                        class="btn-editar"
                        onclick="alterarValor(${index})">
                        Valor
                    </button>

                    <button 
                        class="btn-editar"
                        onclick="alterarQuantidade(${index})">
                        Qtd.
                    </button>

                    <button 
                        class="btn-excluir"
                        onclick="excluirProduto(${index})">
                        Excluir
                    </button>
                </div>
            `;

            listaProdutos.appendChild(elemento);
        });
    }

    atualizarTotais();
}


// Alterar valor
function alterarValor(index) {

    const produto = produtos[index];

    const novoValor = prompt(
        `Digite o novo valor para "${produto.descricao}":`,
        produto.valor
    );

    if (novoValor === null) {
        return;
    }

    const valor = Number(novoValor);

    if (isNaN(valor) || valor < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produto.valor = valor;

    atualizarLista();
}


// Alterar quantidade
function alterarQuantidade(index) {

    const produto = produtos[index];

    const novaQuantidade = prompt(
        `Digite a nova quantidade para "${produto.descricao}":`,
        produto.quantidade
    );

    if (novaQuantidade === null) {
        return;
    }

    const quantidade = Number(novaQuantidade);

    if (isNaN(quantidade) || quantidade < 0) {
        alert("Digite uma quantidade válida!");
        return;
    }

    produto.quantidade = quantidade;

    atualizarLista();
}


// Excluir produto
function excluirProduto(index) {

    const produto = produtos[index];

    const confirmar = confirm(
        `Deseja realmente excluir o produto "${produto.descricao}"?`
    );

    if (confirmar) {
        produtos.splice(index, 1);
        atualizarLista();
    }
}


// Atualizar informações gerais
function atualizarTotais() {

    totalProdutos.textContent =
        produtos.length === 1
            ? "1 produto"
            : `${produtos.length} produtos`;

    const total = produtos.reduce((soma, produto) => {
        return soma + (produto.quantidade * produto.valor);
    }, 0);

    valorTotal.textContent = formatarMoeda(total);
}


// Formatar valores para Real brasileiro
function formatarMoeda(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}