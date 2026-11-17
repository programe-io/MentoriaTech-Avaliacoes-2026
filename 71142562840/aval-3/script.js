const formulario = document.getElementById('form-imc');
const btnLimpar = document.getElementById('btn-limpar');
const estadoVazio = document.getElementById('estado-vazio');
const caixaResultado = document.getElementById('resultado');

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);

    if (!nome || isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    const imc = peso / (altura * altura);
    const imcFormatado = imc.toFixed(2);

    // Cálculo da posição do marcador na régua (escala visual de 15 a 42)
    const percentualPosicao = Math.min(Math.max(((imc - 15) / (42 - 15)) * 100, 4), 96);

    let classificacao = '';
    let orientacao = '';
    let temaClasse = '';

    if (imc < 18.5) {
        classificacao = 'Abaixo do peso';
        orientacao = 'O índice indica peso abaixo do recomendado para a altura. É importante avaliar a ingestão nutricional.';
        temaClasse = 'tema-baixo';
    } else if (imc < 25) {
        classificacao = 'Peso normal (Eutrofia)';
        orientacao = 'O índice está dentro da faixa considerada saudável. Mantenha hábitos equilibrados e atividade física.';
        temaClasse = 'tema-normal';
    } else if (imc < 30) {
        classificacao = 'Sobrepeso';
        orientacao = 'O índice indica excesso de peso moderado. Atenção à alimentação e à prática regular de exercícios.';
        temaClasse = 'tema-sobrepeso';
    } else if (imc < 35) {
        classificacao = 'Obesidade Grau I';
        orientacao = 'O índice aponta obesidade inicial. Recomenda-se acompanhamento médico e nutricional.';
        temaClasse = 'tema-obesidade';
    } else if (imc < 40) {
        classificacao = 'Obesidade Grau II';
        orientacao = 'O índice indica obesidade severa, com maior risco metabólico. Procure orientação profissional.';
        temaClasse = 'tema-obesidade';
    } else {
        classificacao = 'Obesidade Grau III';
        orientacao = 'O índice aponta obesidade mórbida. É fundamental buscar acompanhamento médico especializado.';
        temaClasse = 'tema-obesidade';
    }

    estadoVazio.classList.add('oculto');
    caixaResultado.classList.remove('oculto');

    caixaResultado.innerHTML = `
        <div class="paciente-info">
            <span>Paciente Avaliado</span>
            <h2>${nome}</h2>
        </div>

        <div class="metricas-grid">
            <div class="metrica-box">
                <small>Peso</small>
                <strong>${peso.toFixed(1)} kg</strong>
            </div>
            <div class="metrica-box">
                <small>Altura</small>
                <strong>${altura.toFixed(2)} m</strong>
            </div>
            <div class="metrica-box">
                <small>IMC</small>
                <strong>${imcFormatado}</strong>
            </div>
        </div>

        <div class="diagnostico-card ${temaClasse}">
            <span class="badge-status">${classificacao}</span>
            <p>${orientacao}</p>
        </div>

        <div class="escala-container">
            <div class="escala-barra">
                <div class="escala-marcador" style="left: ${percentualPosicao}%;"></div>
            </div>
            <div class="escala-legendas">
                <span>Baixo</span>
                <span>Normal</span>
                <span>Sobrepeso</span>
                <span>Obesidade</span>
            </div>
        </div>
    `;
});

btnLimpar.addEventListener('click', function() {
    formulario.reset();
    caixaResultado.classList.add('oculto');
    estadoVazio.classList.remove('oculto');
});
