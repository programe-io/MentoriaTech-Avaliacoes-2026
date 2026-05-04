// Informações do usuário
let nome = "Hytalo";
let curso = "Desenvolvimento de Sistemas";
let escola = "CETI Francisca Trindade";

// Exibindo no console
console.log("Nome: " + nome);
console.log("Curso: " + curso);
console.log("Escola: " + escola);

// Exibindo na tela (HTML)
document.getElementById("nome").innerText = nome;
document.getElementById("curso").innerText = curso;
document.getElementById("escola").innerText = escola;