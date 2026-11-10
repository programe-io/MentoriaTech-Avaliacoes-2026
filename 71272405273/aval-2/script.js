// Classe de controle e validação de regras de negócio do Projeto
class SistemaTarefas {
    constructor() {
        this.tarefas = [];
        this.proximoCodigo = 1;
    }

    cadastrarTarefa(titulo, prioridade) {
        if (!titulo || titulo.trim().length < 5) return false;
        if (![1, 2, 3].includes(prioridade)) return false;

        const novaTarefa = {
            codigo: this.proximoCodigo++,
            titulo: titulo.trim(),
            prioridade: prioridade,
            concluida: false
        };

        this.tarefas.push(novaTarefa);
        return true;
    }

    marcarComoConcluida(codigo) {
        const tarefa = this.tarefas.find(t => t.codigo === codigo);
        if (tarefa) {
            tarefa.concluida = true;
            return true;
        }
        return false;
    }

    alterarPrioridade(codigo, novaPrioridade) {
        if (![1, 2, 3].includes(novaPrioridade)) return false;
        const tarefa = this.tarefas.find(t => t.codigo === codigo);
        if (tarefa) {
            tarefa.prioridade = novaPrioridade;
            return true;
        }
        return false;
    }
}

// Inicializando a instância do sistema
const sistema = new SistemaTarefas();

// Mapeamento dos elementos do DOM da interface gráfica
const inputTitulo = document.getElementById('inputTitulo');
const selectPrioridade = document.getElementById('selectPrioridade');
const btnAdicionar = document.getElementById('btnAdicionar');
const listaTarefas = document.getElementById('listaTarefas');
const mensagemErro = document.getElementById('mensagemErro');

// Função de interface que redesenha a lista na tela
function renderizarTarefas() {
    listaTarefas.innerHTML = '';

    sistema.tarefas.forEach(tarefa => {
        const li = document.createElement('li');
        li.className = `tarefa-item ${tarefa.concluida ? 'concluida' : ''}`;

        const labelPrioridade = tarefa.prioridade === 1 ? 'Alta' : tarefa.prioridade === 2 ? 'Média' : 'Baixa';

        li.innerHTML = `
            <div class="tarefa-conteudo">
                <span class="prioridade-tag p-${tarefa.prioridade}">${labelPrioridade}</span>
                <span class="tarefa-texto">${tarefa.titulo}</span>
            </div>
            <div class="acoes">
                <select class="select-alterar-p" onchange="mudarPrioridadeTela(${tarefa.codigo}, this.value)">
                    <option value="1" ${tarefa.prioridade === 1 ? 'selected' : ''}>Alta</option>
                    <option value="2" ${tarefa.prioridade === 2 ? 'selected' : ''}>Média</option>
                    <option value="3" ${tarefa.prioridade === 3 ? 'selected' : ''}>Baixa</option>
                </select>
                ${!tarefa.concluida ? `<button class="btn-concluir" onclick="concluirTarefaTela(${tarefa.codigo})">✓</button>` : ''}
            </div>
        `;

        listaTarefas.appendChild(li);
    });
}

// Ouvinte de evento do botão para criar e validar dados inseridos pelo usuário
btnAdicionar.addEventListener('click', () => {
    const titulo = inputTitulo.value;
    const prioridade = parseInt(selectPrioridade.value);

    if (sistema.cadastrarTarefa(titulo, prioridade)) {
        mensagemErro.style.display = 'none';
        inputTitulo.value = '';
        renderizarTarefas();
    } else {
        mensagemErro.style.display = 'block';
    }
});

// Funções globais acionadas através das interações da lista visual
window.concluirTarefaTela = function(codigo) {
    sistema.marcarComoConcluida(codigo);
    renderizarTarefas();
};

window.mudarPrioridadeTela = function(codigo, novaPrioridade) {
    sistema.alterarPrioridade(codigo, parseInt(novaPrioridade));
    renderizarTarefas();
};
