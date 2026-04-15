const paletteContainer = document.getElementById('palette');
const generateBtn = document.getElementById('generate-btn');

// Função para gerar uma cor aleatória
function generateRandomColor() {
    const chars = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += chars[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Função para criar a paleta na tela
function createPalette() {
    paletteContainer.innerHTML = ''; // Limpa a paleta atual

    for (let i = 0; i < 5; i++) {
        const color = generateRandomColor();
        
        const colorCard = document.createElement('div');
        colorCard.classList.add('color-card');
        colorCard.style.backgroundColor = color;

        const colorText = document.createElement('span');
        colorText.innerText = color;

        colorCard.appendChild(colorText);
        
        // Evento para copiar a cor ao clicar
        colorCard.addEventListener('click', () => {
            navigator.clipboard.writeText(color);
            alert(`Cor ${color} copiada para a área de transferência!`);
        });

        paletteContainer.appendChild(colorCard);
    }
}

// Eventos
generateBtn.addEventListener('click', createPalette);

window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        createPalette();
    }
});

// Inicializar ao carregar a página
createPalette();