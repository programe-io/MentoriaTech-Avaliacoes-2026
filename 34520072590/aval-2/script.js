// 1. Criando variáveis
const nome = "Gabriel";
let idade = 19;

// 2. Criando uma função (bloco de código reutilizável)
function verificarMaioridade(nomeUsuario, idadeUsuario) {
    if (idadeUsuario >= 18) {
        return `${nomeUsuario} é maior de idade.`;
    } else {
        return `${nomeUsuario} é menor de idade.`;
    }
}

// 3. Executando a função e mostrando o resultado
const resultado = verificarMaioridade(nome, idade);
console.log(resultado); // Saída: Gabriel é maior de idade.