
let produtos = [];
let proximoCodigo = 1;

const form = document.getElementById("formProduto");
const campoDescricao = document.getElementById("descricao");
const campoQuantidade = document.getElementById("quantidade");
const campoValor = document.getElementById("valor");
const listaProdutos = document.getElementById("listaProdutos");
const totalProdutos = document.getElementById("totalProdutos");
const mensagem = document.getElementById("mensagem");

// Exibe mensagens na tela
function mostrarMensagem(texto, tipo = "sucesso") {
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
}

// Valida os dados do produto
function validarProduto(descricao, quantidade, valor) {
    if (typeof descricao !== "string" ||
        descricao.trim().length < 5) {
        throw new Error(
            "A descrição deve ter no mínimo cinco caracteres."
        );
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error(
            "A quantidade deve ser um inteiro maior que zero."
        );
    }

    if (typeof valor !== "number" ||
        !Number.isFinite(valor) || valor < 0) {
        throw new Error(
            "O valor deve ser um número maior ou igual a zero."
        );
    }
}

// Cadastra um produto
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    const novoProduto = {
        codigo: proximoCodigo++,
        descricao: descricao.trim(),
        quantidade,
        valor
    };

    produtos.push(novoProduto);
    listarProdutos();

    mostrarMensagem("Produto cadastrado com sucesso!");
}

// Lista os produtos na tabela
function listarProdutos() {
    listaProdutos.replaceChildren();

    totalProdutos.textContent =
        `${produtos.length} produto${produtos.length !== 1 ? "s" : ""}`;

    if (produtos.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");

        celula.colSpan = 5;
        celula.className = "vazio";
        celula.textContent = "Nenhum produto cadastrado.";

        linha.appendChild(celula);
        listaProdutos.appendChild(linha);
        return;
    }

    produtos.forEach(produto => {
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

        dados.forEach(dado => {
            const celula = document.createElement("td");
            celula.textContent = dado;
            linha.appendChild(celula);
        });

        const acoes = document.createElement("td");

        const botaoValor = document.createElement("button");
        botaoValor.textContent = "Editar valor";
        botaoValor.className = "btn btn-editar";
        botaoValor.addEventListener("click", () => {
            atualizarValor(produto.codigo);
        });

        const botaoQuantidade = document.createElement("button");
        botaoQuantidade.textContent = "Editar qtd.";
        botaoQuantidade.className = "btn btn-editar";
        botaoQuantidade.addEventListener("click", () => {
            atualizarQuantidade(produto.codigo);
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "btn btn-excluir";
        botaoExcluir.addEventListener("click", () => {
            excluirProduto(produto.codigo);
        });

        acoes.append(botaoValor, botaoQuantidade, botaoExcluir);
        linha.appendChild(acoes);
        listaProdutos.appendChild(linha);
    });
}

// Atualiza o valor de um produto
function atualizarValor(codigoProduto) {
    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (!produto) {
        mostrarMensagem("Produto não encontrado.", "erro");
        return;
    }

    const entrada = prompt(
        `Novo valor para ${produto.descricao}:`,
        produto.valor.toFixed(2)
    );

    if (entrada === null) return;

    const novoValor = Number(entrada.trim().replace(",", "."));

    try {
        if (entrada.trim() === "") {
            throw new Error("Informe um valor válido.");
        }

        if (!Number.isFinite(novoValor) || novoValor < 0) {
            throw new Error(
                "O valor deve ser maior ou igual a zero."
            );
        }

        produto.valor = novoValor;
        listarProdutos();
        mostrarMensagem("Valor atualizado com sucesso!");
    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
}

// Atualiza a quantidade de um produto
function atualizarQuantidade(codigoProduto) {
    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (!produto) {
        mostrarMensagem("Produto não encontrado.", "erro");
        return;
    }

    const entrada = prompt(
        `Nova quantidade para ${produto.descricao}:`,
        produto.quantidade
    );

    if (entrada === null) return;

    const novaQuantidade = Number(entrada);

    if (
        entrada.trim() === "" ||
        !Number.isInteger(novaQuantidade) ||
        novaQuantidade < 1
    ) {
        mostrarMensagem(
            "A quantidade deve ser um inteiro maior que zero.",
            "erro"
        );
        return;
    }

    produto.quantidade = novaQuantidade;
    listarProdutos();
    mostrarMensagem("Quantidade atualizada com sucesso!");
}

// Exclui um produto
function excluirProduto(codigoProduto) {
    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (!produto) {
        mostrarMensagem("Produto não encontrado.", "erro");
        return;
    }

    const confirmar = confirm(
        `Deseja excluir o produto "${produto.descricao}"?`
    );

    if (!confirmar) return;

    produtos = produtos.filter(
        prod => prod.codigo !== codigoProduto
    );

    listarProdutos();
    mostrarMensagem("Produto excluído com sucesso!");
}

// Evento de cadastro do formulário
form.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const descricao = campoDescricao.value;
    const quantidade = Number(campoQuantidade.value);
    const valor = Number(campoValor.value);

    try {
        cadastrarProduto(descricao, quantidade, valor);
        form.reset();
        campoDescricao.focus();
    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
});

// Carrega a tabela inicial
listarProdutos();
