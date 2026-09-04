// Array para armazenar os produtos
const estoque = [];


// 1. Cadastrar um novo produto
function cadastrarProduto(codigo, descricao, quantidade, valor) {

    // Verifica se o código já existe
    const produtoExistente = estoque.find(
        produto => produto.codigo === codigo
    );

    if (produtoExistente) {
        mostrarMensagem(
            `Erro: Já existe um produto com o código ${codigo}.`
        );
        return;
    }

    // Verifica valores negativos
    if (quantidade < 0 || valor < 0) {
        mostrarMensagem(
            "Erro: quantidade e valor não podem ser negativos."
        );
        return;
    }

    const novoProduto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    estoque.push(novoProduto);

    mostrarMensagem(
        `Produto "${descricao}" cadastrado com sucesso!`
    );

    listarProdutos();
}


// 2. Listar os produtos
function listarProdutos() {

    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    if (estoque.length === 0) {
        lista.innerHTML = `
            <tr>
                <td colspan="4">
                    Nenhum produto cadastrado.
                </td>
            </tr>
        `;
        return;
    }

    estoque.forEach(produto => {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.valor.toFixed(2)}</td>
        `;

        lista.appendChild(linha);
    });
}


// 3. Alterar o valor
function alterarValor() {

    const codigo = Number(
        document.getElementById("codigoAlterar").value
    );

    const novoValor = Number(
        document.getElementById("novoValor").value
    );

    const produto = estoque.find(
        produto => produto.codigo === codigo
    );

    if (!produto) {
        mostrarMensagem(
            `Erro: Produto com o código ${codigo} não foi encontrado.`
        );
        return;
    }

    if (novoValor < 0) {
        mostrarMensagem(
            "Erro: O valor não pode ser negativo."
        );
        return;
    }

    produto.valor = novoValor;

    mostrarMensagem(
        `Valor do produto "${produto.descricao}" alterado para R$ ${novoValor.toFixed(2)}.`
    );

    listarProdutos();
}


// 4. Alterar a quantidade
function alterarQuantidade() {

    const codigo = Number(
        document.getElementById("codigoAlterar").value
    );

    const novaQuantidade = Number(
        document.getElementById("novaQuantidade").value
    );

    const produto = estoque.find(
        produto => produto.codigo === codigo
    );

    if (!produto) {
        mostrarMensagem(
            `Erro: Produto com o código ${codigo} não foi encontrado.`
        );
        return;
    }

    if (novaQuantidade < 0) {
        mostrarMensagem(
            "Erro: A quantidade não pode ser negativa."
        );
        return;
    }

    produto.quantidade = novaQuantidade;

    mostrarMensagem(
        `Quantidade do produto "${produto.descricao}" alterada para ${novaQuantidade} unidades.`
    );

    listarProdutos();
}


// Exibe mensagens na tela
function mostrarMensagem(texto) {
    document.getElementById("mensagem").textContent = texto;
}


// Formulário de cadastro
document
    .getElementById("formProduto")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const codigo = Number(
            document.getElementById("codigo").value
        );

        const descricao = document.getElementById("descricao").value;

        const quantidade = Number(
            document.getElementById("quantidade").value
        );

        const valor = Number(
            document.getElementById("valor").value
        );

        cadastrarProduto(
            codigo,
            descricao,
            quantidade,
            valor
        );

        // Limpa o formulário
        this.reset();
    });


// Lista os produtos ao abrir a página
listarProdutos();
