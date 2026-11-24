
let notes = JSON.parse(localStorage.getItem("myNotes")) || [];
let currentNoteId = null;

const noteTitle = document.getElementById("noteTitle");
const noteText = document.getElementById("noteText");
const notesList = document.getElementById("notesList");
const noteDate = document.getElementById("noteDate");
const saveStatus = document.getElementById("saveStatus");
const editorContent = document.getElementById("editorContent");
const emptyState = document.getElementElementById
    ? document.getElementById("emptyState")
    : document.getElementById("emptyState");

// SALVAR NOTAS

function saveNotes() {
    localStorage.setItem("myNotes", JSON.stringify(notes));
}

// CRIAR NOTA

function createNote() {
    const note = {
        id: Date.now(),
        title: "",
        text: "",
        date: new Date().toLocaleString("pt-BR")
    };

    notes.unshift(note);
    currentNoteId = note.id;

    saveNotes();
    renderNotes();
    openNote(note.id);

    noteTitle.focus();
}

// ABRIR NOTA

function openNote(id) {
    currentNoteId = id;

    const note = notes.find(n => n.id === id);

    if (!note) return;

    editorContent.style.display = "flex";
    emptyState.style.display = "none";

    noteTitle.value = note.title;
    noteText.value = note.text;
    noteDate.textContent = note.date;

    renderNotes();
}

// EDITAR NOTA

function editNote() {
    const note = notes.find(n => n.id === currentNoteId);

    if (!note) return;

    note.title = noteTitle.value;
    note.text = noteText.value;
    note.date = new Date().toLocaleString("pt-BR");

    saveNotes();
    renderNotes();

    saveStatus.textContent = "Salvo automaticamente ✓";
}

// EXCLUIR NOTA

function deleteNote() {
    if (currentNoteId === null) return;

    notes = notes.filter(n => n.id !== currentNoteId);

    currentNoteId = null;

    saveNotes();
    renderNotes();

    showEmptyState();
}

// ESTADO VAZIO

function showEmptyState() {
    editorContent.style.display = "none";
    emptyState.style.display = "flex";
}

// LISTAR NOTAS

function renderNotes() {
    const search = document.getElementById("search").value.toLowerCase();

    notesList.innerHTML = "";

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(search) ||
        note.text.toLowerCase().includes(search)
    );

    filteredNotes.forEach(note => {
        const item = document.createElement("div");

        item.className = "note-item";

        if (note.id === currentNoteId) {
            item.classList.add("active");
        }

        const title = document.createElement("h3");
        title.textContent = note.title || "Nota sem título";

        const preview = document.createElement("p");
        preview.textContent = note.text || "Nota vazia";

        const date = document.createElement("small");
        date.textContent = note.date;

        item.appendChild(title);
        item.appendChild(preview);
        item.appendChild(date);

        item.onclick = () => openNote(note.id);

        notesList.appendChild(item);
    });
}

// EVENTOS DE DIGITAÇÃO

noteTitle.addEventListener("input", editNote);
noteText.addEventListener("input", editNote);

// INICIALIZAÇÃO

renderNotes();

if (notes.length > 0) {
    openNote(notes[0].id);
} else {
    showEmptyState();
}
ahj