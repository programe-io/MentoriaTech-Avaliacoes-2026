
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

const form = document.getElementById("formProduto");
const lista = document.getElementById("listaProdutos");

// Salvar produtos
function salvarDados() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

// Formatar moeda
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Cadastrar e atualizar
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const id = document.getElementById("produtoId").value;
    const nome = document.getElementById("nome").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const preco = Number(document.getElementById("preco").value);

    if (!nome || !categoria || quantidade < 0 || preco < 0 ||
        !Number.isFinite(quantidade) || !Number.isFinite(preco)) {
        alert("Preencha os campos corretamente!");
        return;
    }

    if (id) {
        const produto = produtos.find(p => p.id === Number(id));

        if (!produto) return;

        produto.nome = nome;
        produto.categoria = categoria;
        produto.quantidade = quantidade;
        produto.preco = preco;

        alert("Produto atualizado!");

    } else {
        produtos.push({
            id: Date.now(),
            nome,
            categoria,
            quantidade,
            preco
        });

        alert("Produto cadastrado!");
    }

    salvarDados();
    form.reset();

    document.getElementById("produtoId").value = "";
    document.getElementById("btnSalvar").textContent = "Cadastrar Produto";

    atualizarTela();
});

// Atualizar tabela
function atualizarTela(filtro = "") {
    lista.innerHTML = "";

    const filtrados = produtos.filter(p =>
        p.nome.toLowerCase().includes(filtro.toLowerCase())
    );

    filtrados.forEach(produto => {
        const linha = document.createElement("tr");

        const valores = [
            produto.nome,
            produto.categoria,
            produto.quantidade,
            formatarMoeda(produto.preco),
            formatarMoeda(produto.quantidade * produto.preco)
        ];

        valores.forEach(valor => {
            const td = document.createElement("td");
            td.textContent = valor;
            linha.appendChild(td);
        });

        const status = document.createElement("td");

        status.textContent = produto.quantidade <= 5
            ? "Estoque Baixo"
            : "Disponível";

        status.className = produto.quantidade <= 5
            ? "status-baixo"
            : "status-ok";

        linha.appendChild(status);

        const acoes = document.createElement("td");

        // Botão editar
        const editar = document.createElement("button");
        editar.textContent = "Editar";
        editar.className = "btn-editar";
        editar.addEventListener("click", () => editarProduto(produto.id));

        // Botão excluir
        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.className = "btn-excluir";
        excluir.addEventListener("click", () => excluirProduto(produto.id));

        // Botão entrada
        const entrada = document.createElement("button");
        entrada.textContent = "Entrada";
        entrada.className = "btn-entrada";
        entrada.addEventListener("click", () =>
            movimentarEstoque(produto.id, "entrada")
        );

        // Botão saída
        const saida = document.createElement("button");
        saida.textContent = "Saída";
        saida.className = "btn-saida";
        saida.addEventListener("click", () =>
            movimentarEstoque(produto.id, "saida")
        );

        acoes.append(editar, excluir, entrada, saida);
        linha.appendChild(acoes);

        lista.appendChild(linha);
    });

    atualizarResumo();
}

// Atualizar indicadores
function atualizarResumo() {
    const totalProdutos = produtos.length;

    const totalItens = produtos.reduce(
        (soma, p) => soma + p.quantidade, 0
    );

    const valorTotal = produtos.reduce(
        (soma, p) => soma + p.quantidade * p.preco, 0
    );

    document.getElementById("totalProdutos").textContent = totalProdutos;
    document.getElementById("totalItens").textContent = totalItens;
    document.getElementById("valorEstoque").textContent =
        formatarMoeda(valorTotal);
}

// Editar produto
function editarProduto(id) {
    const produto = produtos.find(p => p.id === id);

    if (!produto) return;

    document.getElementById("produtoId").value = produto.id;
    document.getElementById("nome").value = produto.nome;
    document.getElementById("categoria").value = produto.categoria;
    document.getElementById("quantidade").value = produto.quantidade;
    document.getElementById("preco").value = produto.preco;

    document.getElementById("btnSalvar").textContent =
        "Atualizar Produto";

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Excluir produto
function excluirProduto(id) {
    if (!confirm("Deseja excluir este produto?")) return;

    produtos = produtos.filter(p => p.id !== id);

    salvarDados();
    atualizarTela();
}

// Entrada e saída
function movimentarEstoque(id, tipo) {
    const produto = produtos.find(p => p.id === id);

    if (!produto) return;

    const quantidade = Number(prompt("Digite a quantidade:"));

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        alert("Digite uma quantidade inteira válida!");
        return;
    }

    if (tipo === "entrada") {
        produto.quantidade += quantidade;
    } else {
        if (quantidade > produto.quantidade) {
            alert("Estoque insuficiente!");
            return;
        }

        produto.quantidade -= quantidade;
    }

    salvarDados();
    atualizarTela();

    alert("Movimentação realizada com sucesso!");
}

// Pesquisa
document.getElementById("pesquisa").addEventListener("input", function() {
    atualizarTela(this.value);
});

// Iniciar sistema
atualizarTela();
