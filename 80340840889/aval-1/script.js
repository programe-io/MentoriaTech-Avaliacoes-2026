
// ROLAGEM SUAVE DO MENU
document.querySelectorAll('nav a').forEach(link => {

    link.addEventListener('click', function(event) {

        const destino = document.querySelector(
            this.getAttribute('href')
        );

        if (destino) {
            event.preventDefault();

            destino.scrollIntoView({
                behavior: 'smooth'
            });
        }

    });

});


// ANIMAÇÃO DAS SEÇÕES
const secoes = document.querySelectorAll('.section');

const observador = new IntersectionObserver((entradas) => {

    entradas.forEach(entrada => {

        if (entrada.isIntersecting) {
            entrada.target.classList.add('visivel');
        }

    });

}, {
    threshold: 0.15
});

secoes.forEach(secao => {
    observador.observe(secao);
});


// BOTÃO DE CURTIR
const botaoCurtir = document.createElement('button');

botaoCurtir.textContent = '♡ Curtir este blog';
botaoCurtir.className = 'botao-curtir';

document.querySelector('.hero-content').appendChild(botaoCurtir);

let curtidas = 0;

botaoCurtir.addEventListener('click', () => {

    curtidas++;

    botaoCurtir.textContent =
        '♥ Curtido! (' + curtidas + ')';

    botaoCurtir.classList.add('curtido');

});


// BOTÃO VOLTAR AO TOPO
const voltarTopo = document.createElement('button');

voltarTopo.textContent = '↑';
voltarTopo.className = 'voltar-topo';

document.body.appendChild(voltarTopo);

window.addEventListener('scroll', () => {

    if (window.scrollY > 400) {
        voltarTopo.classList.add('aparecer');
    } else {
        voltarTopo.classList.remove('aparecer');
    }

});

voltarTopo.addEventListener('click', () => {

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

});


// ANO AUTOMÁTICO
const rodape = document.querySelector('footer span');

if (rodape) {
    rodape.textContent =
        '© ' + new Date().getFullYear() +
        ' - Blog Neymar Jr.';
}
