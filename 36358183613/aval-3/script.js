let fichas = JSON.parse(localStorage.getItem('fichas_anamnese')) || [];
let fichaEditandoId = null;

const form = document.getElementById('form-anamnese');
const pesoInput = document.getElementById('peso');
const alturaInput = document.getElementById('altura');
const imcInput = document.getElementById('imc');
const listaFichasEl = document.getElementById('lista-fichas');
const totalFichasEl = document.getElementById('total-fichas');
const inputBusca = document.getElementById('busca');

// Calcula o IMC automaticamente ao digitar peso ou altura
function calcularIMC() {
    const peso = parseFloat(pesoInput.value);
    const altura = parseFloat(alturaInput.value);

    if (peso > 0 && altura > 0) {
        const imc = peso / (altura * altura);
        let classificacao = '';

        if (imc < 18.5) classificacao = 'Abaixo do peso';
        else if (imc < 25) classificacao = 'Peso normal';
        else if (imc < 30) classificacao = 'Sobrepeso';
        else classificacao = 'Obesidade';

        imcInput.value = `${imc.toFixed(1)} (${classificacao})`;
    } else {
        imcInput.value = '';
    }
}

pesoInput.addEventListener('input', calcularIMC);
alturaInput.addEventListener('input', calcularIMC);

// Calcula idade a partir da data de nascimento
function calcularIdade(dataNasc) {
    if (!dataNasc) return '';
    const hoje = new Date();
    const nasc = new Date(dataNasc);
    let idade = hoje.getFullYear() - nasc.getFullYear();
    const mes = hoje.getMonth() - nasc.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nasc.getDate())) {
        idade--;
    }
    return `${idade} anos`;
}

// Salvar ou atualizar ficha
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const condicoesMarcadas = Array.from(
        document.querySelectorAll('input[name="condicoes"]:checked')
    ).map(cb => cb.value);

    const dadosFicha = {
        id: fichaEditandoId || Date.now(),
        dataRegistro: new Date().toLocaleDateString('pt-BR'),
        nome: document.getElementById('nome').value.trim(),
        nascimento: document.getElementById('nascimento').value,
        telefone: document.getElementById('telefone').value.trim(),
        profissao: document.getElementById('profissao').value.trim(),
        emergencia: document.getElementById('emergencia').value.trim(),
        queixa: document.getElementById('queixa').value.trim(),
        peso: pesoInput.value,
        altura: alturaInput.value,
        imc: imcInput.value,
        pressao: document.getElementById('pressao').value.trim(),
        condicoes: condicoesMarcadas,
        alergias: document.getElementById('alergias').value.trim(),
        medicamentos: document.getElementById('medicamentos').value.trim(),
        atividade: document.getElementById('atividade').value,
        tabagismo: document.getElementById('tabagismo').value,
        etilismo: document.getElementById('etilismo').value,
        observacoes: document.getElementById('observacoes').value.trim()
    };

    if (fichaEditandoId) {
        fichas = fichas.map(f => f.id === fichaEditandoId ? dadosFicha : f);
        fichaEditandoId = null;
        alert('Ficha atualizada com sucesso!');
    } else {
        fichas.unshift(dadosFicha);
        alert('Ficha salva com sucesso!');
    }

    localStorage.setItem('fichas_anamnese', JSON.stringify(fichas));
    limparFormulario();
    renderizarFichas();
});

// Carrega uma ficha salva no formulário para visualizar ou editar
function carregarFicha(id) {
    const ficha = fichas.find(f => f.id === id);
    if (!ficha) return;

    fichaEditandoId = ficha.id;
    document.getElementById('nome').value = ficha.nome;
    document.getElementById('nascimento').value = ficha.nascimento;
    document.getElementById('telefone').value = ficha.telefone;
    document.getElementById('profissao').value = ficha.profissao;
    document.getElementById('emergencia').value = ficha.emergencia;
    document.getElementById('queixa').value = ficha.queixa;
    pesoInput.value = ficha.peso;
    alturaInput.value = ficha.altura;
    imcInput.value = ficha.imc;
    document.getElementById('pressao').value = ficha.pressao;
    document.getElementById('alergias').value = ficha.alergias;
    document.getElementById('medicamentos').value = ficha.medicamentos;
    document.getElementById('atividade').value = ficha.atividade;
    document.getElementById('tabagismo').value = ficha.tabagismo;
    document.getElementById('etilismo').value = ficha.etilismo;
    document.getElementById('observacoes').value = ficha.observacoes;

    document.querySelectorAll('input[name="condicoes"]').forEach(cb => {
        cb.checked = ficha.condicoes.includes(cb.value);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function excluirFicha(id) {
    if (confirm('Deseja realmente excluir esta ficha de anamnese?')) {
        fichas = fichas.filter(f => f.id !== id);
        localStorage.setItem('fichas_anamnese', JSON.stringify(fichas));
        if (fichaEditandoId === id) limparFormulario();
        renderizarFichas();
    }
}

function limparFormulario() {
    form.reset();
    imcInput.value = '';
    fichaEditandoId = null;
}

function renderizarFichas() {
    const termo = inputBusca.value.trim().toLowerCase();
    listaFichasEl.innerHTML = '';

    const filtradas = fichas.filter(f =>
        f.nome.toLowerCase().includes(termo) ||
        f.telefone.toLowerCase().includes(termo)
    );

    totalFichasEl.textContent = fichas.length;

    if (filtradas.length === 0) {
        listaFichasEl.innerHTML = '<p style="color:#718096;">Nenhuma ficha encontrada.</p>';
        return;
    }

    filtradas.forEach(ficha => {
        const div = document.createElement('div');
        div.className = 'ficha-card';

        const alertaAlergia = ficha.alergias
            ? `<div class="alerta-alergia">⚠️ Alergia: ${ficha.alergias}</div>`
            : '';

        div.innerHTML = `
            <div class="ficha-info">
                <h3>${ficha.nome} (${calcularIdade(ficha.nascimento)})</h3>
                <div class="ficha-meta">
                    📞 ${ficha.telefone} | 📅 Registrado em: ${ficha.dataRegistro}
                </div>
                ${alertaAlergia}
            </div>
            <div class="ficha-acoes">
                <button type="button" class="btn-ver" onclick="carregarFicha(${ficha.id})">Abrir / Editar</button>
                <button type="button" class="btn-del" onclick="excluirFicha(${ficha.id})">🗑️</button>
            </div>
        `;
        listaFichasEl.appendChild(div);
    });
}

document.getElementById('btn-nova').addEventListener('click', limparFormulario);
document.getElementById('btn-imprimir').addEventListener('click', () => window.print());
inputBusca.addEventListener('input', renderizarFichas);

renderizarFichas();