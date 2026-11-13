document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".bottom-nav button");

    // Identifica os botões da navegação
    const pages = ["Home", "Search", "Explore", "Reels", "Profile"];

    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {

            // Remove a seleção anterior
            buttons.forEach(btn => {
                btn.classList.remove("active");
            \});

            // Ativa o botão selecionado
            button.classList.add("active");

            // Identifica a página selecionada
            console.log("Página selecionada:", pages[index]);

            // Evento personalizado para trocar de página
            document.dispatchEvent(
                new CustomEvent("pageChange", {
                    detail: {
                        page: pages[index]
                    \}
                \})
            );
        \});
    \});
\});

// Recebe a mudança de página
document.addEventListener("pageChange", (event) => {
    console.log("Navegando para:", event.detail.page);
\});$0