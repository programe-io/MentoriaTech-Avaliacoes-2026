// 3. Armazenamento das tarefas com arrays
let tarefas = [];

// 7. Geração automática de códigos independente
let ultimoCodigo = 0;

// 5. Função para validar os dados da tarefa (título e prioridade)
function validarDadosDaTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
            throw new Error("O título deve ter no mínimo cinco caracteres.");
                }
                    if (prioridade < 1 || prioridade > 3) {
                            throw new Error("A prioridade deve estar entre 1 e 3.");
                                }
                                }

                                // 9. Função exclusiva para buscar tarefa pelo código
                                function buscarTarefa(codigo) {
                                    const tarefa = tarefas.find((t) => t.codigo === codigo);
                                        
                                            if (!tarefa) {
                                                    throw new Error("Tarefa não encontrada.");
                                                        }
                                                            
                                                                return tarefa;
                                                                }

                                                                // 6 & 7. Função para cadastrar uma nova tarefa
                                                                function cadastrarTarefa(titulo, prioridade) {
                                                                    validarDadosDaTarefa(titulo, prioridade);

                                                                        ultimoCodigo++; // Incrementa o código sequencialmente

                                                                            let novaTarefa = {
                                                                                    codigo: ultimoCodigo,
                                                                                            titulo: titulo,
                                                                                                    prioridade: prioridade,
                                                                                                            status: true // 6. Verdadeiro significa em execução / não concluída
                                                                                                                };

                                                                                                                    tarefas.push(novaTarefa);
                                                                                                                    }

                                                                                                                    // 8. Função para listar as tarefas cadastradas
                                                                                                                    function listarTarefas() {
                                                                                                                        return tarefas;
                                                                                                                        }

                                                                                                                        // 10. Função para concluir uma tarefa
                                                                                                                        function concluirTarefa(codigo) {
                                                                                                                            const tarefa = buscarTarefa(codigo);

                                                                                                                                if (tarefa.status === false) {
                                                                                                                                        throw new Error("Esta tarefa já estava concluída.");
                                                                                                                                            }

                                                                                                                                                tarefa.status = false; // Altera o status para concluída
                                                                                                                                                }

                                                                                                                                                // 11. Função para alterar a prioridade de uma tarefa
                                                                                                                                                function alterarPrioridade(codigo, novaPrioridade) {
                                                                                                                                                    const tarefa = buscarTarefa(codigo);

                                                                                                                                                        // Reaproveita a validação passando o título atual da tarefa
                                                                                                                                                            validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

                                                                                                                                                                tarefa.prioridade = novaPrioridade;
                                                                                                                                                                }

                                                                                                                                                                // ==========================================
                                                                                                                                                                // Testando o Gerenciador de Tarefas
                                                                                                                                                                // ==========================================
                                                                                                                                                                try {
                                                                                                                                                                    console.log("--- Cadastrando Tarefas ---");
                                                                                                                                                                        cadastrarTarefa("Estudar JavaScript", 1);
                                                                                                                                                                            cadastrarTarefa("Fazer compras", 2);
                                                                                                                                                                                console.log(listarTarefas());

                                                                                                                                                                                    console.log("\n--- Concluindo a tarefa 1 ---");
                                                                                                                                                                                        concluirtarefa = concluirTarefa(1);
                                                                                                                                                                                            console.log(listarTarefas());

                                                                                                                                                                                                console.log("\n--- Alterando a prioridade da tarefa 2 para 1 ---");
                                                                                                                                                                                                    alterarPrioridade(2, 1);
                                                                                                                                                                                                        console.log(listarTarefas());

                                                                                                                                                                                                        } catch (erro) {
                                                                                                                                                                                                            console.error("Erro capturado: " + erro.message);
                                                                                                                                                                                                            }
                                                                                                                                                                                                            