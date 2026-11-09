```javascript
// Mensagens motivacionais
const mensagens = [
    "Cada passo é uma conquista! 🏃",
    "Continue avançando!",
    "Você consegue superar seus limites!",
    "O importante é não desistir!",
    "Corra no seu ritmo e aproveite!"
];

// Botão de motivação
function motivar() {
    const indice = Math.floor(Math.random() * mensagens.length);
    alert(mensagens[indice]);
}

// Cronômetro
let segundos = 0;
let intervalo = null;

function atualizarCronometro() {
    segundos++;

    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;

    document.getElementById("cronometro").textContent =
        String(minutos).padStart(2, "0") + ":" +
        String(segundosRestantes).padStart(2, "0");
}

// Iniciar corrida
function iniciarCorrida() {
    if (intervalo === null) {
        intervalo = setInterval(atualizarCronometro, 1000);
    }
}

// Pausar corrida
function pausarCorrida() {
    clearInterval(intervalo);
    intervalo = null;
}

// Reiniciar corrida
function reiniciarCorrida() {
    pausarCorrida();

    segundos = 0;

    document.getElementById("cronometro").textContent = "00:00";
}

// Mensagem ao carregar a página
console.log("Site de corrida carregado com sucesso!");
```