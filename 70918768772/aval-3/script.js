// Função que calcula a média e mostra a situação do aluno
function verificarAprovacao() {
    // Criando variáveis em português para guardar as notas
    let nota1 = 8.5;
    let nota2 = 6.0;
    
    // Calcula a média
    let media = (nota1 + nota2) / 2;
    
    // Condicional (Se a média for maior ou igual a 7)
    if (media >= 7) {
        console.log("Parabéns! O aluno foi aprovado com média: " + media);
        alert("Aprovado! Sua média foi " + media);
    } else {
        console.log("Infelizmente o aluno foi reprovado. Média: " + media);
        alert("Reprovado. Precisa estudar mais! Média: " + media);
    }
}

// Executa a função criada acima
verificarAprovacao();