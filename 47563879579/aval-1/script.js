
function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("active");
}

function mostrarInfo(nome, descricao) {
    document.getElementById("modal-title").textContent = nome;
    document.getElementById("modal-text").textContent = descricao;

    document.getElementById("modal").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

// Fecha o modal ao clicar fora do conteúdo
document.getElementById("modal").addEventListener("click", function(event) {
    if (event.target === this) {
        fecharModal();
    }
});

// Fecha o menu ao clicar em um link
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("menu").classList.remove("active");
    });
});
