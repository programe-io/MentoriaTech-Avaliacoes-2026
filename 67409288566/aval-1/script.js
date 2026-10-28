let produtos = [];

const formulario = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");
const mensagem = document.getElementById("mensagem");

// Cadastrar um novo produto
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    if (
        !codigo ||
        !descricao ||
        !Number.isInteger(quantidade) ||
        quantidade < 0 ||
        !Number.isFinite(valor) ||
        valor < 0
    ) {
        mostrarMensagem("Preencha os campos com valores válidos.", "red");
        return;
    }

    // Verificar se o código já existe
    const existe = produtos.some(function(produto) {
        return produto.codigo.toLowerCase() === codigo.toLowerCase();
    });

    if (existe) {
        mostrarMensagem("Já existe um produto com esse código!", "red");
        return;
    }

    const produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    formulario.reset();
    listarProdutos();

    mostrarMensagem("Produto cadastrado com sucesso!", "green");
});

// Listar todos os produtos
function listarProdutos() {
    listaProdutos.innerHTML = "";

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

        // Botão para alterar o valor
        const btnValor = document.createElement("button");
        btnValor.textContent = "Alterar valor";
        btnValor.className = "btn-valor";
        btnValor.addEventListener("click", function() {
            alterarValor(produto.codigo);
        });

        // Botão para alterar a quantidade
        const btnQuantidade = document.createElement("button");
        btnQuantidade.textContent = "Alterar quantidade";
        btnQuantidade.className = "btn-quantidade";
        btnQuantidade.addEventListener("click", function() {
            alterarQuantidade(produto.codigo);
        });

        colunaAcoes.appendChild(btnValor);
        colunaAcoes.appendChild(btnQuantidade);
        linha.appendChild(colunaAcoes);

        listaProdutos.appendChild(linha);
    });
}

// Alterar o valor de um produto
function alterarValor(codigo) {
    const produto = produtos.find(function(item) {
        return item.codigo === codigo;
    });

    if (!produto) {
        mostrarMensagem("Produto não encontrado!", "red");
        return;
    }

    const novoValor = prompt(
        "Digite o novo valor do produto (R$):",
        produto.valor
    );

    if (novoValor === null || novoValor.trim() === "") {
        return;
    }

    const valor = Number(novoValor);

    if (!Number.isFinite(valor) || valor < 0) {
        mostrarMensagem("Digite um valor válido!", "red");
        return;
    }

    produto.valor = valor;

    listarProdutos();
    mostrarMensagem("Valor alterado com sucesso!", "green");
}

// Alterar a quantidade de um produto
function alterarQuantidade(codigo) {
    const produto = produtos.find(function(item) {
        return item.codigo === codigo;
    });

    if (!produto) {
        mostrarMensagem("Produto não encontrado!", "red");
        return;
    }

    const novaQuantidade = prompt(
        "Digite a nova quantidade em estoque:",
        produto.quantidade
    );

    if (
        novaQuantidade === null ||
        novaQuantidade.trim() === ""
    ) {
        return;
    }

    const quantidade = Number(novaQuantidade);

    if (!Number.isInteger(quantidade) || quantidade < 0) {
        mostrarMensagem(
            "Digite uma quantidade inteira igual ou maior que zero!",
            "red"
        );
        return;
    }

    produto.quantidade = quantidade;

    listarProdutos();
    mostrarMensagem("Quantidade alterada com sucesso!", "green");
}

// Exibir mensagens na tela
function mostrarMensagem(texto, cor) {
    mensagem.textContent = texto;
    mensagem.style.color = cor;
}