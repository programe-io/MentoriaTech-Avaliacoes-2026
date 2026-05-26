const color1 = document.getElementById('color1');
const color2 = document.getElementById('color2');
const body = document.getElementById('gradient-bg');
const cssOutput = document.getElementById('css-output');
const copyBtn = document.getElementById('copy-btn');

function updateGradient() {
    // Monta a string do gradiente
    const gradientString = `linear-gradient(to right, ${color1.value}, ${color2.value})`;
    
    // Aplica ao fundo
    body.style.background = gradientString;
    
    // Atualiza o texto na tela
    cssOutput.textContent = `background: ${gradientString};`;
}

// Eventos de input para atualização em tempo real
color1.addEventListener('input', updateGradient);
color2.addEventListener('input', updateGradient);

// Função para copiar o código
copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(cssOutput.textContent);
    const originalText = copyBtn.innerText;
    copyBtn.innerText = "Copiado!";
    setTimeout(() => copyBtn.innerText = originalText, 2000);
});