document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabPanes = document.querySelectorAll(".tab-pane");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove a classe 'active' de todos os botões e painéis
            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabPanes.forEach(pane => pane.classList.remove("active"));

            // Adiciona a classe 'active' ao botão clicado
            button.classList.add("active");

            // Pega o alvo correspondente e ativa o painel correspondente
            const target = button.getAttribute("data-target");
            const targetPane = document.getElementById(target);
            
            if (targetPane) {
                targetPane.classList.add("active");
            }
        });
    });
});