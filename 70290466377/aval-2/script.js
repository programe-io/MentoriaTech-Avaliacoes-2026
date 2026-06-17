// Função para simular o sistema de curtidas nos posts do blog
function curtirPost(botao) {
    // Encontra o elemento de texto que exibe o número de curtidas dentro do botão clicado
    const contadorElemento = botao.querySelector('.like-count');
    
    // Pega o número atual e transforma em número inteiro
    let curtidasAtuais = parseInt(contadorElemento.innerText);
    
    // Soma +1 à curtida
    curtidasAtuais++;
    
    // Atualiza o texto na tela
    contadorElemento.innerText = curtidasAtuais;
    
    // Efeito visual rápido de feedback ao clicar
    botao.style.transform = "scale(1.2)";
    setTimeout(() => {
        botao.style.transform = "scale(1)";
    }, 150);
}