// Criando objeto do usuário
let usuario = {
    nome: "Marcos",
    idade: 20,
    cidade: "São Paulo",
    profissao: "Jogador"
};

// Mostrando na tela
document.getElementById("resultado").innerHTML =
    "Nome: " + usuario.nome + "<br>" +
    "Idade: " + usuario.idade + "<br>" +
    "Cidade: " + usuario.cidade + "<br>" +
    "Profissão: " + usuario.profissao;