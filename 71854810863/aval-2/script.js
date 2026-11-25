
function mostrarMensagem() {
    alert("Bem-vindo ao Mundo dos Jogos! 🎮");
}

const links = document.querySelectorAll("nav a");

links.forEach(function(link) {
    link.addEventListener("click", function() {
        console.log("Você acessou: " + link.textContent);
    });
});

const jogos = document.querySelectorAll(".jogo");

jogos.forEach(function(jogo) {
    jogo.addEventListener("click", function() {
        alert("Você escolheu: " + jogo.querySelector("h3").textContent);
    });
});
