document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-imc');
  const btnLimpar = document.getElementById('btn-limpar');
  const boxResultado = document.getElementById('box-resultado');
  const msgErro = document.getElementById('mensagem-erro');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const pesoRaw = document.getElementById('peso').value.replace(',', '.');
    const alturaRaw = document.getElementById('altura').value.replace(',', '.');

    const peso = parseFloat(pesoRaw);
    let altura = parseFloat(alturaRaw);

    // Converte automaticamente caso a altura seja digitada em centímetros (ex: 175 -> 1.75)
    if (altura > 3) {
      altura = altura / 100;
    }

    if (!nome || isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
      msgErro.style.display = 'block';
      boxResultado.style.display = 'none';
      return;
    }

    msgErro.style.display = 'none';

    const imc = calcularIMC(peso, altura);
    const pesoMin = (18.5 * (altura * altura)).toFixed(1).replace('.', ',');
    const pesoMax = (24.9 * (altura * altura)).toFixed(1).replace('.', ',');
    const diagnostico = obterClassificacaoIMC(imc);

    exibirResultado({
      nome,
      peso,
      altura,
      imc,
      pesoMin,
      pesoMax,
      ...diagnostico
    });
  });

  btnLimpar.addEventListener('click', () => {
    form.reset();
    boxResultado.style.display = 'none';
    msgErro.style.display = 'none';
    document.getElementById('nome').focus();
  });

  function calcularIMC(peso, altura) {
    return peso / (altura * altura);
  }

  function obterClassificacaoIMC(imc) {
    if (imc < 18.5) {
      return {
        classificacao: 'Abaixo do peso',
        classeCor: 'abaixo',
        orientacao: 'O paciente está abaixo da faixa recomendada. Recomenda-se avaliação nutricional para ganho de massa saudável.'
      };
    }
    if (imc < 25) {
      return {
        classificacao: 'Peso normal (Eutrófico)',
        classeCor: 'normal',
        orientacao: 'O paciente encontra-se na faixa de peso adequada para sua altura. Manter hábitos alimentares equilibrados e atividade física regular.'
      };
    }
    if (imc < 30) {
      return {
        classificacao: 'Sobrepeso (Pré-obesidade)',
        classeCor: 'sobrepeso',
        orientacao: 'Atenção moderada. Reeducação alimentar e aumento da rotina de exercícios físicos ajudam a prevenir progressão.'
      };
    }
    if (imc < 35) {
      return {
        classificacao: 'Obesidade Grau I',
        classeCor: 'obesidade1',
        orientacao: 'Risco moderado para comorbidades. Recomenda-se acompanhamento médico e nutricional estruturado.'
      };
    }
    if (imc < 40) {
      return {
        classificacao: 'Obesidade Grau II (Severa)',
        classeCor: 'obesidade2',
        orientacao: 'Risco elevado à saúde. Necessário acompanhamento multidisciplinar contínuo.'
      };
    }
    return {
      classificacao: 'Obesidade Grau III (Mórbida)',
      classeCor: 'obesidade3',
      orientacao: 'Risco muito elevado. Indicada avaliação médica especializada urgente para plano terapêutico individualizado.'
    };
  }

  function exibirResultado(dados) {
    document.getElementById('res-nome').textContent = dados.nome;
    document.getElementById('res-imc').textContent = `${dados.imc.toFixed(2).replace('.', ',')} kg/m²`;

    const badge = document.getElementById('res-badge');
    badge.textContent = dados.classificacao;
    badge.className = `badge ${dados.classeCor}`;

    document.getElementById('res-dados').textContent = `${dados.peso.toFixed(1).replace('.', ',')} kg e ${dados.altura.toFixed(2).replace('.', ',')} m`;
    document.getElementById('res-ideal').textContent = `entre ${dados.pesoMin} kg e ${dados.pesoMax} kg`;
    document.getElementById('res-orientacao').textContent = dados.orientacao;

    boxResultado.style.display = 'block';
  }
});