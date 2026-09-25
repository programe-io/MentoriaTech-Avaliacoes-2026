let totalCurtidas = 0;
let curtido = false;

function curtir(botao) {
    const contador = document.querySelector('.curtidas');
    
    if (!curtido) {
        totalCurtidas++;
        botao.innerHTML = "💔 Descurtir";
        botao.style.background = "#ff4d4d"; // Opcional: muda a cor do botão
        curtido = true;
    } else {
        totalCurtidas--;
        botao.innerHTML = "❤️ Curtir";
        botao.style.background = ""; // Opcional: restaura a cor original
        curtido = false;
    }
    
    // Atualiza o texto na tela de forma gramaticalmente correta
    if (totalCurtidas === 1) {
        contador.innerText = "1 curtida";
    } else {
        contador.innerText = totalCurtidas + " curtidas";
    }
}
