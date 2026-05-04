// Criando os dados
const nome = "Misael";
const curso = "Desenvolvimento de Sistemas";
const escola = "CETI Francisca Trindade";

// Mostrando no console
console.log("Olá, meu nome é " + nome);
console.log("Sou estudante do curso de " + curso);
console.log("Estudo no " + escola);

// Mostrando na página (HTML)
document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".container");

    const titulo = document.createElement("h1");
    titulo.textContent = "Olá, meu nome é " + nome;

    const p1 = document.createElement("p");
    p1.textContent = "Sou estudante do curso de " + curso;

    const p2 = document.createElement("p");
    p2.textContent = "Estudo no " + escola;

    container.appendChild(titulo);
    container.appendChild(p1);
    container.appendChild(p2);
});