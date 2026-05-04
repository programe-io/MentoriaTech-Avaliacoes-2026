const nome = "Moisés";
const curso = "Desenvolvimento de Sistemas";
const escola = "CETI Francisca Trindade";

// Mostra no console do navegador
console.log("Informações do aluno:");
console.log("Nome: " + nome);
console.log("Curso: " + curso);
console.log("Escola: " + escola);

// Mostra uma mensagem ao carregar a página
window.onload = function () {
    alert("Olá! Eu sou " + nome + ", estudante de " + curso + " no " + escola + ".");
};

// Se existir um elemento com id="info", ele será preenchido
const info = document.getElementById("info");

if (info) {
    info.innerHTML = `
        <h2>Informações do Aluno</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Curso:</strong> ${curso}</p>
        <p><strong>Escola:</strong> ${escola}</p>
    `;
}