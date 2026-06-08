// Mensagem de boas-vindas ao abrir o site
window.onload = function () {
    alert("Bem-vindo ao projeto de Renan Xavier Brito!");
};

// Destacar seção ao clicar no menu
const links = document.querySelectorAll("nav a");

links.forEach(link => {
    link.addEventListener("click", function () {
        // Remove destaque de todas as seções
        document.querySelectorAll("section").forEach(sec => {
            sec.style.border = "none";
        });

        // Pega o ID da seção clicada
        const id = this.getAttribute("href");
        const section = document.querySelector(id);

        // Destaca a seção
        if (section) {
            section.style.border = "2px solid #1abc9c";
        }
    });
};

// Mostra uma mensagem quando o usuário clica em uma seção
const sections = document.querySelectorAll("section");

sections.forEach(sec => {
    sec.addEventListener("click", function () {
        alert("Você clicou na seção: " + this.querySelector("h2").innerText);
    });
});