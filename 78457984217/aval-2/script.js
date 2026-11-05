document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("add-transaction-btn");
    const tableBody = document.getElementById("transaction-rows");

    // Adiciona uma nova linha dinamicamente na tabela ao clicar
    btn.addEventListener("click", () => {
        const newRow = document.createElement("tr");
        
        newRow.innerHTML = `
            <td>Recompensa de Bug Bounty</td>
            <td>Trabalho</td>
            <td>05/11/2026</td>
            <td class="positive">+ R$ 850,00</td>
        `;
        
        tableBody.appendChild(newRow);
        
        // Desativa o botão após o clique para simulação única
        btn.disabled = true;
        btn.textContent = "Nova Entrada Adicionada!";
        btn.style.backgroundColor = "#94a3b8";
    });
});
