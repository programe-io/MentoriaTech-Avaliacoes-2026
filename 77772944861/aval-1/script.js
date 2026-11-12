
// ELEMENTOS DA TELA

const intro = document.getElementById("intro");
const enterButton = document.getElementById("enterButton");

const notes = document.getElementById("notes");
const saveButton = document.getElementById("saveNotes");
const clearButton = document.getElementById("clearNotes");
const saveMessage = document.getElementById("saveMessage");

// ANIMAÇÃO DE ENTRADA

enterButton.addEventListener("click", function() {

    intro.classList.add("hidden");

    // Pequena animação ao entrar
    document.body.style.overflow = "auto";

});

// BLOCO DE NOTAS

// Carregar anotações salvas
window.addEventListener("DOMContentLoaded", function() {

    const savedNotes = localStorage.getItem("sentryNotes");

    if (savedNotes !== null) {
        notes.value = savedNotes;
    }

});

// Salvar anotações
saveButton.addEventListener("click", function() {

    localStorage.setItem("sentryNotes", notes.value);

    saveMessage.textContent = "✦ Anotações salvas com sucesso!";

});

// Salvar automaticamente enquanto escreve
notes.addEventListener("input", function() {

    localStorage.setItem("sentryNotes", notes.value);

    saveMessage.textContent = "Salvando automaticamente...";

});

// Limpar anotações
clearButton.addEventListener("click", function() {

    const confirmar = confirm(
        "Tem certeza que deseja apagar todas as anotações?"
    );

    if (confirmar) {

        notes.value = "";

        localStorage.removeItem("sentryNotes");

        saveMessage.textContent = "Anotações apagadas.";

    }

});
