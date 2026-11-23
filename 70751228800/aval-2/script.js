let tarefas = [];
let proximoCodigo = 1;

const form = document.getElementById('formTarefa');
const lista = document.getElementById('listaTarefas');

form.addEventListener('submit', function(evento) {
    evento.preventDefault();
    
    const titulo = document.getElementById('titulo').value.trim();
    const prioridade = parseInt(document.getElementById('prioridade').value);

    if (titulo.length < 5) {
        alert('O título deve ter no mínimo 5 caracteres.');
        return;
    }

    if (isNaN(prioridade) || prioridade < 1 || prioridade > 3) {
        alert('A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).');
        return;
    }

    tarefas.push({
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        status: 'Pendente'
    });

    form.reset();
    listarTarefas();
});

function listarTarefas() {
    lista.innerHTML = '';

    tarefas.forEach(tarefa => {
        const linha = document.createElement('tr');
        const classeStatus = tarefa.status === 'Concluída' ? 'concluida' : '';

        linha.innerHTML = `
            <td>${tarefa.codigo}</td>
            <td class="${classeStatus}">${tarefa.titulo}</td>
            <td>${tarefa.prioridade}</td>
            <td>${tarefa.status}</td>
            <td>
                <button class="btn-acao" onclick="concluirTarefa(${tarefa.codigo})">Concluir</button>
                <button class="btn-acao" onclick="alterarPrioridade(${tarefa.codigo})">Prioridade</button>
            </td>
        `;
        lista.appendChild(linha);
    });
}

function concluirTarefa(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);
    if (tarefa) {
        tarefa.status = 'Concluída';
        listarTarefas();
    }
}

function alterarPrioridade(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);
    if (tarefa) {
        const novaPrioridade = parseInt(prompt('Digite a nova prioridade (1 a 3):'));
        if (novaPrioridade >= 1 && novaPrioridade <= 3) {
            tarefa.prioridade = novaPrioridade;
            listarTarefas();
        } else {
            alert('Prioridade inválida! Digite um valor entre 1 e 3.');
        }
    }
}