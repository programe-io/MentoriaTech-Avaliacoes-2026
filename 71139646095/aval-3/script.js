
// ======================================
// BIBLIOTECA ESCOLAR
// Sistema com armazenamento local
// ======================================

// Carregamento dos dados salvos
let books = JSON.parse(localStorage.getItem("biblioteca_livros")) || [];
let students = JSON.parse(localStorage.getItem("biblioteca_alunos")) || [];
let loans = JSON.parse(localStorage.getItem("biblioteca_emprestimos")) || [];

// Salvar os dados no navegador
function saveData() {
    localStorage.setItem("biblioteca_livros", JSON.stringify(books));
    localStorage.setItem("biblioteca_alunos", JSON.stringify(students));
    localStorage.setItem("biblioteca_emprestimos", JSON.stringify(loans));
}

// Gerar identificadores
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// Exibir mensagens
function notify(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

// Formatar datas sem problemas de fuso horário
function formatDate(date) {
    if (!date) return "-";
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
}

function today() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

// Contar empréstimos ativos de um livro
function borrowedCount(bookId) {
    return loans.filter(loan =>
        loan.bookId === bookId && !loan.returnedAt
    ).length;
}

// Quantidade disponível
function availableCount(book) {
    return Number(book.quantity) - borrowedCount(book.id);
}

// Proteger textos exibidos no HTML
function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}

// ======================================
// NAVEGAÇÃO
// ======================================

const pageNames = {
    dashboard: "Painel Inicial",
    books: "Gerenciamento de Livros",
    students: "Cadastro de Alunos",
    loans: "Gerenciamento de Empréstimos",
    history: "Histórico de Empréstimos"
};

document.querySelectorAll(".nav-btn").forEach(button => {
    button.addEventListener("click", () => {
        const page = button.dataset.page;

        document.querySelectorAll(".nav-btn").forEach(btn =>
            btn.classList.remove("active")
        );

        document.querySelectorAll(".page").forEach(section =>
            section.classList.remove("active")
        );

        button.classList.add("active");
        document.getElementById(page).classList.add("active");

        document.getElementById("pageTitle").textContent = pageNames[page];
        renderAll();
    });
});

// ======================================
// CADASTRO DE LIVROS
// ======================================

document.getElementById("bookForm").addEventListener("submit", event => {
    event.preventDefault();

    const id = document.getElementById("bookId").value;
    const title = document.getElementById("bookTitle").value.trim();
    const author = document.getElementById("bookAuthor").value.trim();
    const category = document.getElementById("bookCategory").value;
    const year = document.getElementById("bookYear").value;
    const quantity = Number(document.getElementById("bookQuantity").value);

    if (title.length < 2 || !author || !category) {
        notify("Preencha corretamente os dados do livro.");
        return;
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
        notify("A quantidade deve ser pelo menos 1.");
        return;
    }

    if (year && (!Number.isInteger(Number(year)) ||
        Number(year) < 1 || Number(year) > 2100)) {
        notify("Informe um ano válido.");
        return;
    }

    if (id) {
        const book = books.find(item => item.id === id);

        if (!book) return;

        if (quantity < borrowedCount(id)) {
            notify("A quantidade não pode ser menor que os livros emprestados.");
            return;
        }

        Object.assign(book, {
            title, author, category, year, quantity
        });

        notify("Livro atualizado com sucesso!");
    } else {
        books.push({
            id: generateId(),
            title,
            author,
            category,
            year,
            quantity
        });

        notify("Livro cadastrado com sucesso!");
    }

    saveData();
    resetBookForm();
    renderAll();
});

function editBook(id) {
    const book = books.find(item => item.id === id);
    if (!book) return;

    document.getElementById("bookId").value = book.id;
    document.getElementById("bookTitle").value = book.title;
    document.getElementById("bookAuthor").value = book.author;
    document.getElementById("bookCategory").value = book.category;
    document.getElementById("bookYear").value = book.year || "";
    document.getElementById("bookQuantity").value = book.quantity;

    document.getElementById("bookSubmit").textContent = "Salvar alterações";

    document.getElementById("books").scrollIntoView({ behavior: "smooth" });
}

function deleteBook(id) {
    if (borrowedCount(id) > 0) {
        notify("Não é possível excluir: existem empréstimos ativos.");
        return;
    }

    if (!confirm("Deseja realmente excluir este livro?")) return;

    books = books.filter(book => book.id !== id);

    saveData();
    renderAll();
    notify("Livro excluído!");
}

