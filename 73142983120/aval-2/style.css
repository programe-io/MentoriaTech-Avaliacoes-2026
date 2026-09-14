
// Array que vai guardar o conjunto de todas as tarefas
let tarefas = [];
let geradorCodigo = 0;

function validarDadosTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
            throw new Error('O titulo deve ter no minimo 5 caracteres');
                }

                    if (prioridade < 1 || prioridade > 3) {
                            throw new Error('Informe uma prioridade entre 1 e 3');
                                }
                                }

                                function buscarTarefa(codigoTarefa) {
                                    const tarefaBuscada = tarefas.find(t => t.codigo === codigoTarefa);

                                        if (!tarefaBuscada) {
                                                throw new Error('Codigo de tarefa nao encontrado');
                                                    }

                                                        return tarefaBuscada;
                                                        }

                                                        function cadastrarTarefa(titulo, prioridade) {
                                                            validarDadosTarefa(titulo, prioridade);

                                                                let tarefa = {
                                                                        'codigo': ++geradorCodigo,
                                                                                'titulo': titulo,
                                                                                        'prioridade': prioridade,
                                                                                                'status': true
                                                                                                    };

                                                                                                        tarefas.push(tarefa);
                                                                                                        }

                                                                                                        function listarTarefas() {
                                                                                                            return tarefas;
                                                                                                            }

                                                                                                            function concluirTarefa(codigo) {
                                                                                                                let tarefa = buscarTarefa(codigo);

                                                                                                                    if (tarefa.status === false) {
                                                                                                                            throw new Error('A tarefa ja foi concluida');
                                                                                                                                }

                                                                                                                                    tarefa.status = false;
                                                                                                                                    }

                                                                                                                                    function alterarPrioridade(codigo, novaPrioridade) {
                                                                                                                                        let tarefa = buscarTarefa(codigo);

                                                                                                                                            validarDadosTarefa(tarefa.titulo, novaPrioridade);

                                                                                                                                                tarefa.prioridade = novaPrioridade;
                                                                                                                                                }


                                                                                                                                                // Cadastrando as tarefas
                                                                                                                                                cadastrarTarefa('Cadastrar Clientes', 1);
                                                                                                                                                cadastrarTarefa('Limpar banco de dados', 3);

                                                                                                                                                // Listando as tarefas
                                                                                                                                                console.log(listarTarefas());

                                                                                                                                                // Concluindo a tarefa de código 2
                                                                                                                                                concluirTarefa(2);

                                                                                                                                                // Listando novamente as tarefas
                                                                                                                                                console.log(listarTarefas());

                                                                                                                                                // Alterando a prioridade da tarefa de código 1
                                                                                                                                                alterarPrioridade(1, 2);

                                                                                                                                                // Listando novamente
                                                                                                                                                console.log(listarTarefas());