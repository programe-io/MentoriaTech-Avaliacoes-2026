
document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();

    const newProjectButton =
        document.getElementById("newProjectButton");

    const projectTable =
        document.getElementById("projectTable");

    const activeProjects =
        document.getElementById("activeProjects");

    const searchInput =
        document.getElementById("search");

    newProjectButton.addEventListener("click", () => {
        const name = prompt("Digite o nome do novo projeto:");

        if (!name || !name.trim()) {
            return;
        }

        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.className = "py-4 font-semibold";
        nameCell.textContent = name.trim();

        const responsibleCell = document.createElement("td");
        responsibleCell.className = "py-4";
        responsibleCell.textContent = "Você";

        const progressCell = document.createElement("td");
        progressCell.className = "py-4";
        progressCell.textContent = "0%";

        const statusCell = document.createElement("td");
        statusCell.className = "py-4";

        const status = document.createElement("span");
        status.className = "status-ok";
        status.textContent = "Novo";

        statusCell.appendChild(status);

        row.append(
            nameCell,
            responsibleCell,
            progressCell,
            statusCell
        );

        projectTable.prepend(row);

        activeProjects.textContent =
            Number(activeProjects.textContent) + 1;
    });

    searchInput.addEventListener("input", () => {
        const term = searchInput.value
            .toLocaleLowerCase("pt-BR")
            .trim();

        const rows = projectTable.querySelectorAll("tr");

        rows.forEach((row) => {
            const content = row.textContent
                .toLocaleLowerCase("pt-BR");

            row.hidden = !content.includes(term);
        });
    });

    // Notificações
    document
        .getElementById("notificationButton")
        .addEventListener("click", () => {
            alert("Você não tem novas notificações.");
        });

    document
        .getElementById("logoutButton")
        .addEventListener("click", () => {
            alert(
                "Este painel é demonstrativo e não possui autenticação."
            );
        });
});
