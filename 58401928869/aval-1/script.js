
let produtos = [];

// CADASTRAR PRODUTO
const formProduto = document.getElementById("formProduto");

formProduto.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    // Verificar se o código já existe
    const existe = produtos.some(function(produto) {
        return produto.codigo === codigo;
    });

    if (existe) {
        alert("Já existe um produto com esse código!");
        return;
    }

    // Cadastrar o produto
    const produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    formProduto.reset();
    listarProdutos();
});


// LISTAR PRODUTOS
function listarProdutos() {
    const lista = document.getElementById("listaProdutos");
    const mensagem = document.getElementById("mensagem");

    lista.replaceChildren();

    if (produtos.length === 0) {
        mensagem.textContent = "Nenhum produto cadastrado.";
        return;
    }

    mensagem.textContent = "Total de produtos cadastrados: " + produtos.length;

    produtos.forEach(function(produto) {
        const linha = document.createElement("tr");

        const dados = [
            produto.codigo,
            produto.descricao,
            produto.quantidade,
            produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })
        ];

        dados.forEach(function(dado) {
            const coluna = document.createElement("td");
            coluna.textContent = dado;
            linha.appendChild(coluna);
        });

        const colunaAcoes = document.createElement("td");
        const botao = document.createElement("button");

        botao.textContent = "Excluir";
        botao.style.backgroundColor = "#dc2626";

        botao.addEventListener("click", function() {
            excluirProduto(produto.codigo);
        });

        colunaAcoes.appendChild(botao);
        linha.appendChild(colunaAcoes);
        lista.appendChild(linha);
    });
}


// ALTERAR PREÇO E QUANTIDADE
const formAlteracao = document.getElementById("formAlteracao");

formAlteracao.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = document.getElementById("codigoAlteracao").value.trim();
    const campoValor = document.getElementById("novoValor");
    const campoQuantidade = document.getElementById("novaQuantidade");

    const temValor = campoValor.value !== "";
    const temQuantidade = campoQuantidade.value !== "";

    if (!temValor && !temQuantidade) {
        alert("Informe um novo valor ou uma nova quantidade.");
        return;
    }

    const produto = produtos.find(function(item) {
        return item.codigo === codigo;
    });

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (temValor) {
        produto.valor = Number(campoValor.value);
    }

    if (temQuantidade) {
        produto.quantidade = Number(campoQuantidade.value);
    }

    alert("Produto atualizado com sucesso!");

    formAlteracao.reset();
    listarProdutos();
});


// EXCLUIR PRODUTO
function excluirProduto(codigo) {
    const confirmar = confirm("Deseja excluir este produto?");

    if (!confirmar) {
        return;
    }

    produtos = produtos.filter(function(produto) {
        return produto.codigo !== codigo;
    });

    listarProdutos();
}
