// ==========================================================================
// 1. ANIMAÇÃO AO ROLAR A PÁGINA (Fade-In Effect)
// ==========================================================================

// Seleciona todos os elementos principais e as linhas horizontais para animar
const sections = document.querySelectorAll('h2, p, ul, ol, table, hr');

// Configura o observador para identificar quando os elementos aparecem na tela
const appearanceOptions = {
    threshold: 0.15, // Ativa quando 15% do elemento estiver visível
    rootMargin: "0px 0px -50px 0px" // Ativa um pouco antes do elemento chegar ao topo
};

const appearanceObserver = new IntersectionObserver(function(entries, appearanceObserver) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            appearanceObserver.unobserve(entry.target); // Para de observar após animar
        }
    });
}, appearanceOptions);

// Aplica o estilo inicial oculto e inicia a observação de cada elemento
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    appearanceObserver.observe(section);
});


// ==========================================================================
// 2. INTERATIVIDADE NAS LISTAS (Efeito de Destaque)
// ==========================================================================

// Seleciona todos os itens de lista (personagens, vilões e spin-offs)
const listItems = document.querySelectorAll('li');

listItems.forEach(item => {
    // Quando o mouse passa por cima do item
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(10px)';
        item.style.color = '#ff6666';
        item.style.transition = 'all 0.3s ease';
        item.style.cursor = 'pointer';
    });

    // Quando o mouse sai do item
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0)';
        item.style.color = ''; // Volta ao padrão do CSS
    });
});


// ==========================================================================
// 3. CRIAÇÃO DE UM BOTÃO DE RETORNO AO TOPO (Back to Top)
// ==========================================================================

// Cria o botão dinamicamente via JS
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '&#8593;'; // Seta para cima
document.body.appendChild(backToTopButton);

// Estiliza o botão dinamicamente para não depender do arquivo CSS externo
Object.assign(backToTopButton.style, {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '45px',
    height: '45px',
    backgroundColor: '#ff3333',
    color: '#ffffff',
    border: 'none',
    borderRadius: '50%',
    fontSize: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.5)',
    display: 'none', // Começa escondido
    zIndex: '1000',
    transition: 'opacity 0.3s ease'
});

// Mostra o botão apenas quando o usuário rolar a página para baixo
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

// Leva o usuário suavemente para o topo ao clicar
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// ==========================================================================
// 4. MENSAGEM DE BOAS-VINDAS NO CONSOLE (Easter Egg)
// ==========================================================================
console.log(
    "%c🧟 WARNING: DON'T OPEN, DEAD INSIDE! 🧟", 
    "color: #ff3333; font-size: 20px; font-weight: bold; background-color: #1a1a1a; padding: 10px; border-radius: 5px;"
);
console.log("O script de interatividade do site The Walking Dead foi carregado com sucesso!");