// Armazena as tarefas
let tarefas = [];
let proximoCodigo = 1;

// ==========================================
// 1. Cadastrar uma nova tarefa
// ==========================================
function cadastrarTarefa(titulo, prioridade) {
  // Validação: título com no mínimo 5 caracteres
    if (titulo.length < 5) {
        console.log("❌ Erro: O título deve ter no mínimo 5 caracteres.");
            return;
              }

                // Validação: prioridade entre 1 e 3
                  if (prioridade < 1 || prioridade > 3) {
                      console.log("❌ Erro: A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).");
                          return;
                            }

                              // Cria a nova tarefa
                                const novaTarefa = {
                                    codigo: proximoCodigo++,
                                        titulo: titulo,
                                            prioridade: prioridade,
                                                concluida: false
                                                  };

                                                    tarefas.push(novaTarefa);
                                                      console.log(`✅ Tarefa "${titulo}" cadastrada com sucesso!`);
                                                      }

                                                      // ==========================================
                                                      // 2. Listar todas as tarefas cadastradas
                                                      // ==========================================
                                                      function listarTarefas() {
                                                        if (tarefas.length === 0) {
                                                            console.log("📋 Nenhuma tarefa cadastrada.");
                                                                return;
                                                                  }

                                                                    console.log("\n══════════════════ LISTA DE TAREFAS ══════════════════");
                                                                      tarefas.forEach(tarefa => {
                                                                          const status = tarefa.concluida ? "✅ Concluída" : "⏳ Pendente";
                                                                              let nivelPrioridade;
                                                                                  if (tarefa.prioridade === 1) nivelPrioridade = "🔴 Alta";
                                                                                      else if (tarefa.prioridade === 2) nivelPrioridade = "🟡 Média";
                                                                                          else nivelPrioridade = "🟢 Baixa";

                                                                                              console.log(
                                                                                                    `Código: ${tarefa.codigo} | ` +
                                                                                                          `Título: ${tarefa.titulo} | ` +
                                                                                                                `Prioridade: ${nivelPrioridade} | ` +
                                                                                                                      `Status: ${status}`
                                                                                                                          );
                                                                                                                            });
                                                                                                                              console.log("═══════════════════════════════════════════════════════\n");
                                                                                                                              }

                                                                                                                              // ==========================================
                                                                                                                              // 3. Marcar tarefa como concluída
                                                                                                                              // ==========================================
                                                                                                                              function marcarComoConcluida(codigo) {
                                                                                                                                const tarefa = tarefas.find(t => t.codigo === codigo);
                                                                                                                                  
                                                                                                                                    if (!tarefa) {
                                                                                                                                        console.log(`❌ Tarefa com código ${codigo} não encontrada.`);
                                                                                                                                            return;
                                                                                                                                              }

                                                                                                                                                tarefa.concluida = true;
                                                                                                                                                  console.log(`✅ Tarefa "${tarefa.titulo}" marcada como concluída!`);
                                                                                                                                                  }

                                                                                                                                                  // ==========================================
                                                                                                                                                  // 4. Alterar prioridade de uma tarefa
                                                                                                                                                  // ==========================================
                                                                                                                                                  function alterarPrioridade(codigo, novaPrioridade) {
                                                                                                                                                    const tarefa = tarefas.find(t => t.codigo === codigo);
                                                                                                                                                      
                                                                                                                                                        if (!tarefa) {
                                                                                                                                                            console.log(`❌ Tarefa com código ${codigo} não encontrada.`);
                                                                                                                                                                return;
                                                                                                                                                                  }

                                                                                                                                                                    if (novaPrioridade < 1 || novaPrioridade > 3) {
                                                                                                                                                                        console.log("❌ Erro: A prioridade deve ser um valor entre 1 e 3.");
                                                                                                                                                                            return;
                                                                                                                                                                              }

                                                                                                                                                                                tarefa.prioridade = novaPrioridade;
                                                                                                                                                                                  console.log(`✅ Prioridade da tarefa "${tarefa.titulo}" alterada com sucesso!`);
                                                                                                                                                                                  }

                                                                                                                                                                                  // ==========================================
                                                                                                                                                                                  // 📌 Exemplos de uso
                                                                                                                                                                                  // ==========================================
                                                                                                                                                                                  console.log("===== 🚀 INICIANDO SISTEMA DE TAREFAS =====\n");

                                                                                                                                                                                  // Cadastrando tarefas
                                                                                                                                                                                  cadastrarTarefa("Estudar JavaScript", 1);
                                                                                                                                                                                  cadastrarTarefa("Fazer exercícios", 2);
                                                                                                                                                                                  cadastrarTarefa("Organizar quarto", 3);

                                                                                                                                                                                  // Tentando cadastrar com título curto (erro esperado)
                                                                                                                                                                                  cadastrarTarefa("Teste", 1);

                                                                                                                                                                                  // Tentando cadastrar com prioridade inválida (erro esperado)
                                                                                                                                                                                  cadastrarTarefa("Ler um livro", 5);

                                                                                                                                                                                  // Listando todas as tarefas
                                                                                                                                                                                  listarTarefas();

                                                                                                                                                                                  // Marcando tarefa como concluída
                                                                                                                                                                                  marcarComoConcluida(1);

                                                                                                                                                                                  // Alterando prioridade
                                                                                                                                                                                  alterarPrioridade(2, 1);

                                                                                                                                                                                  // Listando novamente para ver as alterações
                                                                                                                                                                                  listarTarefas();