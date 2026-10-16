
/* EFEITO DE BOAS-VINDAS */
function mostrarMensagem() {
    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = "🚀 Bem-vindo ao meu site!";
    mensagem.style.opacity = "0";

    setTimeout(() => {
        mensagem.style.transition = "opacity 0.8s ease";
        mensagem.style.opacity = "1";
    }, 100);
}

/* EFEITO NO TÍTULO */
const titulo = document.querySelector("h1");

if (titulo) {
    titulo.addEventListener("mouseenter", () => {
        titulo.style.transform = "scale(1.05)";
        titulo.style.transition = "0.3s";
    });

    titulo.addEventListener("mouseleave", () => {
        titulo.style.transform = "scale(1)";
    });
}

/* MOSTRAR ANO ATUAL NO CONSOLE */
console.log("Site iniciado com sucesso!");
console.log("Ano atual:", new Date().getFullYear());
