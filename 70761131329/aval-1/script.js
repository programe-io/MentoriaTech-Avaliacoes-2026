let tarefas = [];

// Cadastrar uma nova tarefa
function cadastrarTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
            console.log("Erro: o título deve ter no mínimo 5 caracteres.");
                    return;
                        }

                            if (prioridade < 1 || prioridade > 3) {
                                    console.log("Erro: a prioridade deve ser entre 1 e 3.");
                                            return;
                                                }

                                                    let tarefa = {
                                                            titulo: titulo,
                                                                    prioridade: prioridade,
                                                                            concluida: false
                                                                                };

                                                                                    tarefas.push(tarefa);
                                                                                        console.log("Tarefa cadastrada com sucesso!");
                                                                                        }

                                                                                        // Listar as tarefas
                                                                                        function listarTarefas() {
                                                                                            console.log("LISTA DE TAREFAS:");

                                                                                                tarefas.forEach((tarefa, index) => {
                                                                                                        console.log(
                                                                                                                    `${index + 1}. ${tarefa.titulo} | Prioridade: ${tarefa.prioridade} | ` +
                                                                                                                                `Status: ${tarefa.concluida ? "Concluída" : "Pendente"}`
                                                                                                                                        );
                                                                                                                                            });
                                                                                                                                            }

                                                                                                                                            // Marcar uma tarefa como concluída
                                                                                                                                            function concluirTarefa(numero) {
                                                                                                                                                if (tarefas[numero - 1]) {
                                                                                                                                                        tarefas[numero - 1].concluida = true;
                                                                                                                                                                console.log("Tarefa concluída!");
                                                                                                                                                                    } else {
                                                                                                                                                                            console.log("Tarefa não encontrada.");
                                                                                                                                                                                }
                                                                                                                                                                                }

                                                                                                                                                                                // Alterar a prioridade
                                                                                                                                                                                function alterarPrioridade(numero, novaPrioridade) {
                                                                                                                                                                                    if (novaPrioridade < 1 || novaPrioridade > 3) {
                                                                                                                                                                                            console.log("A prioridade deve ser entre 1 e 3.");
                                                                                                                                                                                                    return;
                                                                                                                                                                                                        }

                                                                                                                                                                                                            if (tarefas[numero - 1]) {
                                                                                                                                                                                                                    tarefas[numero - 1].prioridade = novaPrioridade;
                                                                                                                                                                                                                            console.log("Prioridade alterada!");
                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                        console.log("Tarefa não encontrada.");
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                            }


                                                                                                                                                                                                                                            // EXEMPLO DE USO

                                                                                                                                                                                                                                            cadastrarTarefa("Fazer trabalho", 1);
                                                                                                                                                                                                                                            cadastrarTarefa("Estudar JavaScript", 2);
                                                                                                                                                                                                                                            cadastrarTarefa("Ler livro", 3);

                                                                                                                                                                                                                                            listarTarefas();

                                                                                                                                                                                                                                            concluirTarefa(1);

                                                                                                                                                                                                                                            alterarPrioridade(2, 1);

                                                                                                                                                                                                                                            listarTarefas();