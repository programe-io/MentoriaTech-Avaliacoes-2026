document.addEventListener("DOMContentLoaded", () => {
    // 1. Seleciona todos os itens do sumário na página
    const itensSumario = document.querySelectorAll(".sumario-item");

    // 2. Adiciona um evento de clique para cada item encontrado
    itensSumario.forEach((item, index) => {
        item.addEventListener("click", () => {
            
            // Remove o destaque do item que foi clicado anteriormente
            itensSumario.forEach(i => i.style.fontWeight = "normal");

            // 3. Destaca o item atual clicado
            item.style.fontWeight = "bold";

            // 4. Descobre o número do tópico (índice começa em 0, por isso somamos 1)
            const numeroTopico = index + 1;
            const nomeTopico = item.textContent;

            // 5. Exibe uma mensagem no console e um alerta na tela
            console.log(`Você navegou para o tópico ${numeroTopico}: ${nomeTopico}`);
            alert(`Abrindo: ${nomeTopico}\n(Tópico número ${numeroTopico})`);
        });
    });
});
