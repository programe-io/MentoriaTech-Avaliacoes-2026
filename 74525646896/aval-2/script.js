let tarefas = [];

function cadastrarTarefa(codigo, titulo, prioridade) {
    if (titulo.length < 5) {
            console.log("Título inválido!");
                    return;
                        }

                            if (prioridade < 1 || prioridade > 3) {
                                    console.log("Prioridade inválida!");
                                            return;
                                                }

                                                    tarefas.push({
                                                            codigo: codigo,
                                                                    titulo: titulo,
                                                                            prioridade: prioridade,
                                                                                    concluida: false
                                                                                        });

                                                                                            console.log("Tarefa cadastrada!");
                                                                                            }

                                                                                            function listarTarefas() {
                                                                                                console.log(tarefas);
                                                                                                }

                                                                                                function concluirTarefa(codigo) {
                                                                                                    let tarefa = tarefas.find(t => t.codigo === codigo);

                                                                                                        if (tarefa) {
                                                                                                                tarefa.concluida = true;
                                                                                                                        console.log("Tarefa concluída!");
                                                                                                                            }
                                                                                                                            }

                                                                                                                            function alterarPrioridade(codigo, prioridade) {
                                                                                                                                let tarefa = tarefas.find(t => t.codigo === codigo);

                                                                                                                                    if (tarefa && prioridade >= 1 && prioridade <= 3) {
                                                                                                                                            tarefa.prioridade = prioridade;
                                                                                                                                                    console.log("Prioridade alterada!");
                                                                                                                                                        }
                                                                                                                                                        }

                                                                                                                                                        // Teste
                                                                                                                                                        cadastrarTarefa(1, "Estudar JavaScript", 1);
                                                                                                                                                        listarTarefas();
                                                                                                                                                        concluirTarefa(1);
                                                                                                                                                        alterarPrioridade(1, 2);
                                                                                                                                                        listarTarefas();