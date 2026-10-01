// ============================================
// ELEMENTOS
// ============================================

const newBookBtn =
    document.getElementById("newBookBtn");

const closeModalBtn =
    document.getElementById("closeModal");

const cancelBtn =
    document.getElementById("cancelBtn");

const modal =
    document.getElementById("bookModal");

const form =
    document.getElementById("bookForm");

const bookIdInput =
    document.getElementById("bookId");

const titleInput =
    document.getElementById("bookTitle");

const authorInput =
    document.getElementById("bookAuthor");

const yearInput =
    document.getElementById("bookYear");

const categoryInput =
    document.getElementById("bookCategory");

const searchInput =
    document.getElementById("searchInput");

const filterStatus =
    document.getElementById("filterStatus");

const booksTable =
    document.getElementById("booksTable");

const emptyState =
    document.getElementById("emptyState");

const totalBooks =
    document.getElementById("totalBooks");

const availableBooks =
    document.getElementById("availableBooks");

const borrowedBooks =
    document.getElementById("borrowedBooks");

const resultCount =
    document.getElementById("resultCount");

const modalTitle =
    document.getElementById("modalTitle");


// ============================================
// DADOS INICIAIS
// ============================================

let books =
    JSON.parse(
        localStorage.getItem("libraryBooks")
    ) || [];


// ============================================
// SALVAR
// ============================================

function saveBooks() {

    localStorage.setItem(
        "libraryBooks",
        JSON.stringify(books)
    );

}


// ============================================
// ABRIR MODAL
// ============================================

newBookBtn.addEventListener(
    "click",
    function() {

        openNewBookModal();

    }
);


function openNewBookModal() {

    form.reset();

    bookIdInput.value = "";

    modalTitle.textContent =
        "Adicionar livro";

    modal.classList.add("show");

    titleInput.focus();

}


// ============================================
// FECHAR MODAL
// ============================================

closeModalBtn.addEventListener(
    "click",
    closeModal
);


cancelBtn.addEventListener(
    "click",
    closeModal
);


modal.addEventListener(
    "click",
    function(event) {

        if (event.target === modal) {
            closeModal();
        }

    }
);


function closeModal() {

    modal.classList.remove("show");

}


// ============================================
// CADASTRAR / EDITAR
// ============================================

form.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const id =
            bookIdInput.value;


        const bookData = {

            title:
                titleInput.value.trim(),

            author:
                authorInput.value.trim(),

            year:
                Number(yearInput.value),

            category:
                categoryInput.value

        };


        // EDITAR
        if (id) {

            books = books.map(book => {

                if (book.id === Number(id)) {

                    return {
                        ...book,
                        ...bookData
                    };

                }

                return book;

            });

        }

        // NOVO LIVRO
        else {

            books.unshift({

                id: Date.now(),

                ...bookData,

                status: "available"

            });

        }


        saveBooks();

        render();

        closeModal();

    }
);


// ============================================
// RENDERIZAR
// ============================================

function render() {

    const filteredBooks =
        getFilteredBooks();

    renderTable(filteredBooks);

    updateStats();

    updateResultCount(
        filteredBooks.length
    );

}


// ============================================
// FILTRAGEM
// ============================================

function getFilteredBooks() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();

    const status =
        filterStatus.value;


    return books.filter(book => {

        const matchesSearch =

            book.title
                .toLowerCase()
                .includes(search)

            ||

            book.author
                .toLowerCase()
                .includes(search);


        const matchesStatus =

            status === "all"

            ||

            book.status === status;


        return (
            matchesSearch &&
            matchesStatus
        );

    });

}


// ============================================
// TABELA
// ============================================

