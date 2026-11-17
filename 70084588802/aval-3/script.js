// ==========================================
// 1. SELEÇÃO DOS ELEMENTOS DO HTML
// ==========================================
const dataAtualEl = document.getElementById('dataAtual');
const totalPacientesEl = document.getElementById('totalPacientes');
const mediaImcEl = document.getElementById('mediaImc');
const cadastrosAtivosEl = document.getElementById('cadastrosAtivos');

const formAnamnese = document.getElementById('formAnamnese');
const nomeInput = document.getElementById('nome');
const idadeInput = document.getElementById('idade');
const pesoInput = document.getElementById('peso');
const alturaInput = document.getElementById('altura');
const objetivoSelect = document.getElementById('objetivo');
const botaoCadastrar = document.getElementById('botaoCadastrar');
const cancelarEdicaoBtn = document.getElementById('cancelarEdicao');
const mensagemEl = document.getElementById('mensagem');

const buscaInput = document.getElementById('busca');
const listaPacientesEl = document.getElementById('listaPacientes');
const vazioEl = document.getElementById('vazio');

// ==========================================
// 2. ESTADO DA APLICAÇÃO (DADOS)
// ==========================================
let pacientes = JSON.parse(localStorage.getItem('anamnese_pacientes')) || [];
let termoBusca = '';
let idEmEdicao = null; // Guarda o ID se estiver editando uma ficha

// ==========================================
// 3. INICIALIZAÇÃO
// ==========================================
function iniciar() {
    exibirDataAtual();
    renderizarPacientes();
}

// Mostra a data atual formatada no cabeçalho
function exibirDataAtual() {
    const hoje = new Date();
    const opcoes = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
    const dataFormatada = hoje.toLocaleDateString('pt-BR', opcoes);
    dataAtualEl.textContent = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
}

// Salva os dados no LocalStorage do navegador
function salvarNoNavegador() {
    localStorage.setItem('anamnese_pacientes', JSON.stringify(pacientes));
}

// Exibe mensagens temporárias de feedback para o usuário
function mostrarMensagem(texto) {
    mensagemEl.textContent = texto;
    setTimeout(() => {
        mensagemEl.textContent = '';
    }, 3500);
}

// ==========================================
// 4, 13, 14 & 15. CÁLCULO E CLASSIFICAÇÃO DE IMC
// ==========================================
function calcularIMC(peso, altura) {
    if (!altura || altura <= 0) return 0;
    const imc = peso / (altura * altura);
    return parseFloat(imc.toFixed(2)); // Arredonda para 2 casas decimais
}

function classificarIMC(imc) {
    if (imc < 18.5) return { texto: 'Abaixo do peso', classe: 'imc-baixo' };
    if (imc >= 18.5 && imc < 25) return { texto: 'Peso normal', classe: 'imc-normal' };
    if (imc >= 25 && imc < 30) return { texto: 'Sobrepeso', classe: 'imc-sobrepeso' };
    if (imc >= 30 && imc < 35) return { texto: 'Obesidade Grau I', classe: 'imc-obesidade1' };
    if (imc >= 35 && imc < 40) return { texto: 'Obesidade Grau II', classe: 'imc-obesidade2' };
    return { texto: 'Obesidade Mórbida', classe: 'imc-obesidade3' };
}

// ==========================================
// 5, 7, 8, 9 & 10. CADASTRO E EDIÇÃO DE PACIENTES
// ==========================================
formAnamnese.addEventListener('submit', function (evento) {
    evento.preventDefault(); // Evita recarregar a página

    const nome = nomeInput.value.trim();
    const idade = parseInt(idadeInput.value);
    const peso = parseFloat(pesoInput.value);
    const altura = parseFloat(alturaInput.value);
    const objetivo = objetivoSelect.value;

    if (!nome || isNaN(idade) || isNaN(peso) || isNaN(altura) || !objetivo) {
        mostrarMensagem('⚠️ Preencha todos os campos corretamente!');
        return;
    }

    const imcCalculado = calcularIMC(peso, altura);
    const classificacaoObj = classificarIMC(imcCalculado);

    if (idEmEdicao !== null) {
        // MODO EDIÇÃO
        pacientes = pacientes.map(paciente => {
            if (paciente.id === idEmEdicao) {
                return {
                    ...paciente,
                    nome,
                    idade,
                    peso,
                    altura,
                    objetivo,
                    imc: imcCalculado,
                    classificacao: classificacaoObj.texto
                };
            }
            return paciente;
        });

        mostrarMensagem('✨ Ficha de anamnese atualizada com sucesso!');
        sairDoModoEdicao();
    } else {
        // MODO CADASTRO (Geração automática de ID e Código)
        const novoPaciente = {
            id: Date.now(),
            codigo: '#PAC-' + String(pacientes.length + 1).padStart(3, '0'),
            nome,
            idade,
            peso,
            altura,
            objetivo,
            imc: imcCalculado,
            classificacao: classificacaoObj.texto
        };

        pacientes.push(novoPaciente);
        mostrarMensagem('⚡ Nova ficha cadastrada com sucesso!');
        formAnamnese.reset();
    }

    salvarNoNavegador();
    renderizarPacientes();
});

