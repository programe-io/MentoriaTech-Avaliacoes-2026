// Mostra uma mensagem quando o botão principal é clicado
function mostrarMensagem() {
    alert(
        "Oi! Eu sou a Gislaine 💗 Tenho muitos sonhos e estou trabalhando para construir o meu futuro!"
    );
}

// Volta para o início da página
function voltarAoInicio() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Mostra o ano atual no rodapé
const ano = document.getElementById("ano");

ano.textContent = `© ${new Date().getFullYear()} - Gislaine`;
