function curtirPost(botao) {
    // Localiza o elemento span que contém o número de curtidas dentro do botão
    const contador = botao.querySelector('span');
    
    // Pega o número atual e soma +1
    let quantidade = parseInt(contador.innerText);
    quantidade++;
    
    // Atualiza o valor na tela
    contador.innerText = quantidade;
    
    // Efeito visual no botão ao curtir
    botao.style.backgroundColor = '#8257e5';
    botao.style.color = '#ffffff';
\}

console.log("Blog Pixel Zone carregado com sucesso!");

$0