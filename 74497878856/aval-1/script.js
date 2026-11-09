
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let movimentacoes = JSON.parse(localStorage.getItem("movimentacoes")) || [];

function salvarDados() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("movimentacoes", JSON.stringify(movimentacoes));
}

function mostrarPagina(pagina) {
    document.querySelectorAll(".pagina").forEach(p => {
        p.classList.add("escondido");
    });

    document.getElementById(pagina).classList.remove("escondido");

    const titulos = {
        dashboard: "Dashboard",
        produtos: "Produtos",
        usuarios: "Usuários",
        estoque: "Movimentações"
    };

    document.getElementById("titulo").textContent = titulos[pagina];

    atualizarDashboard();
    listarProdutos();
    listarUsuarios();
    atualizarSelectProdutos();
    listarMovimentacoes();
}

// CADASTRO DE PRODUTOS

document.getElementById("formProduto").addEventListener("submit", function(e) {
    e.preventDefault();

    const id = document.getElementById("produtoId").value;

    const produto = {
        id: id || Date.now().toString(),
        codigo: document.getElementById("codigoProduto").value.trim(),
        nome: document.getElementById("nomeProduto").value.trim(),
        categoria: document.getElementById("categoriaProduto").value.trim(),
        compra: Number(document.getElementById("precoCompra").value),
        venda: Number(document.getElementById("precoVenda").value),
        quantidade: Number(document.getElementById("quantidadeProduto").value),
        minimo: Number(document.getElementById("estoqueMinimo").value)
    };

    if (!produto.codigo || !produto.nome || !produto.categoria ||
        !Number.isFinite(produto.compra) || !Number.isFinite(produto.venda) ||
        !Number.isInteger(produto.quantidade) || !Number.isInteger(produto.minimo)) {
        alert("Verifique os dados do produto.");
        return;
    }

    if (produtos.some(p => p.codigo.toLowerCase() === produto.codigo.toLowerCase() && p.id !== id)) {
        alert("Este código já está cadastrado!");
        return;
    }

    if (id) {
        produtos = produtos.map(p => p.id === id ? produto : p);
    } else {
        produtos.push(produto);
    }

    salvarDados();
    limparProduto();
    listarProdutos();
    atualizarDashboard();
    atualizarSelectProdutos();

    alert("Produto salvo com sucesso!");
});

function listarProdutos() {
    const lista = document.getElementById("listaProdutos");
    const pesquisa = document.getElementById("pesquisaProduto").value.toLowerCase();

    lista.innerHTML = "";

    produtos.filter(p =>
        p.nome.toLowerCase().includes(pesquisa) ||
        p.codigo.toLowerCase().includes(pesquisa)
    ).forEach(p => {
        lista.innerHTML += `
        <tr>
            <td>${escapar(p.codigo)}</td>
            <td>${escapar(p.nome)}</td>
            <td>${escapar(p.categoria)}</td>
            <td>${moeda(p.compra)}</td>
            <td>${moeda(p.venda)}</td>
            <td>${p.quantidade}</td>
            <td>
                <button class="editar" onclick="editarProduto('${p.id}')">Editar</button>
                <button class="excluir" onclick="excluirProduto('${p.id}')">Excluir</button>
            </td>
        </tr>`;
    });
}

function editarProduto(id) {
    const p = produtos.find(p => p.id === id);
    if (!p) return;

    document.getElementById("produtoId").value = p.id;
    document.getElementById("codigoProduto").value = p.codigo;
    document.getElementById("nomeProduto").value = p.nome;
    document.getElementById("categoriaProduto").value = p.categoria;
    document.getElementById("precoCompra").value = p.compra;
    document.getElementById("precoVenda").value = p.venda;
    document.getElementById("quantidadeProduto").value = p.quantidade;
    document.getElementById("estoqueMinimo").value = p.minimo;
    mostrarPagina("produtos");
}

function excluirProduto(id) {
    if (!confirm("Deseja realmente excluir este produto?")) return;

    produtos = produtos.filter(p => p.id !== id);
    salvarDados();
    listarProdutos();
    atualizarDashboard();
    atualizarSelectProdutos();
}

function limparProduto() {
    document.getElementById("formProduto").reset();
    document.getElementById("produtoId").value = "";
}

// CADASTRO DE USUÁRIOS

