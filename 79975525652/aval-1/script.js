document.addEventListener('DOMContentLoaded', () => {
    const btnRevelar = document.getElementById('btn-revelar');
    const mensagemSecreta = document.getElementById('mensagem-secreta');

    btnRevelar.addEventListener('click', () => {
        if (mensagemSecreta.classList.contains('hidden')) {
            mensagemSecreta.classList.remove('hidden');
            btnRevelar.textContent = 'Desligar Lanterna UV';
        } else {
            mensagemSecreta.classList.add('hidden');
            btnRevelar.textContent = 'Luz Ultravioleta ON/OFF';
        }
    });

    // Rolagem suave ao clicar nos itens do sumário
    const linksSumario = document.querySelectorAll('.sumario a');
    linksSumario.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
