// Lista em memória para armazenar os pacientes avaliados
let pacientes = [];

const formImc = document.getElementById('form-imc');
const destaqueCard = document.getElementById('destaque-card');
const destaqueConteudo = document.getElementById('destaque-conteudo');
const tabelaPacientes = document.getElementById('tabela-pacientes');

formImc.addEventListener('submit', function(event) {
    event.preventDefault();

    // 1. Receber os dados
    const nome = document.getElementById('nome').value.trim();
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);

    // Validação
    if (nome === '' || isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        alert('Por favor, insira dados válidos para o paciente.');
        return;
    }

    // 2. Calcular o IMC
    const imc = peso / (altura * altura);
    const info = obterInfoIMC(imc);

    // Cria o registro do paciente
    const registro = {
        nome,
        peso,
        altura,
        imc,
        classificacao: info.classificacao,
        orientacao: info.orientacao,
        classeCss: info.classeCss
    };

    // Adiciona ao início da lista (mais recente primeiro)
    pacientes.unshift(registro);

    // 3. Exibir informações do paciente atual e atualizar a tabela
    exibirDestaque(registro);
    atualizarTabela();

    formImc.reset();
});

// Classifica o IMC conforme os padrões da OMS
function obterInfoIMC(imc) {
    if (imc < 18.5) {
        return {
            classificacao: 'Abaixo do peso',
            orientacao: 'Índice abaixo da faixa ideal. Recomenda-se avaliação nutricional.',
            classeCss: 'abaixo'
        };
    } else if (imc < 25) {
        return {
            classificacao: 'Peso normal',
            orientacao: 'Índice dentro da faixa considerada saudável para a altura.',
            classeCss: 'normal'
        };
    } else if (imc < 30) {
        return {
            classificacao: 'Sobrepeso',
            orientacao: 'Índice indica sobrepeso. Atenção aos hábitos alimentares e atividade física.',
            classeCss: 'sobrepeso'
        };
    } else if (imc < 35) {
        return {
            classificacao: 'Obesidade Grau I',
            orientacao: 'Índice indica obesidade leve. Acompanhamento profissional é indicado.',
            classeCss: 'obesidade'
        };
    } else if (imc < 40) {
        return {
            classificacao: 'Obesidade Grau II',
            orientacao: 'Índice indica obesidade moderada. Recomenda-se acompanhamento médico.',
            classeCss: 'obesidade'
        };
    } else {
        return {
            classificacao: 'Obesidade Grau III',
            orientacao: 'Índice indica obesidade grave. Necessário acompanhamento médico especializado.',
            classeCss: 'obesidade'
        };
    }
}

// Exibe o card detalhado do último paciente calculado
function exibirDestaque(paciente) {
    destaqueCard.classList.remove('hidden');

    destaqueConteudo.innerHTML = `
        <div class="resultado-box ${paciente.classeCss}" style="background-color: #f8fafc;">
            <p><strong>Paciente:</strong> ${paciente.nome}</p>
            <p><strong>Medidas:</strong> ${paciente.peso.toFixed(1)} kg | ${paciente.altura.toFixed(2)} m</p>
            <div class="imc-valor">IMC: ${paciente.imc.toFixed(2)} kg/m² — ${paciente.classificacao}</div>
            <p><strong>Informação:</strong> ${paciente.orientacao}</p>
        </div>
    `;
}

// Renderiza a tabela de histórico
function atualizarTabela() {
    tabelaPacientes.innerHTML = '';

    if (pacientes.length === 0) {
        tabelaPacientes.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; color: #64748b;">Nenhum paciente registrado ainda.</td>
            </tr>
        `;
        return;
    }

    pacientes.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${p.nome}</strong></td>
            <td>${p.peso.toFixed(1)} kg</td>
            <td>${p.altura.toFixed(2)} m</td>
            <td><strong>${p.imc.toFixed(2)}</strong></td>
            <td><span class="badge ${p.classeCss}">${p.classificacao}</span></td>
        `;
        tabelaPacientes.appendChild(tr);
    });
}

// Inicializa a tabela vazia
atualizarTabela();
