// Cria um objeto para guardar as informações do usuário
let usuario = {
    nome: "Mavie",
    idade: 18,
    email: "roseanetorres11@gmail.com"
};

// Mostra as informações na tela
document.getElementById("resultado").innerHTML =
    "<p><strong>Nome:</strong> " + usuario.nome + "</p>" +
    "<p><strong>Idade:</strong> " + usuario.idade + "</p>" +
    "<p><strong>Email:</strong> " + usuario.email + "</p>";