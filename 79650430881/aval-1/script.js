// Aguarda o carregamento do DOM
document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggle-reading-mode");
    const bodyElement = document.body;

    // Função para ativar/desativar o Modo Foco (Modo Vampiro)
    toggleButton.addEventListener("click", () => {
        bodyElement.classList.toggle("focus-active");
        
        // Altera o texto do botão conforme o estado
        if (bodyElement.classList.contains("focus-active")) {
            toggleButton.textContent = "Modo Normal";
            toggleButton.style.backgroundColor = "#b30000";
        } else {
            toggleButton.textContent = "Modo Vampiro (Foco)";
            toggleButton.style.backgroundColor = "#8b0000";
        }
    });

    // Efeito suave extra: Destacar o item do sumário correspondente ao ler (Opcional)
    const diaryPages = document.querySelectorAll(".diary-page");
    const menuLinks = document.querySelectorAll(".sidebar ul li a");

    window.addEventListener("scroll", () => {
        let currentSectionId = "";
        
        diaryPages.forEach(page => {
            const pageTop = page.offsetTop;
            if (pageYOffset >= pageTop - 60) {
                currentSectionId = page.getAttribute("id");
            }
        });

        menuLinks.forEach(link => {
            link.style.color = "#aaa";
            link.style.fontWeight = "normal";
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.style.color = "#b30000";
                link.style.fontWeight = "bold";
            }
        });
    });
});
