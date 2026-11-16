document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // 1. EFEITO INTERATIVO CR7 ("SIUUU!" + Salto da Camisa 7)
    // =========================================================================
    const btnSiuuu = document.getElementById('btn-siuuu');
    const bannerInterativo = document.getElementById('banner-interativo');
    const camisa7 = document.querySelector('.camisa-7');

    if (btnSiuuu && bannerInterativo && camisa7) {
        btnSiuuu.addEventListener('click', () => {
            // Reinicia a animação de salto na camisa 7
            camisa7.classList.remove('animar-salto');
            void camisa7.offsetWidth; // Truque para reiniciar animação CSS
            camisa7.classList.add('animar-salto');

            // Cria várias palavras "SIUUU!" e "CR7" flutuando no banner
            const expressoes = ['SIUUU!', 'CR7 ⚡', 'CAPITÃO 🇵🇹', 'GOOOOLO!', '7'];
            
            for (let i = 0; i < 6; i++) {
                const span = document.createElement('span');
                span.classList.add('texto-siuuu');
                span.textContent = expressoes[Math.floor(Math.random() * expressoes.length)];
                
                // Posição aleatória dentro do banner
                const posX = Math.random() * 80 + 10; // entre 10% e 90%
                const posY = Math.random() * 50 + 30; // entre 30% e 80%
                const tamanho = Math.random() * 1 + 1.1; // entre 1.1rem e 2.1rem

                span.style.left = `${posX}%`;
                span.style.top = `${posY}%`;
                span.style.fontSize = `${tamanho}rem`;

                bannerInterativo.appendChild(span);

                // Remove o elemento após terminar a animação
                setTimeout(() => {
                    span.remove();
                }, 1400);
            }
        });
    }

    // =========================================================================
    // 2. INTERAÇÃO NOS CARTÕES DE CONQUISTAS (Destaque ao clicar no telemóvel/PC)
    // =========================================================================
    const cardsConquista = document.querySelectorAll('.card-conquista');
    cardsConquista.forEach((card) => {
        card.addEventListener('click', () => {
            cardsConquista.forEach(c => c.classList.remove('ativo'));
            card.classList.add('ativo');
        });
    });

    // =========================================================================
    // 3. MURAL DE HOMENAGENS (Formulário + Guardar no Navegador)
    // =========================================================================
    const formComentario = document.getElementById('form-comentario');
    const inputNome = document.getElementById('nome-usuario');
    const inputMensagem = document.getElementById('mensagem-usuario');
    const listaComentarios = document.getElementById('lista-comentarios');

    let homenagens = JSON.parse(localStorage.getItem('homenagensCR7')) || [
        {
            nome: 'João Silva (Lisboa)',
            mensagem: 'Nunca vou esquecer a final do Euro 2016 e a sua liderança fora das quatro linhas. Obrigado por tudo, Capitão!',
            data: '15/11/2026'
        }
    ];

    function renderizarComentarios() {
        listaComentarios.innerHTML = '';

        homenagens.forEach((item) => {
            const divComentario = document.createElement('div');
            divComentario.classList.add('comentario-item');

            const cabecalho = document.createElement('strong');
            cabecalho.textContent = `${item.nome} • ${item.data}`;

            const texto = document.createElement('p');
            texto.textContent = item.mensagem;

            divComentario.appendChild(cabecalho);
            divComentario.appendChild(texto);
            listaComentarios.appendChild(divComentario);
        });
    }

    formComentario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const nome = inputNome.value.trim();
        const mensagem = inputMensagem.value.trim();

        if (nome && mensagem) {
            const dataAtual = new Date().toLocaleDateString('pt-PT');

            homenagens.unshift({
                nome: nome,
                mensagem: mensagem,
                data: dataAtual
            });

            localStorage.setItem('homenagensCR7', JSON.stringify(homenagens));
            renderizarComentarios();
            formComentario.reset();
        }
    });

    renderizarComentarios();

    // =========================================================================
    // 4. ANIMAÇÃO DE CONTAGEM DOS NÚMEROS (Estatísticas)
    // =========================================================================
    const secaoEstatisticas = document.getElementById('estatisticas');
    const numeros = document.querySelectorAll('.numero');
    let animacaoExecutada = false;

    function animarNumeros() {
        numeros.forEach((contador) => {
            const alvo = Number(contador.getAttribute('data-alvo'));
            const temMais = contador.textContent.includes('+');
            let atual = 0;
            const incremento = Math.ceil(alvo / 50);

            const intervalo = setInterval(() => {
                atual += incremento;
                if (atual >= alvo) {
                    contador.textContent = (temMais ? '+' : '') + alvo;
                    clearInterval(intervalo);
                } else {
                    contador.textContent = (temMais ? '+' : '') + atual;
                }
            }, 30);
        });
    }

    const observador = new IntersectionObserver((entradas) => {
        if (entradas[0].isIntersecting && !animacaoExecutada) {
            animarNumeros();
            animacaoExecutada = true;
        }
    }, { threshold: 0.5 });

    if (secaoEstatisticas) {
        observador.observe(secaoEstatisticas);
    }

});