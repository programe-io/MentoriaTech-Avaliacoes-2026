document.addEventListener('DOMContentLoaded', () => {
    // Menu Responsivo Mobile
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenu.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Fechar menu ao clicar em um link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenu.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Simulador Interativo de Custo de Construção
    const btnCalcular = document.getElementById('btn-calcular');
    const inputMetragem = document.getElementById('metragem');
    const selectPadrao = document.getElementById('padrao');
    const resultadoBox = document.getElementById('resultado-simulacao');
    const valorTotalElemento = document.getElementById('valor-total');

    if (btnCalcular) {
        btnCalcular.addEventListener('click', () => {
            const metragem = parseFloat(inputMetragem.value);
            const custoMetro = parseFloat(selectPadrao.value);

            if (isNaN(metragem) || metragem <= 0) {
                alert('Por favor, insira uma metragem válida maior que zero.');
                return;
            }

            const custoTotal = metragem * custoMetro;

            // Formatação do valor para Real Brasileiro (BRL)
            const valorFormatado = custoTotal.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            valorTotalElemento.textContent = valorFormatado;
            resultadoBox.style.display = 'block';

            // Efeito suave de rolagem para ver o resultado
            resultadoBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

    // Envio do Formulário de Contato
    const formContato = document.getElementById('form-contato');
    const msgSucesso = document.getElementById('msg-sucesso');

    if (formContato) {
        formContato.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simulação de envio com sucesso
            msgSucesso.style.display = 'block';
            formContato.reset();

            // Esconder a mensagem de sucesso após 5 segundos
            setTimeout(() => {
                msgSucesso.style.display = 'none';
            }, 5000);
        });
    }
});