document.getElementById("calcular").addEventListener("click", function() {
    // Variáveis e tipos de dados 
    let n1 = Number(document.getElementById("nota1").value);
    let n2 = Number(document.getElementById("nota2").value);
    let n3 = Number(document.getElementById("nota3").value);

    // Verificação para garantir que os valores são números válidos
    if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
        document.getElementById("resultado").textContent = "Por favor, insira todas as notas corretamente.";
        return;
    }

    // Operadores aritméticos
    let media = (n1 + n2 + n3) / 3;
    let resultado = "";

    // Estrutura condicional IF/else
    if (media >= 7) {
        resultado = "Parabéns! Você foi aprovado com média " + media.toFixed(2);
    } else if (media >= 5) {
        resultado = "Você está de recuperação. Média: " + media.toFixed(2);
    } else {
        resultado = "Infelizmente, você foi reprovado. Média: " + media.toFixed(2);
    }

    // Estrutura de repetição FOR (exemplo simples)
    for (let i = 1; i <= 3; i++) {
        console.log("Nota " + i + " registrada.");
    }

    document.getElementById("resultado").textContent = resultado;
});