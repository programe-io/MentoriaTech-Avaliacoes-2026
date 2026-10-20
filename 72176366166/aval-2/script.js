// --- 3. Armazenamento das tarefas ---
const listaDeTarefas = [];
let contadorId = 1;

// --- 7. Geração automática de códigos ---
function gerarCodigoAutomatico() {
    return contadorId++;
}

// --- 5. Validação dos dados ---
function validarDadosTarefa(titulo) {
    const msgErro = document.getElementById("mensagemErro");
    if (!titulo || titulo.trim() === "") {
        msgErro.innerText = "Erro: O título da tarefa não pode estar vazio.";
        return false;
    }
    msgErro.innerText = ""; // Limpa o erro se estiver válido
    return true;
}

// --- 6. Cadastro de uma tarefa ---
function cadastrarTarefa(titulo, prioridade) {
    if (!validarDadosTarefa(titulo)) {
        return false;
    }

    const novaTarefa = {
        id: gerarCodigoAutomatico(),
        titulo: titulo.trim(),
        prioridade: prioridade,
        concluida: false
    };

    listaDeTarefas.push(novaTarefa);
    renderizarTarefas(); // Atualiza a tela
    return true;
}

// --- 9. Busca de tarefas com find ---
function buscarTarefaPorId(id) {
    return listaDeTarefas.find(tarefa => tarefa.id === id) || null;
}

// --- 10. Conclusão de uma tarefa ---
function concluirTarefa(id) {
    const tarefa = buscarTarefaPorId(id);
    if (tarefa) {
        tarefa.concluida = !tarefa.concluida; // Alterna entre concluída e pendente
        renderizarTarefas();
    }
}

// --- 11. Alteração da prioridade ---
function alterarPrioridadeTarefa(id, novaPrioridade) {
    const tarefa = buscarTarefaPorId(id);
    if (tarefa) {
        tarefa.prioridade = novaPrioridade;
        renderizarTarefas();
    }
}

// --- Interação com a Interface (DOM) ---
function acaoCadastrar() {
    const inputTitulo = document.getElementById("tituloTarefa");
    const selectPrioridade = document.getElementById("prioridadeTarefa");

    const sucesso = cadastrarTarefa(inputTitulo.value, selectPrioridade.value);
    
    if (sucesso) {
        inputTitulo.value = ""; // Limpa o campo de texto se cadastrou com sucesso
        inputTitulo.focus();
    }
}

// --- 8. Listagem/Renderização das tarefas cadastradas ---
function renderizarTarefas() {
    const container = document.getElementById("containerTarefas");
    container.innerHTML = ""; // Limpa a lista visual atual antes de redesenhar

    if (listaDeTarefas.length === 0) {
        container.innerHTML = `<li style="text-align: center; color: #888; padding: 10px;">Nenhuma tarefa cadastrada.</li>`;
        return;
    }

    listaDeTarefas.forEach(tarefa => {
        const itemLi = document.createElement("li");
        itemLi.className = `item-tarefa ${tarefa.concluida ? 'concluida' : ''}`;

        itemLi.innerHTML = `
            <div class="meta-tarefa">
                <span class="texto-tarefa"><strong>#${tarefa.id}</strong> - ${tarefa.titulo}</span>
                <span class="badge ${tarefa.prioridade}">${tarefa.prioridade}</span>
            </div>
            <div class="acoes">
                <!-- Alteração de prioridade em tempo real (Item 11) -->
                <select class="select-mudar-prioridade" onchange="alterarPrioridadeTarefa(${tarefa.id}, this.value)">
                    <option value="baixa" ${tarefa.prioridade === 'baixa' ? 'selected' : ''}>Baixa</option>
                    <option value="média" ${tarefa.prioridade === 'média' ? 'selected' : ''}>Média</option>
                    <option value="alta" ${tarefa.prioridade === 'alta' ? 'selected' : ''}>Alta</option>
                </select>
                <!-- Botão de Conclusão (Item 10) -->
                <button class="btn-concluir" onclick="concluirTarefa(${tarefa.id})">
                    ${tarefa.concluida ? 'Refazer' : 'Concluir'}
                </button>
            </div>
        `;
        container.appendChild(itemLi);
    });
}

// Executa uma renderização inicial quando a página carrega
renderizarTarefas();
