// Selecionar o editor
const editor = document.querySelector(".editor");

// Efeito ao passar o mouse
editor.addEventListener("mouseenter", function () {
    editor.style.borderColor = "#42a5f5";
\});

// Voltar à cor original
editor.addEventListener("mouseleave", function () {
    editor.style.borderColor = "#30343d";
\});

// Mostrar mensagem ao clicar no arquivo
const arquivo = document.querySelector(".arquivo");

arquivo.addEventListener("click", function () {
    alert("Você abriu o arquivo index.html!");
\});$0