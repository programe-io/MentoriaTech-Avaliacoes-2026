document.addEventListener('DOMContentLoaded', () => {
    // 1. Configuração do WhatsApp (substitua pelo número real com código do país e DDD)
    const WHATSAPP_NUMBER = '5586999999999';
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp');

    whatsappButtons.forEach((button) => {
        const defaultMessage =
            'Olá! Gostaria de agendar uma avaliação no Studio Beauty.';
        button.href = https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(defaultMessage)};
    });

    // 2. Agendamento rápido ao clicar nos cards de serviços
    const serviceSection = document.querySelector('#services-title')?.closest('section');
    if (serviceSection) {
        const serviceCards = serviceSection.querySelectorAll('.card');

        serviceCards.forEach((card) => {
            const serviceName = card.querySelector('h3')?.textContent.trim();
            if (!serviceName) return;

            card.style.cursor = 'pointer';
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute(
                'aria-label',
                Agendar ${serviceName} pelo WhatsApp
            );

            const openServiceWhatsApp = () => {
                const message = Olá! Gostaria de agendar o serviço: ${serviceName}.;
                const url = https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)};
                window.open(url, '_blank', 'noopener,noreferrer');
            };

            card.addEventListener('click', openServiceWhatsApp);
            card.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openServiceWhatsApp();
                }
            });
        });
    }

    // 3. Comportamento de acordeão no FAQ (abre um por vez)
    const faqItems = document.querySelectorAll('details');
    faqItems.forEach((item) => {
        item.addEventListener('toggle', () => {
            if (item.open) {
                faqItems.forEach((otherItem) => {
                    if (otherItem !== item) {
                        otherItem.open = false;
                    }
                });
            }
        });
    });

    // 4. Indicador de status (Aberto / Fechado) no card de horário
    const infoSection = document.querySelector('#info-title')?.closest('section');
    if (infoSection) {
        const scheduleCard = infoSection.querySelector('.card');
        if (scheduleCard) {
            const now = new Date();
            const day = now.getDay(); // 0 = Dom, 1 = Seg, ..., 6 = Sáb
            const hour = now.getHours();

            // Terça (2) a Sexta (5): 09h às 19h | Sábado (6): 08h às 14h
            const isWeekdayOpen = day >= 2 && day <= 5 && hour >= 9 && hour < 19;
            const isSaturdayOpen = day === 6 && hour >= 8 && hour < 14;
            const isOpen = isWeekdayOpen || isSaturdayOpen;

            const statusBadge = document.createElement('p');
            statusBadge.style.marginTop = '12px';
            statusBadge.style.fontWeight = 'bold';
            statusBadge.style.color = isOpen ? '#1ea952' : '#b23a48';
            statusBadge.textContent = isOpen
                ? '● Aberto agora'
                : '● Fechado no momento';

            scheduleCard.appendChild(statusBadge);
        }
    }

    // 5. Atualiza o ano no rodapé automaticamente
    const footerFirstParagraph = document.querySelector('footer p');
    if (footerFirstParagraph) {
        const currentYear = new Date().getFullYear();
        footerFirstParagraph.innerHTML = footerFirstParagraph.innerHTML.replace(
            /\b20\d{2}\b/,
            currentYear
        );
    }
});