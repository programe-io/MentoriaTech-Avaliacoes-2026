
/* Array que vai guardar o conjunto de todas as tarefas */
let tarefas = [];
let geradorCodigo = 0;

function validarDadosTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
        throw new Error('O título deve ter no mínimo cinco caracteres');
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

    let novaTarefa = {
        codigo: ++geradorCodigo,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(novaTarefa);
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

    validarDadosTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;
}

/* Integração com o HTML */

const formulario = document.getElementById('formTarefa');
const lista = document.getElementById('listaTarefas');

function mostrarTarefas() {
    lista.innerHTML = '';

    if (listarTarefas().length === 0) {
        lista.innerHTML = '<p class="vazio">Nenhuma tarefa cadastrada.</p>';
        return;
    }

    listarTarefas().forEach(tarefa => {
        const elemento = document.createElement('div');
        elemento.className = 'tarefa';

        if (tarefa.status === false) {
            elemento.classList.add('concluida');
        }

        const titulo = document.createElement('h3');
        titulo.textContent = tarefa.titulo;

        const codigo = document.createElement('p');
        codigo.textContent = 'Código: ' + tarefa.codigo;

        const prioridade = document.createElement('p');
        const nomesPrioridade = ['Baixa', 'Média', 'Alta'];

        prioridade.textContent = 'Prioridade: ' + nomesPrioridade[tarefa.prioridade - 1];

        const status = document.createElement('p');
        status.textContent = tarefa.status ? 'Status: Pendente' : 'Status: Concluída';

        const acoes = document.createElement('div');
        acoes.className = 'acoes';

        const botaoConcluir = document.createElement('button');
        botaoConcluir.textContent = tarefa.status ? 'Concluir tarefa' : 'Concluída';
        botaoConcluir.disabled = !tarefa.status;

        botaoConcluir.addEventListener('click', function () {
            try {
                concluirTarefa(tarefa.codigo);
                mostrarTarefas();
            } catch (erro) {
                alert(erro.message);
            }
        });

        const botaoAlterar = document.createElement('button');
        botaoAlterar.textContent = 'Alterar prioridade';

        botaoAlterar.addEventListener('click', function () {
            const novaPrioridade = Number(
                prompt('Digite a nova prioridade:\n1 - Baixa\n2 - Média\n3 - Alta')
            );

            if (!Number.isInteger(novaPrioridade)) {
                return;
            }

            try {
                alterarPrioridade(tarefa.codigo, novaPrioridade);
                mostrarTarefas();
            } catch (erro) {
                alert(erro.message);
            }
        });

        acoes.appendChild(botaoConcluir);
        acoes.appendChild(botaoAlterar);

        elemento.appendChild(titulo);
        elemento.appendChild(codigo);
        elemento.appendChild(prioridade);
        elemento.appendChild(status);
        elemento.appendChild(acoes);

        lista.appendChild(elemento);
    });
}

/* Evento de cadastro */

formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    const titulo = document.getElementById('titulo').value.trim();
    const prioridade = Number(document.getElementById('prioridade').value);

    try {
        cadastrarTarefa(titulo, prioridade);
        formulario.reset();
        mostrarTarefas();
    } catch (erro) {
        alert(erro.message);
    }
});

/* Exibir tarefas ao abrir a página */
mostrarTarefas();
