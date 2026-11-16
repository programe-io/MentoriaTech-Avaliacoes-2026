document.addEventListener('DOMContentLoaded', () => {
    // IMPORTANTE: Substitua pelo número de WhatsApp da consultora (com DDI 55 e DDD)
    const WHATSAPP_NUMBER = '5586999999999';

    // 1. Filtro de perfumes por ocasião
    const filterButtons = document.querySelectorAll('.filter-btn');
    const perfumeCards = document.querySelectorAll('.perfume-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove classe ativa de todos os botões e adiciona no clicado
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            perfumeCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                
                if (filterValue === 'todos' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 2. Redirecionamento para compra de perfume específico no WhatsApp
    const buyButtons = document.querySelectorAll('.buy-btn');

    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const perfumeName = button.getAttribute('data-perfume');
            const message = `Olá! Li o artigo no blog *Essência & Sofisticação* e gostaria de encomendar o perfume *${perfumeName}* da Avon.`;
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
            
            window.open(whatsappUrl, '_blank');
        });
    });

    // 3. Botão geral de atendimento no rodapé
    const generalBtn = document.getElementById('general-whatsapp-btn');
    
    if (generalBtn) {
        generalBtn.addEventListener('click', () => {
            const message = 'Olá! Vim pelo blog *Essência & Sofisticação* e gostaria de ver o catálogo completo de perfumes da Avon.';
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
            
            window.open(whatsappUrl, '_blank');
        });
    }
});