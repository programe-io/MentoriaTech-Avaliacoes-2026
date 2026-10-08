/* Array que vai guardar o conjunto de todas as tarefas */
let tarefas = [];


function validarDadosTarefas(titulo, prioridade) {

    if (titulo.length < 5) {
        throw new Error('O título deve ter no mínimo 5 caracteres');
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error('Informe uma prioridade entre 1 e 3');
    }
}


/* Adicionar uma nova tarefa */
function adicionarTarefa(titulo, prioridade) {

    validarDadosTarefas(titulo, prioridade);

    const tarefa = {
        id: Date.now(),
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    mostrarTarefas();
}


/* Mostrar as tarefas na tela */
function mostrarTarefas() {

    const lista = document.getElementById('listaTarefas');

    lista.innerHTML = '';

    tarefas.forEach(function(tarefa) {

        const item = document.createElement('li');

        item.classList.add('tarefa');

        if (tarefa.concluida) {
            item.classList.add('concluida');
        }

        item.innerHTML = `
            <span onclick="concluirTarefa(${tarefa.id})">
                ${tarefa.titulo} 
                - Prioridade: ${tarefa.prioridade}
            </span>

            <button 
                class="excluir"
                onclick="excluirTarefa(${tarefa.id})">
                Excluir
            </button>
        `;

        lista.appendChild(item);
    });
}


/* Marcar tarefa como concluída */
function concluirTarefa(id) {

    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.id === id;
    });

    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
    }

    mostrarTarefas();
}


/* Excluir tarefa */
function excluirTarefa(id) {

    tarefas = tarefas.filter(function(tarefa) {
        return tarefa.id !== id;
    });

    mostrarTarefas();
}


/* Evento do formulário */
document.getElementById('formTarefa').addEventListener('submit', function(event) {

    event.preventDefault();

    const titulo = document.getElementById('titulo').value.trim();

    const prioridade = Number(
        document.getElementById('prioridade').value
    );

    const mensagem = document.getElementById('mensagem');

    try {

        adicionarTarefa(titulo, prioridade);

        mensagem.textContent = 'Tarefa adicionada com sucesso!';
        mensagem.style.color = 'green';

        document.getElementById('titulo').value = '';

    } catch (erro) {

        mensagem.textContent = erro.message;
        mensagem.style.color = 'red';
    }
});