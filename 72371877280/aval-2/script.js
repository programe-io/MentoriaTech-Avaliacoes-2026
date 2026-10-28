// Selecionando os elementos do DOM
const inputTarefa = document.getElementById('input-tarefa');
const btnAdicionar = document.getElementById('btn-adicionar');
const listaTarefas = document.getElementById('lista-tarefas');
const contadorTarefas = document.getElementById('contador-tarefas');

// Array principal que armazena as tarefas
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

// Função para salvar as tarefas no LocalStorage do navegador
function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Função para atualizar o contador de tarefas pendentes/totais
function atualizarContador() {
    const total = tarefas.length;
    if (total === 0) {
        contadorTarefas.textContent = "Nenhuma tarefa cadastrada";
    } else {
        const concluidas = tarefas.filter(t => t.concluida).length;
        contadorTarefas.textContent = `${concluidas} de ${total} tarefas concluídas`;
    }
}

// Função para renderizar as tarefas na tela
function renderizarTarefas() {
    listaTarefas.innerHTML = '';

    tarefas.forEach((tarefa, index) => {
        const li = document.createElement('li');
        if (tarefa.concluida) {
            li.classList.add('concluida');
        }

        li.innerHTML = `
            <span class="tarefa-texto" onclick="alternarTarefa(${index})">${tarefa.texto}</span>
            <div class="acoes">
                <button class="btn-check" onclick="alternarTarefa(${index})" title="Concluir/Desfazer">
                    <i class="fa-solid ${tarefa.concluida ? 'fa-rotate-left' : 'fa-check'}"></i>
                </button>
                <button class="btn-delete" onclick="removerTarefa(${index})" title="Excluir">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;

        listaTarefas.appendChild(li);
    });

    atualizarContador();
}

// Função para adicionar uma nova tarefa
function adicionarTarefa() {
    const textoTrim = inputTarefa.value.trim();

    if (textoTrim === "") {
        alert("Por favor, digite uma tarefa válida!");
        return;
    }

    tarefas.push({
        texto: textoTrim,
        concluida: false
    });

    inputTarefa.value = '';
    inputTarefa.focus();

    salvarTarefas();
    renderizarTarefas();
}

// Função para alternar o status da tarefa (concluída / não concluída)
function alternarTarefa(index) {
    tarefas[index].concluida = !tarefas[index].concluida;
    salvarTarefas();
    renderizarTarefas();
}

// Função para remover uma tarefa específica
function removerTarefa(index) {
    tarefas.splice(index, 1);
    salvarTarefas();
    renderizarTarefas();
}

// Event Listeners (Ouvintes de Eventos)
btnAdicionar.addEventListener('click', adicionarTarefa);

// Adicionar tarefa apertando a tecla "Enter" no teclado
inputTarefa.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        adicionarTarefa();
    }
});

// Inicializar a aplicação carregando as tarefas salvas
renderizarTarefas();