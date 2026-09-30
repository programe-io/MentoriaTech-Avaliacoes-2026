// Seleciona os elementos da tela
const toggleSwitch = document.getElementById('toggle-light');
const title = document.getElementById('status-title');
const description = document.getElementById('status-desc');

// Escuta o clique no interruptor
toggleSwitch.addEventListener('change', () => {
    if (toggleSwitch.checked) {
        // Ativa o Modo Claro (Luz Acesa)
        document.body.classList.add('light-mode');
        title.textContent = "A luz está acesa!";
        description.textContent = "Interface limpa, clara e cheia de energia para o seu dia de trabalho.";
    } else {
        // Retorna ao Modo Escuro (Luz Apagada)
        document.body.classList.remove('light-mode');
        title.textContent = "A sala está escura.";
        description.textContent = "Clique no interruptor abaixo para acender a luz e mudar a atmosfera.";
    }
});
