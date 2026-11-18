document.getElementById('imc-form').addEventListener('submit', function(event) {
    // Evita que a página recarregue ao enviar o formulário
    event.preventDefault();

    // Pega os valores digitados e converte para número decimal
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);

    // Validação simples para evitar divisão por zero ou números negativos
    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        alert('Por favor, insira valores válidos maiores que zero.');
        return;
    }

    // Cálculo do IMC
    const imc = peso / (altura * altura);

    // Determina a classificação e a classe CSS correspondente
    let classificacao = '';
    let classeCor = '';

    if (imc < 18.5) {
        classificacao = 'Abaixo do peso';
        classeCor = 'baixo-peso';
    } else if (imc < 24.9) {
        classificacao = 'Peso normal';
        classeCor = 'peso-normal';
    } else if (imc < 29.9) {
        classificacao = 'Sobrepeso';
        classeCor = 'sobrepeso';
    } else if (imc < 34.9) {
        classificacao = 'Obesidade Grau I';
        classeCor = 'obesidade';
    } else if (imc < 39.9) {
        classificacao = 'Obesidade Grau II';
        classeCor = 'obesidade';
    } else {
        classificacao = 'Obesidade Grau III';
        classeCor = 'obesidade';
    }

    // Atualiza os elementos na tela
    const elementoValor = document.getElementById('valor-imc');
    const elementoClassificacao = document.getElementById('classificacao');
    const caixaResultado = document.getElementById('resultado');

    elementoValor.textContent = imc.toFixed(2); // Formata para 2 casas decimais
    elementoClassificacao.textContent = classificacao;
    
    // Aplica a cor correspondente à classificação
    elementoClassificacao.className = classeCor;

    // Mostra a caixa de resultado
    caixaResultado.classList.remove('oculto');
});