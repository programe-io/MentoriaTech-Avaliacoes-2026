
/* Lista que vai guardar todas as tarefas */
let tarefas = [];
let geradorCodigo = 0;

function validarDadosTarefa(titulo, prioridade) {

    if (titulo.length < 5) {
        throw new Error('O título deve ter no mínimo 5 caracteres');
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error('Informe uma prioridade entre 1 e 3');
    }
}

function buscarTarefa(codigoTarefa) {

    const tarefaBuscada = tarefas.find(t => t.codigo === codigoTarefa);

    if (!tarefaBuscada) {
        throw new Error('Código de tarefa não encontrado');
    }

    return tarefaBuscada;
}

function cadastrarTarefa(titulo, prioridade) {

    validarDadosTarefa(titulo, prioridade);

    let tarefa = {
        codigo: ++geradorCodigo,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);
}

function listarTarefas() {
    return tarefas;
}

/* Concluir tarefa */
function concluirTarefa(codigo) {

    let tarefa = buscarTarefa(codigo);

    tarefa.status = false;
}

/* Alterar prioridade */
function alterarPrioridade(codigo, novaPrioridade) {

    let tarefa = buscarTarefa(codigo);

    validarDadosTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;
}

/* Cadastrar pelo HTML */
function adicionarTarefa() {

    try {
        let titulo = document.getElementById('titulo').value;
        let prioridade = Number(document.getElementById('prioridade').value);

        cadastrarTarefa(titulo, prioridade);

        document.getElementById('titulo').value = '';

        mostrarTarefas();

    } catch (erro) {
        alert(erro.message);
    }
}

/* Mostrar tarefas na tela */
function mostrarTarefas() {

    let lista = document.getElementById('listaTarefas');

    lista.innerHTML = '';

    tarefas.forEach(tarefa => {

        let div = document.createElement('div');

        div.className = 'tarefa';

        div.innerHTML = `
            <p class="${tarefa.status ? '' : 'concluida'}">
                <strong>Código:</strong> ${tarefa.codigo}
            </p>

            <p class="${tarefa.status ? '' : 'concluida'}">
                <strong>Título:</strong> ${tarefa.titulo}
            </p>

            <p>
                <strong>Prioridade:</strong> ${tarefa.prioridade}
            </p>

            <p>
                <strong>Status:</strong>
                ${tarefa.status ? 'Pendente' : 'Concluída'}
            </p>

            <div class="acoes">
                <button class="concluir"
                    onclick="finalizar(${tarefa.codigo})">
                    Concluir
                </button>

                <button class="alterar"
                    onclick="mudarPrioridade(${tarefa.codigo})">
                    Alterar prioridade
                </button>
            </div>
        `;

        lista.appendChild(div);
    });
}

/* Botão de concluir */
function finalizar(codigo) {

    try {
        concluirTarefa(codigo);
        mostrarTarefas();

    } catch (erro) {
        alert(erro.message);
    }
}

/* Botão de alterar prioridade */
function mudarPrioridade(codigo) {

    try {
        let novaPrioridade = Number(
            prompt('Digite a nova prioridade (1, 2 ou 3):')
        );

        alterarPrioridade(codigo, novaPrioridade);

        mostrarTarefas();

    } catch (erro) {
        alert(erro.message);
    }
}

mostrarTarefas();
