
function mostrarMensagem() {
    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = "🚀 Obrigado por visitar meu site!";
    mensagem.style.color = "#60a5fa";
    mensagem.style.fontSize = "20px";
}

const titulo = document.querySelector("main h1");

titulo.addEventListener("mouseover", function() {
    titulo.style.transform = "scale(1.05)";
});

titulo.addEventListener("mouseout", function() {
    titulo.style.transform = "scale(1)";
});

// Mensagem no console
console.log("Meu site foi carregado com sucesso!");