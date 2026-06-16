/* ==========================================================================
   1. CONTADOR REGRESSIVO PARA A COPA DO MUNDO 2026
   ========================================================================== */
function iniciarContador() {
    // Define a data de início da Copa de 2026 (Exemplo: 11 de Junho de 2026)
    const dataCopa = new Date('June 11, 2026 00:00:00').getTime();

    const intervalo = setInterval(() => {
        const agora = new Date().getTime();
        const distancia = dataCopa - agora;

        // Cálculos de tempo para dias, horas, minutos e segundos
        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        // Atualiza os elementos na tela
        const elementoContador = document.getElementById('contador-timer');
        
        if (elementoContador) {
            if (distancia < 0) {
                clearInterval(intervalo);
                elementoContador.innerHTML = "<strong>A Copa do Mundo Começou! ⚽</strong>";
            } else {
                elementoContador.innerHTML = `
                    <div class="tempo-box"><span>${dias}</span>d</div>
                    <div class="tempo-box"><span>${horas}</span>h</div>
                    <div class="tempo-box"><span>${minutos}</span>m</div>
                    <div class="tempo-box"><span>${segundos}</span>s</div>
                `;
            }
        }
    }, 1000);
}

/* ==========================================================================
   2. BOTÃO VOLTAR AO TOPO (SMOOTH SCROLL)
   ========================================================================== */
function configurarBotaoTopo() {
    // Cria o botão dinamicamente via JS
    const botaoTopo = document.createElement('button');
    botaoTopo.innerHTML = '↑';
    botaoTopo.id = 'btn-topo';
    botaoTopo.title = 'Voltar ao topo';
    document.body.appendChild(botaoTopo);

    // Mostra o botão apenas quando rolar 400px para baixo
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            botaoTopo.classList.add('visivel');
        } else {
            botaoTopo.classList.remove('visivel');
        }
    });

    // Evento de clique para subir suavemente
    botaoTopo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ==========================================================================
   3. DESTAQUE DINÂMICO NO MENU (SCROLL SPY)
   ========================================================================== */
function configurarMenuDinamico() {
    const secoes = document.querySelectorAll('section');
    const linksMenu = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let secaoAtual = '';

        secoes.forEach(secao => {
            const secaoTop = secao.offsetTop;
            const secaoHeight = secao.clientHeight;
            // Verifica se a rolagem da tela está sobre a seção
            if (window.scrollY >= (secaoTop - 150)) {
                secaoAtual = secao.getAttribute('id');
            }
        });

        linksMenu.forEach(link => {
            link.classList.remove('ativo');
            if (link.getAttribute('href') === `#${secaoAtual}`) {
                link.classList.add('ativo');
            }
        });
    });
}

// Inicializa todas as funções assim que o HTML carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    iniciarContador();
    configurarBotaoTopo();
    configurarMenuDinamico();
});