function resetBookForm() {
    document.getElementById("bookForm").reset();
    document.getElementById("bookId").value = "";
    document.getElementById("bookSubmit").textContent = "Cadastrar livro";
}

document.getElementById("cancelBook").addEventListener("click", resetBookForm);

// ======================================
// CADASTRO DE ALUNOS
// ======================================

document.getElementById("studentForm").addEventListener("submit", event => {
    event.preventDefault();

    const id = document.getElementById("studentId").value;
    const name = document.getElementById("studentName").value.trim();
    const registration = document.getElementById("studentRegistration").value.trim();
    const studentClass = document.getElementById("studentClass").value.trim();

    if (name.length < 3 || !registration || !studentClass) {
        notify("Preencha corretamente os dados do aluno.");
        return;
    }

    const duplicate = students.some(student =>
        student.registration.toLowerCase() === registration.toLowerCase() &&
        student.id !== id
    );

    if (duplicate) {
        notify("Esta matrícula já está cadastrada!");
        return;
    }

    if (id) {
        const student = students.find(item => item.id === id);
        if (!student) return;

        Object.assign(student, { name, registration, studentClass });
        notify("Aluno atualizado com sucesso!");
    } else {
        students.push({
            id: generateId(),
            name,
            registration,
            studentClass
        });

        notify("Aluno cadastrado com sucesso!");
    }

    saveData();
    resetStudentForm();
    renderAll();
});

function editStudent(id) {
    const student = students.find(item => item.id === id);
    if (!student) return;

    document.getElementById("studentId").value = student.id;
    document.getElementById("studentName").value = student.name;
    document.getElementById("studentRegistration").value = student.registration;
    document.getElementById("studentClass").value = student.studentClass;

    document.getElementById("studentSubmit").textContent = "Salvar alterações";

    document.getElementById("students").scrollIntoView({ behavior: "smooth" });
}

function deleteStudent(id) {
    const hasActiveLoan = loans.some(loan =>
        loan.studentId === id && !loan.returnedAt
    );

    if (hasActiveLoan) {
        notify("Este aluno possui empréstimos ativos.");
        return;
    }

    if (!confirm("Deseja realmente excluir este aluno?")) return;

    students = students.filter(student => student.id !== id);

    saveData();
    renderAll();
    notify("Aluno excluído!");
}

function resetStudentForm() {
    document.getElementById("studentForm").reset();
    document.getElementById("studentId").value = "";
    document.getElementById("studentSubmit").textContent = "Cadastrar aluno";
}

document.getElementById("cancelStudent").addEventListener("click", resetStudentForm);

// ======================================
// EMPRÉSTIMOS
// ======================================

document.getElementById("loanDate").value = today();

document.getElementById("loanForm").addEventListener("submit", event => {
    event.preventDefault();

    const studentId = document.getElementById("loanStudent").value;
    const bookId = document.getElementById("loanBook").value;
    const date = document.getElementById("loanDate").value;
    const dueDate = document.getElementById("loanDue").value;

    const student = students.find(item => item.id === studentId);
    const book = books.find(item => item.id === bookId);

    if (!student || !book) {
        notify("Selecione um aluno e um livro válidos.");
        return;
    }

    if (!date || !dueDate || dueDate < date) {
        notify("A devolução deve ser na mesma data ou depois do empréstimo.");
        return;
    }

    if (date > today()) {
        notify("A data do empréstimo não pode estar no futuro.");
        return;
    }

    if (availableCount(book) <= 0) {
        notify("Este livro não possui exemplares disponíveis.");
        return;
    }

    loans.push({
        id: generateId(),
        studentId,
        bookId,
        date,
        dueDate,
        returnedAt: null
    });

    saveData();

    document.getElementById("loanForm").reset();
    document.getElementById("loanDate").value = today();

    renderAll();
    notify("Empréstimo registrado com sucesso!");
});

// Registrar devolução
function returnBook(id) {
    const loan = loans.find(item => item.id === id);

    if (!loan || loan.returnedAt) return;

    if (!confirm("Confirmar a devolução deste livro?")) return;

    loan.returnedAt = today();

    saveData();
    renderAll();
    notify("Livro devolvido com sucesso!");
}

// ======================================
// RENDERIZAÇÃO DAS TABELAS
// ======================================

function emptyMessage(message) {
    return `<p class="empty">${message}</p>`;
}

