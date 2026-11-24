let nomePaciente, pesoPaciente, alturaPaciente, valorImc, textoClassificacao, caixaResultado;

const botao = document.getElementById('btnCalcular');

if (botao) botao.onclick = () => (
  nomePaciente = document.getElementById('nome').value.trim(),
  pesoPaciente = parseFloat(document.getElementById('peso').value.replace(',', '.')),
  alturaPaciente = parseFloat(document.getElementById('altura').value.replace(',', '.')),
  caixaResultado = document.getElementById('resultado'),
  (!nomePaciente || isNaN(pesoPaciente) || isNaN(alturaPaciente) || pesoPaciente <= 0 || alturaPaciente <= 0)
    ? (
        caixaResultado.style.display = 'block',
        caixaResultado.style.backgroundColor = '#fef2f2',
        caixaResultado.style.borderLeftColor = '#ef4444',
        caixaResultado.style.color = '#991b1b',
        caixaResultado.innerHTML = 'Preencha todos os campos corretamente.'
      )
    : (
        valorImc = pesoPaciente / (alturaPaciente * alturaPaciente),
        textoClassificacao = valorImc < 18.5 ? 'Abaixo do peso'
                           : valorImc < 25 ? 'Peso normal'
                           : valorImc < 30 ? 'Sobrepeso'
                           : valorImc < 35 ? 'Obesidade grau I'
                           : valorImc < 40 ? 'Obesidade grau II'
                           : 'Obesidade grau III',
        caixaResultado.style.display = 'block',
        caixaResultado.style.backgroundColor = '#ecfdf5',
        caixaResultado.style.borderLeftColor = '#10b981',
        caixaResultado.style.color = '#065f46',
        caixaResultado.innerHTML = '<strong>Paciente:</strong> ' + nomePaciente + '<br><strong>IMC:</strong> ' + valorImc.toFixed(2) + '<br><strong>Classificação:</strong> ' + textoClassificacao
      )
);