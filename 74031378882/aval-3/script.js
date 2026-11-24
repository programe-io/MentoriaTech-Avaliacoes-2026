const form = document.querySelector('#bmi-form');
    const error = document.querySelector('#error');
    const resultado = document.querySelector('#resultado');
    const nomeInput = document.querySelector('#nome');
    const pesoInput = document.querySelector('#peso');
    const alturaInput = document.querySelector('#altura');

    function obterFaixa(imc) {
      if (imc < 18.5) return 'Abaixo do peso (referência para adultos).';
      if (imc < 25) return 'Faixa de peso considerada adequada (referência para adultos).';
      if (imc < 30) return 'Sobrepeso (referência para adultos).';
      if (imc < 35) return 'Obesidade grau I (referência para adultos).';
      if (imc < 40) return 'Obesidade grau II (referência para adultos).';
      return 'Obesidade grau III (referência para adultos).';
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      error.hidden = true;
      resultado.hidden = true;

      const nome = nomeInput.value.trim();
      const peso = pesoInput.valueAsNumber;
      const altura = alturaInput.valueAsNumber;
      if (!nome || !Number.isFinite(peso) || !Number.isFinite(altura) || peso <= 0 || altura <= 0) {
        error.textContent = 'Confira os campos: informe nome, peso e altura com valores válidos.';
        error.hidden = false;
        return;
      }
      if (peso > 500 || altura < 0.5 || altura > 2.7) {
        error.textContent = 'Confira os valores informados. Use peso em kg e altura em metros.';
        error.hidden = false;
        return;
      }

      const imc = peso / (altura * altura);
      document.querySelector('#saudacao').textContent = `Resultado de ${nome}`;
      document.querySelector('#valor').textContent = imc.toFixed(1).replace('.', ',');
      document.querySelector('#classificacao').textContent = obterFaixa(imc);
      resultado.hidden = false;
    });
