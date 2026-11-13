
const $ = id => document.getElementById(id);

const STORAGE_KEY = "bibliotecaEscolar_v1";

let db = carregarDados();

function carregarDados() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) ||
            { books: [], students: [], loans: [] };
    } catch {
        return { books: [], students: [], loans: [] };
    }
}

function salvar() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    atualizarSistema();
}

function idNovo() {
    return Date.now().toString(36) +
        Math.random().toString(36).slice(2, 7);
}

function hoje() {
    const d = new Date();
    return [
        d.getFullYear(),
        String(d.getMonth() + 1).padStart(2, "0"),
        String(d.getDate()).padStart(2, "0")
    ].join("-");
}

function dataBR(data) {
    if (!data) return "—";
    return new Date(data + "T12:00:00").toLocaleDateString("pt-BR");
}

function seguro(valor = "") {
    return String(valor).replace(/[&<>"']/g, c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[c]));
}

function disponivel(livro) {
    const emprestados = db.loans.filter(
        l => l.bookId === livro.id && !l.returned
    ).length;

    return livro.quantity - emprestados;
}

function aviso(mensagem) {
    $("toast").textContent = mensagem;
    $("toast").classList.add("show");

    setTimeout(() => {
        $("toast").classList.remove("show");
    }, 2500);
}

// NAVEGAÇÃO
const nomes = {
    dashboard: "Painel inicial",
    books: "Livros",
    students: "Alunos",
    loans: "Empréstimos",
    reports: "Relatórios"
};

function navegar(pagina) {
    document.querySelectorAll(".page").forEach(p => {
        p.classList.toggle("active", p.id === pagina);
    });

    document.querySelectorAll(".nav-link").forEach(b => {
        b.classList.toggle("active", b.dataset.page === pagina);
    });

    $("pageTitle").textContent = nomes[pagina];
}

document.querySelectorAll(".nav-link").forEach(b => {
    b.onclick = () => navegar(b.dataset.page);
});

document.querySelectorAll("[data-close]").forEach(b => {
    b.onclick = () => b.closest("dialog").close();
});

// CADASTRO DE LIVROS
$("addBook").onclick = () => {
    $("bookForm").reset();
    $("bookId").value = "";
    $("bookQuantity").value = 1;
    $("bookDialogTitle").textContent = "Cadastrar livro";
    $("bookDialog").showModal();
};

$("bookForm").onsubmit = e => {
    e.preventDefault();

    const id = $("bookId").value;
    const quantidade = Number($("bookQuantity").value);

    const antigo = db.books.find(b => b.id === id);

    if (
        antigo &&
        quantidade < db.loans.filter(
            l => l.bookId === id && !l.returned
        ).length
    ) {
        aviso("Quantidade menor que os empréstimos ativos!");
        return;
    }

    const livro = {
        id: id || idNovo(),
        title: $("bookTitle").value.trim(),
        author: $("bookAuthor").value.trim(),
        category: $("bookCategory").value.trim(),
        publisher: $("bookPublisher").value.trim(),
        quantity: quantidade
    };

    if (antigo) {
        Object.assign(antigo, livro);
    } else {
        db.books.push(livro);
    }

    $("bookDialog").close();
    salvar();
    aviso("Livro cadastrado com sucesso!");
};

// LISTAR LIVROS
function listarLivros() {
    const busca = $("bookSearch").value.toLowerCase();

    const livros = db.books.filter(l =>
        [l.title, l.author, l.category]
            .join(" ")
            .toLowerCase()
            .includes(busca)
    );

    $("booksTable").innerHTML = livros.map(l => `
        <tr>
            <td><strong>${seguro(l.title)}</strong></td>
            <td>${seguro(l.author)}</td>
            <td>${seguro(l.category)}</td>
            <td>${l.quantity}</td>
            <td>${disponivel(l)}</td>
            <td>
                <button class="action-btn"
                    data-edit-book="${l.id}">Editar</button>
                <button class="action-btn danger"
                    data-delete-book="${l.id}">Excluir</button>
            </td>
        </tr>
    `).join("");

    $("booksEmpty").style.display = livros.length ? "none" : "block";
}

$("bookSearch").oninput = listarLivros;

$("booksTable").onclick = e => {
    const editar = e.target.closest("[data-edit-book]");
    const excluir = e.target.closest("[data-delete-book]");

    if (editar) {
        const l = db.books.find(b => b.id === editar.dataset.editBook);

        $("bookId").value = l.id;
        $("bookTitle").value = l.title;
        $("bookAuthor").value = l.author;
        $("bookCategory").value = l.category;
        $("bookPublisher").value = l.publisher;
        $("bookQuantity").value = l.quantity;

        $("bookDialogTitle").textContent = "Editar livro";
        $("bookDialog").showModal();
    }

    if (excluir) {
        const id = excluir.dataset.deleteBook;

        if (db.loans.some(l => l.bookId === id && !l.returned)) {
            aviso("Este livro possui empréstimo ativo!");
            return;
        }

        if (confirm("Deseja excluir este livro?")) {
            db.books = db.books.filter(b => b.id !== id);
            salvar();
            aviso("Livro excluído!");
        }
    }
};

// CADASTRO DE ALUNOS
$("addStudent").onclick = () => {
    $("studentForm").reset();
    $("studentId").value = "";
    $("studentDialogTitle").textContent = "Cadastrar aluno";
    $("studentDialog").showModal();
};

$("studentForm").onsubmit = e => {
    e.preventDefault();

    const id = $("studentId").value;
    const matricula = $("studentRegistration").value.trim();

    if (db.students.some(s =>
        s.registration.toLowerCase() === matricula.toLowerCase()
        && s.id !== id
    )) {
        aviso("Esta matrícula já está cadastrada!");
        return;
    }

    const aluno = {
        id: id || idNovo(),
        name: $("studentName").value.trim(),
        registration: matricula,
        className: $("studentClass").value.trim(),
        contact: $("studentContact").value.trim()
    };

    const antigo = db.students.find(s => s.id === id);

    if (antigo) {
        Object.assign(antigo, aluno);
    } else {
        db.students.push(aluno);
    }

    $("studentDialog").close();
    salvar();
    aviso("Aluno cadastrado com sucesso!");
};

// LISTAR ALUNOS
function listarAlunos() {
    const busca = $("studentSearch").value.toLowerCase();

    const alunos = db.students.filter(s =>
        [s.name, s.registration, s.className, s.contact]
            .join(" ")
            .toLowerCase()
            .includes(busca)
    );

    $("studentsTable").innerHTML = alunos.map(s => `
        <tr>
            <td><strong>${seguro(s.name)}</strong></td>
            <td>${seguro(s.registration)}</td>
            <td>${seguro(s.className)}</td>
            <td>${seguro(s.contact || "—")}</td>
            <td>
                <button class="action-btn"
                    data-edit-student="${s.id}">Editar</button>
                <button class="action-btn danger"
                    data-delete-student="${s.id}">Excluir</button>
            </td>
        </tr>
    `).join("");

    $("studentsEmpty").style.display = alunos.length ? "none" : "block";
}

$("studentSearch").oninput = listarAlunos;

$("studentsTable").onclick = e => {
    const editar = e.target.closest("[data-edit-student]");
    const excluir = e.target.closest("[data-delete-student]");

    if (editar) {
        const s = db.students.find(x => x.id === editar.dataset.editStudent);

        $("studentId").value = s.id;
        $("studentName").value = s.name;
        $("studentRegistration").value = s.registration;
        $("studentClass").value = s.className;
        $("studentContact").value = s.contact;

        $("studentDialogTitle").textContent = "Editar aluno";
        $("studentDialog").showModal();
    }

    if (excluir) {
        const id = excluir.dataset.deleteStudent;

        if (db.loans.some(l => l.studentId === id && !l.returned)) {
            aviso("O aluno possui empréstimo ativo!");
            return;
        }

        if (confirm("Deseja excluir este aluno?")) {
            db.students = db.students.filter(s => s.id !== id);
            salvar();
            aviso("Aluno excluído!");
        }
    }
};

// EMPRÉSTIMOS
$("addLoan").onclick = () => {
    if (!db.students.length || !db.books.some(b => disponivel(b) > 0)) {
        aviso("Cadastre um aluno e um livro disponível primeiro.");
        return;
    }

    $("loanStudent").innerHTML = db.students.map(s => `
        <option value="${s.id}">
            ${seguro(s.name)} - ${seguro(s.registration)}
        </option>
    `).join("");

    $("loanBook").innerHTML = db.books
        .filter(b => disponivel(b) > 0)
        .map(b => `
            <option value="${b.id}">
                ${seguro(b.title)} (${disponivel(b)} disponível)
            </option>
        `).join("");

    const devolucao = new Date();
    devolucao.setDate(devolucao.getDate() + 7);

    $("loanDate").value = hoje();
    $("loanDue").value = [
        devolucao.getFullYear(),
        String(devolucao.getMonth() + 1).padStart(2, "0"),
        String(devolucao.getDate()).padStart(2, "0")
    ].join("-");

    $("loanDialog").showModal();
};

$("loanForm").onsubmit = e => {
    e.preventDefault();

    const livroId = $("loanBook").value;

    if (!db.books.some(b => b.id === livroId && disponivel(b) > 0)) {
        aviso("Não existem exemplares disponíveis!");
        return;
    }

    if ($("loanDue").value < $("loanDate").value) {
        aviso("A devolução não pode ser anterior à retirada!");
        return;
    }

    db.loans.push({
        id: idNovo(),
        studentId: $("loanStudent").value,
        bookId: livroId,
        date: $("loanDate").value,
        due: $("loanDue").value,
        returned: false
    });

    $("loanDialog").close();
    salvar();
    aviso("Empréstimo registrado!");
};

// LISTAR EMPRÉSTIMOS
function listarEmprestimos() {
    const busca = $("loanSearch").value.toLowerCase();

    const emprestimos = db.loans.filter(l => {
        const aluno = db.students.find(s => s.id === l.studentId);
        const livro = db.books.find(b => b.id === l.bookId);

        return [aluno?.name, livro?.title]
            .join(" ")
            .toLowerCase()
            .includes(busca);
    }).slice().reverse();

    $("loansTable").innerHTML = emprestimos.map(l => {
        const aluno = db.students.find(s => s.id === l.studentId);
        const livro = db.books.find(b => b.id === l.bookId);
        const atrasado = !l.returned && l.due < hoje();

        return `
            <tr>
                <td>${seguro(aluno?.name || "Aluno removido")}</td>
                <td>${seguro(livro?.title || "Livro removido")}</td>
                <td>${dataBR(l.date)}</td>
                <td>${dataBR(l.due)}</td>
                <td>
                    <span class="pill ${
                        l.returned ? "returned" : atrasado ? "late" : ""
                    }">
                        ${l.returned ? "Devolvido" :
                          atrasado ? "Atrasado" : "Em andamento"}
                    </span>
                </td>
                <td>
                    ${l.returned ? "—" : `
                        <button class="action-btn"
                            data-return="${l.id}">
                            Devolver
                        </button>
                    `}
                </td>
            </tr>
        `;
    }).join("");

    $("loansEmpty").style.display = emprestimos.length ? "none" : "block";
}

$("loanSearch").oninput = listarEmprestimos;

$("loansTable").onclick = e => {
    const botao = e.target.closest("[data-return]");

    if (botao) {
        const emprestimo = db.loans.find(
            l => l.id === botao.dataset.return
        );

        if (emprestimo && !emprestimo.returned) {
            emprestimo.returned = true;
            emprestimo.returnDate = hoje();
            salvar();
            aviso("Devolução registrada com sucesso!");
        }
    }
};

// PAINEL E RELATÓRIOS
function atualizarPainel() {
    const ativos = db.loans.filter(l => !l.returned).length;
    const total = db.books.reduce((n, b) => n + b.quantity, 0);
    const livres = db.books.reduce((n, b) => n + disponivel(b), 0);
    const devolvidos = db.loans.filter(l => l.returned).length;

    $("statBooks").textContent = db.books.length;
    $("statStudents").textContent = db.students.length;
    $("statLoans").textContent = ativos;
    $("statAvailable").textContent = livres;

    $("reportBooks").textContent = total;
    $("reportAvailable").textContent = livres;
    $("reportActive").textContent = ativos;
    $("reportReturned").textContent = devolvidos;
}

function atualizarSistema() {
    listarLivros();
    listarAlunos();
    listarEmprestimos();
    atualizarPainel();
}

// EXPORTAR RELATÓRIO
$("exportCsv").onclick = () => {
    const linhas = [
        ["Aluno", "Livro", "Retirada", "Devolução", "Status"]
    ];

    db.loans.forEach(l => {
        const aluno = db.students.find(s => s.id === l.studentId);
        const livro = db.books.find(b => b.id === l.bookId);

        linhas.push([
            aluno?.name || "",
            livro?.title || "",
            l.date,
            l.due,
            l.returned ? "Devolvido" : "Em andamento"
        ]);
    });

    const csv = "\uFEFF" + linhas.map(l =>
        l.map(v => '"' + String(v).replace(/"/g, '""') + '"').join(";")
    ).join("\n");

    const arquivo = new Blob([csv], {
        type: "text/csv;charset=utf-8;"
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(arquivo);
    link.download = "relatorio-biblioteca.csv";
    link.click();

    URL.revokeObjectURL(link.href);
    aviso("Relatório exportado!");
};

// INICIALIZAÇÃO
atualizarSistema();
