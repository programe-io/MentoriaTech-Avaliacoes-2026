
// Inicializa os ícones Lucide
document.addEventListener("DOMContentLoaded", function () {
    lucide.createIcons();

    // Seleciona os links do menu
    const menuLinks = document.querySelectorAll(".menu-link");

    // Atualiza o link ativo ao clicar
    menuLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            menuLinks.forEach(function (item) {
                item.classList.remove("active");
            });

            link.classList.add("active");
        });
    });

    // Anima a barra de progresso
    const progressFill = document.getElementById("progressFill");
    const progressText = document.getElementById("progressText");

    const progress = 70;

    if (progressFill && progressText) {
        progressFill.style.width = progress + "%";
        progressText.textContent = progress + "%";
    }
});
