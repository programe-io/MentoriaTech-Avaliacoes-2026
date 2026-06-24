window.addEventListener("load", () => {
    mostrarNotificacao("Bem-vindo ao site! 🚀");
});

// Função de notificação
function mostrarNotificacao(texto) {
    const aviso = document.createElement("div");

    aviso.textContent = texto;
    aviso.style.position = "fixed";
    aviso.style.top = "20px";
    aviso.style.right = "20px";
    aviso.style.padding = "15px 25px";
    aviso.style.background = "#3b82f6";
    aviso.style.color = "#fff";
    aviso.style.borderRadius = "10px";
    aviso.style.boxShadow = "0 5px 15px rgba(0,0,0,.3)";
    aviso.style.zIndex = "9999";

    document.body.appendChild(aviso);

    setTimeout(() => {
        aviso.remove();
    }, 3000);
}

// Alternar tema claro/escuro
function trocarTema() {
    document.body.classList.toggle("tema-claro");
}

// Animar cards ao clicar
document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
        card.style.transform = "scale(1.1)";

        setTimeout(() => {
            card.style.transform = "scale(1)";
        }, 300);
    });
});

// Exemplo de botão
const botao = document.querySelector("button");

if (botao) {
    botao.addEventListener("click", () => {
        mostrarNotificacao("Botão clicado! 🎉");
    });
}