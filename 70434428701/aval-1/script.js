
const STORAGE_KEY = "gerenciadorEstoqueProdutos";

let produtos = [];

try {
    const dados = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
    );

    if (Array.isArray(dados)) {
        produtos = dados.filter(p =>
            p &&
            typeof p.id === "string" &&
            typeof p.nome === "string" &&
            typeof p.codigo === "string"
        );
    }
} catch {
    produtos = [];
}

const form = document.getElementById("formProduto");
const lista = document.getElementById("listaProdutos");
const pesquisa = document.getElementById("pesquisa");
const filtroCategoria = document.getElementById("filtroCategoria");

const campo = id => document.getElementById(id);

const dinheiro = valor =>
    Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

function salvarDados() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));
}

function atualizarResumo() {
    campo("totalProdutos").textContent = produtos.length;

    campo("totalUnidades").textContent =
        produtos.reduce((soma, p) => soma + p.quantidade, 0);

    const valor = produtos.reduce(
        (soma, p) => soma + p.quantidade * p.custo,
        0
    );

    campo("valorEstoque").textContent = dinheiro(valor);
}

function atualizarCategorias() {
    const selecionada = filtroCategoria.value;

    const categorias = [...new Set(
        produtos.map(p => p.categoria)
    )].sort((a, b) => a.localeCompare(b, "pt-BR"));

    filtroCategoria.replaceChildren(
        new Option("Todas as categorias", ""),
        ...categorias.map(categoria =>
            new Option(categoria, categoria)
        )
    );

    if (categorias.includes(selecionada)) {
        filtroCategoria.value = selecionada;
    }
}

function renderizarProdutos() {
    const termo = pesquisa.value.trim().toLocaleLowerCase("pt-BR");
    const categoria = filtroCategoria.value;

    const filtrados = produtos.filter(p => {
        const correspondeTexto =
            p.nome.toLocaleLowerCase("pt-BR").includes(termo) ||
            p.codigo.toLocaleLowerCase("pt-BR").includes(termo);

        return correspondeTexto &&
            (!categoria || p.categoria === categoria);
    });

    lista.replaceChildren();

    filtrados.forEach(p => {
        const linha = document.createElement("tr");

        const valores = [
            p.codigo,
            p.nome,
            p.categoria,
            p.quantidade,
            dinheiro(p.custo),
            dinheiro(p.preco)
        ];

        valores.forEach(valor => {
            const td = document.createElement("td");
            td.textContent = valor;
            linha.appendChild(td);
        });

        const tdStatus = document.createElement("td");
        const status = document.createElement("span");
        const estoqueBaixo = p.quantidade <= p.estoqueMinimo;

        status.className = "status " +
            (estoqueBaixo ? "baixo" : "ok");

        status.textContent = estoqueBaixo
            ? "Estoque baixo"
            : "Normal";

        tdStatus.appendChild(status);
        linha.appendChild(tdStatus);

        const tdAcoes = document.createElement("td");

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.className = "acao-editar";
        btnEditar.addEventListener("click", () => editarProduto(p.id));

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.className = "acao-excluir";
        btnExcluir.addEventListener("click", () => excluirProduto(p.id));

        tdAcoes.append(btnEditar, btnExcluir);
        linha.appendChild(tdAcoes);
        lista.appendChild(linha);
    });

    campo("mensagemVazia").textContent = filtrados.length
        ? ""
        : produtos.length
            ? "Nenhum produto corresponde à pesquisa."
            : "Nenhum produto cadastrado.";

    atualizarResumo();
    atualizarCategorias();
}

form.addEventListener("submit", event => {
    event.preventDefault();

    const id = campo("produtoId").value;
    const nome = campo("nome").value.trim();
    const codigo = campo("codigo").value.trim();
    const categoria = campo("categoria").value.trim();
    const quantidade = Number(campo("quantidade").value);
    const custo = Number(campo("custo").value);
    const preco = Number(campo("preco").value);
    const estoqueMinimo = Number(campo("estoqueMinimo").value);

    if (!nome || !codigo || !categoria) {
        alert("Preencha todos os campos de texto.");
        return;
    }

    if (
        !Number.isInteger(quantidade) || quantidade < 0 ||
        !Number.isInteger(estoqueMinimo) || estoqueMinimo < 0 ||
        !Number.isFinite(custo) || custo < 0 ||
        !Number.isFinite(preco) || preco < 0
    ) {
        alert("Informe valores válidos para quantidade e preços.");
        return;
    }

    const codigoExiste = produtos.some(p =>
        p.codigo.toLocaleLowerCase("pt-BR") ===
            codigo.toLocaleLowerCase("pt-BR") &&
        p.id !== id
    );

    if (codigoExiste) {
        alert("Já existe um produto com esse código.");
        return;
    }

    const produto = {
        id: id || (
            typeof crypto.randomUUID === "function"
                ? crypto.randomUUID()
                : String(Date.now()) + Math.random().toString(16).slice(2)
        ),
        nome,
        codigo,
        categoria,
        quantidade,
        custo,
        preco,
        estoqueMinimo
    };

    if (id) {
        produtos = produtos.map(p => p.id === id ? produto : p);
    } else {
        produtos.push(produto);
    }

    salvarDados();
    form.reset();
    campo("produtoId").value = "";
    campo("estoqueMinimo").value = 5;
    campo("tituloFormulario").textContent = "Cadastrar produto";
    campo("btnSalvar").textContent = "Cadastrar produto";
    campo("btnCancelar").classList.add("oculto");

    renderizarProdutos();
});

function editarProduto(id) {
    const p = produtos.find(item => item.id === id);
    if (!p) return;

    campo("produtoId").value = p.id;
    campo("nome").value = p.nome;
    campo("codigo").value = p.codigo;
    campo("categoria").value = p.categoria;
    campo("quantidade").value = p.quantidade;
    campo("custo").value = p.custo;
    campo("preco").value = p.preco;
    campo("estoqueMinimo").value = p.estoqueMinimo;

    campo("tituloFormulario").textContent = "Editar produto";
    campo("btnSalvar").textContent = "Salvar alterações";
    campo("btnCancelar").classList.remove("oculto");

    form.scrollIntoView({ behavior: "smooth", block: "start" });
    campo("nome").focus();
}

function excluirProduto(id) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;

    if (!confirm(`Deseja excluir o produto "${produto.nome}"?`)) {
        return;
    }

    produtos = produtos.filter(p => p.id !== id);

    if (campo("produtoId").value === id) {
        form.reset();
        campo("produtoId").value = "";
        campo("estoqueMinimo").value = 5;
        campo("tituloFormulario").textContent = "Cadastrar produto";
        campo("btnSalvar").textContent = "Cadastrar produto";
        campo("btnCancelar").classList.add("oculto");
    }

    salvarDados();
    renderizarProdutos();
}

campo("btnCancelar").addEventListener("click", () => {
    form.reset();
    campo("produtoId").value = "";
    campo("estoqueMinimo").value = 5;
    campo("tituloFormulario").textContent = "Cadastrar produto";
    campo("btnSalvar").textContent = "Cadastrar produto";
    campo("btnCancelar").classList.add("oculto");
});

pesquisa.addEventListener("input", renderizarProdutos);
filtroCategoria.addEventListener("change", renderizarProdutos);

renderizarProdutos();
