
let produtos = JSON.parse(localStorage.getItem("fitstock")) || [];

const form = document.getElementById("produtoForm");
const lista = document.getElementById("listaProdutos");

const dinheiro = valor =>
    valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

function salvarDados() {
    localStorage.setItem("fitstock", JSON.stringify(produtos));
}

function atualizarDashboard() {
    const total = produtos.length;

    const unidades = produtos.reduce(
        (soma, p) => soma + p.quantidade, 0
    );

    const baixo = produtos.filter(
        p => p.quantidade <= p.minimo
    ).length;

    const valor = produtos.reduce(
        (soma, p) => soma + p.quantidade * p.preco, 0
    );

    document.getElementById("totalProdutos").textContent = total;

    document.getElementById("totalUnidades").textContent = unidades;

    document.getElementById("estoqueBaixo").textContent = baixo;

    document.getElementById("valorEstoque").textContent = dinheiro(valor);
}

function renderizarProdutos() {
    lista.innerHTML = "";

    const busca = document.getElementById("pesquisa")
        .value.toLowerCase();

    const categoria = document.getElementById("filtroCategoria").value;

    const filtrados = produtos.filter(p => {
        return p.nome.toLowerCase().includes(busca) &&
            (!categoria || p.categoria === categoria);
    });

    document.getElementById("mensagemVazia").style.display =
        filtrados.length === 0 ? "block" : "none";

    filtrados.forEach(p => {
        const status = p.quantidade <= p.minimo
            ? '<span class="low">⚠ Estoque baixo</span>'
            : '<span class="ok">✓ Disponível</span>';

        const tr = document.createElement("tr");

        const colunas = [
            p.nome,
            p.categoria,
            p.quantidade,
            dinheiro(p.preco),
            dinheiro(p.quantidade * p.preco)
        ];

        colunas.forEach(valor => {
            const td = document.createElement("td");
            td.textContent = valor;
            tr.appendChild(td);
        });

        const tdStatus = document.createElement("td");
        tdStatus.innerHTML = status;
        tr.appendChild(tdStatus);

        const tdAcoes = document.createElement("td");

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.className = "action edit";
        btnEditar.addEventListener("click", () => editarProduto(p.id));

        const btnEntrada = document.createElement("button");
        btnEntrada.textContent = "+";
        btnEntrada.title = "Entrada de estoque";
        btnEntrada.className = "action stock";
        btnEntrada.addEventListener("click", () => movimentar(p.id, "entrada"));

        const btnSaida = document.createElement("button");
        btnSaida.textContent = "-";
        btnSaida.title = "Saída de estoque";
        btnSaida.className = "action stock";
        btnSaida.addEventListener("click", () => movimentar(p.id, "saida"));

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.className = "action delete";
        btnExcluir.addEventListener("click", () => excluirProduto(p.id));

        tdAcoes.append(btnEditar, btnEntrada, btnSaida, btnExcluir);
        tr.appendChild(tdAcoes);

        lista.appendChild(tr);
    });

    atualizarDashboard();
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const id = document.getElementById("produtoId").value;

    const nome = document.getElementById("nome").value.trim();
    const categoria = document.getElementById("categoria").value;
    const quantidade = Number(document.getElementById("quantidade").value);
    const preco = Number(document.getElementById("preco").value);
    const minimo = Number(document.getElementById("minimo").value);

    if (!nome || !categoria || quantidade < 0 ||
        preco < 0 || minimo < 0 ||
        !Number.isFinite(quantidade) ||
        !Number.isFinite(preco) ||
        !Number.isFinite(minimo)) {
        alert("Preencha os campos com valores válidos!");
        return;
    }

    if (id) {
        const produto = produtos.find(p => p.id === id);

        if (produto) {
            produto.nome = nome;
            produto.categoria = categoria;
            produto.quantidade = quantidade;
            produto.preco = preco;
            produto.minimo = minimo;
        }
    } else {
        const novoProduto = {
            id: crypto.randomUUID(),
            nome,
            categoria,
            quantidade,
            preco,
            minimo
        };

        produtos.push(novoProduto);
    }

    salvarDados();
    form.reset();
    cancelarEdicao();
    renderizarProdutos();

    alert(id ? "Produto atualizado!" : "Produto cadastrado!");
});

function editarProduto(id) {
    const p = produtos.find(item => item.id === id);

    if (!p) return;

    document.getElementById("produtoId").value = p.id;
    document.getElementById("nome").value = p.nome;
    document.getElementById("categoria").value = p.categoria;
    document.getElementById("quantidade").value = p.quantidade;
    document.getElementById("preco").value = p.preco;
    document.getElementById("minimo").value = p.minimo;

    document.getElementById("btnSalvar").textContent = "Salvar Alterações";
    document.getElementById("btnCancelar").hidden = false;

    document.getElementById("cadastro").scrollIntoView({
        behavior: "smooth"
    });
}

function cancelarEdicao() {
    document.getElementById("produtoId").value = "";
    document.getElementById("btnSalvar").textContent = "Cadastrar Produto";
    document.getElementById("btnCancelar").hidden = true;
}

document.getElementById("btnCancelar").addEventListener(
    "click", () => {
        form.reset();
        cancelarEdicao();
    }
);

function excluirProduto(id) {
    if (!confirm("Deseja realmente excluir este produto?")) return;

    produtos = produtos.filter(p => p.id !== id);

    salvarDados();
    renderizarProdutos();
}

function movimentar(id, tipo) {
    const p = produtos.find(item => item.id === id);

    if (!p) return;

    const operacao = tipo === "entrada" ? "Entrada" : "Saída";

    const quantidade = Number(
        prompt(`${operacao} de estoque: ${p.nome}\nDigite a quantidade:`)
    );

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        alert("Digite uma quantidade inteira maior que zero.");
        return;
    }

    if (tipo === "saida" && quantidade > p.quantidade) {
        alert("Estoque insuficiente!");
        return;
    }

    if (tipo === "entrada") {
        p.quantidade += quantidade;
    } else {
        p.quantidade -= quantidade;
    }

    salvarDados();
    renderizarProdutos();

    alert(`${operacao} realizada com sucesso!`);
}

document.getElementById("pesquisa").addEventListener(
    "input", renderizarProdutos
);

document.getElementById("filtroCategoria").addEventListener(
    "change", renderizarProdutos
);

// Produtos de demonstração na primeira utilização
if (!localStorage.getItem("fitstock")) {
    produtos = [
        {
            id: crypto.randomUUID(),
            nome: "Whey Protein 900g",
            categoria: "Suplementos",
            quantidade: 25,
            preco: 119.90,
            minimo: 5
        },
        {
            id: crypto.randomUUID(),
            nome: "Creatina 300g",
            categoria: "Suplementos",
            quantidade: 3,
            preco: 89.90,
            minimo: 5
        },
        {
            id: crypto.randomUUID(),
            nome: "Camiseta Dry Fit",
            categoria: "Roupas Fitness",
            quantidade: 18,
            preco: 59.90,
            minimo: 5
        },
        {
            id: crypto.randomUUID(),
            nome: "Garrafa Squeeze",
            categoria: "Acessórios",
            quantidade: 30,
            preco: 29.90,
            minimo: 10
        },
        {
            id: crypto.randomUUID(),
            nome: "Colchonete Fitness",
            categoria: "Equipamentos",
            quantidade: 2,
            preco: 79.90,
            minimo: 5
        }
    ];

    salvarDados();
}

renderizarProdutos();
