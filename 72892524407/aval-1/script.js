// Dados do usuário
let nome = "Lucas Gabriel";
let idade = "17 anos";
let cidade = "Floresta do Piauí";
let profissao = "Músico";

// Exibindo na tela
document.getElementById("resultado").innerHTML = `
    <p><strong>Nome:</strong> ${nome}</p>
    <p><strong>Idade:</strong> ${idade}</p>
    <p><strong>Cidade:</strong> ${cidade}</p>
    <p><strong>Profissão:</strong> ${profissao}</p>
`;