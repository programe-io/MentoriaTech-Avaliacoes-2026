/* ============================================
   1. EFEITO DE DIGITAÇÃO NO TERMINAL
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('codigo-terminal');
    
    if (terminal) {
        // Guarda o HTML original e limpa o elemento
        const htmlOriginal = terminal.innerHTML;
        terminal.innerHTML = '';
        terminal.style.opacity = '1';

        let i = 0;
        const velocidade = 15; // ms por caractere

        // Reconstrói o HTML caractere por caractere, preservando as tags
        const temp = document.createElement('div');
        temp.innerHTML = htmlOriginal;

        function digitar() {
            if (i < htmlOriginal.length) {
                // Avança até o próximo caractere "visível" (não parte de tag)
                if (htmlOriginal[i] === '<') {
                    const fim = htmlOriginal.indexOf('>', i);
                    terminal.innerHTML += htmlOriginal.slice(i, fim + 1);
                    i = fim + 1;
                    digitar();
                    return;
                }
                terminal.innerHTML = htmlOriginal.slice(0, i + 1).replace(/<[^>]*$/, '');
                i++;
                setTimeout(digitar, velocidade);
            } else {
                terminal.innerHTML = htmlOriginal;
                iniciarCursor();
            }
        }

        // Aguarda um pouco antes de começar
        setTimeout(digitar, 600);
    }

    // Cursor piscante ao final
    function iniciarCursor() {
        const cursor = document.createElement('span');
        cursor.className = 'cursor';
        cursor.textContent = '▊';
        terminal.appendChild(cursor);
    }
});

/* ============================================
   2. ANIMAÇÃO DE SCROLL (elementos aparecem)
   ============================================ */
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visivel');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplica em todos os cards e títulos
document.querySelectorAll('.skill-card, .projeto-card, .titulo-secao, .contato-texto, .contato-item')
    .forEach(el => {
        el.classList.add('animar-scroll');
        observer.observe(el);
    });

/* ============================================
   3. NAVBAR ATIVA CONFORME O SCROLL
   ============================================ */
const secoes = document.querySelectorAll('section[id], header[id]');
const linksNav = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let atual = '';

    secoes.forEach(secao => {
        const topo = secao.offsetTop - 150;
        if (window.scrollY >= topo) {
            atual = secao.getAttribute('id');
        }
    });

    linksNav.forEach(link => {
        link.classList.remove('ativo');
        if (link.getAttribute('href') === `#${atual}`) {
            link.classList.add('ativo');
        }
    });

    // Efeito de encolher a navbar ao rolar
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scroll');
    } else {
        navbar.classList.remove('scroll');
    }
});

/* ============================================
   4. EFEITO PARALLAX SUAVE NO FUNDO GLOW
   ============================================ */
const bgGlow = document.querySelector('.bg-glow');

window.addEventListener('mousemove', (e) => {
    if (!bgGlow) return;
    const x = (e.clientX / window.innerWidth) * 40 - 20;
    const y = (e.clientY / window.innerHeight) * 40 - 20;
    bgGlow.style.transform = `translate(${x}px, ${y}px)`;
});

/* ============================================
   5. SCROLL SUAVE COM OFFSET (compensa navbar)
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const destino = document.querySelector(link.getAttribute('href'));
        if (destino) {
            e.preventDefault();
            const topo = destino.offsetTop - 100;
            window.scrollTo({
                top: topo,
                behavior: 'smooth'
            });
        }
    });
});

/* ============================================
   6. EFEITO DE "GLOW" SEGUINDO O MOUSE NOS CARDS
   ============================================ */
document.querySelectorAll('.projeto-card, .skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

/* ============================================
   7. ANO AUTOMÁTICO NO FOOTER
   ============================================ */
const footerAno = document.querySelector('footer p');
if (footerAno) {
    footerAno.innerHTML = footerAno.innerHTML.replace(
        /\d{4}/,
        new Date().getFullYear()
    );
}