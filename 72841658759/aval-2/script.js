// Lista para armazenar as tarefas cadastradas
let tarefas = [];
let proximoId = 1;

/**
 * Função para cadastrar uma nova tarefa
  * Regra de validação: O título deve ter no mínimo 5 caracteres
   * A prioridade deve ser um valor entre 1 (alta) e 3 (baixa)
    */
    function cadastrarTarefa(titulo, prioridade) {
        if (!titulo || titulo.trim().length < 5) {
                console.log(`❌ Erro: O título "${titulo}" é inválido. Deve ter no mínimo 5 caracteres.`);
                        return;
                            }

                                if (prioridade < 1 || prioridade > 3) {
                                        console.log(`❌ Erro: Prioridade inválida (${prioridade}). Escolha um valor entre 1 (alta) e 3 (baixa).`);
                                                return;
                                                    }

                                                        const novaTarefa = {
                                                                codigo: proximoId++,
                                                                        titulo: titulo.trim(),
                                                                                prioridade: prioridade, // 1: Alta, 2: Média, 3: Baixa
                                                                                        concluida: false        // Status inicial de conclusão
                                                                                            };

                                                                                                tarefas.push(novaTarefa);
                                                                                                    console.log(`Sucesso: Tarefa "${novaTarefa.titulo}" cadastrada com o código ${novaTarefa.codigo}!`);
                                                                                                    }

                                                                                                    /**
                                                                                                     * Função para listar todas as tarefas cadastradas
                                                                                                      */
                                                                                                      function listarTarefas() {
                                                                                                          console.log("\n=== LISTA DE TAREFAS ===");
                                                                                                              if (tarefas.length === 0) {
                                                                                                                      console.log("Nenhuma tarefa cadastrada no momento.");
                                                                                                                              return;
                                                                                                                                  }

                                                                                                                                      tarefas.forEach(t => {
                                                                                                                                              const statusStr = t.concluida ? "[CONCLUÍDA]" : "[PENDENTE]";
                                                                                                                                                      const prioridadeStr = t.prioridade === 1 ? "Alta" : t.prioridade === 2 ? "Média" : "Baixa";
                                                                                                                                                              console.log(`ID: ${t.codigo} | Título: ${t.titulo} | Prioridade: ${prioridadeStr} | Status: ${statusStr}`);
                                                                                                                                                                  });
                                                                                                                                                                      console.log("=========================\n");
                                                                                                                                                                      }

                                                                                                                                                                      /**
                                                                                                                                                                       * Função para marcar uma tarefa como concluída pelo código
                                                                                                                                                                        */
                                                                                                                                                                        function concluirTarefa(codigo) {
                                                                                                                                                                            const tarefa = tarefas.find(t => t.codigo === codigo);
                                                                                                                                                                                if (!tarefa) {
                                                                                                                                                                                        console.log(`❌ Erro: Tarefa com código ${codigo} não foi encontrada.`);
                                                                                                                                                                                                return;
                                                                                                                                                                                                    }

                                                                                                                                                                                                        tarefa.concluida = true;
                                                                                                                                                                                                            console.log(`Sucesso: Tarefa "${tarefa.titulo}" marcada como concluída!`);
                                                                                                                                                                                                            }

                                                                                                                                                                                                            /**
                                                                                                                                                                                                             * Função para alterar a prioridade de uma tarefa
                                                                                                                                                                                                              */
                                                                                                                                                                                                              function alterarPrioridade(codigo, novaPrioridade) {
                                                                                                                                                                                                                  if (novaPrioridade < 1 || novaPrioridade > 3) {
                                                                                                                                                                                                                          console.log(`❌ Erro: Nova prioridade inválida (${novaPrioridade}). Use um valor entre 1 e 3.`);
                                                                                                                                                                                                                                  return;
                                                                                                                                                                                                                                      }

                                                                                                                                                                                                                                          const tarefa = tarefas.find(t => t.codigo === codigo);
                                                                                                                                                                                                                                              if (!tarefa) {
                                                                                                                                                                                                                                                      console.log(`❌ Erro: Tarefa com código ${codigo} não foi encontrada.`);
                                                                                                                                                                                                                                                              return;
                                                                                                                                                                                                                                                                  }

                                                                                                                                                                                                                                                                      tarefa.prioridade = novaPrioridade;
                                                                                                                                                                                                                                                                          console.log(`Sucesso: Prioridade da tarefa "${tarefa.titulo}" alterada para ${novaPrioridade}.`);
                                                                                                                                                                                                                                                                          }

                                                                                                                                                                                                                                                                          // Testes executando no console
                                                                                                                                                                                                                                                                          cadastrarTarefa("Estudar JavaScript", 1);
                                                                                                                                                                                                                                                                          cadastrarTarefa("Fazer exercícios", 2);
                                                                                                                                                                                                                                                                          listarTarefas();
                                                                                                                                                                                                                                                                          concluirTarefa(1);
                                                                                                                                                                                                                                                                          listarTarefas();