function renderBooks() {
    const search = document.getElementById("searchBooks").value.toLowerCase();

    const filtered = books.filter(book =>
        `${book.title} ${book.author} ${book.category}`
            .toLowerCase().includes(search)
    );

    if (!filtered.length) {
        document.getElementById("booksList").innerHTML =
            emptyMessage("Nenhum livro encontrado.");
        return;
    }

    document.getElementById("booksList").innerHTML = `
        <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Autor</th>
                    <th>Categoria</th>
                    <th>Ano</th>
                    <th>Total</th>
                    <th>Disponíveis</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                ${filtered.map(book => `
                    <tr>
                        <td>${escapeHTML(book.title)}</td>
                        <td>${escapeHTML(book.author)}</td>
                        <td>${escapeHTML(book.category)}</td>
                        <td>${escapeHTML(book.year || "-")}</td>
                        <td>${book.quantity}</td>
                        <td>
                            <span class="status ${availableCount(book) > 0 ? "available" : "unavailable"}">
                                ${availableCount(book)}
                            </span>
                        </td>
                        <td>
                            <button class="action-btn edit" data-action="edit-book" data-id="${book.id}">Editar</button>
                            <button class="action-btn delete" data-action="delete-book" data-id="${book.id}">Excluir</button>
                        </td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
        </div>
    `;
}

function renderStudents() {
    const search = document.getElementById("searchStudents").value.toLowerCase();

    const filtered = students.filter(student =>
        `${student.name} ${student.registration} ${student.studentClass}`
            .toLowerCase().includes(search)
    );

    if (!filtered.length) {
        document.getElementById("studentsList").innerHTML =
            emptyMessage("Nenhum aluno encontrado.");
        return;
    }

    document.getElementById("studentsList").innerHTML = `
        <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Matrícula</th>
                    <th>Turma</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                ${filtered.map(student => `
                    <tr>
                        <td>${escapeHTML(student.name)}</td>
                        <td>${escapeHTML(student.registration)}</td>
                        <td>${escapeHTML(student.studentClass)}</td>
                        <td>
                            <button class="action-btn edit" data-action="edit-student" data-id="${student.id}">Editar</button>
                            <button class="action-btn delete" data-action="delete-student" data-id="${student.id}">Excluir</button>
                        </td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
        </div>
    `;
}

function renderLoanOptions() {
    const studentSelect = document.getElementById("loanStudent");
    const bookSelect = document.getElementById("loanBook");

    const previousStudent = studentSelect.value;
    const previousBook = bookSelect.value;

    studentSelect.innerHTML = `
        <option value="">Selecione um aluno</option>
        ${students.map(student => `
            <option value="${student.id}">
                ${escapeHTML(student.name)} - ${escapeHTML(student.registration)}
            </option>
        `).join("")}
    `;

    bookSelect.innerHTML = `
        <option value="">Selecione um livro</option>
        ${books.filter(book => availableCount(book) > 0).map(book => `
            <option value="${book.id}">
                ${escapeHTML(book.title)} (${availableCount(book)} disponível(is))
            </option>
        `).join("")}
    `;

    if (students.some(s => s.id === previousStudent)) {
        studentSelect.value = previousStudent;
    }

    if (books.some(b => b.id === previousBook && availableCount(b) > 0)) {
        bookSelect.value = previousBook;
    }
}

function renderActiveLoans() {
    const active = loans.filter(loan => !loan.returnedAt);

    if (!active.length) {
        document.getElementById("activeLoans").innerHTML =
            emptyMessage("Não existem empréstimos ativos.");
        return;
    }

    document.getElementById("activeLoans").innerHTML = `
        <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>Aluno</th>
                    <th>Livro</th>
                    <th>Empréstimo</th>
                    <th>Devolução prevista</th>
                    <th>Situação</th>
                    <th>Ação</th>
                </tr>
            </thead>
            <tbody>
                ${active.map(loan => {
                    const student = students.find(s => s.id === loan.studentId);
                    const book = books.find(b => b.id === loan.bookId);
                    const overdue = loan.dueDate < today();

                    return `
                        <tr>
                            <td>${escapeHTML(student?.name || "Aluno removido")}</td>
                            <td>${escapeHTML(book?.title || "Livro removido")}</td>
                            <td>${formatDate(loan.date)}</td>
                            <td>${formatDate(loan.dueDate)}</td>
                            <td>
                                <span class="status ${overdue ? "unavailable" : "available"}">
                                    ${overdue ? "Atrasado" : "Em andamento"}
                                </span>
                            </td>
                            <td>
                                <button class="action-btn return"
                                    data-action="return-loan"
                                    data-id="${loan.id}">Devolver</button>
                            </td>
                        </tr>
                    `;
                }).join("")}
            </tbody>
        </table>
        </div>
    `;
}

function renderHistory() {
    const search = document.getElementById("searchHistory").value.toLowerCase();

    const filtered = loans.filter(loan => {
        const student = students.find(s => s.id === loan.studentId);
        const book = books.find(b => b.id === loan.bookId);

        return `${student?.name || ""} ${book?.title || ""}`
            .toLowerCase().includes(search);
    }).slice().reverse();

    if (!filtered.length) {
        document.getElementById("historyList").innerHTML =
            emptyMessage("Nenhum registro encontrado.");
        return;
    }

    document.getElementById("historyList").innerHTML = `
        <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>Aluno</th>
                    <th>Livro</th>
                    <th>Data do empréstimo</th>
                    <th>Devolução prevista</th>
                    <th>Devolvido em</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                ${filtered.map(loan => {
                    const student = students.find(s => s.id === loan.studentId);
                    const book = books.find(b => b.id === loan.bookId);

                    return `
                        <tr>
                            <td>${escapeHTML(student?.name || "Aluno removido")}</td>
                            <td>${escapeHTML(book?.title || "Livro removido")}</td>
                            <td>${formatDate(loan.date)}</td>
                            <td>${formatDate(loan.dueDate)}</td>
                            <td>${formatDate(loan.returnedAt)}</td>
                            <td>
                                <span class="status ${loan.returnedAt ? "available" : "unavailable"}">
                                    ${loan.returnedAt ? "Devolvido" : "Pendente"}
                                </span>
                            </td>
                        </tr>
                    `;
                }).join("")}
            </tbody>
        </table>
        </div>
    `;
}

// ======================================
// PAINEL INICIAL
// ======================================

function renderDashboard() {
    const active = loans.filter(loan => !loan.returnedAt);

    const totalCopies = books.reduce(
        (sum, book) => sum + Number(book.quantity), 0
    );

    const available = books.reduce(
        (sum, book) => sum + availableCount(book), 0
    );

    document.getElementById("totalBooks").textContent = books.length;
    document.getElementById("totalStudents").textContent = students.length;
    document.getElementById("totalLoans").textContent = active.length;
    document.getElementById("availableBooks").textContent = available;

    const recent = loans.slice().reverse().slice(0, 5);

    if (!recent.length) {
        document.getElementById("recentLoans").innerHTML =
            emptyMessage("Nenhum empréstimo registrado ainda.");
        return;
    }

    document.getElementById("recentLoans").innerHTML = `
        <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>Aluno</th>
                    <th>Livro</th>
                    <th>Data</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                ${recent.map(loan => {
                    const student = students.find(s => s.id === loan.studentId);
                    const book = books.find(b => b.id === loan.bookId);

                    return `
                        <tr>
                            <td>${escapeHTML(student?.name || "Aluno removido")}</td>
                            <td>${escapeHTML(book?.title || "Livro removido")}</td>
                            <td>${formatDate(loan.date)}</td>
                            <td>
                                <span class="status ${loan.returnedAt ? "available" : "unavailable"}">
                                    ${loan.returnedAt ? "Devolvido" : "Pendente"}
                                </span>
                            </td>
                        </tr>
                    `;
                }).join("")}
            </tbody>
        </table>
        </div>
    `;
}

// ======================================
// PESQUISAS
// ======================================

document.getElementById("searchBooks").addEventListener("input", renderBooks);
document.getElementById("searchStudents").addEventListener("input", renderStudents);
document.getElementById("searchHistory").addEventListener("input", renderHistory);

// ======================================
// AÇÕES DOS BOTÕES DAS TABELAS
// ======================================

document.addEventListener("click", event => {
    const button = event.target.closest("[data-action]");
    if (!button) return;

    const id = button.dataset.id;

    switch (button.dataset.action) {
        case "edit-book":
            editBook(id);
            break;
        case "delete-book":
            deleteBook(id);
            break;
        case "edit-student":
            editStudent(id);
            break;
        case "delete-student":
            deleteStudent(id);
            break;
        case "return-loan":
            returnBook(id);
            break;
    }
});

// ======================================
// ATUALIZAR SISTEMA
// ======================================

function renderAll() {
    renderBooks();
    renderStudents();
    renderLoanOptions();
    renderActiveLoans();
    renderHistory();
    renderDashboard();
}

// Inicialização
renderAll();
