
/* Array que guarda todas as tarefas */
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

    if (!tarefa.status) {
        throw new Error('Tarefa já estava como concluída');
    }

    tarefa.status = false;
}

function alterarPrioridade(codigo, novaPrioridade) {
    let tarefa = buscarTarefa(codigo);

    validarDadosTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;
}

/* Renderização das tarefas na tela */
function renderizarTarefas() {
    const lista = document.getElementById('listaTarefas');

    lista.innerHTML = '';

    if (tarefas.length === 0) {
        lista.innerHTML =
            '<p class="vazio">Nenhuma tarefa cadastrada.</p>';
        return;
    }

    tarefas.forEach(tarefa => {

        const card = document.createElement('div');

        card.className = tarefa.status
            ? 'tarefa'
            : 'tarefa concluida';

        const conteudo = document.createElement('div');

        const titulo = document.createElement('h3');
        titulo.textContent = tarefa.titulo;

        const codigo = document.createElement('p');
        codigo.textContent = `Código: ${tarefa.codigo}`;

        const prioridade = document.createElement('p');

        const nomesPrioridade = {
            1: 'Baixa',
            2: 'Média',
            3: 'Alta'
        };

        prioridade.textContent =
            `Prioridade: ${nomesPrioridade[tarefa.prioridade]}`;

        prioridade.className =
            `prioridade-${tarefa.prioridade}`;

        const status = document.createElement('p');

        status.textContent = tarefa.status
            ? 'Status: Pendente'
            : 'Status: Concluída';

        conteudo.append(titulo, codigo, prioridade, status);

        const acoes = document.createElement('div');
        acoes.className = 'acoes';

        const botaoConcluir = document.createElement('button');

        botaoConcluir.textContent = tarefa.status
            ? 'Concluir'
            : 'Concluída';

        botaoConcluir.className = 'btn-concluir';
        botaoConcluir.disabled = !tarefa.status;

        botaoConcluir.addEventListener('click', () => {
            try {
                concluirTarefa(tarefa.codigo);
                renderizarTarefas();
            } catch (erro) {
                alert(erro.message);
            }
        });

        const botaoPrioridade = document.createElement('button');

        botaoPrioridade.textContent = 'Alterar prioridade';
        botaoPrioridade.className = 'btn-prioridade';

        botaoPrioridade.addEventListener('click', () => {
            const novaPrioridade = Number(
                prompt('Informe a nova prioridade (1, 2 ou 3):')
            );

            if (!Number.isInteger(novaPrioridade)) {
                alert('Informe uma prioridade válida.');
                return;
            }

            try {
                alterarPrioridade(tarefa.codigo, novaPrioridade);
                renderizarTarefas();
            } catch (erro) {
                alert(erro.message);
            }
        });

        acoes.append(botaoConcluir, botaoPrioridade);

        card.append(conteudo, acoes);

        lista.appendChild(card);
    });
}

/* Cadastro pelo formulário HTML */
const formulario = document.getElementById('formTarefa');

formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    const titulo = document.getElementById('titulo').value.trim();

    const prioridade = Number(
        document.getElementById('prioridade').value
    );

    const mensagem = document.getElementById('mensagem');

    try {
        cadastrarTarefa(titulo, prioridade);

        mensagem.textContent = '';

        formulario.reset();

        renderizarTarefas();

    } catch (erro) {
        mensagem.textContent = erro.message;
    }
});

/* Exibe a lista inicial */
renderizarTarefas();
