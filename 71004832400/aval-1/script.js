
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
let movimentacoes = JSON.parse(localStorage.getItem("movimentacoes")) || [];

function salvarDados() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
    localStorage.setItem("movimentacoes", JSON.stringify(movimentacoes));
}

function moeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function mostrarPagina(pagina) {
    document.querySelectorAll(".pagina").forEach(p => {
        p.hidden = true;
    });

    document.getElementById(pagina).hidden = false;

    const titulos = {
        dashboard: "Dashboard",
        produtos: "Produtos",
        movimentacoes: "Movimentações"
    };

    document.getElementById("titulo").textContent = titulos[pagina];

    atualizarSistema();
}

document.getElementById("formProduto").addEventListener("submit", function(e) {
    e.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();

    if (produtos.some(p => p.codigo.toLowerCase() === codigo.toLowerCase())) {
        alert("Este código já está cadastrado!");
        return;
    }

    const produto = {
        id: Date.now(),
        nome: document.getElementById("nome").value.trim(),
        codigo,
        categoria: document.getElementById("categoria").value.trim(),
        preco: Number(document.getElementById("preco").value),
        quantidade: Number(document.getElementById("quantidade").value),
        minimo: Number(document.getElementById("minimo").value)
    };

    produtos.push(produto);

    registrarHistorico(produto.id, "entrada", produto.quantidade);

    salvarDados();
    this.reset();
    atualizarSistema();

    alert("Produto cadastrado com sucesso!");
});

function excluirProduto(id) {
    if (!confirm("Deseja excluir este produto?")) return;

    produtos = produtos.filter(p => p.id !== id);

    salvarDados();
    atualizarSistema();
}

function registrarHistorico(id, tipo, quantidade) {
    movimentacoes.unshift({
        produtoId: id,
        tipo,
        quantidade,
        data: new Date().toLocaleString("pt-BR")
    });
}

document.getElementById("formMovimentacao").addEventListener("submit", function(e) {
    e.preventDefault();

    const id = Number(document.getElementById("produtoMov").value);
    const tipo = document.getElementById("tipoMov").value;
    const quantidade = Number(document.getElementById("qtdMov").value);

    const produto = produtos.find(p => p.id === id);

    if (!produto || quantidade <= 0 || !Number.isInteger(quantidade)) {
        alert("Dados inválidos!");
        return;
    }

    if (tipo === "saida" && produto.quantidade < quantidade) {
        alert("Estoque insuficiente!");
        return;
    }

    if (tipo === "entrada") {
        produto.quantidade += quantidade;
    } else {
        produto.quantidade -= quantidade;
    }

    registrarHistorico(id, tipo, quantidade);

    salvarDados();
    this.reset();
    atualizarSistema();

    alert("Movimentação registrada!");
});

function tabela(lista, comAcoes = false) {
    if (!lista.length) return "<p>Nenhum produto encontrado.</p>";

    return `
    <div style="overflow-x:auto">
    <table>
        <thead>
            <tr>
                <th>Produto</th>
                <th>Código</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Situação</th>
                ${comAcoes ? "<th>Ações</th>" : ""}
            </tr>
        </thead>
        <tbody>
        ${lista.map(p => `
            <tr>
                <td>${escapar(p.nome)}</td>
                <td>${escapar(p.codigo)}</td>
                <td>${moeda(p.preco)}</td>
                <td>${p.quantidade}</td>
                <td class="${p.quantidade <= p.minimo ? "alerta" : ""}">
                    ${p.quantidade <= p.minimo ? "Estoque baixo" : "Normal"}
                </td>
                ${comAcoes ? `
                <td>
                    <button onclick="editarProduto(${p.id})">Editar</button>
                    <button onclick="excluirProduto(${p.id})">Excluir</button>
                </td>` : ""}
            </tr>
        `).join("")}
        </tbody>
    </table>
    </div>`;
}

function escapar(valor) {
    return String(valor).replace(/[&<>"']/g, c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[c]);
}

function listarProdutos() {
    const busca = document.getElementById("pesquisa").value.toLowerCase();

    const filtrados = produtos.filter(p =>
        p.nome.toLowerCase().includes(busca) ||
        p.codigo.toLowerCase().includes(busca)
    );

    document.getElementById("listaProdutos").innerHTML =
        tabela(filtrados, true);
}

function editarProduto(id) {
    const p = produtos.find(item => item.id === id);
    if (!p) return;

    const nome = prompt("Nome do produto:", p.nome);
    if (nome === null || !nome.trim()) return;

    const preco = prompt("Preço:", p.preco);
    if (preco === null || preco.trim() === "") return;

    const valor = Number(preco.replace(",", "."));

    if (!Number.isFinite(valor) || valor < 0) {
        alert("Preço inválido!");
        return;
    }

    p.nome = nome.trim();
    p.preco = valor;

    salvarDados();
    atualizarSistema();
}

function atualizarSistema() {
    const totalUnidades = produtos.reduce((s, p) => s + p.quantidade, 0);
    const valor = produtos.reduce((s, p) => s + p.preco * p.quantidade, 0);
    const baixos = produtos.filter(p => p.quantidade <= p.minimo).length;

    document.getElementById("totalProdutos").textContent = produtos.length;
    document.getElementById("totalUnidades").textContent = totalUnidades;
    document.getElementById("estoqueBaixo").textContent = baixos;
    document.getElementById("valorEstoque").textContent = moeda(valor);

    document.getElementById("listaDashboard").innerHTML = tabela(produtos);

    listarProdutos();

    document.getElementById("produtoMov").innerHTML =
        '<option value="">Selecione um produto</option>' +
        produtos.map(p =>
            `<option value="${p.id}">${escapar(p.nome)}</option>`
        ).join("");

    document.getElementById("historico").innerHTML = movimentacoes.length
        ? `<div style="overflow-x:auto"><table>
            <tr><th>Produto</th><th>Tipo</th><th>Quantidade</th><th>Data</th></tr>
            ${movimentacoes.map(m => {
                const p = produtos.find(item => item.id === m.produtoId);
                return `<tr>
                    <td>${p ? escapar(p.nome) : "Produto excluído"}</td>
                    <td>${m.tipo === "entrada" ? "Entrada" : "Saída"}</td>
                    <td>${m.quantidade}</td>
                    <td>${escapar(m.data)}</td>
                </tr>`;
            }).join("")}
        </table></div>`
        : "<p>Nenhuma movimentação registrada.</p>";
}

atualizarSistema();
