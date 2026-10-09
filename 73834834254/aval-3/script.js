document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 0. GERENCIAMENTO DE DARK MODE (MODO REBELDE)
    // ==========================================
    const toggleBtn = document.getElementById("dark-mode-toggle");
    
    toggleBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        
        if (currentTheme === "dark") {
            document.documentElement.removeAttribute("data-theme");
            toggleBtn.textContent = "🌙 Ativar Modo Rebelde (Dark)";
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            toggleBtn.textContent = "☀️ Ativar Modo Preppy (Light)";
        }
    });

    // ==========================================
    // 1. MANIPULAÇÃO DE DISPLAY
    // ==========================================
    const btnGrid = document.getElementById("btn-grid");
    const btnList = document.getElementById("btn-list");
    const displayContainer = document.getElementById("display-container");

    btnGrid.addEventListener("click", () => {
        // Alterna para o formato Grid
        displayContainer.className = "display-grid";
        btnGrid.classList.add("active");
        btnList.classList.remove("active");
    });

    btnList.addEventListener("click", () => {
        // Altera a classe modificando o fluxo de renderização (display: block)
        displayContainer.className = "display-block";
        btnList.classList.add("active");
        btnGrid.classList.remove("active");
    });

    // ==========================================
    // 2. MANIPULAÇÃO DE VISIBILITY
    // ==========================================
    const btnHide = document.getElementById("btn-hide");
    const btnShow = document.getElementById("btn-show");
    const secretNote = document.getElementById("secret-note");

    btnHide.addEventListener("click", () => {
        // Esconde o elemento do olhar, mas mantém seu quadrado/espaço intacto na tela
        secretNote.style.visibility = "hidden";
    });

    btnShow.addEventListener("click", () => {
        // Devolve o elemento à visibilidade padrão
        secretNote.style.visibility = "visible";
    });
});
