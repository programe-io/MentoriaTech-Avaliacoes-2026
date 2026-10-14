// Função que verifica a idade
function verificarMaioridade(idade) {
    if (idade >= 18) {
        return "Você é maior de idade! 🚗";
    } else {
        return "Você é menor de idade. 🍼";
    }
}

// Testando o código no console
const minhaIdade = 20;
const resultado = verificarMaioridade(minhaIdade);

console.log(resultado); 
// Saída esperada: Você é maior de idade! 🚗
