
// =================================
// TECHZONE - JAVASCRIPT
// =================================

// 1. Mensagem de boas-vindas
document.addEventListener("DOMContentLoaded", () => {
    console.log("TechZone iniciado com sucesso!");

    const titulo = document.querySelector(".banner h2");

    titulo.addEventListener("click", () => {
        titulo.textContent = "BEM-VINDO AO FUTURO!";
    });
});


// 2. Mensagens dos jogos
function mostrarMensagem(jogo) {
    const mensagens = {
        "Jogos de ação": "Prepare-se para grandes aventuras!",
        "Jogos de terror": "Coragem! O medo está esperando.",
        "Jogos online": "Encontre jogadores e vença desafios!"
    };

    alert(mensagens[jogo] || "Explore o universo dos games!");
}


// 3. Efeito nos cards
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "scale(1.05)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "scale(1)";
    });
});


// 4. Formulário de contato
function enviarMensagem(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem").value;

    if (nome && email && mensagem) {
        alert("Obrigado, " + nome + 
              "! Sua mensagem foi preenchida com sucesso.");

        console.log("Nome:", nome);
        console.log("E-mail:", email);
        console.log("Mensagem:", mensagem);

        event.target.reset();
    }
}


// 5. Efeito de rolagem nas seções
const secoes = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    secoes.forEach(secao => {
        const posicao = secao.getBoundingClientRect();

        if (posicao.top < window.innerHeight - 100) {
            secao.style.opacity = "1";
            secao.style.transform = "translateY(0)";
        }
    });
});


// 6. Ano automático no rodapé
const rodape = document.querySelector("footer p");

if (rodape) {
    rodape.textContent =
        "© " + new Date().getFullYear() +
        " TechZone - Todos os direitos reservados.";
}
