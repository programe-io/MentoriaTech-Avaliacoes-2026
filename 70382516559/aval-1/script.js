
const produtoForm = document.getElementById("produtoForm");
const listaProdutos = document.getElementById("listaProdutos");
const mensagem = document.getElementById("mensagem");
const busca = document.getElementById("busca");

const campoCodigo = document.getElementById("codigo");
const campoDescricao = document.getElementById("descricao");
const campoQuantidade = document.getElementById("quantidade");
const campoValor = document.getElementById("valor");

const botaoSalvar = document.getElementById("botaoSalvar");
const botaoCancelar = document.getElementById("botaoCancelar");
const tituloFormulario = document.getElementById("tituloFormulario");

const totalProdutos = document.getElementById("totalProdutos");
const totalUnidades = document.getElementById("totalUnidades");
const valorEstoque = document.getElementById("valorEstoque");

const CHAVE_ESTOQUE = "controleEstoqueProdutos";

let produtos = carregarProdutos();
let codigoEmEdicao = null;

function carregarProdutos() {
    try {
        const dados = JSON.parse(localStorage.getItem(CHAVE_ESTOQUE));
        return Array.isArray(dados) ? dados : [];
    } catch (erro) {
        console.error("Não foi possível carregar os produtos:", erro);
        return [];
    }
}

function salvarProdutos() {
    try {
        localStorage.setItem(CHAVE_ESTOQUE, JSON.stringify(produtos));
        return true;
    } catch (erro) {
        mostrarMensagem("Não foi possível salvar os dados neste navegador.", true);
        console.error(erro);
        return false;
    }
}

function mostrarMensagem(texto, erro = false) {
    mensagem.textContent = texto;
    mensagem.className = erro ? "erro" : "sucesso";
}

function formatarMoeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function limparFormulario() {
    produtoForm.reset();
    codigoEmEdicao = null;
    campoCodigo.disabled = false;
    botaoSalvar.textContent = "Cadastrar produto";
    botaoCancelar.hidden = true;
    tituloFormulario.textContent = "Cadastrar produto";
}

produtoForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = campoCodigo.value.trim();
    const descricao = campoDescricao.value.trim();
    const quantidade = Number(campoQuantidade.value);
    const valor = Number(campoValor.value);

    if (!codigo || !descricao) {
        mostrarMensagem("Preencha o código e a descrição.", true);
        return;
    }

    if (!Number.isInteger(quantidade) || quantidade < 0) {
        mostrarMensagem("A quantidade deve ser um número inteiro igual ou maior que zero.", true);
        return;
    }

    if (!Number.isFinite(valor) || valor < 0) {
        mostrarMensagem("O valor deve ser um número igual ou maior que zero.", true);
        return;
    }

    if (codigoEmEdicao === null) {
        const codigoExiste = produtos.some(
            produto => produto.codigo.toLowerCase() === codigo.toLowerCase()
        );

        if (codigoExiste) {
            mostrarMensagem("Já existe um produto cadastrado com esse código.", true);
            return;
        }

        produtos.push({ codigo, descricao, quantidade, valor });
        if (!salvarProdutos()) return;
        mostrarMensagem("Produto cadastrado com sucesso!");
    } else {
        const indice = produtos.findIndex(
            produto => produto.codigo === codigoEmEdicao
        );

        if (indice === -1) {
            mostrarMensagem("Produto não encontrado.", true);
            limparFormulario();
            return;
        }

        produtos[indice] = { codigo: codigoEmEdicao, descricao, quantidade, valor };
        if (!salvarProdutos()) return;
        mostrarMensagem("Produto atualizado com sucesso!");
    }

    limparFormulario();
    atualizarSistema();
});

function editarProduto(codigo) {
    const produto = produtos.find(item => item.codigo === codigo);
    if (!produto) return;

    codigoEmEdicao = produto.codigo;
    campoCodigo.value = produto.codigo;
    campoCodigo.disabled = true;
    campoDescricao.value = produto.descricao;
    campoQuantidade.value = produto.quantidade;
    campoValor.value = produto.valor;

    botaoSalvar.textContent = "Salvar alterações";
    botaoCancelar.hidden = false;
    tituloFormulario.textContent = "Alterar produto";
    campoDescricao.focus();
}

