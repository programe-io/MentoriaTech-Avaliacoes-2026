const form = document.getElementById('form-tarefa');
const input = document.getElementById('input-tarefa');
const lista = document.getElementById('lista-tarefas');

// Carrega tarefas salvas ou inicia um array vazio
let tarefas = JSON.parse(localStorage.getItem('minhasTarefas')) || [];

function salvarERenderizar() {
    localStorage.setItem('minhasTarefas', JSON.stringify(tarefas));
    lista.innerHTML = '';

    tarefas.forEach((tarefa, index) => {
        const li = document.createElement('li');
        if (tarefa.concluida) li.classList.add('concluida');

        const span = document.createElement('span');
        span.textContent = tarefa.texto;
        span.onclick = () => alternarStatus(index);

        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Excluir';
        btnRemover.className = 'btn-remover';
        btnRemover.onclick = () => removerTarefa(index);

        li.appendChild(span);
        li.appendChild(btnRemover);
        lista.appendChild(li);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const texto = input.value.trim();
    if (texto) {
        tarefas.push({ texto, concluida: false });
        input.value = '';
        salvarERenderizar();
    }
});

function alternarStatus(index) {
    tarefas[index].concluida = !tarefas[index].concluida;
    salvarERenderizar();
}

function removerTarefa(index) {
    tarefas.splice(index, 1);
    salvarERenderizar();
}

// Renderiza a lista ao carregar a página
salvarERenderizar();