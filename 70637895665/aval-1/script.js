// Informações da Débora
const nome = "Débora";
const curso = "Desenvolvimento de Sistemas";
const escola = "CETI Francisca Trindade";

// Exibir mensagem no console
console.log(`Olá! Meu nome é ${nome}.`);
console.log(`Sou estudante do curso de ${curso}.`);
console.log(`Estudo na escola ${escola}.`);

// Mostrar alerta ao abrir a página
window.onload = function() {
    alert(`Olá! Eu sou ${nome}, estudante de ${curso} no ${escola}.`);
};

// Alterar conteúdo do HTML (se houver um elemento com id="info")
const info = document.getElementById("info");

if (info) {
    info.innerHTML = `
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Curso:</strong> ${curso}</p>
        <p><strong>Escola:</strong> ${escola}</p>
    `;
}