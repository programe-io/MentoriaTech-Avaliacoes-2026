/* Array que vai guardar o conjunto de todas as tarefas */
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

    const tarefaBuscada = tarefas.find(
        t => t.codigo === codigoTarefa
    );

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


function concluirTarefa(codigo) {

    let tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error('Tarefa já estava como concluída');
    }

    tarefa.status = false;
}


function alterarPrioridade(codigo, novaPrioridade) {

    let tarefa = buscarTarefa(codigo);

    if (novaPrioridade < 1 || novaPrioridade > 3) {
        throw new Error('Informe uma prioridade entre 1 e 3');
    }

    tarefa.prioridade = novaPrioridade;
}


/* Função usada pelo HTML para cadastrar uma tarefa */
function cadastrar() {

    const titulo = document.getElementById('titulo').value;
    const prioridade = Number(
        document.getElementById('prioridade').value
    );

    try {

        cadastrarTarefa(titulo, prioridade);

        document.getElementById('titulo').value = '';

        atualizarLista();

    } catch (erro) {

        alert(erro.message);

    }
}


/* Mostra as tarefas na tela */
function atualizarLista() {

    const lista = document.getElementById('listaTarefas');

    lista.innerHTML = '';

    if (tarefas.length === 0) {

        lista.innerHTML =
            '<p class="vazio">Nenhuma tarefa cadastrada.</p>';

        return;
    }

    tarefas.forEach(tarefa => {

        const div = document.createElement('div');

        div.classList.add('tarefa');

        if (tarefa.status === false) {
            div.classList.add('concluida');
        }

        let textoStatus = tarefa.status
            ? 'Pendente'
            : 'Concluída';

        div.innerHTML = `
            <h3>${tarefa.titulo}</h3>

            <p>
                <strong>Código:</strong>
                ${tarefa.codigo}
            </p>

            <p>
                <strong>Prioridade:</strong>
                ${tarefa.prioridade}
            </p>

            <p>
                <strong>Status:</strong>
                ${textoStatus}
            </p>

            <div class="acoes">

                ${
                    tarefa.status
                    ? `<button 
                        class="btn-concluir"
                        onclick="concluir(${tarefa.codigo})">
                        Concluir
                       </button>`
                    : ''
                }

                <button
                    class="btn-prioridade"
                    onclick="mudarPrioridade(${tarefa.codigo})">
                    Alterar prioridade
                </button>

            </div>
        `;

        lista.appendChild(div);
    });
}


/* Concluir tarefa pela tela */
function concluir(codigo) {

    try {

        concluirTarefa(codigo);

        atualizarLista();

    } catch (erro) {

        alert(erro.message);

    }
}


/* Alterar prioridade pela tela */
function mudarPrioridade(codigo) {

    const novaPrioridade = Number(
        prompt('Digite a nova prioridade (1, 2 ou 3):')
    );

    try {

        alterarPrioridade(codigo, novaPrioridade);

        atualizarLista();

    } catch (erro) {

        alert(erro.message);

    }
}