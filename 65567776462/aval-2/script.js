// Array para armazenar as tarefas do gerenciador
let tarefas = [];

const form = document.getElementById('form-tarefa');
const inputDescricao = document.getElementById('descricao');
const selectImportancia = document.getElementById('importancia');
const listaTarefasDiv = document.getElementById('lista-tarefas');

// Evento ao cadastrar nova tarefa
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const descricao = inputDescricao.value.trim();
    const importancia = selectImportancia.value;

    if (!descricao || !importancia) return;

    const novaTarefa = {
        id: Date.now(), // Identificador único baseado no tempo
        descricao: descricao,
        importancia: importancia,
        concluida: false
    };

    tarefas.push(novaTarefa);
    
    // Organiza as tarefas por prioridade automaticamente (Alta > Média > Baixa)
    ordenarTarefas();

    form.reset();
    atualizarTela();
});

// Função para ordenar prioridades (Alta vem primeiro)
function ordenarTarefas() {
    const peso = { Alta: 1, Media: 2, Baixa: 3 };
    tarefas.sort((a, b) => peso[a.importancia] - peso[b.importancia]);
}

// Função para alternar o status de conclusão da tarefa
function alternarConclusao(id) {
    const tarefa = tarefas.find(t => t.id === id);
    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        atualizarTela();
    }
}

// Função para remover uma tarefa
function removerTarefa(id) {
    tarefas = tarefas.filter(t => t.id !== id);
    atualizarTela();
}

// Função para renderizar a interface visual
function atualizarTela() {
    listaTarefasDiv.innerHTML = "";

    if (tarefas.length === 0) {
        listaTarefasDiv.innerHTML = `<p class="vazio">Nenhuma tarefa cadastrada no momento. Aproveite o dia!</p>`;
        return;
    }

    tarefas.forEach(t => {
        const divItem = document.createElement('div');
        divItem.className = `tarefa-item ${t.importancia.toLowerCase()} ${t.concluida ? 'concluida' : ''}`;
        
        let rotuloImportancia = t.importancia === 'Media' ? 'Média' : t.importancia;

        divItem.innerHTML = `
            <div class="tarefa-info">
                <input type="checkbox" ${t.concluida ? 'checked' : ''} onclick="alternarConclusao(${t.id})">
                <span class="tarefa-texto">${t.descricao}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
                <span class="badge ${t.importancia.toLowerCase()}">${rotuloImportancia}</span>
                <button class="btn-remover" onclick="removerTarefa(${t.id})" title="Excluir tarefa">🗑️</button>
            </div>
        `;
        
        listaTarefasDiv.appendChild(divItem);
    });
}