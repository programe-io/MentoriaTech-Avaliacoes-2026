// Informações do perfil
const perfil = {
    nome: "Gabriel Cardoso",
    idade: 15,
    corFavorita: "Vermelho"
};

// Mensagem no console
console.log(`Olá! Meu nome é ${perfil.nome}.`);
console.log(`Tenho ${perfil.idade} anos.`);
console.log(`Minha cor favorita é ${perfil.corFavorita}.`);

// Mensagem de boas-vindas
window.onload = function () {
    alert(`Bem-vindo(a)! Eu sou ${perfil.nome}.`);

    // Muda a cor do título ao clicar
    const titulo = document.querySelector("h1");

    titulo.addEventListener("click", function () {
        if (titulo.style.color === "blue") {
            titulo.style.color = "red";
        } else {
            titulo.style.color = "blue";
        }
    });
};