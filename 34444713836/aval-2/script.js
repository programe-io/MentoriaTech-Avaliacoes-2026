// Array que armazena todas as tarefas
const tarefas = [];

let proximoCodigo = 0;

// Elementos HTML
const form = document.querySelector('#formTarefa');
const campoTitulo = document.querySelector('#titulo');
const campoPrioridade = document.querySelector('#prioridade');
const lista = document.querySelector('#listaTarefas');
const filtroStatus = document.querySelector('#filtroStatus');
const totalTarefas = document.querySelector('#totalTarefas');
const mensagem = document.querySelector('#mensagem');

// Validar os dados da tarefa
function validarDadosDaTarefa(titulo, prioridade) {

    if (typeof titulo !== 'string' || titulo.trim().length < 5) {
        throw new Error(
            'O título deve possuir no mínimo 5 caracteres.'
        );
    }

    const prioridadeNumero = Number(prioridade);

    if (
        prioridadeNumero < 1 ||
        prioridadeNumero > 3 ||
        !Number.isInteger(prioridadeNumero)
    ) {
        throw new Error(
            'A prioridade deve estar entre 1 e 3.'
        );
    }
}

// Buscar uma tarefa pelo código
function buscarTarefa(codigo) {

    const tarefa = tarefas.find(
        item => item.codigo === Number(codigo)
    );

    if (!tarefa) {
        throw new Error(
            'Código de tarefa não encontrado.'
        );
    }

    return tarefa;
}

// Cadastrar uma nova tarefa
function cadastrarTarefa(titulo, prioridade) {

    validarDadosDaTarefa(titulo, prioridade);

    proximoCodigo++;

    const novaTarefa = {
        codigo: proximoCodigo,
        titulo: titulo.trim(),
        prioridade: Number(prioridade),
        status: true
    };

    tarefas.push(novaTarefa);

    listarTarefas();

    return novaTarefa;
}

// Listar todas as tarefas
function listarTarefas() {

    totalTarefas.textContent = tarefas.length;

    const filtro = filtroStatus.value;

    const tarefasExibidas = tarefas.filter(tarefa => {

        if (filtro === 'ativas') {
            return tarefa.status === true;
        }

        if (filtro === 'concluidas') {
            return tarefa.status === false;
        }

        return true;
    });

    if (tarefasExibidas.length === 0) {

        lista.innerHTML = `
            <div class="vazio">
                Nenhuma tarefa para exibir.
            </div>
        `;

        return tarefas;
    }

    lista.innerHTML = tarefasExibidas.map(tarefa => {

        const prioridadeNome = [
            'Alta',
            'Média',
            'Baixa'
        ][tarefa.prioridade - 1];

        const statusTexto = tarefa.status
            ? 'Em execução'
            : 'Concluída';

        return `
            <article class="tarefa ${tarefa.status ? '' : 'concluida'}">

                <div class="tarefa-info">

                    <p class="tarefa-titulo">
                        ${escaparHTML(tarefa.titulo)}
                    </p>

                    <div class="meta">

                        <span class="etiqueta">
                            Código #${tarefa.codigo}
                        </span>

                        <span class="etiqueta prioridade-${tarefa.prioridade}">
                            Prioridade ${tarefa.prioridade} · ${prioridadeNome}
                        </span>

                        <span class="etiqueta ${tarefa.status ? '' : 'status-concluida'}">
                            ${statusTexto}
                        </span>

                    </div>

                </div>

                <div class="acoes">

                    ${tarefa.status ? `
                        <button
                            class="botao botao-secundario botao-concluir"
                            data-acao="concluir"
                            data-codigo="${tarefa.codigo}">
                            Concluir
                        </button>
                    ` : ''}

                    <button
                        class="botao botao-secundario"
                        data-acao="prioridade"
                        data-codigo="${tarefa.codigo}">
                        Alterar prioridade
                    </button>

                </div>

            </article>
        `;

    }).join('');

    return tarefas;
}

// Concluir uma tarefa
function concluirTarefa(codigo) {

    const tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error(
            'Esta tarefa já está concluída.'
        );
    }

    tarefa.status = false;

    listarTarefas();
}

// Alterar a prioridade
function alterarPrioridade(codigo, novaPrioridade) {

    const tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(
        tarefa.titulo,
        novaPrioridade
    );

    tarefa.prioridade = Number(novaPrioridade);

    listarTarefas();
}

// Evitar inserção de HTML pelo título
function escaparHTML(texto) {

    return texto.replace(/[&<>"']/g, caractere => ({

        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'

    })[caractere]);

}

// Exibir mensagens na tela
function mostrarMensagem(texto, erro = false) {

    mensagem.textContent = texto;

    mensagem.classList.toggle(
        'erro',
        erro
    );
}

// Evento de cadastro
form.addEventListener('submit', evento => {

    evento.preventDefault();

    try {

        const tarefa = cadastrarTarefa(
            campoTitulo.value,
            campoPrioridade.value
        );

        form.reset();

        campoPrioridade.value = '2';

        campoTitulo.focus();

        mostrarMensagem(
            `Tarefa #${tarefa.codigo} cadastrada com sucesso.`
        );

    } catch (erro) {

        mostrarMensagem(
            erro.message,
            true
        );

    }

});

// Eventos dos botões das tarefas
lista.addEventListener('click', evento => {

    const botao = evento.target.closest(
        'button[data-acao]'
    );

    if (!botao) return;

    const codigo = Number(
        botao.dataset.codigo
    );

    try {

        if (botao.dataset.acao === 'concluir') {

            concluirTarefa(codigo);

            mostrarMensagem(
                `Tarefa #${codigo} concluída.`
            );

        } else if (botao.dataset.acao === 'prioridade') {

            const novaPrioridade = prompt(
                'Informe a nova prioridade (1 = alta, 2 = média, 3 = baixa):'
            );

            if (novaPrioridade === null) return;

            alterarPrioridade(
                codigo,
                novaPrioridade.trim()
            );

            mostrarMensagem(
                `Prioridade da tarefa #${codigo} alterada.`
            );

        }

    } catch (erro) {

        mostrarMensagem(
            erro.message,
            true
        );

    }

});

// Evento do filtro
filtroStatus.addEventListener(
    'change',
    listarTarefas
);

// Primeira renderização
listarTarefas();