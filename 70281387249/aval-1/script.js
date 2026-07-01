console.log("=== SISTEMA INICIALIZADO COM SUCESSO ===");

// Banco de dados fictício
const usuarios = [
    { nome: "Ana", papel: "Admin" },
    { nome: "Lucas", papel: "Editor" },
    { nome: "Beatriz", papel: "Usuário" }
];

// Função para dar as boas-vindas
function saudarUsuarios(lista) {
    lista.forEach(usuario => {
        console.log(`Olá, ${usuario.nome}! Seu nível de acesso é: [${usuario.papel}].`);
    });
}

// Executando a função
saudarUsuarios(usuarios);

console.log("=== FIM DA EXECUÇÃO ===");