document.addEventListener("DOMContentLoaded", () => {
    
    // Captura todos os botões de ação das fofocas (blast-btn)
    const blastButtons = document.querySelectorAll(".blast-btn");

    blastButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            // Efeito sonoro ou visual simulado de envio de alerta de fofoca
            alert(`📢 ALERTA GOSSIP GIRL:\nEsta fofoca está trancada a sete chaves até o próximo encontro da elite de Manhattan. XOXO!`);
            
            // Adiciona um efeito temporário de brilho ao card clicado
            const card = button.closest('div.bg-\\[\\#1f2833\\]');
            if (card) {
                card.classList.add("ring-2", "ring-[#c5a059]");
                setTimeout(() => {
                    card.classList.remove("ring-2", "ring-[#c5a059]");
                }, 2000);
            }
        });
    });
});
