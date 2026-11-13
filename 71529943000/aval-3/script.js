
// Dados armazenados no navegador
let livros = JSON.parse(
    localStorage.getItem("livros") || "[]"
);

let alunos = JSON.parse(
    localStorage.getItem("alunos") || "[]"
);

let emprestimos = JSON.parse(
    localStorage.getItem("emprestimos") || "[]"
);

// Salvar dados
function salvar() {
    localStorage.setItem("livros", JSON.stringify(livros));
    localStorage.setItem("alunos", JSON.stringify(alunos));
    localStorage.setItem("emprestimos", JSON.stringify(emprestimos));

    atualizarPainel();
}

// Navegação
function mostrar(id) {
    document.querySelectorAll(".pagina").forEach(p => {
        p.classList.add("escondido");
    });

    document.getElementById(id).classList.remove("escondido");

    listarLivros();
    listarAlunos();
    listarEmprestimos();
    atualizarSelects();
}

// Cadastro de livros
document.getElementById("formLivro").onsubmit = function(e) {
    e.preventDefault();

    livros.push({
        id: Date.now(),
        titulo: document.getElementById("titulo").value,
        autor: document.getElementById("autor").value,
        editora: document.getElementById("editora").value,
        quantidade: Number(
            document.getElementById("quantidade").value
        ),
        disponiveis: Number(
            document.getElementById("quantidade").value
        )
    });

    salvar();
    listarLivros();
    this.reset();

    alert("Livro cadastrado com sucesso!");
};

// Listar livros
function listarLivros() {
    let tbody = document.getElementById("listaLivros");
    if (!tbody) return;

    tbody.innerHTML = "";

    let busca = document.getElementById("pesquisaLivro")
        .value.toLowerCase();

    livros.filter(l =>
        l.titulo.toLowerCase().includes(busca) ||
        l.autor.toLowerCase().includes(busca)
    ).forEach(livro => {
        tbody.innerHTML += `
        <tr>
            <td>${escapar(livro.titulo)}</td>
            <td>${escapar(livro.autor)}</td>
            <td>${livro.disponiveis}</td>
            <td>
                <button onclick="excluirLivro(${livro.id})">
                    Excluir
                </button>
            </td>
        </tr>`;
    });
}

// Excluir livro
function excluirLivro(id) {
    let livro = livros.find(l => l.id === id);

    if (emprestimos.some(e =>
        e.livroId === id && e.status === "Emprestado"
    )) {
        alert("Não é possível excluir um livro emprestado.");
        return;
    }

    if (confirm("Deseja excluir este livro?")) {
        livros = livros.filter(l => l.id !== id);
        salvar();
        listarLivros();
    }
}

// Cadastro de alunos
document.getElementById("formAluno").onsubmit = function(e) {
    e.preventDefault();

    alunos.push({
        id: Date.now(),
        nome: document.getElementById("nomeAluno").value,
        matricula: document.getElementById("matricula").value,
        turma: document.getElementById("turma").value
    });

    salvar();
    listarAlunos();
    this.reset();

    alert("Aluno cadastrado com sucesso!");
};

// Listar alunos
function listarAlunos() {
    let tbody = document.getElementById("listaAlunos");
    if (!tbody) return;

    tbody.innerHTML = "";

    alunos.forEach(aluno => {
        tbody.innerHTML += `
        <tr>
            <td>${escapar(aluno.nome)}</td>
            <td>${escapar(aluno.matricula)}</td>
            <td>${escapar(aluno.turma)}</td>
            <td>
                <button onclick="excluirAluno(${aluno.id})">
                    Excluir
                </button>
            </td>
        </tr>`;
    });
}

// Excluir aluno
function excluirAluno(id) {
    if (emprestimos.some(e =>
        e.alunoId === id && e.status === "Emprestado"
    )) {
        alert("O aluno possui empréstimo ativo.");
        return;
    }

    if (confirm("Deseja excluir este aluno?")) {
        alunos = alunos.filter(a => a.id !== id);
        salvar();
        listarAlunos();
    }
}

// Atualizar listas de seleção
function atualizarSelects() {
    let selectAluno = document.getElementById("alunoEmprestimo");
    let selectLivro = document.getElementById("livroEmprestimo");

    selectAluno.innerHTML =
        '<option value="">Selecione o aluno</option>';

    selectLivro.innerHTML =
        '<option value="">Selecione o livro</option>';

    alunos.forEach(a => {
        selectAluno.innerHTML += `
            <option value="${a.id}">
                ${escapar(a.nome)}
            </option>`;
    });

    livros.filter(l => l.disponiveis > 0).forEach(l => {
        selectLivro.innerHTML += `
            <option value="${l.id}">
                ${escapar(l.titulo)}
            </option>`;
    });
}

// Registrar empréstimo
document.getElementById("formEmprestimo").onsubmit =
function(e) {
    e.preventDefault();

    let alunoId = Number(
        document.getElementById("alunoEmprestimo").value
    );

    let livroId = Number(
        document.getElementById("livroEmprestimo").value
    );

    let livro = livros.find(l => l.id === livroId);

    if (!livro || livro.disponiveis <= 0) {
        alert("Livro indisponível!");
        return;
    }

    emprestimos.push({
        id: Date.now(),
        alunoId,
        livroId,
        data: new Date().toLocaleDateString("pt-BR"),
        status: "Emprestado"
    });

    livro.disponiveis--;

    salvar();
    listarEmprestimos();
    atualizarSelects();
    this.reset();

    alert("Empréstimo registrado!");
};

// Listar empréstimos
function listarEmprestimos() {
    let tbody = document.getElementById("listaEmprestimos");
    if (!tbody) return;

    tbody.innerHTML = "";

    emprestimos.forEach(e => {
        let aluno = alunos.find(a => a.id === e.alunoId);
        let livro = livros.find(l => l.id === e.livroId);

        tbody.innerHTML += `
        <tr>
            <td>${escapar(aluno?.nome || "Aluno removido")}</td>
            <td>${escapar(livro?.titulo || "Livro removido")}</td>
            <td>${e.data}</td>
            <td>${e.status}</td>
            <td>
                ${e.status === "Emprestado" ?
                `<button onclick="devolver(${e.id})">
                    Devolver
                </button>` : "Concluído"}
            </td>
        </tr>`;
    });
}

// Registrar devolução
function devolver(id) {
    let emprestimo = emprestimos.find(e => e.id === id);

    if (!emprestimo || emprestimo.status !== "Emprestado") {
        return;
    }

    let livro = livros.find(l => l.id === emprestimo.livroId);

    emprestimo.status = "Devolvido";

    if (livro) {
        livro.disponiveis++;
    }

    salvar();
    listarEmprestimos();
    atualizarSelects();

    alert("Devolução realizada com sucesso!");
}

// Atualizar painel
function atualizarPainel() {
    document.getElementById("totalLivros").textContent =
        livros.reduce((s, l) => s + l.quantidade, 0);

    document.getElementById("totalAlunos").textContent =
        alunos.length;

    document.getElementById("totalEmprestimos").textContent =
        emprestimos.filter(e =>
            e.status === "Emprestado"
        ).length;
}

// Evitar interpretação de HTML em dados cadastrados
function escapar(valor) {
    return String(valor).replace(/[&<>"']/g, c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[c]);
}

// Inicialização
atualizarPainel();
listarLivros();
listarAlunos();
listarEmprestimos();
atualizarSelects();
