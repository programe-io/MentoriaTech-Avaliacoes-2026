// Função ativada quando o botão "Curtir" é clicado
function curtirPost(botaoClicado) {
    // Encontra o elemento de texto (span) que guarda o número de curtidas dentro do botão
    let spanContador = botaoClicado.querySelector('.contador');

    // Pega o número atual, transforma em número inteiro e soma 1
    let curtidasAtuais = parseInt(spanContador.innerText);
    let novasCurtidas = curtidasAtuais + 1;

    // Atualiza o texto na tela com o novo número
    spanContador.innerText = novasCurtidas;

    // Efeito visual rápido para mostrar que o clique funcionou
    botaoClicado.style.transform = 'scale(1.1)';
    
    // Volta ao tamanho normal após 200 milissegundos
    setTimeout(() => {
        botaoClicado.style.transform = 'scale(1)';
    }, 200);
}