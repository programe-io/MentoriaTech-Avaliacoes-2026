// Garante que o código só rode após o HTML carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    const memeBtn = document.getElementById('memeBtn');
    const reaction = document.getElementById('reaction');

    // Escuta o evento de clique no botão
    memeBtn.addEventListener('click', () => {
        // Exibe o texto secreto removendo a classe 'hidden'
        reaction.classList.remove('hidden');
        
        // Adiciona a classe de animação de balanço (tilt) ao botão
        memeBtn.classList.add('tilt');
        memeBtn.textContent = "Pesando o game! ⚖️";

        // Define um temporizador para resetar tudo após 2.5 segundos
        setTimeout(() => {
            reaction.classList.add('hidden');
            memeBtn.classList.remove('tilt');
            memeBtn.textContent = "Lançar o 67! 🤙";
        }, 2500);
    });
});