function alterarValor(codigo) {
    const produto = produtos.find(item => item.codigo === codigo);
    if (!produto) return;

    const resposta = prompt(
        `Digite o novo valor unitário para "${produto.descricao}":`,
        String(produto.valor).replace(".", ",")
    );

    if (resposta === null) return;

    const novoValor = Number(resposta.trim().replace(",", "."));

    if (resposta.trim() === "" || !Number.isFinite(novoValor) || novoValor < 0) {
        mostrarMensagem("Digite um valor válido, igual ou maior que zero.", true);
        return;
    }

    produto.valor = novoValor;
    if (!salvarProdutos()) return;
    atualizarSistema();
    mostrarMensagem("Valor do produto alterado com sucesso!");
}

function alterarQuantidade(codigo) {
    const produto = produtos.find(item => item.codigo === codigo);
    if (!produto) return;

    const resposta = prompt(
        `Digite a nova quantidade para "${produto.descricao}":`,
        String(produto.quantidade)
    );

    if (resposta === null) return;

    const texto = resposta.trim();
    const novaQuantidade = Number(texto);

    if (texto === "" || !Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
        mostrarMensagem("Digite uma quantidade inteira igual ou maior que zero.", true);
        return;
    }

    produto.quantidade = novaQuantidade;
    if (!salvarProdutos()) return;
    atualizarSistema();
    mostrarMensagem("Quantidade do produto alterada com sucesso!");
}

function excluirProduto(codigo) {
    const produto = produtos.find(item => item.codigo === codigo);
    if (!produto) return;

    const confirmou = confirm(`Deseja excluir o produto "${produto.descricao}"?`);
    if (!confirmou) return;

    produtos = produtos.filter(item => item.codigo !== codigo);

    if (codigoEmEdicao === codigo) {
        limparFormulario();
    }

    if (!salvarProdutos()) return;
    atualizarSistema();
    mostrarMensagem("Produto excluído com sucesso!");
}

function criarCelula(texto) {
    const celula = document.createElement("td");
    celula.textContent = texto;
    return celula;
}

function criarBotao(texto, classe, acao) {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = texto;
    botao.className = classe;
    botao.addEventListener("click", acao);
    return botao;
}

function mostrarProdutos() {
    listaProdutos.replaceChildren();

    const termo = busca.value.trim().toLowerCase();
    const filtrados = produtos.filter(produto =>
        produto.codigo.toLowerCase().includes(termo) ||
        produto.descricao.toLowerCase().includes(termo)
    );

    if (filtrados.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");
        celula.colSpan = 6;
        celula.className = "vazio";
        celula.textContent = produtos.length === 0
            ? "Nenhum produto cadastrado."
            : "Nenhum produto encontrado.";
        linha.appendChild(celula);
        listaProdutos.appendChild(linha);
        return;
    }

    filtrados.forEach(produto => {
        const linha = document.createElement("tr");
        linha.appendChild(criarCelula(produto.codigo));
        linha.appendChild(criarCelula(produto.descricao));
        linha.appendChild(criarCelula(String(produto.quantidade)));
        linha.appendChild(criarCelula(formatarMoeda(produto.valor)));
        linha.appendChild(criarCelula(formatarMoeda(produto.quantidade * produto.valor)));

        const celulaAcoes = document.createElement("td");
        celulaAcoes.className = "acoes";
        celulaAcoes.append(
            criarBotao("Editar", "editar", () => editarProduto(produto.codigo)),
            criarBotao("Alterar valor", "", () => alterarValor(produto.codigo)),
            criarBotao("Alterar quantidade", "", () => alterarQuantidade(produto.codigo)),
            criarBotao("Excluir", "excluir", () => excluirProduto(produto.codigo))
        );

        linha.appendChild(celulaAcoes);
        listaProdutos.appendChild(linha);
    });
}

function atualizarResumo() {
    totalProdutos.textContent = produtos.length;

    const unidades = produtos.reduce(
        (total, produto) => total + produto.quantidade, 0
    );

    const valorTotal = produtos.reduce(
        (total, produto) => total + produto.quantidade * produto.valor, 0
    );

    totalUnidades.textContent = unidades;
    valorEstoque.textContent = formatarMoeda(valorTotal);
}

function atualizarSistema() {
    mostrarProdutos();
    atualizarResumo();
}

botaoCancelar.addEventListener("click", function() {
    limparFormulario();
    mostrarMensagem("Edição cancelada.");
});

busca.addEventListener("input", mostrarProdutos);

atualizarSistema();
