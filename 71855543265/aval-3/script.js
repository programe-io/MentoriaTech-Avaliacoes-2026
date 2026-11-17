document.getElementById('form-imc').addEventListener('submit', function(event) {
    // Evita que a página recarregue ao enviar o formulário
    event.preventDefault();

    // 1. Receber os dados do paciente
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

    // 3. Definir classificação e orientação
    let classificacao = '';
    let classeCor = '';
    let mensagem = '';

    if (imc < 18.5) {
        classificacao = 'Abaixo do peso';
        classeCor = 'baixo-peso';
        mensagem = 'O paciente está abaixo da faixa recomendada. Sugere-se avaliação nutricional.';
    } else if (imc < 25) {
        classificacao = 'Peso normal';
        classeCor = 'peso-normal';
        mensagem = 'O paciente está dentro da faixa de peso considerada saudável.';
    } else if (imc < 30) {
        classificacao = 'Sobrepeso';
        classeCor = 'sobrepeso';
        mensagem = 'Atenção: o paciente apresenta sobrepeso. Hábitos saudáveis são recomendados.';
    } else if (imc < 35) {
        classificacao = 'Obesidade Grau I';
        classeCor = 'obesidade';
        mensagem = 'Alerta: obesidade grau I identificada. Recomenda-se acompanhamento médico.';
    } else if (imc < 40) {
        classificacao = 'Obesidade Grau II';
        classeCor = 'obesidade';
        mensagem = 'Alerta: obesidade grau II (severa). Necessário acompanhamento profissional.';
    } else {
        classificacao = 'Obesidade Grau III';
        classeCor = 'obesidade';
        mensagem = 'Alerta crítico: obesidade grau III (mórbida). Procure orientação médica especializada.';
    }

    // 4. Exibir as informações na tela
    document.getElementById('res-nome').textContent = nome;
    document.getElementById('res-imc').textContent = imc.toFixed(2).replace('.', ',') + ' kg/m²';
    
    const badgeClassificacao = document.getElementById('res-classificacao');
    badgeClassificacao.textContent = classificacao;
    badgeClassificacao.className = 'badge ' + classeCor;

    document.getElementById('res-mensagem').textContent = mensagem;

    // Mostra a caixa de resultado
    const caixaResultado = document.getElementById('resultado');
    caixaResultado.classList.remove('oculto');
});
