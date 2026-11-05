document.addEventListener("DOMContentLoaded", () => {
    // Captura os containers de lista de cada coluna
    const todoList = document.querySelector("#col-todo .cards-list");
    const progressList = document.querySelector("#col-progress .cards-list");
    const doneList = document.querySelector("#col-done .cards-list");

    // Delegação de eventos para capturar o clique nos botões de mover
    document.body.addEventListener("click", (event) => {
        if (event.target.classList.contains("move-btn")) {
            const button = event.target;
            const card = button.closest(".task-card");
            const currentColumnId = card.parentElement.parentElement.id;

            if (currentColumnId === "col-todo") {
                // Move da coluna "A Fazer" para "Em Progresso"
                progressList.appendChild(card);
            } else if (currentColumnId === "col-progress") {
                // Move da coluna "Em Progresso" para "Concluído"
                doneList.appendChild(card);
                // Atualiza o botão para indicar finalização
                button.textContent = "✓ Finalizado";
                button.style.backgroundColor = "#10b981";
                button.style.color = "white";
                button.style.pointerEvents = "none";
            }
        }
    });
});
