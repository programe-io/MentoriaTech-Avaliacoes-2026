// Seleciona os elementos necessários do HTML
const searchInput = document.getElementById('searchInput');
const tableRows = document.querySelectorAll('#productsTable tbody tr');
const noResultsMessage = document.getElementById('noResults');

// Adiciona um evento que monitora quando o usuário digita na barra de pesquisa
searchInput.addEventListener('keyup', function(event) {
    const searchTerm = event.target.value.toLowerCase(); // Texto digitado em letras minúsculas
    let foundAny = false; // Variável para controlar se algum produto foi encontrado

    // Percorre cada linha (tr) da tabela de produtos
    tableRows.forEach(row => {
        // Pega o texto da coluna do Nome do Produto (index 0) e do Setor (index 1)
        const productName = row.cells[0].textContent.toLowerCase();
        const productSector = row.cells[1].textContent.toLowerCase();

        // Se o termo de busca estiver no nome ou no setor, a linha continua visível
        if (productName.includes(searchTerm) || productSector.includes(searchTerm)) {
            row.style.display = ""; // Mostra a linha
            foundAny = true; // Define que encontrou pelo menos um resultado
        } else {
            row.style.display = "none"; // Esconde a linha
        }
    });

    // Se nenhum produto for encontrado, mostra a mensagem de erro na tela
    if (foundAny) {
        noResultsMessage.style.display = "none";
    } else {
        noResultsMessage.style.display = "block";
    }
});