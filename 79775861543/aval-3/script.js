

function updateClock() {
    const now = new Date();
    
    // Formata o horário
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
    
    // Formata a data
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('pt-BR', options);
    
    document.getElementById('date').textContent = dateString;
}

// Atualiza o relógio a cada segundo
setInterval(updateClock, 1000);

// Executa imediatamente ao carregar a página
updateClock();