function renderTable(list) {

    booksTable.innerHTML = "";


    if (list.length === 0) {

        emptyState.style.display =
            "block";

        return;

    }


    emptyState.style.display =
        "none";


    list.forEach(book => {

        const row =
            document.createElement("tr");


        // LIVRO
        const titleCell =
            document.createElement("td");

        titleCell.innerHTML = `
            <span class="book-title">
                ${escapeHTML(book.title)}
            </span>

            <span class="book-category">
                ${escapeHTML(book.category)}
            </span>
        `;


        // AUTOR
        const authorCell =
            document.createElement("td");

        authorCell.textContent =
            book.author;


        // ANO
        const yearCell =
            document.createElement("td");

        yearCell.textContent =
            book.year;


        // STATUS
        const statusCell =
            document.createElement("td");

        const status =
            document.createElement("span");

        status.className =
            `status ${book.status}`;


        if (book.status === "available") {

            status.textContent =
                "Disponível";

        } else {

            status.textContent =
                "Emprestado";

        }


        statusCell.appendChild(status);


        // AÇÕES
        const actionsCell =
            document.createElement("td");

        const actions =
            document.createElement("div");

        actions.className =
            "actions";


        // Botão editar
        const editButton =
            document.createElement("button");

        editButton.className =
            "action-btn";

        editButton.textContent =
            "✎";

        editButton.title =
            "Editar";


        editButton.addEventListener(
            "click",
            function() {

                editBook(book.id);

            }
        );


        // Botão empréstimo/devolução
        const toggleButton =
            document.createElement("button");

        toggleButton.className =
            "action-btn";

        toggleButton.textContent =
            book.status === "available"
                ? "↗"
                : "↙";

        toggleButton.title =
            book.status === "available"
                ? "Registrar empréstimo"
                : "Registrar devolução";


        toggleButton.addEventListener(
            "click",
            function() {

                toggleBookStatus(book.id);

            }
        );


        // Botão excluir
        const deleteButton =
            document.createElement("button");

        deleteButton.className =
            "action-btn delete";

        deleteButton.textContent =
            "×";

        deleteButton.title =
            "Excluir";


        deleteButton.addEventListener(
            "click",
            function() {

                deleteBook(book.id);

            }
        );


        actions.appendChild(editButton);

        actions.appendChild(toggleButton);

        actions.appendChild(deleteButton);

        actionsCell.appendChild(actions);


        row.appendChild(titleCell);

        row.appendChild(authorCell);

        row.appendChild(yearCell);

        row.appendChild(statusCell);

        row.appendChild(actionsCell);


        booksTable.appendChild(row);

    });

}


// ============================================
// EDITAR LIVRO
// ============================================

function editBook(id) {

    const book =
        books.find(
            item => item.id === id
        );


    if (!book) {
        return;
    }


    bookIdInput.value =
        book.id;

    titleInput.value =
        book.title;

    authorInput.value =
        book.author;

    yearInput.value =
        book.year;

    categoryInput.value =
        book.category;


    modalTitle.textContent =
        "Editar livro";

    modal.classList.add("show");

    titleInput.focus();

}


// ============================================
// ALTERAR STATUS
// ============================================

function toggleBookStatus(id) {

    books = books.map(book => {

        if (book.id === id) {

            return {

                ...book,

                status:
                    book.status === "available"
                        ? "borrowed"
                        : "available"

            };

        }

        return book;

    });


    saveBooks();

    render();

}


// ============================================
// EXCLUIR
// ============================================

function deleteBook(id) {

    const book =
        books.find(
            item => item.id === id
        );


    if (!book) {
        return;
    }


    const confirmed =
        confirm(
            `Deseja excluir "${book.title}"?`
        );


    if (!confirmed) {
        return;
    }


    books =
        books.filter(
            item => item.id !== id
        );


    saveBooks();

    render();

}


// ============================================
// ESTATÍSTICAS
// ============================================

function updateStats() {

    const total =
        books.length;


    const available =
        books.filter(
            book =>
                book.status === "available"
        ).length;


    const borrowed =
        books.filter(
            book =>
                book.status === "borrowed"
        ).length;


    totalBooks.textContent =
        total;

    availableBooks.textContent =
        available;

    borrowedBooks.textContent =
        borrowed;

}


// ============================================
// CONTADOR
// ============================================

function updateResultCount(count) {

    resultCount.textContent =
        count === 1
            ? "1 livro"
            : `${count} livros`;

}


// ============================================
// BUSCA
// ============================================

searchInput.addEventListener(
    "input",
    render
);


filterStatus.addEventListener(
    "change",
    render
);


// ============================================
// SEGURANÇA DO HTML
// ============================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


// ============================================
// INICIALIZAÇÃO
// ============================================

render();
