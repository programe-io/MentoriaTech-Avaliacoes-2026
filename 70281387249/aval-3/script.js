// O console.log com as boas-vindas exigido no início do código
console.log("Maria, seja bem-vinda!");

// Definindo as variáveis para a Maria
const nome = "Maria";
const idade = 22;

// Registrando a idade no console
console.log("Idade da " + nome + ":", idade);

// Atualizando a tela dinamicamente
document.getElementById("mensagem").textContent = `${nome}, seja bem-vinda!`;
document.getElementById("exibir-idade").textContent = `Idade: ${idade} anos`;

// Mensagem personalizada na tag <aside>
document.getElementById("texto-aside").textContent = `Que bom ter você aqui, ${nome}! Sabia que você já viveu mais de ${idade * 365} dias?`;