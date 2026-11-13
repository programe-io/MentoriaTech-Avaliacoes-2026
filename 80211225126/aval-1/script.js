const pupilas = document.querySelectorAll('.pupila');
const terencio = document.getElementById('terencio');
const baba = document.getElementById('baba');
const btnBrocolis = document.getElementById('btnBrocolis');

// Faz os olhos seguirem o cursor do rato pelo ecrã
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 16 - 8;
    const y = (e.clientY / window.innerHeight) * 16 - 8;

    pupilas.forEach((pupila) => {
        pupila.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Função que ativa o salto de alegria e a baba verde
function darBrocolis() {
    terencio.classList.remove('pular');
    void terencio.offsetWidth; // Reinicia a animação CSS
    terencio.classList.add('pular');

    baba.style.height = '60px';
    setTimeout(() => {
        baba.style.height = '';
    }, 1000);
}

// Associa o clique no botão e no próprio Terêncio à ação
btnBrocolis.addEventListener('click', darBrocolis);
terencio.addEventListener('click', darBrocolis);
