// 1. Selecionamos os elementos que vamos manipular
const botao = document.getElementById('botao');
const lampada = document.getElementById('lampada');
const titulo = document.getElementById('titulo');

// 2. Criamos o evento de clique
botao.addEventListener('click', () => {
    
    // O método 'toggle' adiciona a classe se ela não existe, e remove se existe
    lampada.classList.toggle('ligada');

    // 3. Mudamos o texto dependendo se a classe 'ligada' está lá
    if (lampada.classList.contains('ligada')) {
        titulo.innerText = "A luz está ACESA! 💡";
        titulo.style.color = "yellow";
        document.body.style.backgroundColor = "#444";
    } else {
        titulo.innerText = "A lâmpada está apagada";
        titulo.style.color = "white";
        document.body.style.backgroundColor = "#222";
    }
});