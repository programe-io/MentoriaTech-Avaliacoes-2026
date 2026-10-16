let cliques = 0;
const botao = document.getElementById('meuBotao');
const contador = document.getElementById('contador');

botao.addEventListener('click', () => {
    cliques++;
    contador.textContent = cliques;
    
    // Mudar a cor de fundo aleatoriamente para testar o JS
    const cores = ['#007bff', '#28a745', '#dc3545', '#ffc107', '#6f42c1'];
    const corAleatoria = cores[Math.floor(Math.random() * cores.length)];
    botao.style.backgroundColor = corAleatoria;
});