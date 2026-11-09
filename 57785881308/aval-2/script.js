// Simulação de economia de carbono em tempo real ao ler a página
let carbonoEvitado = 0;
const elementoContador = document.getElementById('contador');

function atualizarContador() {
    // Incrementa uma fração aleatória simulando a eficiência energética
    carbonoEvitado += Math.floor(Math.random() * 5) + 1;
    elementoContador.textContent = carbonoEvitado;
\}

// Atualiza o valor a cada 1.5 segundos
setInterval(atualizarContador, 1500);
$0