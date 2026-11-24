// Carrega o histórico salvo no navegador ou inicia vazio
let historico = JSON.parse(localStorage.getItem('historico_imc')) || [];

const form = document.getElementById('form-imc');
const tabelaHistorico = document.getElementById('tabela-historico');
const resultadoConteudo = document.getElementById('resultado-conteudo');

// Retorna a classificação e a classe CSS correspondente
function classificarIMC(imc) {
    if (imc < 18.5) {
        return { texto: 'Abaixo do peso', classe: 'baixo' };
    } else if (imc < 25) {
        return { texto: 'Peso normal', classe: 'normal' };
    } else if (imc < 30) {
        return { texto: 'Sobrepeso', classe: 'sobrepeso' };
    } else if (imc < 35) {
        return { texto: 'Obesidade Grau I', classe: 'obesidade' };
    } else if (imc < 40) {
        return { texto: 'Obesidade Grau II', classe: 'obesidade' };
    } else {
        return { texto: 'Obesidade Grau III', classe: 'obesidade' };
    }
}

// Calcula a faixa de peso ideal (IMC entre 18.5 e 24.9)
function calcularPesoIdeal(altura) {
    const min = (18.5 * (altura * altura)).toFixed(1);
    const max = (24.9 * (altura * altura)).toFixed(1);
    return `${min} kg e ${max} kg`;
}

// Exibe o resultado no cartão superior direito
function exibirResultadoAtual(registro) {
    const faixaIdeal = calcularPesoIdeal(registro.altura);

    resultadoConteudo.className = 'resultado-ativo';
    resultadoConteudo.innerHTML = `
        <p>IMC de <strong>${registro.nome}</strong></p>
        <div class="imc-valor text-${registro.classe}">${registro.imc.toFixed(2)}</div>
        <span class="badge bg-${registro.classe}">${registro.classificacao}</span>
        <p class="peso-ideal">
            Para sua altura (${registro.altura.toFixed(2)} m), o peso ideal fica entre <strong>${faixaIdeal}</strong>.
        </p>
    `;
}

// Atualiza a tabela de histórico
function renderizarHistorico() {
    tabelaHistorico.innerHTML = '';

    if (historico.length === 0) {
        tabelaHistorico.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center; color:#64748b;">Nenhum cálculo registrado ainda.</td>
            </tr>
        `;
        return;
    }

    historico.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.data}</td>
            <td><strong>${item.nome}</strong></td>
            <td>${item.peso.toFixed(1)} kg</td>
            <td>${item.altura.toFixed(2)} m</td>
            <td><strong>${item.imc.toFixed(2)}</strong></td>
            <td><span class="badge bg-${item.classe}" style="margin:0; font-size:0.8rem;">${item.classificacao}</span></td>
            <td>
                <button class="btn-excluir" onclick="removerRegistro(${index})" title="Excluir registro">🗑️</button>
            </td>
        `;
        tabelaHistorico.appendChild(tr);
    });
}

// Salva no localStorage e atualiza a interface
function salvarEAtualizar() {
    localStorage.setItem('historico_imc', JSON.stringify(historico));
    renderizarHistorico();
}

// Evento de envio do formulário
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);

    // Cálculo do IMC
    const imc = peso / (altura * altura);
    const status = classificarIMC(imc);

    // Data atual formatada
    const dataAtual = new Date().toLocaleDateString('pt-BR');

    const novoRegistro = {
        data: dataAtual,
        nome,
        peso,
        altura,
        imc,
        classificacao: status.texto,
        classe: status.classe
    };

    // Adiciona no início da lista (mais recente primeiro)
    historico.unshift(novoRegistro);
    
    exibirResultadoAtual(novoRegistro);
    salvarEAtualizar();
    form.reset();
});

// Remove um item específico do histórico
function removerRegistro(index) {
    historico.splice(index, 1);
    salvarEAtualizar();
}

// Apaga todo o histórico
function limparHistorico() {
    if (historico.length === 0) return;
    if (confirm('Deseja apagar todo o histórico de medições?')) {
        historico = [];
        salvarEAtualizar();
    }
}

// Inicializa a tabela ao abrir a página
renderizarHistorico();