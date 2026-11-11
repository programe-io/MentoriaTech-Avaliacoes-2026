try {
    cadastrarTarefa("Estudar JavaScript", 1);
    cadastrarTarefa("Fazer exercícios de lógica", 2);
    cadastrarTarefa("Revisar código do projeto", 3);

    alterarStatusTarefa(1); // Marca a tarefa 1 como concluída (status: false)
    atualizarTarefa(2, "Praticar arrays e funções", 1);

    console.log("--- Todas as Tarefas ---");
    listarTarefas();

    console.log("--- Tarefas com Prioridade 1 ---");
    console.log(filtrarPorPrioridade(1));

    removerTarefa(3);
    console.log("--- Após remover a tarefa 3 ---");
    listarTarefas();

} catch (erro) {
    console.error("Erro:", erro.message);
}
