function likePost(botao) {
    // Pega o número atual
    const contadorElemento = botao.querySelector('.contador');
    let curtidas = parseInt(contadorElemento.innerText);
    
    // Altera o coração para preenchido e atualiza o número
    botao.innerHTML = `♥ <span class="contador">${curtidas + 1}</span>`;
    
    // Adiciona uma classe para manter a cor preta
    botao.classList.add('curtido');
    
    // Animação sutil de clique (pisca rapidamente a opacidade)
    botao.style.opacity = '0.5';
    setTimeout(() => {
        botao.style.opacity = '1';
    }, 150);
}