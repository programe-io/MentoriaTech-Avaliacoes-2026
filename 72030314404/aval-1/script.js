// Algoritmo que guarda informações de um usuário e mostra na tela

// Criando um objeto para armazenar os dados
let usuario = {
    nome: "João",
    idade: 25,
    email: "joao@email.com",
    cidade: "São Paulo"
};

// Exibindo as informações no console
console.log("Nome: " + usuario.nome);
console.log("Idade: " + usuario.idade);
console.log("Email: " + usuario.email);
console.log("Cidade: " + usuario.cidade);

// Exibindo as informações na tela
document.write("<h2>Informações do Usuário</h2>");
document.write("Nome: " + usuario.nome + "<br>");
document.write("Idade: " + usuario.idade + "<br>");
document.write("Email: " + usuario.email + "<br>");
document.write("Cidade: " + usuario.cidade + "<br>");