
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

    if (!codigo || !descricao || quantidade < 0 ||
        !Number.isInteger(quantidade) || valor < 0 ||
        !Number.isFinite(valor)) {
        mostrarMensagem("Preencha os campos corretamente.");
        return;
    }

    // Verificar se o código já existe
    const existe = produtos.some(
        produto => produto.codigo.toLowerCase() === codigo.toLowerCase()
    );

    if (existe) {
        mostrarMensagem("Já existe um produto com esse código.");
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
    mostrarMensagem("Produto cadastrado com sucesso!");
});

// Listar todos os produtos
function listarProdutos() {
    listaProdutos.replaceChildren();

    produtos.forEach(function(produto) {
        const linha = document.createElement("tr");

        adicionarCelula(linha, produto.codigo);
        adicionarCelula(linha, produto.descricao);
        adicionarCelula(linha, produto.quantidade);
        adicionarCelula(
            linha,
            produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })
        );

        const celulaAcoes = document.createElement("td");

        const botaoValor = document.createElement("button");
        botaoValor.textContent = "Alterar valor";
        botaoValor.className = "editar";
        botaoValor.addEventListener("click", function() {
            alterarValor(produto.codigo);
        });

        const botaoQuantidade = document.createElement("button");
        botaoQuantidade.textContent = "Alterar quantidade";
        botaoQuantidade.addEventListener("click", function() {
            alterarQuantidade(produto.codigo);
        });

        celulaAcoes.append(botaoValor, botaoQuantidade);
        linha.appendChild(celulaAcoes);
        listaProdutos.appendChild(linha);
    });
}

// Criar células da tabela com segurança
function adicionarCelula(linha, conteudo) {
    const celula = document.createElement("td");
    celula.textContent = conteudo;
    linha.appendChild(celula);
}

// Alterar o preço de um produto
function alterarValor(codigo) {
    const produto = produtos.find(p => p.codigo === codigo);

    const novoValor = prompt(
        "Digite o novo valor do produto (R$):",
        produto.valor
    );

    if (novoValor === null || novoValor.trim() === "") {
        return;
    }

    const valor = Number(novoValor);

    if (!Number.isFinite(valor) || valor < 0) {
        mostrarMensagem("Digite um valor válido.");
        return;
    }

    produto.valor = valor;
    listarProdutos();
    mostrarMensagem("Valor alterado com sucesso!");
}

// Alterar a quantidade em estoque
function alterarQuantidade(codigo) {
    const produto = produtos.find(p => p.codigo === codigo);

    const novaQuantidade = prompt(
        "Digite a nova quantidade em estoque:",
        produto.quantidade
    );

    if (novaQuantidade === null || novaQuantidade.trim() === "") {
        return;
    }

    const quantidade = Number(novaQuantidade);

    if (!Number.isInteger(quantidade) || quantidade < 0) {
        mostrarMensagem("Digite uma quantidade inteira válida.");
        return;
    }

    produto.quantidade = quantidade;
    listarProdutos();
    mostrarMensagem("Quantidade alterada com sucesso!");
}

// Exibir mensagens para o usuário
function mostrarMensagem(texto) {
    mensagem.textContent = texto;
}

// Mostrar a lista inicial
listarProdutos();
