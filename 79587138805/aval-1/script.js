// Função que saúda o usuário
function saudar(nome) {
    return `Olá, \${nome\}! É um prazer te conhecer! 🎉`;
\}

// Pedir nome ao usuário
const nomeUsuario = prompt("Digite o seu nome:");

// Gerar mensagem
const mensagem = saudar(nomeUsuario);

// Exibir na tela
alert(mensagem);
console.log(mensagem);
document.write(`<h1>\${mensagem\}</h1>`);$0