document.addEventListener("DOMContentLoaded", () => {
    
    // --- Laboratório Prático: Manipulação Dinâmica de Arrays ---
    let minhaLista = ["HTML", "CSS"]; // Array inicial heterogêneo/dinâmico
    
    const itemInput = document.getElementById("itemInput");
    const btnAddItem = document.getElementById("btnAddItem");
    const btnClearList = document.getElementById("btnClearList");
    const arrayOutput = document.getElementById("arrayOutput");

    function atualizarVisualizacaoArray() {
        // Exibe o array formatado e seu tamanho dinâmico
        arrayOutput.innerHTML = `Array atual: [ ${minhaLista.map(item => `"${item}"`).join(", ")} ] <br><small>Tamanho do Array: ${minhaLista.length} elemento(s)</small>`;
    }

    if (btnAddItem) {
        btnAddItem.addEventListener("click", () => {
            let novoItem = itemInput.value.trim();
            if (novoItem !== "") {
                minhaLista.push(novoItem); // Adiciona dinamicamente ao array
                itemInput.value = "";
                atualizarVisualizacaoArray();
            }
        });
    }

    if (btnClearList) {
        btnClearList.addEventListener("click", () => {
            minhaLista = [];
            atualizarVisualizacaoArray();
        });
    }

    // Inicializa a exibição
    atualizarVisualizacaoArray();
});