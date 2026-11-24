const form = document.getElementById('form-imc');
const divResultado = document.getElementById('resultado');

form.addEventListener('submit', function(evento) {
    evento.preventDefault(); // Evita que a página recarregue

    // 1. Receber os dados
    const nome = document.getElementById('nome').value.trim();
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);

    // Validação simples
    if (!nome || isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        alert('Por favor, preencha todos os campos com valores válidos.');
        return;
    }

    // 2. Calcular o IMC
    const imc = peso / (altura * altura);
    const { classificacao, classeCss } = obterClassificacao(imc);

    // 3. Exibir informações acerca do IMC do Paciente
    divResultado.className = ''; // Limpa classes anteriores
    divResultado.classList.add(classeCss);
    
    divResultado.innerHTML = `
        <p><strong>Paciente:</strong> ${nome}</p>
        <p><strong>IMC Calculado:</strong> ${imc.toFixed(2)} kg/m²</p>
        <p><strong>Classificação:</strong> ${classificacao}</p>
    `;
});

function obterClassificacao(imc) {
    if (imc < 18.5) {
        return { classificacao: 'Abaixo do peso', classeCss: 'alerta' };
    } else if (imc < 25) {
        return { classificacao: 'Peso normal', classeCss: 'normal' };
    } else if (imc < 30) {
        return { classificacao: 'Sobrepeso', classeCss: 'alerta' };
    } else if (imc < 35) {
        return { classificacao: 'Obesidade Grau I', classeCss: 'perigo' };
    } else if (imc < 40) {
        return { classificacao: 'Obesidade Grau II', classeCss: 'perigo' };
    } else {
        return { classificacao: 'Obesidade Grau III (Mórbida)', classeCss: 'perigo' };
    }
}
