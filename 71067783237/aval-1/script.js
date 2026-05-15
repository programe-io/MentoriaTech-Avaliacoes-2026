// Cria um objeto para guardar as informações do usuário
let usuario = {
    nome: "NICLAUS",
    idade: 18,
    email: "roseanetorres11@gmail.com"
};

// Apresenta as informações na tela
document.getElementById("resultado").innerHTML = `
    <h2>Informações do Usuário</h2>
    <p><strong>Nome:</strong> ${usuario.nome}</p>
    <p><strong>Idade:</strong> ${usuario.idade}</p>
    <p><strong>Email:</strong> ${usuario.email}</p>
`;