// Função para gerir o clique no botão de curtir
function curtirPost(botao) {
    // Seleciona o elemento de texto que está logo a seguir ao botão
    const contadorElemento = botao.nextElementSibling;
    
    // Converte o texto atual de curtidas para um número inteiro
    let curtidasAtuais = parseInt(contadorElemento.innerText);
    
    // Soma mais uma curtida
    curtidasAtuais++;
    
    // Atualiza o texto na página com a gramática correta
    if (curtidasAtuais === 1) {
        contadorElemento.innerText = curtidasAtuais + " curtida";
    } else {
        contadorElemento.innerText = curtidasAtuais + " curtidas";
    }
    
    // Altera o visual do botão para mostrar que já foi clicado
    botao.style.backgroundColor = "#4a154b";
    botao.innerText = "❤ Curtido!";
    
    // Desativa o botão para que o mesmo utilizador só possa curtir uma vez
    botao.disabled = true;
}