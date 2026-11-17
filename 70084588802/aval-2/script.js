// ==========================================
// 1. SELEÇÃO DOS ELEMENTOS DO HTML
// ==========================================
const dataAtualEl = document.getElementById('dataAtual');
const totalTarefasEl = document.getElementById('totalTarefas');
const tarefasPendentesEl = document.getElementById('tarefasPendentes');
const tarefasConcluidasEl = document.getElementById('tarefasConcluidas');

const formTarefa = document.getElementById('formTarefa');
const descricaoInput = document.getElementById('descricao');
const prioridadeSelect = document.getElementById('prioridade');
const dataEntregaInput = document.getElementById('dataEntrega');
const botaoCadastrar = document.getElementById('botaoCadastrar');
const cancelarEdicaoBtn = document.getElementById('cancelarEdicao');
const mensagemEl = document.getElementById('mensagem');

const buscaInput = document.getElementById('busca');
const botoesFiltro = document.querySelectorAll('.filtro');
const listaTarefasEl = document.getElementById('listaTarefas');
const vazioEl = document.getElementById('vazio');

// ==========================================
// 2. ESTADO DA APLICAÇÃO (DADOS)
// ==========================================
// Carrega as tarefas salvas no navegador ou inicia uma lista vazia
let tarefas = JSON.parse(localStorage.getItem('taskmanager_tarefas')) || [];
let filtroAtual = 'Todas';
let termoBusca = '';
let idEmEdicao = null; // Guarda o ID da tarefa quando estiver editando

// ==========================================
// 3. INICIALIZAÇÃO
// ==========================================
function iniciar() {
    exibirDataAtual();
    renderizarTarefas();
}

// Mostra a data de hoje no cabeçalho
function exibirDataAtual() {
    const hoje = new Date();
    const opcoes = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
    const dataFormatada = hoje.toLocaleDateString('pt-BR', opcoes);
    // Deixa a primeira letra maiúscula
    dataAtualEl.textContent = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
}

// Salva a lista no LocalStorage do navegador
function salvarNoNavegador() {
    localStorage.setItem('taskmanager_tarefas', JSON.stringify(tarefas));
}

// Mostra mensagens temporárias de aviso/sucesso
function mostrarMensagem(texto) {
    mensagemEl.textContent = texto;
    setTimeout(() => {
        mensagemEl.textContent = '';
    }, 3000);
}

// ==========================================
// 4. CADASTRAR E EDITAR TAREFA
// ==========================================
formTarefa.addEventListener('submit', function (evento) {
    evento.preventDefault(); // Evita que a página recarregue

    const descricao = descricaoInput.value.trim();
    const prioridade = prioridadeSelect.value;
    const dataEntrega = dataEntregaInput.value;

    if (!descricao || !prioridade || !dataEntrega) {
        mostrarMensagem('⚠️ Preencha todos os campos!');
        return;
    }

    if (idEmEdicao !== null) {
        // MODO EDIÇÃO: Atualiza a tarefa existente
        tarefas = tarefas.map(tarefa => {
            if (tarefa.id === idEmEdicao) {
                return {
                    ...tarefa,
                    descricao: descricao,
                    prioridade: prioridade,
                    dataEntrega: dataEntrega
                };
            }
            return tarefa;
        });

        mostrarMensagem('🔥 Tarefa atualizada com sucesso!');
        sairDoModoEdicao();
    } else {
        // MODO CADASTRO: Cria uma nova tarefa
        const novaTarefa = {
            id: Date.now(), // Gera um número único baseado no tempo
            codigo: '#' + String(tarefas.length + 1).padStart(3, '0'),
            descricao: descricao,
            prioridade: prioridade,
            dataEntrega: dataEntrega,
            status: 'Pendente'
        };

        tarefas.push(novaTarefa);
        mostrarMensagem('⚔️ Nova tarefa adicionada!');
        formTarefa.reset();
    }

    salvarNoNavegador();
    renderizarTarefas();
});

// Prepara o formulário para editar uma tarefa
function iniciarEdicao(id) {
    const tarefa = tarefas.find(t => t.id === id);
    if (!tarefa) return;

    idEmEdicao = id;
    descricaoInput.value = tarefa.descricao;
    prioridadeSelect.value = tarefa.prioridade;
    dataEntregaInput.value = tarefa.dataEntrega;

    // Muda o visual dos botões
    botaoCadastrar.textContent = '💾 Salvar alterações';
    cancelarEdicaoBtn.classList.remove('esconder');
    descricaoInput.focus();
}

// Cancela a edição e volta ao normal
function sairDoModoEdicao() {
    idEmEdicao = null;
    formTarefa.reset();
    botaoCadastrar.textContent = '+ Adicionar tarefa';
    cancelarEdicaoBtn.classList.add('esconder');
}

