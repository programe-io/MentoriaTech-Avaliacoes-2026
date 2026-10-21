
let estoque = [];

const formProduto = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");
const mensagem = document.getElementById("mensagem");
const valorTotal = document.getElementById("valorTotal");

// Formata os valores em reais
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Exibe mensagens na página
function mostrarMensagem(texto) {
    mensagem.textContent = texto;
}

// Cadastra um produto
formProduto.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const quantidadeTexto = document.getElementById("quantidade").value;
    const valorTexto = document.getElementById("valor").value;

    const quantidade = Number(quantidadeTexto);
    const valor = Number(valorTexto);

    if (!codigo || !descricao) {
        mostrarMensagem("Código e descrição são obrigatórios.");
        return;
    }

    if (estoque.some(p => p.codigo === codigo)) {
        mostrarMensagem("Erro: código já cadastrado!");
        return;
    }

    if (
        quantidadeTexto === "" ||
        !Number.isInteger(quantidade) ||
        quantidade < 0
    ) {
        mostrarMensagem("Quantidade inválida!");
        return;
    }

    if (
        valorTexto === "" ||
        !Number.isFinite(valor) ||
        valor <= 0
    ) {
        mostrarMensagem("Valor inválido!");
        return;
    }

    estoque.push({
        codigo,
        descricao,
        quantidade,
        valor
    });

    formProduto.reset();

    mostrarMensagem("Produto cadastrado com sucesso!");

    listarProdutos();
});

// Lista os produtos na tabela
function listarProdutos() {
    listaProdutos.replaceChildren();

    estoque.forEach(function(produto) {
        const linha = document.createElement("tr");

        const dados = [
            produto.codigo,
            produto.descricao,
            produto.quantidade,
            formatarMoeda(produto.valor),
            formatarMoeda(produto.quantidade * produto.valor)
        ];

        dados.forEach(function(dado) {
            const celula = document.createElement("td");
            celula.textContent = dado;
            linha.appendChild(celula);
        });

        const celulaAcoes = document.createElement("td");
        const divAcoes = document.createElement("div");
        divAcoes.className = "acoes";

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.className = "btn-editar";
        btnEditar.addEventListener("click", function() {
            editarProduto(produto.codigo);
        });

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.className = "btn-excluir";
        btnExcluir.addEventListener("click", function() {
            excluirProduto(produto.codigo);
        });

        divAcoes.append(btnEditar, btnExcluir);
        celulaAcoes.appendChild(divAcoes);
        linha.appendChild(celulaAcoes);

        listaProdutos.appendChild(linha);
    });

    calcularTotal();
}

// Consulta um produto pelo código
document.getElementById("btnConsultar").addEventListener("click", function() {
    const codigo = document.getElementById("codigoConsulta").value.trim();

    if (!codigo) {
        mostrarMensagem("Informe o código do produto.");
        return;
    }

    const produto = estoque.find(p => p.codigo === codigo);

    if (produto) {
        mostrarMensagem(
            `Produto encontrado: ${produto.descricao} | ` +
            `Quantidade: ${produto.quantidade} | ` +
            `Valor: ${formatarMoeda(produto.valor)}`
        );
    } else {
        mostrarMensagem("Produto não encontrado.");
    }
});

// Atualiza a quantidade ou o valor do produto
function editarProduto(codigo) {
    const produto = estoque.find(p => p.codigo === codigo);

    if (!produto) {
        mostrarMensagem("Produto não encontrado.");
        return;
    }

    const novaQuantidadeTexto = prompt(
        `Nova quantidade para ${produto.descricao}:`,
        produto.quantidade
    );

    if (novaQuantidadeTexto === null) return;

    const novaQuantidade = Number(novaQuantidadeTexto);

    if (
        novaQuantidadeTexto.trim() === "" ||
        !Number.isInteger(novaQuantidade) ||
        novaQuantidade < 0
    ) {
        mostrarMensagem("Quantidade inválida!");
        return;
    }

    const novoValorTexto = prompt(
        `Novo valor unitário para ${produto.descricao}:`,
        produto.valor
    );

    if (novoValorTexto === null) return;

    const novoValor = Number(novoValorTexto);

    if (
        novoValorTexto.trim() === "" ||
        !Number.isFinite(novoValor) ||
        novoValor <= 0
    ) {
        mostrarMensagem("Valor inválido!");
        return;
    }

    produto.quantidade = novaQuantidade;
    produto.valor = novoValor;

    mostrarMensagem("Produto atualizado com sucesso!");

    listarProdutos();
}

// Exclui um produto
function excluirProduto(codigo) {
    const indice = estoque.findIndex(p => p.codigo === codigo);

    if (indice === -1) {
        mostrarMensagem("Produto não encontrado.");
        return;
    }

    const confirmar = confirm(
        `Deseja excluir o produto ${estoque[indice].descricao}?`
    );

    if (!confirmar) return;

    estoque.splice(indice, 1);

    mostrarMensagem("Produto excluído com sucesso!");

    listarProdutos();
}

// Calcula o valor total do estoque
function calcularTotal() {
    const total = estoque.reduce(function(soma, produto) {
        return soma + produto.quantidade * produto.valor;
    }, 0);

    valorTotal.textContent =
        `Valor total do estoque: ${formatarMoeda(total)}`;
}

// Exibe a tabela vazia e o total inicial
listarProdutos();
