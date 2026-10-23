// 3. Armazenamento das tarefas com arrays
let tarefas = [];

// Elementos da DOM
const formTarefa = document.getElementById('form-tarefa');
const inputTitulo = document.getElementById('titulo');
const selectPrioridade = document.getElementById('prioridade');
const listaTarefasElement = document.getElementById('lista-tarefas');
const inputBusca = document.getElementById('input-busca');
const btnBusca = document.getElementById('btn-busca');

// 4. Organização do algoritmo em funções e 12. Responsabilidades
// Função para gerar ID automático (Item 7)
function gerarIdAutomatico() {
    return tarefas.length > 0 ? Math.max(...tarefas.map(t => t.id)) + 1 : 1;
}

// Função para cadastrar e modelar uma tarefa (Item 6)
function cadastrarTarefa(titulo, prioridade) {
    // 5. Validação dos dados da tarefa
    if (!titulo.trim()) {
        alert("O título da tarefa não pode estar vazio!");
        return;
    }

    const novaTarefa = {
        id: gerarIdAutomatico(),
        titulo: titulo.trim(),
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(novaTarefa);
    atualizarInterface();
}

// 8. Listagem das tarefas cadastradas
function atualizarInterface(listaParaExibir = tarefas) {
    listaTarefasElement.innerHTML = '';

    if (listaParaExibir.length === 0) {
        listaTarefasElement.innerHTML = '<li style="text-align:center; color:#718096;">Nenhuma tarefa encontrada.</li>';
        return;
    }

    listaParaExibir.forEach(tarefa => {
        const li = document.createElement('li');
        li.className = `tarefa-item ${tarefa.prioridade.toLowerCase()} ${tarefa.concluida ? 'concluida' : ''}`;

        li.innerHTML = `
            <span class="tarefa-texto"><strong>#${tarefa.id}</strong> - ${tarefa.titulo} (${tarefa.prioridade})</span>
            <div class="tarefa-acoes">
                <button class="btn-acao btn-adicionar" onclick="alternarConclusao(${tarefa.id})">
                    ${tarefa.concluida ? 'Refazer' : 'Concluir'}
                </button>
                <button class="btn-acao btn-secundario" onclick="alterarPrioridade(${tarefa.id})">Prioridade</button>
            </div>
        `;
        listaTarefasElement.appendChild(li);
    });
}

// 10. Conclusão de uma tarefa
function alternarConclusao(id) {
    const tarefa = tarefas.find(t => t.id === id);
    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        atualizarInterface();
    }
}

// 11. Alteração da prioridade
function alterarPrioridade(id) {
    const tarefa = tarefas.find(t => t.id === id);
    if (tarefa) {
        const ciclo = { 'Baixa': 'Média', 'Média': 'Alta', 'Alta': 'Baixa' };
        tarefa.prioridade = ciclo[tarefa.prioridade];
        atualizarInterface();
    }
}

// 9. Busca de tarefas com find / filter
function buscarTarefa() {
    const termo = inputBusca.value.trim().toLowerCase();
    
    if (!termo) {
        atualizarInterface();
        return;
    }

    // Tenta buscar usando .find() para achar uma tarefa exata por ID ou Texto
    const resultadoExato = tarefas.find(t => t.id.toString() === termo || t.titulo.toLowerCase() === termo);

    if (resultadoExato) {
        atualizarInterface([resultadoExato]);
    } else {
        // Se não achar exato, faz uma filtragem parcial por aproximação no título
        const resultadosParciais = tarefas.filter(t => t.titulo.toLowerCase().includes(termo));
        atualizarInterface(resultadosParciais);
    }
}

// Event Listeners
formTarefa.addEventListener('submit', (e) => {
    e.preventDefault();
    cadastrarTarefa(inputTitulo.value, selectPrioridade.value);
    inputTitulo.value = ''; // Limpa o input
    inputTitulo.focus();
});

btnBusca.addEventListener('click', buscarTarefa);
inputBusca.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') buscarTarefa();
});
