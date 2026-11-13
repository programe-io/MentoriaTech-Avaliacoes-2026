
const API = "/api";

async function requisicao(url, opcoes = {}) {
    const resposta = await fetch(API + url, {
        ...opcoes,
        headers: {
            "Content-Type": "application/json",
            ...opcoes.headers
        }
    });

    if (!resposta.ok) {
        const erro = await resposta.json();
        throw new Error(erro.erro || "Erro na operação.");
    }

    return resposta.json();
}

function escapar(valor) {
    return String(valor ?? "").replace(/[&<>"']/g, letra => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[letra]);
}

function mostrar(id) {
    document.querySelectorAll(".secao").forEach(secao => {
        secao.hidden = secao.id !== id;
    });

    atualizar();
}

async function atualizar() {
    try {
        await Promise.all([
            carregarLivros(),
            carregarAlunos(),
            carregarEmprestimos()
        ]);
    } catch (erro) {
        alert(erro.message);
    }
}

// CADASTRO DE LIVROS

document.getElementById("formLivro").addEventListener("submit", async e => {
    e.preventDefault();

    const dados = Object.fromEntries(new FormData(e.target));
    dados.quantidade = Number(dados.quantidade);

    try {
        await requisicao("/livros", {
            method: "POST",
            body: JSON.stringify(dados)
        });

        e.target.reset();
        await atualizar();
        alert("Livro cadastrado com sucesso!");
    } catch (erro) {
        alert(erro.message);
    }
});

async function carregarLivros() {
    const livros = await requisicao("/livros");
    const pesquisa = document.getElementById("pesquisaLivro").value
        .toLowerCase();

    const filtrados = livros.filter(l =>
        (l.titulo + " " + l.autor + " " + l.categoria)
        .toLowerCase().includes(pesquisa)
    );

    document.getElementById("listaLivros").innerHTML =
        filtrados.map(l => `
        <tr>
            <td>${escapar(l.titulo)}</td>
            <td>${escapar(l.autor)}</td>
            <td>${escapar(l.categoria)}</td>
            <td>${l.disponiveis}</td>
            <td>
                <button class="acoes"
                    onclick="excluirLivro(${l.id})">
                    Excluir
                </button>
            </td>
        </tr>
    `).join("");

    document.getElementById("totalLivros").textContent =
        livros.reduce((s, l) => s + l.quantidade, 0);

    document.getElementById("livroSelect").innerHTML =
        '<option value="">Selecione o livro</option>' +
        livros.filter(l => l.disponiveis > 0).map(l =>
            `<option value="${l.id}">
                ${escapar(l.titulo)}
            </option>`
        ).join("");
}

async function excluirLivro(id) {
    if (!confirm("Deseja excluir este livro?")) return;

    try {
        await requisicao("/livros/" + id, { method: "DELETE" });
        await atualizar();
    } catch (erro) {
        alert(erro.message);
    }
}

// CADASTRO DE ALUNOS

document.getElementById("formAluno").addEventListener("submit", async e => {
    e.preventDefault();

    const dados = Object.fromEntries(new FormData(e.target));

    try {
        await requisicao("/alunos", {
            method: "POST",
            body: JSON.stringify(dados)
        });

        e.target.reset();
        await atualizar();
        alert("Aluno cadastrado com sucesso!");
    } catch (erro) {
        alert(erro.message);
    }
});

async function carregarAlunos() {
    const alunos = await requisicao("/alunos");

    document.getElementById("listaAlunos").innerHTML =
        alunos.map(a => `
        <tr>
            <td>${escapar(a.nome)}</td>
            <td>${escapar(a.matricula)}</td>
            <td>${escapar(a.turma)}</td>
            <td>
                <button class="acoes"
                    onclick="excluirAluno(${a.id})">
                    Excluir
                </button>
            </td>
        </tr>
    `).join("");

    document.getElementById("totalAlunos").textContent = alunos.length;

    document.getElementById("alunoSelect").innerHTML =
        '<option value="">Selecione o aluno</option>' +
        alunos.map(a =>
            `<option value="${a.id}">
                ${escapar(a.nome)}
            </option>`
        ).join("");
}

async function excluirAluno(id) {
    if (!confirm("Deseja excluir este aluno?")) return;

    try {
        await requisicao("/alunos/" + id, { method: "DELETE" });
        await atualizar();
    } catch (erro) {
        alert(erro.message);
    }
}

// EMPRÉSTIMOS

document.getElementById("formEmprestimo")
.addEventListener("submit", async e => {
    e.preventDefault();

    const dados = Object.fromEntries(new FormData(e.target));
    dados.alunoId = Number(dados.alunoId);
    dados.livroId = Number(dados.livroId);

    try {
        await requisicao("/emprestimos", {
            method: "POST",
            body: JSON.stringify(dados)
        });

        e.target.reset();
        await atualizar();
        alert("Empréstimo realizado com sucesso!");
    } catch (erro) {
        alert(erro.message);
    }
});

async function carregarEmprestimos() {
    const emprestimos = await requisicao("/emprestimos");

    document.getElementById("listaEmprestimos").innerHTML =
        emprestimos.map(e => `
        <tr>
            <td>${escapar(e.aluno)}</td>
            <td>${escapar(e.livro)}</td>
            <td>${escapar(e.data)}</td>
            <td>${escapar(e.status)}</td>
            <td>
                ${e.status === "ATIVO" ?
                    `<button class="acoes devolver"
                        onclick="devolver(${e.id})">
                        Devolver
                    </button>` : "Concluído"}
            </td>
        </tr>
    `).join("");

    document.getElementById("totalEmprestimos").textContent =
        emprestimos.filter(e => e.status === "ATIVO").length;
}

async function devolver(id) {
    try {
        await requisicao("/emprestimos/" + id + "/devolver", {
            method: "PUT"
        });

        await atualizar();
        alert("Devolução registrada com sucesso!");
    } catch (erro) {
        alert(erro.message);
    }
}

// CARREGAMENTO INICIAL

atualizar();
