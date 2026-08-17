// Mensagem no console
console.log("Site do Raiden carregado!");

// Seleciona o título
const titulo = document.querySelector("header h1");

// Efeito no título ao passar o mouse
titulo.addEventListener("mouseover", function () {
    titulo.style.color = "#ffffff";
    titulo.style.textShadow = "0 0 25px #00aaff";
});

titulo.addEventListener("mouseout", function () {
    titulo.style.color = "#00aaff";
    titulo.style.textShadow = "0 0 15px #0088cc";
});

// Criando um botão
const botao = document.createElement("button");

botao.textContent = "Mostrar informações sobre Raiden";

botao.style.display = "block";
botao.style.margin = "20px auto";
botao.style.padding = "12px 20px";
botao.style.backgroundColor = "#00aaff";
botao.style.color = "white";
botao.style.border = "none";
botao.style.borderRadius = "5px";
botao.style.cursor = "pointer";
botao.style.fontWeight = "bold";

// Adiciona o botão à página
document.querySelector("main").appendChild(botao);

// Criando uma mensagem
const mensagem = document.createElement("p");

mensagem.textContent =
    "Raiden é um ciborgue especializado em combate e utiliza uma espada de alta frequência.";

mensagem.style.display = "none";
mensagem.style.textAlign = "center";
mensagem.style.color = "#00aaff";
mensagem.style.marginBottom = "20px";

// Coloca a mensagem antes do botão
document.querySelector("main").insertBefore(mensagem, botao);

// Mostrar/esconder informação
botao.addEventListener("click", function () {

    if (mensagem.style.display === "none") {
        mensagem.style.display = "block";
        botao.textContent = "Esconder informações";
    } else {
        mensagem.style.display = "none";
        botao.textContent = "Mostrar informações sobre Raiden";
    }

});