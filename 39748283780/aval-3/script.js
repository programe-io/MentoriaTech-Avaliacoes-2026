// Elementos do DOM
const formIMC = document.getElementById('formIMC');
const nomeInput = document.getElementById('nome');
const pesoInput = document.getElementById('peso');
const alturaInput = document.getElementById('altura');
const resultadoDiv = document.getElementById('resultado');
const conteudoResultado = document.getElementById('conteudoResultado');

// Função para calcular o IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// Função para classificar o IMC
function classificarIMC(imc) {
    if (imc < 18.5) {
        return {
            classificacao: 'Abaixo do peso',
            classeCSS: 'abaixo-peso',
            descricao: 'Seu peso está abaixo do recomendado. Procure um médico ou nutricionista para orientações sobre alimentação e saúde.'
        };
    } else if (imc < 25) {
        return {
            classificacao: 'Peso ideal ✅',
            classeCSS: 'peso-ideal',
            descricao: 'Parabéns! Você está com o peso ideal. Mantenha hábitos saudáveis e continue se cuidando!'
        };
    } else if (imc < 30) {
        return {
            classificacao: 'Sobrepeso',
            classeCSS: 'sobrepeso',
            descricao: 'Você está um pouco acima do peso recomendado. Uma alimentação equilibrada e exercícios podem ajudar.'
        };
    } else if (imc < 35) {
        return {
            classificacao: 'Obesidade Grau I',
            classeCSS: 'obesidade-i',
            descricao: 'Atenção! Recomenda-se buscar orientação médica para ajustar hábitos e cuidar da sua saúde.'
        };
    } else if (imc < 40) {
        return {
            classificacao: 'Obesidade Grau II',
            classeCSS: 'obesidade-ii',
            descricao: 'Importante: Procure assistência médica. O acompanhamento profissional pode fazer toda a diferença.'
        };
    } else {
        return {
            classificacao: 'Obesidade Grau III',
            classeCSS: 'obesidade-iii',
            descricao: '⚠️ Procure ajuda médica com urgência. O suporte profissional é essencial para sua saúde.'
        };
    }
}

// Exibir resultado na tela
function exibirResultado(nome, peso, altura, imc, dadosClassificacao) {
    conteudoResultado.innerHTML = `
        <p class="paciente-nome"><strong>Paciente:</strong> ${nome}</p>
        <div class="valor-imc">${imc.toFixed(2)}</div>
        <div class="classificacao ${dadosClassificacao.classeCSS}">
            ${dadosClassificacao.classificacao}
        </div>
        <div class="detalhes">
            <p><strong>Peso:</strong> ${peso} kg</p>
            <p><strong>Altura:</strong> ${altura.toFixed(2)} m</p>
            <p><strong>Fórmula:</strong> IMC = peso ÷ (altura × altura)</p>
            <br>
            <p><strong>💡 Informação:</strong> ${dadosClassificacao.descricao}</p>
        </div>
    `;
    resultadoDiv.classList.remove('oculto');
}

// Evento de envio do formulário
formIMC.addEventListener('submit', function(e) {
    e.preventDefault();

    // Capturar valores
    const nome = nomeInput.value.trim();
    const peso = parseFloat(pesoInput.value);
    const altura = parseFloat(alturaInput.value);

    // Validar dados
    if (!nome) {
        alert('Por favor, digite o nome do paciente!');
        nomeInput.focus();
        return;
    }
    if (isNaN(peso) || peso <= 0) {
        alert('Por favor, insira um peso válido!');
        pesoInput.focus();
        return;
    }
    if (isNaN(altura) || altura <= 0) {
        alert('Por favor, insira uma altura válida!');
        alturaInput.focus();
        return;
    }

    // Calcular e exibir
    const imc = calcularIMC(peso, altura);
    const dadosClassificacao = classificarIMC(imc);
    exibirResultado(nome, peso, altura, imc, dadosClassificacao);
});
