// 3. Armazenamento das tarefas com arrays e 7. Geração automática de códigos
const tarefas = [];
let proximoCodigo = 0;

// 5. Validação dos dados da tarefa
function validarDadosDaTarefa(titulo, prioridade) {
    if (!titulo || titulo.length < 5) {
            throw new Error("O título deve possuir no mínimo cinco caracteres.");
                }

                    if (prioridade < 1 || prioridade > 3) {
                            throw new Error("A prioridade deve estar entre 1 e 3.");
                                }
                                }

                                // 6. Cadastro e modelagem de uma tarefa
                                function cadastrarTarefa(titulo, prioridade) {
                                    validarDadosDaTarefa(titulo, prioridade);

                                        proximoCodigo++;

                                            const novaTarefa = {
                                                    codigo: proximoCodigo,
                                                            titulo: titulo,
                                                                    prioridade: prioridade,
                                                                            status: true // true = em execução, false = concluída
                                                                                };

                                                                                    tarefas.push(novaTarefa);
                                                                                        return novaTarefa;
                                                                                        }

                                                                                        // 8. Listagem das tarefas cadastradas
                                                                                        function listarTarefas() {
                                                                                            return tarefas;
                                                                                            }

                                                                                            // 9. Busca de tarefas com find
                                                                                            function buscarTarefa(codigo) {
                                                                                                const tarefaEncontrada = tarefas.find(tarefa => tarefa.codigo === codigo);

                                                                                                    if (!tarefaEncontrada) {
                                                                                                            throw new Error(`Tarefa com o código ${codigo} não foi encontrada.`);
                                                                                                                }

                                                                                                                    return tarefaEncontrada;
                                                                                                                    }

                                                                                                                    // 10. Conclusão de uma tarefa
                                                                                                                    function concluirTarefa(codigo) {
                                                                                                                        const tarefa = buscarTarefa(codigo);

                                                                                                                            if (tarefa.status === false) {
                                                                                                                                    throw new Error("Esta tarefa já está concluída.");
                                                                                                                                        }

                                                                                                                                            tarefa.status = false;
                                                                                                                                                return tarefa;
                                                                                                                                                }

                                                                                                                                                // 11. Alteração da prioridade
                                                                                                                                                function alterarPrioridade(codigo, novaPrioridade) {
                                                                                                                                                    const tarefa = buscarTarefa(codigo);

                                                                                                                                                        // Reutiliza a validação existente passando o título já salvo
                                                                                                                                                            validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

                                                                                                                                                                tarefa.prioridade = novaPrioridade;
                                                                                                                                                                    return tarefa;
                                                                                                                                                                    }

                                                                                                                                                                    // ==========================================
                                                                                                                                                                    // EXEMPLOS DE EXECUÇÃO E TESTES DO SISTEMA
                                                                                                                                                                    // ==========================================

                                                                                                                                                                    try {
                                                                                                                                                                        // Cadastrando tarefas válidas
                                                                                                                                                                            cadastrarTarefa("Estudar JavaScript", 1);
                                                                                                                                                                                cadastrarTarefa("Fazer exercícios de lógica", 2);
                                                                                                                                                                                    cadastrarTarefa("Revisar conteúdo da aula", 3);

                                                                                                                                                                                        console.log("--- Lista inicial de tarefas ---");
                                                                                                                                                                                            console.log(listarTarefas());

                                                                                                                                                                                                // Concluindo a tarefa de código 1
                                                                                                                                                                                                    concluirTarefa(1);
                                                                                                                                                                                                        console.log("\n--- Após concluir a tarefa 1 ---");
                                                                                                                                                                                                            console.log(listarTarefas());

                                                                                                                                                                                                                // Alterando a prioridade da tarefa 2 para 1 (mais alta)
                                                                                                                                                                                                                    alterarPrioridade(2, 1);
                                                                                                                                                                                                                        console.log("\n--- Após alterar a prioridade da tarefa 2 ---");
                                                                                                                                                                                                                            console.log(listarTarefas());

                                                                                                                                                                                                                                // Teste de erro (título curto)
                                                                                                                                                                                                                                    // cadastrarTarefa("Ler", 1);

                                                                                                                                                                                                                                        // Teste de erro (conclusão duplicada)
                                                                                                                                                                                                                                            // concluirTarefa(1);

                                                                                                                                                                                                                                                // Teste de erro (código inexistente)
                                                                                                                                                                                                                                                    // buscarTarefa(99);

                                                                                                                                                                                                                                                    } catch (erro) {
                                                                                                                                                                                                                                                        console.error("Erro na operação:", erro.message);
                                                                                                                                                                                                                                                        }