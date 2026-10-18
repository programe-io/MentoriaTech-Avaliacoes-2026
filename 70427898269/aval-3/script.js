// Atualiza a tela e limpa o formulário
    listarTarefas();
    this.reset();
});

// Função para listar as tarefas cadastradas na tela
function listarTarefas() {
    const lista = document.getElementById("listaTarefas");
    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = "<p style='color: #8c7b84;'>Nenhuma tarefa cadastrada ainda. 🌸</p>";
        return;
    }

    tarefas.forEach(function(tarefa) {
        const item = document.createElement("li");

        // Traduzindo o número da prioridade para texto legível
        let textoPrioridade = "Baixa";
        if (tarefa.prioridade === 1) textoPrioridade = "Alta";
        if (tarefa.prioridade === 2) textoPrioridade = "Média";

        // Exibição dos dados da tarefa
        const spanTexto = document.createElement("span");
        spanTexto.textContent = `#${tarefa.codigo} - ${tarefa.titulo} (Prioridade: ${textoPrioridade})`;
        item.appendChild(spanTexto);

        // Contêiner para os botões de ação
        const divBotoes = document.createElement("div");

        // Botão: Marcar como concluída / Reabrir
        const btnConcluir = document.createElement("button");
        btnConcluir.textContent = tarefa.concluida ? "Reabrir" : "Concluir";
        btnConcluir.onclick = function() {
            tarefa.concluida = !tarefa.concluida;
            listarTarefas();
        };

        // Botão: Alterar a prioridade
        const btnAlterar = document.createElement("button");
        btnAlterar.textContent = "Alterar Prioridade";
        btnAlterar.onclick = function() {
            const novaPrioridade = prompt("Digite a nova prioridade: 1 (Alta), 2 (Média) ou 3 (Baixa):");
            
            if (["1", "2", "3"].includes(novaPrioridade)) {
                tarefa.prioridade = Number(novaPrioridade);
                listarTarefas();
            } else if (novaPrioridade !== null) {
                alert("Prioridade inválida! Digite apenas valores entre 1 e 3.");
            }
        };

        // Botão: Excluir tarefa
        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.onclick = function() {
            const indice = tarefas.findIndex(t => t.codigo === tarefa.codigo);
            if (indice !== -1) {
                tarefas.splice(indice, 1);
                listarTarefas();
            }
        };

        divBotoes.appendChild(btnConcluir);
        divBotoes.appendChild(btnAlterar);
        divBotoes.appendChild(btnExcluir);
        item.appendChild(divBotoes);

        // Aplica o estilo visual se estiver concluída
        if (tarefa.concluida) {
            item.classList.add("concluida");
        } else {
            item.classList.remove("concluida");
        }

        lista.appendChild(item);
    });
}
