const form = document.getElementById('form-imc');
const btnLimpar = document.getElementById('btn-limpar');
const caixaResultado = document.getElementById('resultado');

form.addEventListener('submit', function (evento) {
    evento.preventDefault();

    // 1. Receber os dados
    const nome = document.getElementById('nome').value.trim();
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);

    // Validação simples
    if (!nome || isNaN(peso) || isNaN(altura) || altura <= 0 || peso <= 0) {
        alert('Por favor, preencha todos os campos com valores válidos.');
        return;
    }

    // 2. Calcular o IMC
    const imc = peso / (altura * altura);
    const dadosClassificacao = obterClassificacaoIMC(imc);

    // 3. Exibir informações do paciente
    exibirResultado(nome, imc, dadosClassificacao);
});

btnLimpar.addEventListener('click', function () {
    form.reset();
    caixaResultado.classList.add('oculto');
});

function obterClassificacaoIMC(imc) {
    if (imc < 18.5) {
        return {
            texto: 'Abaixo do peso',
            classeCss: 'abaixo',
            orientacao: 'O índice indica peso abaixo do ideal para a altura. Recomenda-se avaliação nutricional para ganho de massa saudável.'
        };
    } else if (imc < 25) {
        return {
            texto: 'Peso normal (Eutrofia)',
            classeCss: 'normal',
            orientacao: 'Parabéns! O peso está adequado para a altura. Mantenha hábitos alimentares equilibrados e prática regular de exercícios.'
        };
    } else if (imc < 30) {
        return {
            texto: 'Sobrepeso',
            classeCss: 'sobrepeso',
            orientacao: 'Atenção: índice acima da faixa ideal. Ajustes na alimentação e aumento da atividade física ajudam a prevenir riscos futuros.'
        };
    } else if (imc < 35) {
        return {
            texto: 'Obesidade Grau I',
            classeCss: 'obesidade',
            orientacao: 'Sinal de alerta para a saúde. É importante buscar acompanhamento médico e nutricional para controle de peso.'
        };
    } else if (imc < 40) {
        return {
            texto: 'Obesidade Grau II',
            classeCss: 'obesidade',
            orientacao: 'Risco elevado para condições metabólicas e cardiovasculares. Recomenda-se acompanhamento multidisciplinar.'
        };
    } else {
        return {
            texto: 'Obesidade Grau III',
            classeCss: 'obesidade',
            orientacao: 'Risco muito elevado. Procure orientação médica especializada para um plano de cuidado individualizado.'
        };
    }
}

function exibirResultado(nome, imc, dados) {
    document.getElementById('res-paciente').textContent = `Paciente: ${nome}`;
    document.getElementById('res-valor').textContent = imc.toFixed(2).replace('.', ',');
    document.getElementById('res-classificacao').textContent = dados.texto;
    document.getElementById('res-info').textContent = dados.orientacao;

    // Atualiza a cor da borda/fundo conforme o resultado
    caixaResultado.className = `resultado ${dados.classeCss}`;
}