
let produtos = [];
let proximoCodigo = 1;

const formCadastro = document.getElementById("formCadastro");
const formValor = document.getElementById("formValor");
const formQuantidade = document.getElementById("formQuantidade");
const listaProdutos = document.getElementById("listaProdutos");
const mensagem = document.getElementById("mensagem");

// Exibir mensagens na tela
function mostrarMensagem(texto, erro = false) {
    mensagem.textContent = texto;
    mensagem.style.color = erro ? "#c62828" : "#176b45";
}

// Buscar produto pelo código
function buscarProduto(codigo) {
    return produtos.find(produto => produto.codigo === codigo);
}

// Cadastrar produto
formCadastro.addEventListener("submit", function(event) {
    event.preventDefault();

    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    if (descricao.length < 5) {
        mostrarMensagem("A descrição deve ter pelo menos 5 caracteres.", true);
        return;
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        mostrarMensagem("Informe uma quantidade inteira maior que zero.", true);
        return;
    }

    if (!Number.isFinite(valor) || valor < 0) {
        mostrarMensagem("Informe um valor válido.", true);
        return;
    }

    const produto = {
        codigo: proximoCodigo++,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    formCadastro.reset();
    listarProdutos();
    mostrarMensagem("Produto cadastrado com sucesso!");
});

// Listar produtos
function listarProdutos() {
    listaProdutos.replaceChildren();

    produtos.forEach(function(produto) {
        const linha = document.createElement("tr");

        [
            produto.codigo,
            produto.descricao,
            produto.quantidade,
            produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })
        ].forEach(function(valor) {
            const celula = document.createElement("td");
            celula.textContent = valor;
            linha.appendChild(celula);
        });

        listaProdutos.appendChild(linha);
    });

    if (produtos.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");

        celula.colSpan = 4;
        celula.textContent = "Nenhum produto cadastrado.";
        linha.appendChild(celula);
        listaProdutos.appendChild(linha);
    }
}

// Alterar valor
formValor.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = Number(document.getElementById("codigoValor").value);
    const novoValor = Number(document.getElementById("novoValor").value);

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        mostrarMensagem("O valor não pode ser negativo.", true);
        return;
    }

    const produto = buscarProduto(codigo);

    if (!produto) {
        mostrarMensagem("Produto não encontrado.", true);
        return;
    }

    produto.valor = novoValor;

    formValor.reset();
    listarProdutos();
    mostrarMensagem("Valor atualizado com sucesso!");
});

// Adicionar quantidade ao estoque
formQuantidade.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = Number(
        document.getElementById("codigoQuantidade").value
    );

    const quantidade = Number(
        document.getElementById("novaQuantidade").value
    );

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        mostrarMensagem("Informe uma quantidade inteira maior que zero.", true);
        return;
    }

    const produto = buscarProduto(codigo);

    if (!produto) {
        mostrarMensagem("Produto não encontrado.", true);
        return;
    }

    produto.quantidade += quantidade;

    formQuantidade.reset();
    listarProdutos();
    mostrarMensagem("Quantidade adicionada ao estoque!");
});

// Mostrar a lista inicial
listarProdutos();
