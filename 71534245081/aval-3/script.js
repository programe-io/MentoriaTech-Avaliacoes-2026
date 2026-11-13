
// Carregar dados salvos
let livros = JSON.parse(localStorage.getItem("livros")) || [];
let alunos = JSON.parse(localStorage.getItem("alunos")) || [];
let emprestimos = JSON.parse(
    localStorage.getItem("emprestimos")
) || [];

function salvar() {
    localStorage.setItem("livros", JSON.stringify(livros));
    localStorage.setItem("alunos", JSON.stringify(alunos));
    localStorage.setItem(
        "emprestimos",
        JSON.stringify(emprestimos)
    );
}

function mostrar(id) {
    document.querySelectorAll(".pagina").forEach(p => {
        p.classList.add("oculto");
    });

    document.getElementById(id).classList.remove("oculto");
    atualizar();
}

// Cadastrar livros
document.getElementById("formLivro")
.addEventListener("submit", function(e) {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const isbn = document.getElementById("isbn").value;
    const quantidade = Number(
        document.getElementById("quantidade").value
    );

    if (livros.some(l => l.isbn === isbn)) {
        alert("Este ISBN já está cadastrado!");
        return;
    }

    livros.push({
        id: Date.now(),
        titulo,
        autor,
        isbn,
        quantidade,
        disponiveis: quantidade
    });

    salvar();
    this.reset();
    atualizar();

    alert("Livro cadastrado com sucesso!");
});

// Cadastrar alunos
document.getElementById("formAluno")
.addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = document.getElementById("nomeAluno").value;
    const matricula =
        document.getElementById("matricula").value;
    const turma = document.getElementById("turma").value;

    if (alunos.some(a => a.matricula === matricula)) {
        alert("Matrícula já cadastrada!");
        return;
    }

    alunos.push({
        id: Date.now(),
        nome,
        matricula,
        turma
    });

    salvar();
    this.reset();
    atualizar();

    alert("Aluno cadastrado com sucesso!");
});

// Registrar empréstimo
document.getElementById("formEmprestimo")
.addEventListener("submit", function(e) {
    e.preventDefault();

    const alunoId = Number(
        document.getElementById("alunoEmprestimo").value
    );

    const livroId = Number(
        document.getElementById("livroEmprestimo").value
    );

    const aluno = alunos.find(a => a.id === alunoId);
    const livro = livros.find(l => l.id === livroId);

    if (!aluno || !livro || livro.disponiveis <= 0) {
        alert("Não foi possível realizar o empréstimo.");
        return;
    }

    livro.disponiveis--;

    const data = new Date();
    const devolucao = new Date();
    devolucao.setDate(devolucao.getDate() + 7);

    emprestimos.push({
        id: Date.now(),
        alunoId,
        livroId,
        data: data.toLocaleDateString("pt-BR"),
        devolucao: devolucao.toLocaleDateString("pt-BR"),
        ativo: true
    });

    salvar();
    this.reset();
    atualizar();

    alert("Empréstimo registrado com sucesso!");
});

// Devolver livro
function devolver(id) {
    const emprestimo = emprestimos.find(
        e => e.id === id && e.ativo
    );

    if (!emprestimo) return;

    const livro = livros.find(
        l => l.id === emprestimo.livroId
    );

    if (livro) {
        livro.disponiveis++;
    }

    emprestimo.ativo = false;

    salvar();
    atualizar();

    alert("Devolução realizada com sucesso!");
}

// Excluir livro
function excluirLivro(id) {
    const possuiEmprestimo = emprestimos.some(
        e => e.livroId === id && e.ativo
    );

    if (possuiEmprestimo) {
        alert("Não é possível excluir um livro emprestado.");
        return;
    }

    livros = livros.filter(l => l.id !== id);
    salvar();
    atualizar();
}

// Excluir aluno
function excluirAluno(id) {
    const possuiEmprestimo = emprestimos.some(
        e => e.alunoId === id && e.ativo
    );

    if (possuiEmprestimo) {
        alert("Este aluno possui empréstimo ativo.");
        return;
    }

    alunos = alunos.filter(a => a.id !== id);
    salvar();
    atualizar();
}

// Atualizar informações da tela
function atualizar() {

    document.getElementById("totalLivros").textContent =
        livros.reduce((s, l) => s + l.quantidade, 0);

    document.getElementById("totalAlunos").textContent =
        alunos.length;

    document.getElementById("totalEmprestimos").textContent =
        emprestimos.filter(e => e.ativo).length;

    // Lista de livros
    document.getElementById("listaLivros").innerHTML =
        livros.map(l => `
        <tr>
            <td>${escapeHTML(l.titulo)}</td>
            <td>${escapeHTML(l.autor)}</td>
            <td>${escapeHTML(l.isbn)}</td>
            <td>${l.disponiveis}</td>
            <td>
                <button onclick="excluirLivro(${l.id})">
                    Excluir
                </button>
            </td>
        </tr>
    `).join("");

    // Lista de alunos
    document.getElementById("listaAlunos").innerHTML =
        alunos.map(a => `
        <tr>
            <td>${escapeHTML(a.nome)}</td>
            <td>${escapeHTML(a.matricula)}</td>
            <td>${escapeHTML(a.turma)}</td>
            <td>
                <button onclick="excluirAluno(${a.id})">
                    Excluir
                </button>
            </td>
        </tr>
    `).join("");

    // Atualizar opções dos alunos
    document.getElementById("alunoEmprestimo").innerHTML =
        '<option value="">Selecione o aluno</option>' +
        alunos.map(a => `
            <option value="${a.id}">
                ${escapeHTML(a.nome)}
            </option>
        `).join("");

    // Atualizar opções dos livros
    document.getElementById("livroEmprestimo").innerHTML =
        '<option value="">Selecione o livro</option>' +
        livros.filter(l => l.disponiveis > 0).map(l => `
            <option value="${l.id}">
                ${escapeHTML(l.titulo)}
            </option>
        `).join("");

    // Lista de empréstimos
    document.getElementById("listaEmprestimos").innerHTML =
        emprestimos.map(e => {
            const aluno = alunos.find(a => a.id === e.alunoId);
            const livro = livros.find(l => l.id === e.livroId);

            return `
            <tr>
                <td>${aluno ? escapeHTML(aluno.nome) : "Aluno removido"}</td>
                <td>${livro ? escapeHTML(livro.titulo) : "Livro removido"}</td>
                <td>${e.data}</td>
                <td>
                    ${e.ativo
                        ? `<button onclick="devolver(${e.id})">
                             Devolver
                           </button>`
                        : "Devolvido"}
                </td>
            </tr>
            `;
        }).join("");
}

// Evitar interpretar dados cadastrados como HTML
function escapeHTML(valor) {
    return String(valor).replace(/[&<>"']/g, c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[c]);
}

// Inicialização
atualizar();
