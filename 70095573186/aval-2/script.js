// Função simples para gerenciar o contador de curtidas de cada post
function curtirPost(botao) {
    // Localiza o elemento de texto que exibe o número de curtidas dentro do botão clicado
    const contadorElemento = botao.querySelector('.like-count');
    
    // Pega o valor atual e converte para número inteiro
    let curtidasAtuais = parseInt(contadorElemento.textContent);
    
    // Incrementa mais uma curtida
    curtidasAtuais++;
    
    // Atualiza o texto na tela
    contadorElemento.textContent = curtidasAtuais;
    
    // Efeito visual rápido ao clicar
    botao.style.transform = "scale(1.2)";
    setTimeout(() => {
        botao.style.transform = "scale(1)";
    }, 150);
}