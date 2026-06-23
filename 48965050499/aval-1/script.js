const btnMensagem = document.getElementById("btnMensagem");

btnMensagem.addEventListener("click", () => {
    alert("Bem-vindo ao GameZone Blog! 🎮");
});

const botoes = document.querySelectorAll(".lerMais");

botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        alert("Artigo completo em breve!");
    });
});