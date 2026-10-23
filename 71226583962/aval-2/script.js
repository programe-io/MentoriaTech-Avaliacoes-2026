// 3. Armazenamento das tarefas com arrays
let tarefas = [];

// 7. Geração automática de códigos
let proximoId = 1;

// 4. Organização do algoritmo em funções
function cadastrarTarefa() {
    const tituloInput = document.getElementById('titulo');
    const prioridadeInput = document.getElementById('prioridade');

    // 5. Validação dos dados da tarefa
    if (tituloInput.value.trim() === '') {
        alert('Por favor, insira um título válido para a tarefa.');
        return;
    }

    // 6. Modelagem de uma tarefa (Objeto)
    const novaTarefa = {
        id: proximoId++,
        titulo: tituloInput.value.trim(),
        prioridade: prioridadeInput.value,
        concluida: false
    };

    // Adiciona o objeto ao array
    tarefas.push(novaTarefa);
    
    // Limpa o campo de entrada e atualiza a interface
    tituloInput.value = ''; 
    renderizarTarefas();
}

// 8. Listagem das tarefas cadastradas
function renderizarTarefas() {
    const lista = document.getElementById('listaTarefas');
    lista.innerHTML = ''; // Limpa a lista antes de redesenhar

    tarefas.forEach(tarefa => {
        const li = document.createElement('li');
        
        // Aplica as classes CSS de acordo com o estado da tarefa
        li.className = `prioridade-${tarefa.prioridade} ${tarefa.concluida ? 'concluida' : ''}`;
        
        li.innerHTML = `
            <span>[ID: ${tarefa.id}] <strong>${tarefa.titulo}</strong> (${tarefa.prioridade})</span>
            <div class="btn-group">
                <!-- 10. Conclusão de uma tarefa -->
                <button class="btn-concluir" onclick="concluirTarefa(${tarefa.id})">✓</button>
                <!-- 11. Alteração da prioridade -->
                <button class="btn-prioridade" onclick="alterarPrioridade(${tarefa.id})">⇅</button>
            </div>
        `;
        lista.appendChild(li);
    });
}

// 9. Busca de tarefas com find
function buscarTarefa() {
    const idBusca = parseInt(document.getElementById('buscaId').value);
    const resultadoDiv = document.getElementById('resultadoBusca');

    if (isNaN(idBusca)) {
        resultadoDiv.innerHTML = "Por favor, digite um ID numérico válido.";
        resultadoDiv.style.color = "orange";
        return;
    }

    // Utilizando o método .find() do array para buscar por ID
    const tarefaEncontrada = tarefas.find(t => t.id === idBusca);

    if (tarefaEncontrada) {
        resultadoDiv.innerHTML = `Encontrada: "${tarefaEncontrada.titulo}" | Status: ${tarefaEncontrada.concluida ? 'Concluída' : 'Pendente'}`;
        resultadoDiv.style.color = "green";
    } else {
        resultadoDiv.innerHTML = `Nenhuma tarefa encontrada com o ID ${idBusca}.`;
        resultadoDiv.style.color = "red";
    }
}

// 10. Conclusão de uma tarefa
function concluirTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);
    if (tarefa) {
        tarefa.concluida = !tarefa.concluida; // Alterna entre true e false
        renderizarTarefas();
    }
}

// 11. Alteração da prioridade
function alterarPrioridade(id) {
    const tarefa = tarefas.find(t => t.id === id);
    if (tarefa) {
        // Ciclo de mudança: baixa -> media -> alta -> baixa
        if (tarefa.prioridade === 'baixa') {
            tarefa.prioridade = 'media';
        } else if (tarefa.prioridade === 'media') {
            tarefa.prioridade = 'alta';
        } else {
            tarefa.prioridade = 'baixa';
        }
        renderizarTarefas();
    }
}
