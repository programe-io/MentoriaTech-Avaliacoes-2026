const form = document.getElementById("formEstoque");
const codigo = document.getElementById("codigo");
const descricao = document.getElementById("descricao");
const quantidade = document.getElementById("quantidade");
const pesquisa = document.getElementById("pesquisa");
const lista = document.getElementById("listaProdutos");
const botaoSalvar = document.getElementById("botaoSalvar");

let produtos = JSON.parse(localStorage.getItem("estoqueProdutos")) || [];
let codigoEditando = null;

function salvarDados() {
    localStorage.setItem("estoqueProdutos", JSON.stringify(produtos));
}

function atualizarResumo() {
    document.getElementById("totalProdutos").textContent = produtos.length;

    document.getElementById("totalUnidades").textContent =
        produtos.reduce((total, produto) => total + produto.quantidade, 0);

    document.getElementById("semEstoque").textContent =
        produtos.filter(produto => produto.quantidade === 0).length;
}

function renderizarProdutos() {
    const termo = pesquisa.value.toLowerCase();

    const filtrados = produtos.filter(produto =>
        produto.codigo.toLowerCase().includes(termo) ||
        produto.descricao.toLowerCase().includes(termo)
    );

    lista.replaceChildren();

    if (filtrados.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");

        celula.colSpan = 4;
        celula.className = "vazio";
        celula.textContent = "Nenhum produto encontrado";

        linha.appendChild(celula);
        lista.appendChild(linha);
    }

    filtrados.forEach(produto => {
        const linha = document.createElement("tr");

        [produto.codigo, produto.descricao, produto.quantidade].forEach(valor => {
            const celula = document.createElement("td");
            celula.textContent = valor;
            linha.appendChild(celula);
        });

        const celulaAcoes = document.createElement("td");
        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const editar = document.createElement("button");
        editar.textContent = "Editar";
        editar.className = "editar";
        editar.addEventListener("click", () => editarProduto(produto.codigo));

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.className = "excluir";
        excluir.addEventListener("click", () => excluirProduto(produto.codigo));

        acoes.append(editar, excluir);
        celulaAcoes.appendChild(acoes);
        linha.appendChild(celulaAcoes);
        lista.appendChild(linha);
    });

    atualizarResumo();
}

form.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const novoCodigo = codigo.value.trim();
    const novaDescricao = descricao.value.trim();
    const novaQuantidade = Number(quantidade.value);

    if (
        !novoCodigo ||
        !novaDescricao ||
        !Number.isInteger(novaQuantidade) ||
        novaQuantidade < 0
    ) {
        alert("Preencha os campos corretamente.");
        return;
    }

    const duplicado = produtos.some(produto =>
        produto.codigo.toLowerCase() === novoCodigo.toLowerCase() &&
        produto.codigo !== codigoEditando
    );

    if (duplicado) {
        alert("Já existe um produto com esse código.");
        return;
    }

    if (codigoEditando !== null) {
        produtos = produtos.map(produto =>
            produto.codigo === codigoEditando
                ? {
                    codigo: novoCodigo,
                    descricao: novaDescricao,
                    quantidade: novaQuantidade
                }
                : produto
        );

        codigoEditando = null;
        botaoSalvar.textContent = "Cadastrar";
    } else {
        produtos.push({
            codigo: novoCodigo,
            descricao: novaDescricao,
            quantidade: novaQuantidade
        });
    }

    salvarDados();
    form.reset();
    renderizarProdutos();
});

function editarProduto(codigoProduto) {
    const produto = produtos.find(item => item.codigo === codigoProduto);

    if (!produto) return;

    codigoEditando = produto.codigo;
    codigo.value = produto.codigo;
    descricao.value = produto.descricao;
    quantidade.value = produto.quantidade;
    botaoSalvar.textContent = "Salvar edição";
    codigo.focus();
}

function excluirProduto(codigoProduto) {
    if (!confirm("Deseja excluir este produto?")) return;

    produtos = produtos.filter(produto => produto.codigo !== codigoProduto);

    if (codigoEditando === codigoProduto) {
        codigoEditando = null;
        form.reset();
        botaoSalvar.textContent = "Cadastrar";
    }

    salvarDados();
    renderizarProdutos();
}

pesquisa.addEventListener("input", renderizarProdutos);

renderizarProdutos();