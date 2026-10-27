
const $ = (id) => document.getElementById(id);

const moeda = (valor) =>
    Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

const escapar = (texto) =>
    String(texto).replace(/[&<>"']/g, (caractere) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[caractere]);

function carregar(chave) {
    try {
        const dados = JSON.parse(localStorage.getItem(chave) || "[]");
        return Array.isArray(dados) ? dados : [];
    } catch {
        return [];
    }
}

let produtos = carregar("stockflow_produtos");
let historico = carregar("stockflow_historico");

function salvarDados() {
    try {
        localStorage.setItem("stockflow_produtos", JSON.stringify(produtos));
        localStorage.setItem("stockflow_historico", JSON.stringify(historico));
        return true;
    } catch {
        alert("Não foi possível salvar os dados. Verifique o armazenamento do navegador.");
        return false;
    }
}

function gerarId() {
    return Date.now().toString(36) +
        Math.random().toString(36).slice(2, 8);
}

function atualizarIndicadores() {
    $("totalProdutos").textContent = produtos.length;

    $("totalUnidades").textContent = produtos.reduce(
        (total, produto) => total + produto.quantidade, 0
    );

    const valor = produtos.reduce(
        (total, produto) => total + produto.quantidade * produto.preco, 0
    );

    $("valorEstoque").textContent = moeda(valor);

    $("estoqueBaixo").textContent = produtos.filter(
        produto => produto.quantidade <= 5
    ).length;
}

function atualizarSelecao() {
    const selecao = $("produtoMovimentacao");
    const selecionado = selecao.value;

    selecao.innerHTML =
        '<option value="">Selecione um produto</option>';

    produtos.forEach(produto => {
        const opcao = document.createElement("option");
        opcao.value = produto.id;
        opcao.textContent = `${produto.nome} (${produto.quantidade} un.)`;
        selecao.appendChild(opcao);
    });

    if (produtos.some(p => p.id === selecionado)) {
        selecao.value = selecionado;
    }
}

function renderizarProdutos() {
    const lista = $("listaProdutos");
    const busca = $("pesquisa").value.trim().toLowerCase();

    const filtrados = produtos.filter(produto =>
        [produto.nome, produto.codigo, produto.categoria]
            .some(valor => valor.toLowerCase().includes(busca))
    );

    lista.innerHTML = filtrados.map(produto => {
        let status = "Em estoque";
        let classe = "badge-ok";

        if (produto.quantidade === 0) {
            status = "Sem estoque";
            classe = "badge-out";
        } else if (produto.quantidade <= 5) {
            status = "Estoque baixo";
            classe = "badge-low";
        }

        return `
            <tr>
                <td>${escapar(produto.codigo)}</td>
                <td>${escapar(produto.nome)}</td>
                <td>${escapar(produto.categoria)}</td>
                <td>${produto.quantidade}</td>
                <td>${moeda(produto.preco)}</td>
                <td>${moeda(produto.quantidade * produto.preco)}</td>
                <td><span class="badge ${classe}">${status}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-edit"
                            data-acao="editar" data-id="${produto.id}">
                            Editar
                        </button>
                        <button class="btn-delete"
                            data-acao="excluir" data-id="${produto.id}">
                            Excluir
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join("");

    $("mensagemVazia").hidden = filtrados.length > 0;
}

function renderizarHistorico() {
    const lista = $("historico");

    lista.innerHTML = historico.slice(0, 100).map(item => `
        <tr>
            <td>${escapar(item.data)}</td>
            <td>${escapar(item.nome)}</td>
            <td>
                <span class="badge ${
                    item.tipo === "entrada" ? "badge-ok" : "badge-low"
                }">
                    ${item.tipo === "entrada" ? "Entrada" : "Saída"}
                </span>
            </td>
            <td>${item.quantidade}</td>
        </tr>
    `).join("");

    $("historicoVazio").hidden = historico.length > 0;
}

function atualizarTela() {
    atualizarIndicadores();
    atualizarSelecao();
    renderizarProdutos();
    renderizarHistorico();
}

// Cadastro e edição de produtos
$("formProduto").addEventListener("submit", (evento) => {
    evento.preventDefault();

    const id = $("produtoId").value;
    const nome = $("nome").value.trim();
    const codigo = $("codigo").value.trim();
    const categoria = $("categoria").value.trim();
    const quantidade = Number($("quantidade").value);
    const preco = Number($("preco").value);

    if (!nome || !codigo || !categoria) {
        alert("Preencha todos os campos.");
        return;
    }

    if (
        !Number.isSafeInteger(quantidade) || quantidade < 0 ||
        !Number.isFinite(preco) || preco < 0
    ) {
        alert("Informe uma quantidade inteira válida e um preço não negativo.");
        return;
    }

    const codigoExiste = produtos.some(produto =>
        produto.codigo.toLowerCase() === codigo.toLowerCase() &&
        produto.id !== id
    );

    if (codigoExiste) {
        alert("Esse código já está cadastrado em outro produto.");
        return;
    }

    const produto = { id: id || gerarId(), nome, codigo, categoria, quantidade, preco };

    const anteriores = produtos;

    if (id) {
        produtos = produtos.map(p => p.id === id ? produto : p);
    } else {
        produtos.push(produto);
    }

    if (!salvarDados()) {
        produtos = anteriores;
        return;
    }

    $("formProduto").reset();
    $("produtoId").value = "";
    $("tituloFormulario").textContent = "Cadastrar produto";
    $("btnSalvar").textContent = "Cadastrar produto";
    $("btnCancelar").hidden = true;

    atualizarTela();
    alert(id ? "Produto atualizado!" : "Produto cadastrado com sucesso!");
});

// Ações de editar e excluir
$("listaProdutos").addEventListener("click", (evento) => {
    const botao = evento.target.closest("button[data-acao]");
    if (!botao) return;

    const produto = produtos.find(p => p.id === botao.dataset.id);
    if (!produto) return;

    if (botao.dataset.acao === "editar") {
        $("produtoId").value = produto.id;
        $("nome").value = produto.nome;
        $("codigo").value = produto.codigo;
        $("categoria").value = produto.categoria;
        $("quantidade").value = produto.quantidade;
        $("preco").value = produto.preco;

        $("tituloFormulario").textContent = "Editar produto";
        $("btnSalvar").textContent = "Salvar alterações";
        $("btnCancelar").hidden = false;

        $("cadastro").scrollIntoView({ behavior: "smooth" });
    }

    if (botao.dataset.acao === "excluir") {
        if (!confirm(`Deseja excluir o produto "${produto.nome}"?`)) return;

        const anteriores = produtos;
        produtos = produtos.filter(p => p.id !== produto.id);

        if (!salvarDados()) {
            produtos = anteriores;
            return;
        }

        atualizarTela();
    }
});

$("btnCancelar").addEventListener("click", () => {
    $("formProduto").reset();
    $("produtoId").value = "";
    $("tituloFormulario").textContent = "Cadastrar produto";
    $("btnSalvar").textContent = "Cadastrar produto";
    $("btnCancelar").hidden = true;
});

$("pesquisa").addEventListener("input", renderizarProdutos);

// Entradas e saídas de estoque
$("formMovimentacao").addEventListener("submit", (evento) => {
    evento.preventDefault();

    const id = $("produtoMovimentacao").value;
    const tipo = $("tipoMovimentacao").value;
    const quantidade = Number($("quantidadeMovimentacao").value);

    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        alert("Selecione um produto válido.");
        return;
    }

    if (!Number.isSafeInteger(quantidade) || quantidade < 1) {
        alert("Informe uma quantidade inteira maior que zero.");
        return;
    }

    if (
        tipo === "entrada" &&
        produto.quantidade > Number.MAX_SAFE_INTEGER - quantidade
    ) {
        alert("Quantidade muito grande.");
        return;
    }

    if (tipo === "saida" && quantidade > produto.quantidade) {
        alert("Estoque insuficiente para essa saída.");
        return;
    }

    const quantidadeAnterior = produto.quantidade;
    const historicoAnterior = historico;

    produto.quantidade += tipo === "entrada" ? quantidade : -quantidade;

    historico = [{
        id: gerarId(),
        nome: produto.nome,
        tipo,
        quantidade,
        data: new Date().toLocaleString("pt-BR")
    }, ...historico].slice(0, 100);

    if (!salvarDados()) {
        produto.quantidade = quantidadeAnterior;
        historico = historicoAnterior;
        return;
    }

    $("formMovimentacao").reset();
    atualizarTela();

    alert("Movimentação registrada com sucesso!");
});

atualizarTela();
