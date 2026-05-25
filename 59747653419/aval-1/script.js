function calcularIMC(peso, altura) {
    // Validação básica para evitar divisão por zero
    if (altura === 0 || peso === 0) {
        return "Por favor, insira valores válidos.";
    }

    // O ** é o operador de exponenciação no JavaScript
    let imc = peso / (altura ** 2); 
    
    // Método toFixed(2) limita o resultado a 2 casas decimais
    let resultado = `Seu IMC é ${imc.toFixed(2)}. Classificação: `;

    if (imc < 18.5) {
        return resultado + "Abaixo do peso";
    } else if (imc >= 18.5 && imc < 25) {
        return resultado + "Peso normal";
    } else if (imc >= 25 && imc < 30) {
        return resultado + "Sobrepeso";
    } else {
        return resultado + "Obesidade";
    }
}

// Exemplo de uso:
console.log(calcularIMC(70, 1.75));
