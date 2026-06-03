//// Botão "Saiba Mais"
const btnSaibaMais = document.getElementById('btnSaibaMais');
btnSaibaMais.addEventListener('click', () => {
    alert('A Pantene usa a tecnologia Pro-V, uma combinação de nutrientes que penetram nos fios, reparando danos e protegendo os cabelos dia após dia!');
});

// Botões "Ver Detalhes"
const botoesDetalhes = document.querySelectorAll('.btn-comprar');
botoesDetalhes.forEach(botao => {
    botao.addEventListener('click', (e) => {
        const nomeProduto = e.target.parentElement.querySelector('h3').textContent;
        alert(`Você clicou para ver detalhes do produto: ${nomeProduto}`);
    });
});

// Formulário de contato
const formContato = document.getElementById('formContato');
formContato.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
    formContato.reset();
});

// Efeito de rolagem suave nos links do menu
const linksMenu = document.querySelectorAll('.menu a[href^="#"]');
linksMenu.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const destino = document.querySelector(this.getAttribute('href'));
        destino.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});