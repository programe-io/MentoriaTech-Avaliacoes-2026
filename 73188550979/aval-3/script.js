// --- PARTE 1: Lógica da Soma ---
const btnSomar = document.getElementById('btnSomar');
const inputNum1 = document.getElementById('num1');
const inputNum2 = document.getElementById('num2');
const divResultadoSoma = document.getElementById('resultadoSoma');

btnSomar.addEventListener('click', function() {

    const valor1 = parseFloat(inputNum1.value);
    const valor2 = parseFloat(inputNum2.value);

    
    if (isNaN(valor1) || isNaN(valor2)) {
        divResultadoSoma.textContent = "Por favor, digite números válidos em ambos os campos.";
        divResultadoSoma.style.color = "red";
        return;
    }

    const soma = valor1 + valor2;
    divResultadoSoma.textContent = `Resultado: ${valor1} + ${valor2} = ${soma}`;
    divResultadoSoma.style.color = "#333";
});


const pessoas = [
    { nome: "Ana Souza", peso: 54, altura: 1.65 },
    { nome: "Carlos Lima", peso: 78, altura: 1.75 },
    { nome: "Mariana Silva", peso: 95, altura: 1.60 },
    { nome: "João Pedro", peso: 62, altura: 1.80 },
    { nome: "Beatriz Costa", peso: 110, altura: 1.70 }
];

function calcularIMC(peso, altura) {
    const imc = peso / (altura * altura);
    let status = "";
    let classeCss = "";

    if (imc < 18.5) {
        status = "Abaixo do peso";
        classeCss = "abaixo";
    } else if (imc >= 18.5 && imc < 25) {
        status = "Peso normal";
        classeCss = "normal";
    } else if (imc >= 25 && imc < 30) {
        status = "Sobrepeso";
        classeCss = "sobrepeso";
    } else {
        status = "Obesidade";
        classeCss = "obesidade";
    }

    return {
        valor: imc.toFixed(2),
        status: status,
        classe: classeCss
    };
}

const tabelaCorpo = document.getElementById('tabelaCorpo');

pessoas.forEach(pessoa => {
    const resultadoIMC = calcularIMC(pessoa.peso, pessoa.altura);

    const linha = document.createElement('tr');

    linha.innerHTML = `
        <td>${pessoa.nome}</td>
        <td>${pessoa.peso} kg</td>
        <td>${pessoa.altura} m</td>
        <td><strong>${resultadoIMC.valor}</strong></td>
        <td><span class="status ${resultadoIMC.classe}">${resultadoIMC.status}</span></td>
    `;

    tabelaCorpo.appendChild(linha);
});