document.getElementById("formUsuario").addEventListener("submit", function(e) {
    e.preventDefault();

    const id = document.getElementById("usuarioId").value;
    const senha = document.getElementById("senhaUsuario").value;

    const usuario = {
        id: id || Date.now().toString(),
        nome: document.getElementById("nomeUsuario").value.trim(),
        cpf: document.getElementById("cpfUsuario").value.trim(),
        email: document.getElementById("emailUsuario").value.trim(),
        login: document.getElementById("loginUsuario").value.trim(),
        senha: senha,
        tipo: document.getElementById("tipoUsuario").value
    };

    if (usuarios.some(u => u.login.toLowerCase() === usuario.login.toLowerCase() && u.id !== id)) {
        alert("Este login já está cadastrado!");
        return;
    }

    if (usuarios.some(u => u.cpf === usuario.cpf && u.id !== id)) {
        alert("Este CPF já está cadastrado!");
        return;
    }

    if (id && !senha) {
        usuario.senha = usuarios.find(u => u.id === id).senha;
    }

    if (id) {
        usuarios = usuarios.map(u => u.id === id ? usuario : u);
    } else {
        usuarios.push(usuario);
    }

    salvarDados();
    limparUsuario();
    listarUsuarios();
    atualizarDashboard();

    alert("Usuário cadastrado com sucesso!");
});

function listarUsuarios() {
    const lista = document.getElementById("listaUsuarios");
    lista.innerHTML = "";

    usuarios.forEach(u => {
        lista.innerHTML += `
        <tr>
            <td>${escapar(u.nome)}</td>
            <td>${escapar(u.cpf)}</td>
            <td>${escapar(u.email)}</td>
            <td>${escapar(u.login)}</td>
            <td>${escapar(u.tipo)}</td>
            <td>
                <button class="editar" onclick="editarUsuario('${u.id}')">Editar</button>
                <button class="excluir" onclick="excluirUsuario('${u.id}')">Excluir</button>
            </td>
        </tr>`;
    });
}

function editarUsuario(id) {
    const u = usuarios.find(u => u.id === id);
    if (!u) return;

    document.getElementById("usuarioId").value = u.id;
    document.getElementById("nomeUsuario").value = u.nome;
    document.getElementById("cpfUsuario").value = u.cpf;
    document.getElementById("emailUsuario").value = u.email;
    document.getElementById("loginUsuario").value = u.login;
    document.getElementById("senhaUsuario").value = "";
    document.getElementById("tipoUsuario").value = u.tipo;

    mostrarPagina("usuarios");
}

function excluirUsuario(id) {
    if (!confirm("Deseja excluir este usuário?")) return;

    usuarios = usuarios.filter(u => u.id !== id);
    salvarDados();
    listarUsuarios();
    atualizarDashboard();
}

function limparUsuario() {
    document.getElementById("formUsuario").reset();
    document.getElementById("usuarioId").value = "";
}

// MOVIMENTAÇÃO DE ESTOQUE

function atualizarSelectProdutos() {
    const select = document.getElementById("produtoMovimentacao");

    select.innerHTML = '<option value="">Selecione o produto</option>';

    produtos.forEach(p => {
        select.innerHTML += `
        <option value="${p.id}">${escapar(p.nome)} - Estoque: ${p.quantidade}</option>`;
    });
}

document.getElementById("formMovimentacao").addEventListener("submit", function(e) {
    e.preventDefault();

    const id = document.getElementById("produtoMovimentacao").value;
    const tipo = document.getElementById("tipoMovimentacao").value;
    const quantidade = Number(document.getElementById("quantidadeMovimentacao").value);

    const produto = produtos.find(p => p.id === id);

    if (!produto || !Number.isInteger(quantidade) || quantidade <= 0) {
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

    movimentacoes.push({
        id: Date.now().toString(),
        produto: produto.nome,
        tipo: tipo,
        quantidade: quantidade,
        data: new Date().toLocaleString("pt-BR")
    });

    salvarDados();
    this.reset();
    listarMovimentacoes();
    atualizarSelectProdutos();
    listarProdutos();
    atualizarDashboard();

    alert("Movimentação registrada!");
});

function listarMovimentacoes() {
    const lista = document.getElementById("historicoMovimentacoes");
    lista.innerHTML = "";

    movimentacoes.slice().reverse().forEach(m => {
        lista.innerHTML += `
        <tr>
            <td>${escapar(m.data)}</td>
            <td>${escapar(m.produto)}</td>
            <td>${m.tipo === "entrada" ? "Entrada" : "Saída"}</td>
            <td>${m.quantidade}</td>
        </tr>`;
    });
}

// DASHBOARD

function atualizarDashboard() {
    document.getElementById("totalProdutos").textContent = produtos.length;

    document.getElementById("totalUsuarios").textContent = usuarios.length;

    const baixo = produtos.filter(p => p.quantidade <= p.minimo).length;

    document.getElementById("estoqueBaixo").textContent = baixo;

    const valor = produtos.reduce((total, p) =>
        total + p.quantidade * p.compra, 0
    );

    document.getElementById("valorEstoque").textContent = moeda(valor);

    document.getElementById("resumoProdutos").innerHTML =
        produtos.slice(0, 5).map(p => `
            <p>${escapar(p.nome)} — ${p.quantidade} unidades</p>
        `).join("");
}

// UTILITÁRIOS

function moeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
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

// INICIALIZAÇÃO

atualizarDashboard();
listarProdutos();
listarUsuarios();
atualizarSelectProdutos();
listarMovimentacoes();
