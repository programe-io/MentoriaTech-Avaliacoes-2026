// Recupera os produtos salvos no navegador com segurança
function carregarEstoque() {
    try {
        const salvo = JSON.parse(localStorage.getItem("estoque"));
        return Array.isArray(salvo) ? salvo : [];
    } catch {
        return [];
    }
}

let produtos = carregarEstoque();
let codigoEditando = null;

// Elementos do HTML
const formProduto = document.getElementById("formProduto");
const codigoInput = document.getElementById("codigo");
const descricaoInput = document.getElementById("descricao");
const quantidadeInput = document.getElementById("quantidade");
const valorInput = document.getElementById("valor");

const tabelaProdutos = document.getElementById("tabelaProdutos");
const pesquisaInput = document.getElementById("pesquisa");

const totalProdutos = document.getElementById("totalProdutos");
const totalItens = document.getElementById("totalItens");
const valorEstoque = document.getElementById("valorEstoque");

const tituloFormulario = document.getElementById("tituloFormulario");
const botaoSalvar = document.getElementById("botaoSalvar");
const botaoCancelar = document.getElementById("botaoCancelar");
const mensagemVazia = document.getElementById("mensagemVazia");

// Formatação de dinheiro
function formatarMoeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Evita que descrições sejam interpretadas como HTML
function escaparHTML(texto) {
    return String(texto).replace(/[&<>"']/g, caractere => {
        const entidades = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entidades[caractere];
    });
}

// Salva no navegador
function salvarEstoque() {
    localStorage.setItem("estoque", JSON.stringify(produtos));
}

// Atualiza os números do resumo
function atualizarResumo() {
    const quantidadeProdutos = produtos.length;

    const quantidadeTotal = produtos.reduce(
        (total, produto) => total + produto.quantidade,
        0
    );

    const valorTotal = produtos.reduce(
        (total, produto) => total + (produto.quantidade * produto.valor),
        0
    );

    totalProdutos.textContent = quantidadeProdutos;
    totalItens.textContent = quantidadeTotal;
    valorEstoque.textContent = formatarMoeda(valorTotal);
}

// Renderiza a tabela
function renderizarProdutos(lista = produtos) {
    tabelaProdutos.innerHTML = "";

    mensagemVazia.style.display = lista.length === 0 ? "block" : "none";

    lista.forEach(produto => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${escaparHTML(produto.descricao)}</td>
            <td>${produto.quantidade}</td>
            <td>${formatarMoeda(produto.valor)}</td>
            <td>${formatarMoeda(produto.quantidade * produto.valor)}</td>
            <td>
                <div class="acoes">
                    <button type="button" class="botaoEditar"
                        data-acao="editar"
                        data-codigo="${produto.codigo}">
                        Editar
                    </button>

                    <button type="button" class="botaoExcluir"
                        data-acao="excluir"
                        data-codigo="${produto.codigo}">
                        Excluir
                    </button>
                </div>
            </td>
        `;

        tabelaProdutos.appendChild(linha);
    });

    atualizarResumo();
}

// Cadastra ou atualiza um produto
formProduto.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = Number(codigoInput.value);
    const descricao = descricaoInput.value.trim();
    const quantidade = Number(quantidadeInput.value);
    const valor = Number(valorInput.value);

    if (!Number.isInteger(codigo) || codigo <= 0) {
        alert("O código deve ser um número inteiro positivo.");
        return;
    }

    if (!descricao) {
        alert("Informe a descrição do produto.");
        return;
    }

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        alert("A quantidade deve ser um número inteiro maior que zero.");
        return;
    }

    if (!Number.isFinite(valor) || valor < 0) {
        alert("Informe um valor válido.");
        return;
    }

    // Modo edição
    if (codigoEditando !== null) {
        const produto = produtos.find(item => item.codigo === codigoEditando);

        if (!produto) {
            alert("Produto não encontrado.");
            cancelarEdicao();
            return;
        }

        produto.descricao = descricao;
        produto.quantidade = quantidade;
        produto.valor = valor;

        alert("Produto atualizado com sucesso!");
    } else {
        // Verifica se o código já existe
        const existe = produtos.some(item => item.codigo === codigo);

        if (existe) {
            alert("Já existe um produto com esse código.");
            return;
        }

        const novoProduto = {
            codigo: codigo,
            descricao: descricao,
            quantidade: quantidade,
            valor: valor
        };

        produtos.push(novoProduto);

        alert("Produto cadastrado com sucesso!");
    }

    salvarEstoque();
    renderizarProdutos();
    cancelarEdicao();
});

// Editar ou excluir usando os botões da tabela
tabelaProdutos.addEventListener("click", function(event) {
    const botao = event.target.closest("button");

    if (!botao) return;

    const acao = botao.dataset.acao;
    const codigo = Number(botao.dataset.codigo);

    if (acao === "editar") {
        editarProduto(codigo);
    }

    if (acao === "excluir") {
        excluirProduto(codigo);
    }
});

// Editar produto
function editarProduto(codigo) {
    const produto = produtos.find(item => item.codigo === codigo);

    if (!produto) {
        alert("Produto não encontrado.");
        return;
    }

    codigoEditando = codigo;

    codigoInput.value = produto.codigo;
    descricaoInput.value = produto.descricao;
    quantidadeInput.value = produto.quantidade;
    valorInput.value = produto.valor;

    // O código não pode ser alterado durante a edição
    codigoInput.disabled = true;

    tituloFormulario.textContent = "Editar produto";
    botaoSalvar.textContent = "Salvar alterações";
    botaoCancelar.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Excluir produto
function excluirProduto(codigo) {
    const produto = produtos.find(item => item.codigo === codigo);

    if (!produto) {
        alert("Produto não encontrado.");
        return;
    }

    const confirmar = confirm(
        `Deseja realmente excluir "${produto.descricao}"?`
    );

    if (!confirmar) return;

    produtos = produtos.filter(item => item.codigo !== codigo);

    salvarEstoque();
    renderizarProdutos();

    if (codigoEditando === codigo) {
        cancelarEdicao();
    }

    alert("Produto excluído com sucesso!");
}

// Cancela a edição
function cancelarEdicao() {
    codigoEditando = null;

    formProduto.reset();

    codigoInput.disabled = false;

    tituloFormulario.textContent = "Cadastrar produto";
    botaoSalvar.textContent = "Cadastrar produto";
    botaoCancelar.hidden = true;
}

// Botão cancelar
botaoCancelar.addEventListener("click", cancelarEdicao);

// Pesquisa de produtos
pesquisaInput.addEventListener("input", function() {
    const termo = pesquisaInput.value.toLowerCase().trim();

    const filtrados = produtos.filter(produto =>
        produto.descricao.toLowerCase().includes(termo) ||
        String(produto.codigo).includes(termo)
    );

    renderizarProdutos(filtrados);
});

// Inicialização
renderizarProdutos();