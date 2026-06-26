alert("Bem-vinda(o) ao meu blog!");

function mudarTitulo() {
    document.querySelector("header h1").innerText = "Meu Blog Atualizado!";
}

function modoEscuro() {
    document.body.classList.toggle("dark-mode");
}