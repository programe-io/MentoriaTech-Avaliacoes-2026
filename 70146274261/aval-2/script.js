// PROJETO: Sistema de gerenciamento de tarefas
// Campos: código, título, prioridade e status de conclusão

let tarefas = [];

// Regras de validação:
// - Título deve ter no mínimo 5 caracteres
// - Prioridade deve ser entre 1 (alta) e 3 (baixa)

// 1. Cadastrar uma nova tarefa
function cadastrarTarefa(codigo, titulo, prioridade) {
  // Validação título
    if (titulo.length < 5) {
        console.log("❌ Erro: Título deve ter no mínimo 5 caracteres!");
            return false;
              }
                // Validação prioridade
                  if (prioridade < 1 || prioridade > 3) {
                      console.log("❌ Erro: Prioridade deve ser entre 1 (alta) e 3 (baixa)!");
                          return false;
                            }
                              // Validação código repetido
                                if (tarefas.find(t => t.codigo === codigo)) {
                                    console.log(`❌ Erro: Código ${codigo} já existe!`);
                                        return false;
                                          }

                                            let novaTarefa = {
                                                codigo: codigo,
                                                    titulo: titulo,
                                                        prioridade: prioridade, // 1=alta, 2=média, 3=baixa
                                                            concluida: false
                                                              };

                                                                tarefas.push(novaTarefa);
                                                                  console.log(`✅ Tarefa "${titulo}" cadastrada!`);
                                                                    return true;
                                                                    }

                                                                    // 2. Listar as tarefas cadastradas
                                                                    function listarTarefas() {
                                                                      if (tarefas.length === 0) {
                                                                          console.log("📭 Nenhuma tarefa cadastrada!");
                                                                              return;
                                                                                }

                                                                                  console.log("\n========== LISTA DE TAREFAS ==========");
                                                                                    tarefas.forEach(t => {
                                                                                        let status = t.concluida ? "✔ CONCLUÍDA" : "⏳ PENDENTE";
                                                                                            let prioTexto = t.prioridade === 1 ? "ALTA" : t.prioridade === 2 ? "MÉDIA" : "BAIXA";
                                                                                                console.log(`[${t.codigo}] ${t.titulo} | Prioridade: ${prioTexto} (${t.prioridade}) | ${status}`);
                                                                                                  });
                                                                                                    console.log("======================================\n");
                                                                                                    }

                                                                                                    // 3. Marcar uma tarefa como concluída
                                                                                                    function concluirTarefa(codigo) {
                                                                                                      let tarefa = tarefas.find(t => t.codigo === codigo);
                                                                                                        if (tarefa) {
                                                                                                            tarefa.concluida = true;
                                                                                                                console.log(`✔ Tarefa ${codigo} marcada como concluída!`);
                                                                                                                    return true;
                                                                                                                      } else {
                                                                                                                          console.log(`❌ Tarefa ${codigo} não encontrada!`);
                                                                                                                              return false;
                                                                                                                                }
                                                                                                                                }

                                                                                                                                // 4. Alterar a prioridade de uma tarefa
                                                                                                                                function alterarPrioridade(codigo, novaPrioridade) {
                                                                                                                                  if (novaPrioridade < 1 || novaPrioridade > 3) {
                                                                                                                                      console.log("❌ Erro: Prioridade deve ser entre 1 e 3!");
                                                                                                                                          return false;
                                                                                                                                            }

                                                                                                                                              let tarefa = tarefas.find(t => t.codigo === codigo);
                                                                                                                                                if (tarefa) {
                                                                                                                                                    tarefa.prioridade = novaPrioridade;
                                                                                                                                                        console.log(`🔄 Prioridade da tarefa ${codigo} alterada para ${novaPrioridade}`);
                                                                                                                                                            return true;
                                                                                                                                                              } else {
                                                                                                                                                                  console.log(`❌ Tarefa ${codigo} não encontrada!`);
                                                                                                                                                                      return false;
                                                                                                                                                                        }
                                                                                                                                                                        }

                                                                                                                                                                        // ====== TESTE ======
                                                                                                                                                                        cadastrarTarefa(1, "Estudar JavaScript", 1);
                                                                                                                                                                        cadastrarTarefa(2, "Fazer projeto da faculdade", 1);
                                                                                                                                                                        cadastrarTarefa(3, "Comprar café", 3);

                                                                                                                                                                        listarTarefas();

                                                                                                                                                                        concluirTarefa(1);
                                                                                                                                                                        alterarPrioridade(3, 2);

                                                                                                                                                                        listarTarefas();

                                                                                                                                                                        // Teste das validações
                                                                                                                                                                        cadastrarTarefa(4, "Oi", 1); // vai dar erro - menos de 5 caracteres
                                                                                                                                                                        cadastrarTarefa(5, "Teste valido", 5); // vai dar erro - prioridade inválida