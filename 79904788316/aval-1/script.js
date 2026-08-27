// Mensagem ao carregar a página
console.log("🎮 Game News carregado com sucesso!");

// Botões "Ler mais"
const botoes = document.querySelectorAll(".botao");

botoes.forEach(function(botao) {

    botao.addEventListener("click", function(event) {

        event.preventDefault();

        alert("🎮 Em breve você poderá conferir a notícia completa!");

    });

});


// Efeito no título ao passar o mouse
const titulo = document.querySelector("header h1");

titulo.addEventListener("mouseover", function() {
    titulo.style.transform = "scale(1.1)";
});

titulo.addEventListener("mouseout", function() {
    titulo.style.transform = "scale(1)";
});


// Mostrar uma mensagem sobre GTA 6
const gta = document.querySelector(".gta");

gta.addEventListener("click", function() {

    alert(
        "🚗 GTA 6 é um dos jogos mais aguardados pelos fãs. " +
        "Fique ligado no Game News para novidades!"
    );

});


// Botão para voltar ao topo
const botaoTopo = document.createElement("button");

botaoTopo.innerText = "⬆ Voltar ao topo";

botaoTopo.style.position = "fixed";
botaoTopo.style.bottom = "20px";
botaoTopo.style.right = "20px";
botaoTopo.style.padding = "10px 15px";
botaoTopo.style.border = "none";
botaoTopo.style.borderRadius = "5px";
botaoTopo.style.backgroundColor = "#00ff88";
botaoTopo.style.cursor = "pointer";
botaoTopo.style.fontWeight = "bold";

document.body.appendChild(botaoTopo);


// Função do botão
botaoTopo.addEventListener("click", function() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});