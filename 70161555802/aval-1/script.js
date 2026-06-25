// Mensagem de boas-vindas
window.onload = function() {
    alert("Bem-vindo ao meu site pessoal!");
};

// Exibe a quantidade de hobbies
const hobbies = document.querySelectorAll("ul li");

console.log("Quantidade de hobbies:", hobbies.length);

// Muda a cor do título ao clicar
const titulo = document.querySelector("h1");

titulo.addEventListener("click", function() {
    titulo.style.color = "yellow";
    titulo.textContent = "Obrigado pela visita!";
});