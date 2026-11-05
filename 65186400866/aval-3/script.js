const publishBtn = document.getElementById('publish-btn');
const cardText = document.getElementById('card-text');
const muralGrid = document.getElementById('mural-grid');

publishBtn.addEventListener('click', () => {
    const texto = cardText.value.trim();
    
    if (texto === "") {
        alert("Escreva uma mensagem antes de colar no mural!");
        return;
    }

    // Pega o emoji selecionado de forma dinâmica
    const emojiSelecionado = document.querySelector('input[name="emoji"]:checked').value;
    
    // Pega a classe de fundo selecionada
    const corSelecionada = document.querySelector('input[name="color"]:checked').value;

    // Criação do Card
    const card = document.createElement('div');
    card.classList.add('mural-card', corSelecionada);

    card.innerHTML = `
        <div class="card-top">
            <span class="card-emoji">${emojiSelecionado}</span>
            <button class="remove-card" title="Remover card">&times;</button>
        </div>
        <p class="card-text">${texto}</p>
    `;

    // Função interna para remover esse card específico
    const btnRemover = card.querySelector('.remove-card');
    btnRemover.addEventListener('click', () => {
        card.remove();
    });

    // Adiciona o card ao início do Grid do mural
    muralGrid.insertBefore(card, muralGrid.firstChild);

    // Reseta o campo de texto mantendo as preferências de cores/emoji
    cardText.value = "";
});
