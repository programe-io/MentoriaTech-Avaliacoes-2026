// 1. Armazenamento central e gerador independente de códigos
const tarefas = [];
let proximoCodigo = 0;

// 2. Validação dos dados da tarefa
function validarDadosDaTarefa(titulo, prioridade) {
  if (typeof titulo !== "string" || titulo.trim().length < 5) {
      throw new Error("O título deve ter no mínimo cinco caracteres.");
        }

          if (typeof prioridade !== "number" || Number.isNaN(prioridade) || prioridade < 1 || prioridade > 3) {
              throw new Error("A prioridade deve ser um número entre 1 e 3.");
                }
                }

                // 3. Geração automática de código único
                function gerarCodigo() {
                  proximoCodigo += 1;
                    return proximoCodigo;
                    }

                    // 4. Cadastro e modelagem de uma tarefa
                    function cadastrarTarefa(titulo, prioridade) {
                      validarDadosDaTarefa(titulo, prioridade);

                        const novaTarefa = {
                            codigo: gerarCodigo(),
                                titulo: titulo.trim(),
                                    prioridade,
                                        status: true // true = em execução / não concluída; false = concluída
                                          };

                                            tarefas.push(novaTarefa);
                                              return novaTarefa;
                                              }

                                              // 5. Listagem das tarefas cadastradas (retorna o array)
                                              function listarTarefas() {
                                                return tarefas;
                                                }

                                                // 6. Busca de tarefa pelo código utilizando find
                                                function buscarTarefa(codigo) {
                                                  const tarefaEncontrada = tarefas.find((tarefa) => tarefa.codigo === codigo);

                                                    if (!tarefaEncontrada) {
                                                        throw new Error(`Tarefa com código ${codigo} não encontrada.`);
                                                          }

                                                            return tarefaEncontrada;
                                                            }

                                                            // 7. Conclusão de uma tarefa
                                                            function concluirTarefa(codigo) {
                                                              const tarefa = buscarTarefa(codigo);

                                                                if (!tarefa.status) {
                                                                    throw new Error(`A tarefa #${codigo} já estava concluída.`);
                                                                      }

                                                                        tarefa.status = false;
                                                                          return tarefa;
                                                                          }

                                                                          // 8. Alteração da prioridade reaproveitando validação e busca
                                                                          function alterarPrioridade(codigo, novaPrioridade) {
                                                                            const tarefa = buscarTarefa(codigo);
                                                                              validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

                                                                                tarefa.prioridade = novaPrioridade;
                                                                                  return tarefa;
                                                                                  }

                                                                                  // --- Integração com a interface HTML ---
                                                                                  const formTarefa = document.getElementById("form-tarefa");
                                                                                  const inputTitulo = document.getElementById("titulo");
                                                                                  const selectPrioridade = document.getElementById("prioridade");
                                                                                  const inputCodigoAlvo = document.getElementById("codigo-alvo");
                                                                                  const selectNovaPrioridade = document.getElementById("nova-prioridade");
                                                                                  const btnAlterarPrioridade = document.getElementById("btn-alterar-prioridade");
                                                                                  const btnConcluir = document.getElementById("btn-concluir");
                                                                                  const btnListar = document.getElementById("btn-listar");
                                                                                  const listaTarefasEl = document.getElementById("lista-tarefas");
                                                                                  const mensagemEl = document.getElementById("mensagem");

                                                                                  function exibirMensagem(texto, tipo = "ok") {
                                                                                    mensagemEl.textContent = texto;
                                                                                      mensagemEl.className = `mensagem ${tipo}`;
                                                                                      }

                                                                                      function renderizarLista() {
                                                                                        const lista = listarTarefas();
                                                                                          console.log("Tarefas cadastradas:", lista);
                                                                                            listaTarefasEl.innerHTML = "";

                                                                                              if (lista.length === 0) {
                                                                                                  listaTarefasEl.innerHTML = "<li>Nenhuma tarefa cadastrada até o momento.</li>";
                                                                                                      return;
                                                                                                        }

                                                                                                          for (const tarefa of lista) {
                                                                                                              const li = document.createElement("li");
                                                                                                                  li.className = `tarefa-item ${tarefa.status ? "" : "concluida"}`;

                                                                                                                      const situacaoTexto = tarefa.status ? "Em execução" : "Concluída";

                                                                                                                          li.innerHTML = `
                                                                                                                                <div>
                                                                                                                                        <strong>#${tarefa.codigo} - ${tarefa.titulo}</strong>
                                                                                                                                                <div class="tarefa-meta">
                                                                                                                                                          Prioridade: ${tarefa.prioridade} | Status: ${situacaoTexto}
                                                                                                                                                                  </div>
                                                                                                                                                                        </div>
                                                                                                                                                                            `;

                                                                                                                                                                                listaTarefasEl.appendChild(li);
                                                                                                                                                                                  }
                                                                                                                                                                                  }

                                                                                                                                                                                  formTarefa.addEventListener("submit", (event) => {
                                                                                                                                                                                    event.preventDefault();
                                                                                                                                                                                      try {
                                                                                                                                                                                          const criada = cadastrarTarefa(inputTitulo.value, Number(selectPrioridade.value));
                                                                                                                                                                                              exibirMensagem(`Tarefa #${criada.codigo} cadastrada com sucesso!`, "ok");
                                                                                                                                                                                                  inputTitulo.value = "";
                                                                                                                                                                                                      renderizarLista();
                                                                                                                                                                                                        } catch (erro) {
                                                                                                                                                                                                            exibirMensagem(erro.message, "erro");
                                                                                                                                                                                                              }
                                                                                                                                                                                                              });

                                                                                                                                                                                                              btnAlterarPrioridade.addEventListener("click", () => {
                                                                                                                                                                                                                try {
                                                                                                                                                                                                                    const codigo = Number(inputCodigoAlvo.value);
                                                                                                                                                                                                                        const novaPrioridade = Number(selectNovaPrioridade.value);
                                                                                                                                                                                                                            const atualizada = alterarPrioridade(codigo, novaPrioridade);
                                                                                                                                                                                                                                exibirMensagem(`Prioridade da tarefa #${atualizada.codigo} alterada para ${atualizada.prioridade}.`, "ok");
                                                                                                                                                                                                                                    renderizarLista();
                                                                                                                                                                                                                                      } catch (erro) {
                                                                                                                                                                                                                                          exibirMensagem(erro.message, "erro");
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                            btnConcluir.addEventListener("click", () => {
                                                                                                                                                                                                                                              try {
                                                                                                                                                                                                                                                  const codigo = Number(inputCodigoAlvo.value);
                                                                                                                                                                                                                                                      const concluida = concluirTarefa(codigo);
                                                                                                                                                                                                                                                          exibirMensagem(`Tarefa #${concluida.codigo} marcada como concluída!`, "ok");
                                                                                                                                                                                                                                                              renderizarLista();
                                                                                                                                                                                                                                                                } catch (erro) {
                                                                                                                                                                                                                                                                    exibirMensagem(erro.message, "erro");
                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                      });

                                                                                                                                                                                                                                                                      btnListar.addEventListener("click", () => {
                                                                                                                                                                                                                                                                        renderizarLista();
                                                                                                                                                                                                                                                                          exibirMensagem("Lista atualizada (confira também o console).", "ok");
                                                                                                                                                                                                                                                                          });

                                                                                                                                                                                                                                                                          renderizarLista();
                                                                                                                                                                                                                                                                          