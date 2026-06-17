// Função simples para dar "Like" nos posts de forma dinâmica
function darLike(botao) {
    // Encontra o elemento de texto que conta os likes dentro do botão clicado
    const contadorElemento = botao.querySelector('.like-count');
    
    // Pega o número atual, transforma em inteiro e soma +1
    let likesAtuais = parseInt(contadorElemento.textContent);
    likesAtuais++;
    
    // Atualiza o texto na tela
    contadorElemento.textContent = likesAtuais;
    
    // Adiciona um efeito visual temporário no botão
    botao.style.transform = "scale(1.1)";
    setTimeout(() => {
        botao.style.transform = "scale(1)";
    }, 100);
}