
// Array que vai guardar todas as tarefas
let tarefas = [];
let geradorCodigo = 0;

// Função para validar os dados da tarefa
function validarDadosTarefa(titulo, prioridade) {

    if (titulo.length < 5) {
        throw new Error('O título deve ter no mínimo 5 caracteres');
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error('Informe uma prioridade entre 1 e 3');
    }
}

// Função para buscar uma tarefa pelo código
function buscarTarefa(codigoTarefa) {

    const tarefaBuscada = tarefas.find(
        t => t.codigo === codigoTarefa
    );

    if (!tarefaBuscada) {
        throw new Error('Código de tarefa não encontrado');
    }

    return tarefaBuscada;
}

// Função para cadastrar uma tarefa
function cadastrarTarefa(titulo, prioridade) {

    validarDadosTarefa(titulo, prioridade);

    let tarefa = {
        codigo: ++geradorCodigo,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);

    return tarefa;
}

// Função para alterar o status da tarefa
function alterarStatusTarefa(codigoTarefa) {

    let tarefa = buscarTarefa(codigoTarefa);

    tarefa.status = !tarefa.status;

    listarTarefas();
}

// Função para cadastrar pelo HTML
function adicionarTarefa() {

    try {
        let titulo = document.getElementById('titulo').value.trim();

        let prioridade = Number(
            document.getElementById('prioridade').value
        );

        cadastrarTarefa(titulo, prioridade);

        document.getElementById('titulo').value = '';

        listarTarefas();

    } catch (erro) {
        alert(erro.message);
    }
}

// Função para listar todas as tarefas
function listarTarefas() {

    let lista = document.getElementById('listaTarefas');

    lista.innerHTML = '';

    tarefas.forEach(tarefa => {

        let div = document.createElement('div');

        div.className = 'tarefa';

        div.innerHTML = `
            <div class="info ${!tarefa.status ? 'concluida' : ''}">
                <strong>${tarefa.titulo}</strong><br>
                Código: ${tarefa.codigo}<br>
                Prioridade: ${tarefa.prioridade}<br>
                Status: ${tarefa.status ? 'Pendente' : 'Concluída'}
            </div>

            <button onclick="alterarStatusTarefa(${tarefa.codigo})">
                ${tarefa.status ? 'Concluir' : 'Reabrir'}
            </button>
        `;

        lista.appendChild(div);
    });
}
