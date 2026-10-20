/**
 * PROJETO: GERENCIADOR DE TAREFAS
 * Implementação das funções e lógica de negócios.
 */

// 3. Armazenamento das tarefas com arrays
let listaDeTarefas = [];
let proximoId = 1; // 7. Geração automática de códigos (ID sequencial)

/**
 * 6. Cadastro e modelagem de uma tarefa
 * Cria e retorna um objeto representando uma tarefa.
 */
function criarObjetoTarefa(titulo, prioridade) {
    return {
        id: proximoId++, // Atribui o ID atual e incrementa para o próximo
        titulo: titulo.trim(),
        prioridade: prioridade,
        concluida: false
    };
}

/**
 * 5. Validação dos dados da tarefa
 * Garante que as entradas do usuário são válidas antes do cadastro.
 */
function validarDadosTarefa(titulo, prioridade) {
    if (!titulo || titulo.trim() === "") {
        alert("Erro: O título da tarefa não pode estar vazio.");
        return false;
    }
    const prioridadesValidas = ["baixa", "media", "alta"];
    if (!prioridadesValidas.includes(prioridade)) {
        alert("Erro: Prioridade inválida.");
        return false;
    }
    return true;
}

/**
 * 4 e 12. Organização e responsabilidade das funções (Adicionar Tarefa)
 * Executa a lógica de cadastro no array principal.
 */
function adicionarTarefa(titulo, prioridade) {
    if (!validarDadosTarefa(titulo, prioridade)) return;

    const novaTarefa = criarObjetoTarefa(titulo, prioridade);
    listaDeTarefas.push(novaTarefa);
    
    // Atualiza a interface gráfica
    renderizarInterface();
}

/**
 * 10. Conclusão de uma tarefa
 * Altera o status 'concluida' para true ou false (alternando o estado).
 */
function alternarConclusaoTarefa(id) {
    const tarefa = buscarTarefaPorId(id);
    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        renderizarInterface();
    }
}

/**
 * 11. Alteração da prioridade
 * Permite mudar o nível de importância de uma tarefa existente.
 */
function alterarPrioridadeTarefa(id, novaPrioridade) {
    const tarefa = buscarTarefaPorId(id);
    if (tarefa) {
        tarefa.prioridade = novaPrioridade;
        renderizarInterface();
    }
}

/**
 * Função Auxiliar de Remoção (CRUD)
 */
function removerTarefa(id) {
    listaDeTarefas = listaDeTarefas.filter(tarefa => tarefa.id !== id);
    renderizarInterface();
}

/**
 * 9. Busca de tarefas com find
 * Localiza um objeto de tarefa específico dentro do array pelo ID.
 */
function buscarTarefaPorId(id) {
    return listaDeTarefas.find(tarefa => tarefa.id === id);
}

/**
 * 9. Busca/Filtragem por Texto
 * Filtra a lista com base no termo de busca digitado pelo usuário.
 */
function filtrarTarefasPorTitulo(termoBusca) {
    const termo = termoBusca.toLowerCase();
    return listaDeTarefas.filter(tarefa => 
        tarefa.titulo.toLowerCase().includes(termo)
    );
}

/**
 * 8. Listagem das tarefas cadastradas (Manipulação do DOM)
 * Reconstrói o HTML dinamicamente com base no array atual de dados.
 */
function renderizarInterface(tarefasFiltradas = null) {
    const listaHtml = document.querySelector(".task-list");
    if (!listaHtml) return;

    // Define se vai renderizar a lista inteira ou apenas o resultado de uma busca
    const tarefasParaExibir = tarefasFiltradas !== null ? tarefasFiltradas : listaDeTarefas;
    
    // Limpa a listagem atual
    listaHtml.innerHTML = "";

    if (tarefasParaExibir.length === 0) {
        listaHtml.innerHTML = `<li class="task-item" style="justify-content: center; color: #64748b;">Nenhuma tarefa encontrada.</li>`;
        return;
    }

    // Percorre o array construindo as linhas de HTML
    tarefasParaExibir.forEach(tarefa => {
        const itemLi = document.createElement("li");
        itemLi.className = `task-item ${tarefa.concluida ? 'completed' : ''}`;

        itemLi.innerHTML = `
            <div class="task-info">
                <span class="task-title">${tarefa.titulo}</span>
                <div class="task-meta">
                    <span>ID: #${String(tarefa.id).padStart(3, '0')}</span>
                    <span class="badge badge-${tarefa.prioridade}">${tarefa.prioridade}</span>
                </div>
            </div>
            <div class="task-actions">
                ${!tarefa.concluida ? `<button class="btn-action btn-done" onclick="alternarConclusaoTarefa(\${tarefa.id})">Concluir</button>` : `<button class="btn-action btn-done" style="background-color: #64748b;" onclick="alternarConclusaoTarefa(\${tarefa.id})">Refazer</button>`}
                <button class="btn-action btn-delete" onclick="removerTarefa(${tarefa.id})">Excluir</button>
            </div>
        `;
        listaHtml.appendChild(itemLi);
    });
}

/**
 * VINDA DOS EVENTOS DA INTERFACE (Iniciador após carregar a página)
 */
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form-group");
    const campoBusca = document.querySelector("#search-input");

    // Evento de envio do formulário (Cadastro)
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const inputTitulo = document.querySelector("#task-name");
            const selectPrioridade = document.querySelector("#task-priority");

            adicionarTarefa(inputTitulo.value, selectPrioridade.value);

            // Limpa o campo de texto após cadastrar
            inputTitulo.value = "";
            inputTitulo.focus();
        });
    }

    // Evento de digitação na busca (Filtro em tempo real)
    if (campoBusca) {
        campoBusca.addEventListener("input", (e) => {
            const resultados = filtrarTarefasPorTitulo(e.target.value);
            renderizarInterface(resultados);
        });
    }

    // Renderização inicial para limpar os dados estáticos do HTML
    renderizarInterface();
});
