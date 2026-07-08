// Função para gerenciar os likes do blog da Emília
function darLike(idDoContador) {
    // Captura o elemento do contador clicado
    const elementoContador = document.getElementById(idDoContador);
    
    // Pega o número de curtidas atual, transforma em número inteiro e soma 1
    let likesAtuais = parseInt(elementoContador.innerText);
    likesAtuais++;
    
    // Atualiza o valor na tela
    elementoContador.innerText = likesAtuais;
    
    // Interação divertida com a boneca
    if (likesAtuais === 5) {
        alert("Gostou tanto assim? Cuidado para não gastar o dedão!");
    }
}