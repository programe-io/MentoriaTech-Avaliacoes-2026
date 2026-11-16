// PROJETO: GERENCIADOR DE TAREFAS

let tarefas = [];
let proximoCodigo = 0;

// 1. VALIDAR OS DADOS DA TAREFA
function validarDadosDaTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
            throw new Error("O título deve ter no mínimo 5 caracteres.");
                }

                    if (prioridade < 1 || prioridade > 3) {
                            throw new Error("A prioridade deve estar entre 1 e 3.");
                                }
                                }

                                // 2. CADASTRAR UMA TAREFA
                                function cadastrarTarefa(titulo, prioridade) {
                                    validarDadosDaTarefa(titulo, prioridade);

                                        proximoCodigo++;

                                            const novaTarefa = {
                                                    codigo: proximoCodigo,
                                                            titulo: titulo,
                                                                    prioridade: prioridade,
                                                                            status: true
                                                                                };

                                                                                    tarefas.push(novaTarefa);

                                                                                        console.log("Tarefa cadastrada com sucesso!");
                                                                                        }

                                                                                        // 3. LISTAR AS TAREFAS
                                                                                        function listarTarefas() {
                                                                                            return tarefas;
                                                                                            }

                                                                                            // 4. BUSCAR TAREFA PELO CÓDIGO
                                                                                            function buscarTarefa(codigo) {
                                                                                                const tarefa = tarefas.find(
                                                                                                        (item) => item.codigo === codigo
                                                                                                            );

                                                                                                                if (!tarefa) {
                                                                                                                        throw new Error("Código da tarefa não encontrado.");
                                                                                                                            }

                                                                                                                                return tarefa;
                                                                                                                                }

                                                                                                                                // 5. CONCLUIR UMA TAREFA
                                                                                                                                function concluirTarefa(codigo) {
                                                                                                                                    const tarefa = buscarTarefa(codigo);

                                                                                                                                        if (tarefa.status === false) {
                                                                                                                                                throw new Error("Esta tarefa já foi concluída.");
                                                                                                                                                    }

                                                                                                                                                        tarefa.status = false;

                                                                                                                                                            console.log("Tarefa concluída com sucesso!");
                                                                                                                                                            }

                                                                                                                                                            // 6. ALTERAR A PRIORIDADE
                                                                                                                                                            function alterarPrioridade(codigo, novaPrioridade) {
                                                                                                                                                                const tarefa = buscarTarefa(codigo);

                                                                                                                                                                    validarDadosDaTarefa(
                                                                                                                                                                            tarefa.titulo,
                                                                                                                                                                                    novaPrioridade
                                                                                                                                                                                        );

                                                                                                                                                                                            tarefa.prioridade = novaPrioridade;

                                                                                                                                                                                                console.log("Prioridade alterada com sucesso!");
                                                                                                                                                                                                }

                                                                                                                                                                                                // 7. TESTANDO O PROJETO

                                                                                                                                                                                                cadastrarTarefa("Estudar JavaScript", 1);
                                                                                                                                                                                                cadastrarTarefa("Fazer atividade", 2);
                                                                                                                                                                                                cadastrarTarefa("Organizar materiais", 3);

                                                                                                                                                                                                console.log("LISTA DE TAREFAS:");
                                                                                                                                                                                                console.log(listarTarefas());

                                                                                                                                                                                                concluirTarefa(1);

                                                                                                                                                                                                alterarPrioridade(2, 1);

                                                                                                                                                                                                console.log("LISTA ATUALIZADA:");
                                                                                                                                                                                                console.log(listarTarefas());