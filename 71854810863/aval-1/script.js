
// Mensagem de boas-vindas
window.addEventListener("load", function() {
    alert("Bem-vindo ao Game Zone! 🎮");
});

// Efeito ao clicar nos links do menu
document.querySelectorAll("nav a").forEach(function(link) {
    link.addEventListener("click", function() {
        console.log("Você acessou: " + link.textContent);
    });
});

// Animação dos cards de jogos
const jogos = document.querySelectorAll("article");

jogos.forEach(function(jogo) {
    jogo.addEventListener("click", function() {
        const nome = jogo.querySelector("h3").textContent;

        alert("Você selecionou: " + nome + " 🎮");
    });
});

// Botão de voltar ao topo
const botao = document.createElement("button");

botao.textContent = "⬆ Voltar ao topo";
botao.style.position = "fixed";
botao.style.bottom = "20px";
botao.style.right = "20px";
botao.style.padding = "12px";
botao.style.background = "#6500cc";
botao.style.color = "white";
botao.style.border = "none";
botao.style.borderRadius = "10px";
botao.style.cursor = "pointer";

document.body.appendChild(botao);

botao.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
