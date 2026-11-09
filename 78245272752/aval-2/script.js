// ==========================================================================
// MUNDO DUAS RODAS - HONDA VS YAMAHA
// Interatividade e Sistema de Votação
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. SISTEMA DE VOTAÇÃO DE MARCAS
    // ----------------------------------------------------------------------
    // Objeto para armazenar a contagem de votos
    const votos = {
        Honda: 0,
        Yamaha: 0
    };

    // Função global para lidar com o clique nos botões de voto
    window.selecionarMarca = function(marca) {
        if (votos.hasOwnProperty(marca)) {
            votos[marca]++;
            
            const total = votos.Honda + votos.Yamaha;
            const porcentagem = Math.round((votos[marca] / total) * 100);

            alert(
                `Obrigado pelo seu voto na ${marca}!\n\n` +
                `Placar atual:\n` +
                `🔴 Honda: ${votos.Honda} voto(s)\n` +
                `🔵 Yamaha: ${votos.Yamaha} voto(s)\n\n` +
                `A ${marca} tem ${porcentagem}% dos votos nesta sessão!`
            );
        }
    };

    // 2. FILTRO POR CATEGORIA (STREET, TRAIL, SPORT)
    // ----------------------------------------------------------------------
    const bikeCards = document.querySelectorAll('.bike-card');

    bikeCards.forEach(card => {
        // Torna os cards clicáveis para destacar detalhes
        card.addEventListener('click', () => {
            const nomeMoto = card.querySelector('h3').textContent;
            const categoria = card.querySelector('.category').textContent;

            // Remove destaque anterior de outros cards
            bikeCards.forEach(c => c.style.outline = 'none');

            // Aplica um contorno de destaque no card selecionado
            card.style.outline = '2px solid #333';
            card.style.outlineOffset = '2px';

            console.log(`Moto selecionada: ${nomeMoto} [${categoria}]`);
        });
    });

    // 3. ANIMAÇÃO DE ENTRADA AO ROLAR A PÁGINA (SCROLL REVEAL)
    // ----------------------------------------------------------------------
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Aplica o efeito visual em cada coluna de marca
    const columns = document.querySelectorAll('.brand-column');
    columns.forEach((col, index) => {
        col.style.opacity = '0';
        col.style.transform = 'translateY(30px)';
        col.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        revealOnScroll.observe(col);
    });

});