// Preenche o formulário com os dados do paciente para edição
function iniciarEdicao(id) {
    const paciente = pacientes.find(p => p.id === id);
    if (!paciente) return;

    idEmEdicao = id;
    nomeInput.value = paciente.nome;
    idadeInput.value = paciente.idade;
    pesoInput.value = paciente.peso;
    alturaInput.value = paciente.altura;
    objetivoSelect.value = paciente.objetivo;

    botaoCadastrar.textContent = '💾 Salvar Alterações';
    cancelarEdicaoBtn.classList.remove('esconder');
    nomeInput.focus();
}

function sairDoModoEdicao() {
    idEmEdicao = null;
    formAnamnese.reset();
    botaoCadastrar.textContent = '+ Cadastrar Ficha';
    cancelarEdicaoBtn.classList.add('esconder');
}

cancelarEdicaoBtn.addEventListener('click', sairDoModoEdicao);

function excluirPaciente(id) {
    const confirmar = confirm('Tem certeza que deseja excluir esta ficha de anamnese?');
    if (!confirmar) return;

    pacientes = pacientes.filter(p => p.id !== id);

    if (idEmEdicao === id) {
        sairDoModoEdicao();
    }

    salvarNoNavegador();
    renderizarPacientes();
    mostrarMensagem('🗑️ Ficha removida do sistema.');
}

// ==========================================
// 6. BUSCA EM TEMPO REAL
// ==========================================
buscaInput.addEventListener('input', (evento) => {
    termoBusca = evento.target.value.toLowerCase();
    renderizarPacientes();
});

// ==========================================
// 11 & 12. FUNÇÃO DE RENDERIZAÇÃO E DASHBOARD
// ==========================================
function atualizarResumo() {
    const total = pacientes.length;
    totalPacientesEl.textContent = total;
    cadastrosAtivosEl.textContent = total;

    if (total === 0) {
        mediaImcEl.textContent = '0.0';
        return;
    }

    const somaImc = pacientes.reduce((acc, p) => acc + p.imc, 0);
    const media = somaImc / total;
    mediaImcEl.textContent = media.toFixed(1);
}

function renderizarPacientes() {
    atualizarResumo();
    listaPacientesEl.innerHTML = '';

    // Filtra pacientes pelo nome ou código
    const pacientesFiltrados = pacientes.filter(p => {
        return p.nome.toLowerCase().includes(termoBusca) || p.codigo.toLowerCase().includes(termoBusca);
    });

    if (pacientesFiltrados.length === 0) {
        vazioEl.style.display = 'block';
    } else {
        vazioEl.style.display = 'none';
    }

    // Cria as linhas e células dinamicamente na tabela
    pacientesFiltrados.forEach(paciente => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td><strong>${paciente.codigo}</strong></td>
            <td>
                <div style="font-weight: 600;">${paciente.nome}</div>
                <div style="font-size: 12px; opacity: 0.8; color: #ba55d3;">Obj: ${paciente.objetivo}</div>
            </td>
            <td>${paciente.idade} anos</td>
            <td>${paciente.peso} kg / ${paciente.altura} m</td>
            <td>
                <div style="font-weight: bold; color: #00ffff;">IMC: ${paciente.imc}</div>
                <div style="font-size: 12px; opacity: 0.9;">${paciente.classificacao}</div>
            </td>
            <td><span style="background: rgba(138, 43, 226, 0.2); border: 1px solid #8a2be2; padding: 4px 8px; border-radius: 6px; font-size: 12px;">${paciente.objetivo}</span></td>
            <td>
                <button class="acao" onclick="iniciarEdicao(${paciente.id})" title="Editar Ficha">
                    ✎
                </button>
                <button class="acao" onclick="excluirPaciente(${paciente.id})" title="Excluir Ficha">
                    🗑
                </button>
            </td>
        `;

        listaPacientesEl.appendChild(tr);
    });
}

// Inicializa a aplicação assim que o script carrega
iniciar();