// Criando uma função (bloco de código que executa uma tarefa)
function verificarAprovacao(nota1, nota2) {
    // Calculando a média usando variáveis com nomes em português
    let media = (nota1 + nota2) / 2;

    // Condicional: SE a média for maior ou igual a 7
    if (media >= 7) {
        return "Parabéns! Você foi aprovado com média " + media;
    } 
    // SENÃO...
    else {
        return "Ops! Você ficou de recuperação. Sua média foi " + media;
    }
}

// Executando a função e mostrando o resultado no console do navegador
let resultadoFinal = verificarAprovacao(8, 7.5);
console.log(resultadoFinal); // Vai exibir: Parabéns! Você foi aprovado com média 7.75