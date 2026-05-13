// Mostra uma mensagem quando o botão for clicado
function mostrarMensagem() {
    alert("Olá! Você clicou no botão.");
}

// Muda a cor de fundo da página
function mudarCor() {
    const cores = ["#ff595e", "#1982c4", "#6a4c93", "#8ac926", "#ffca3a"];
    
    const corAleatoria = cores[Math.floor(Math.random() * cores.length)];
    
    document.body.style.backgroundColor = corAleatoria;
}

// Exibe a hora atual no console
function mostrarHora() {
    const agora = new Date();
    console.log("Hora atual:", agora.toLocaleTimeString());
}

// Executa a função mostrarHora a cada 1 segundo
setInterval(mostrarHora, 1000);