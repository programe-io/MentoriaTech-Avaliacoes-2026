// ==========================================================================
// SISTEMA DE GERENCIAMENTO DE TAREFAS (TO-DO LIST)
// ==========================================================================

// 1. Seleção de elementos do DOM (HTML)
const inputTarefa = document.getElementById('novaTarefa');
const botaoAdicionar = document.getElementById('btnAdicionar');
const listaTarefasUL = document.getElementById('listaTarefas');

// 2. Estado da Aplicação (Array que vai guardar as tarefas)
// Tentamos buscar do localStorage, se não existir, começa vazio []
let tarefas = JSON.parse(localStorage.getItem('tarefas_app')) || [];

// 3. Função para renderizar (desenhar) as tarefas na tela
function renderizarTarefas() {
    // Limpa a lista antes de desenhar para não duplicar
    listaTarefasUL.innerHTML = '';

    // Percorre o array de tarefas
    tarefas.forEach((tarefa, index) => {
        // Cria o elemento de lista (li)
        const li = document.createElement('li');
        li.className = `tarefa-item ${tarefa.concluida ? 'concluida' : ''}`;

        // Cria o texto da tarefa
        const spanTexto = document.createElement('span');
        spanTexto.innerText = tarefa.texto;
        // Evento: Se clicar no texto, alterna entre concluída ou não
        spanTexto.addEventListener('click', () => alternarTarefa(index));

        // Cria o botão de deletar
        const botaoDeletar = document.createElement('button');
        botaoDeletar.innerText = '❌';
        botaoDeletar.className = 'btn-deletar';
        botaoDeletar.addEventListener('click', (e) => {
            e.stopPropagation(); // Impede de ativar o clique do spanTexto
            deletarTarefa(index);
        });

        // Junta os elementos dentro do <li>
        li.appendChild(spanTexto);
        li.appendChild(botaoDeletar);

        // Adiciona o <li> dentro da lista principal (<ul>)
        listaTarefasUL.appendChild(li);
    });

    // Salva o estado atualizado no armazenamento do navegador
    salvarNoLocalStorage();
}

// 4. Função para adicionar uma nova tarefa
function adicionarTarefa() {
    const textoTarefa = inputTarefa.value.trim();

    // Validação básica: não deixa adicionar se estiver vazio
    if (textoTarefa === '') {
        alert('Por favor, digite uma tarefa válida!');
        return;
    }

    // Cria o objeto da nova tarefa
    const novaTarefa = {
        texto: textoTarefa,
        concluida: false
    };

    // Adiciona no nosso array
    tarefas.push(novaTarefa);

    // Limpa o campo de entrada (input)
    inputTarefa.value = '';

    // Atualiza a tela
    renderizarTarefas();
}

// 5. Função para alternar o status da tarefa (Concluída / Pendente)
function alternarTarefa(index) {
    tarefas[index].concluida = !tarefas[index].concluida;
    renderizarTarefas();
}

// 6. Função para deletar uma tarefa
function deletarTarefa(index) {
    // Remove 1 elemento a partir da posição (index) informada
    tarefas.splice(index, 1);
    renderizarTarefas();
}

// 7. Função para salvar os dados no LocalStorage do navegador
function salvarNoLocalStorage() {
    // Convertemos o array para String (JSON) pois o localStorage só aceita texto
    localStorage.setItem('tarefas_app', JSON.stringify(tarefas));
}

// ==========================================================================
// CONFIGURAÇÃO DOS ESCUTADORES DE EVENTOS (EVENT LISTENERS)
// ==========================================================================

// Escuta o clique do botão adicionar
botaoAdicionar.addEventListener('click', adicionarTarefa);

// Escuta a tecla 'Enter' dentro do campo de input para facilitar o envio
inputTarefa.addEventListener('keypress', (evento) => {
    if (evento.key === 'Enter') {
        adicionarTarefa();
    }
});

// Renderiza as tarefas pela primeira vez ao carregar a página
renderizarTarefas();