cancelarEdicaoBtn.addEventListener('click', sairDoModoEdicao);

// ==========================================
// 5. AÇÕES DA TABELA (CONCLUIR E EXCLUIR)
// ==========================================
function alternarStatus(id) {
    tarefas = tarefas.map(tarefa => {
        if (tarefa.id === id) {
            const novoStatus = tarefa.status === 'Pendente' ? 'Concluída' : 'Pendente';
            return { ...tarefa, status: novoStatus };
        }
        return tarefa;
    });

    salvarNoNavegador();
    renderizarTarefas();
}

function excluirTarefa(id) {
    const confirmar = confirm('Tem certeza que deseja excluir esta tarefa?');
    if (!confirmar) return;

    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    
    // Se estava editando a tarefa que foi excluída, limpa o formulário
    if (idEmEdicao === id) {
        sairDoModoEdicao();
    }

    salvarNoNavegador();
    renderizarTarefas();
    mostrarMensagem('🗑️ Tarefa removida.');
}

// ==========================================
// 6. FILTROS E BUSCA
// ==========================================
// Clique nos botões: Todas, Pendentes, Concluídas
botoesFiltro.forEach(botao => {
    botao.addEventListener('click', () => {
        // Remove a classe 'ativo' de todos e coloca só no clicado
        botoesFiltro.forEach(b => b.classList.remove('ativo'));
        botao.classList.add('ativo');

        filtroAtual = botao.getAttribute('data-filtro');
        renderizarTarefas();
    });
});

// Digitação no campo de busca
buscaInput.addEventListener('input', (evento) => {
    termoBusca = evento.target.value.toLowerCase();
    renderizarTarefas();
});

// ==========================================
// 7. ATUALIZAR TELA E CONTADORES
// ==========================================
function atualizarContadores() {
    const total = tarefas.length;
    const concluidas = tarefas.filter(t => t.status === 'Concluída').length;
    const pendentes = total - concluidas;

    totalTarefasEl.textContent = total;
    tarefasPendentesEl.textContent = pendentes;
    tarefasConcluidasEl.textContent = concluidas;
}

// Formata a data de YYYY-MM-DD para DD/MM/YYYY
function formatarDataBR(dataISO) {
    if (!dataISO) return '';
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
}

function renderizarTarefas() {
    atualizarContadores();
    listaTarefasEl.innerHTML = '';

    // Filtra por status (Todas / Pendente / Concluída) e pelo texto da busca
    const tarefasFiltradas = tarefas.filter(tarefa => {
        const bateFiltro = filtroAtual === 'Todas' || tarefa.status === filtroAtual;
        const bateBusca = tarefa.descricao.toLowerCase().includes(termoBusca) || 
                          tarefa.codigo.toLowerCase().includes(termoBusca);
        return bateFiltro && bateBusca;
    });

    // Mostra ou esconde o aviso de "Nenhuma tarefa encontrada"
    if (tarefasFiltradas.length === 0) {
        vazioEl.style.display = 'block';
    } else {
        vazioEl.style.display = 'none';
    }

    // Cria as linhas da tabela
    tarefasFiltradas.forEach(tarefa => {
        const tr = document.createElement('tr');

        // Define as classes do seu CSS para prioridade e status
        const classePrioridade = tarefa.prioridade === 'Baixa' ? 'prioridade-baixa' :
                                 tarefa.prioridade === 'Média' ? 'prioridade-media' : 'prioridade-alta';

        const classeStatus = tarefa.status === 'Concluída' ? 'status-concluida' : 'status-pendente';
        const estiloTexto = tarefa.status === 'Concluída' ? 'text-decoration: line-through; opacity: 0.7;' : '';

        tr.innerHTML = `
            <td class="codigo"><strong>${tarefa.codigo}</strong></td>
            <td style="${estiloTexto}">${tarefa.descricao}</td>
            <td><span class="${classePrioridade}" style="padding: 4px 8px; border-radius: 6px;">${tarefa.prioridade}</span></td>
            <td>${formatarDataBR(tarefa.dataEntrega)}</td>
            <td><span class="${classeStatus}" style="padding: 4px 8px; border-radius: 6px;">${tarefa.status}</span></td>
            <td>
                <button class="acao" onclick="alternarStatus(${tarefa.id})" title="Concluir/Reabrir">
                    ${tarefa.status === 'Pendente' ? '✓' : '↩'}
                </button>
                <button class="acao" onclick="iniciarEdicao(${tarefa.id})" title="Editar">
                    ✎
                </button>
                <button class="acao" onclick="excluirTarefa(${tarefa.id})" title="Excluir">
                    🗑
                </button>
            </td>
        `;

        listaTarefasEl.appendChild(tr);
    });
}

// Inicia o sistema assim que a página carrega
iniciar();