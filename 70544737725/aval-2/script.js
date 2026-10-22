// Array para armazenar o estado das tarefas na memória interna da aplicação
let tarefas = [];

// Elementos da interface mapeados do HTML
const form = document.getElementById('todo-form');
const inputTarefa = document.getElementById('todo-input');
const listaUl = document.getElementById('lista-tarefas');
const contadorElemento = document.getElementById('contador-tarefas');

// Evento disparado ao tentar cadastrar uma nova tarefa
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário (recarregar página)

    const texto = inputTarefa.value.trim();

    // Cria a estrutura do objeto tarefa
    const novaTarefa = {
        id: Date.now(), // Gera um identificador único baseado no timestamp atual
        texto: texto,
        concluida: false
    };

    // Insere a nova tarefa no início do array e atualiza o visual da tela
    tarefas.unshift(novaTarefa);
    renderizarTarefas();

    // Limpa o campo de digitação e foca nele novamente
    inputTarefa.value = '';
    inputTarefa.focus();
});

// Função responsável por desenhar a lista atualizada no HTML
function renderizarTarefas() {
    listaUl.innerHTML = ''; // Esvazia a lista antiga para reconstruir com os dados atuais

    tarefas.forEach(tarefa => {
        // Cria dinamicamente o elemento de lista <li>
        const li = document.createElement('li');
        li.className = `tarefa-item ${tarefa.concluida ? 'concluida' : ''}`;

        // Constrói a estrutura interna do item da lista
        li.innerHTML = `
            <span class="texto-tarefa" onclick="alternarConclusao(${tarefa.id})">${tarefa.texto}</span>
            <button class="btn-excluir" onclick="removerTarefa(${tarefa.id})">Excluir</button>
        `;

        listaUl.appendChild(li);
    });

    atualizarContador();
}

// Função para marcar/desmarcar tarefas concluídas ao clicar no texto
function alternarConclusao(id) {
    tarefas = tarefas.map(tarefa => {
        if (tarefa.id === id) {
            return { ...tarefa, concluida: !tarefa.concluida };
        }
        return tarefa;
    });
    renderizarTarefas();
}

// Função para remover uma tarefa através do botão excluir
function removerTarefa(id) {
    // Filtra removendo o item correspondente ao ID selecionado
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    renderizarTarefas();
}

// Função auxiliar para recalcular e exibir a quantidade de tarefas restantes
function atualizarContador() {
    const pendentes = tarefas.filter(tarefa => !tarefa.concluida).length;
    
    if (pendentes === 1) {
        contadorElemento.textContent = "1 tarefa pendente";
    } else {
        contadorElemento.textContent = `${pendentes} tarefas pendentes`;
    }
}
