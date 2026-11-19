let tarefas = [];
let geradorCodigo = 0;

// 5. Validação dos dados da tarefa
function validarDadosDaTarefa(titulo, prioridade) {
  if (titulo.length < 5) {
      throw new Error("O título deve ter no mínimo 5 caracteres.");
        }
          if (prioridade < 1 || prioridade > 3) {
              throw new Error("A prioridade deve ser entre 1 e 3.");
                }
                }

                // 9. Busca de tarefas com find
                function buscarTarefa(codigo) {
                  const tarefa = tarefas.find((t) => t.codigo === codigo);
                    if (!tarefa) {
                        throw new Error("Código não encontrado.");
                          }
                            return tarefa;
                            }

                            // 6. Cadastro e modelagem de uma tarefa
                            function cadastrarTarefa(titulo, prioridade) {
                              validarDadosDaTarefa(titulo, prioridade);
                                geradorCodigo++; // 7. Geração automática de códigos

                                  const novaTarefa = {
                                      codigo: geradorCodigo,
                                          titulo: titulo,
                                              prioridade: prioridade,
                                                  status: true // true = em execução
                                                    };

                                                      tarefas.push(novaTarefa);
                                                        return novaTarefa;
                                                        }

                                                        // 8. Listagem das tarefas cadastradas
                                                        function listarTarefas() {
                                                          return tarefas;
                                                          }

                                                          // 10. Conclusão de uma tarefa
                                                          function concluirTarefa(codigo) {
                                                            const tarefa = buscarTarefa(codigo);
                                                              if (tarefa.status === false) {
                                                                  throw new Error("A tarefa já estava concluída.");
                                                                    }
                                                                      tarefa.status = false;
                                                                      }

                                                                      // 11. Alteração da prioridade
                                                                      function alterarPrioridade(codigo, novaPrioridade) {
                                                                        const tarefa = buscarTarefa(codigo);
                                                                          validarDadosDaTarefa(tarefa.titulo, novaPrioridade);
                                                                            tarefa.prioridade = novaPrioridade;
                                                                            }

                                                                            // --- Ligação com o HTML ---
                                                                            const form = document.getElementById("form-tarefa");
                                                                            const lista = document.getElementById("lista-tarefas");
                                                                            const mensagem = document.getElementById("mensagem");
                                                                            const textoVazio = document.getElementById("vazio");

                                                                            function mostrarMensagem(texto, tipo) {
                                                                              mensagem.textContent = texto;
                                                                                mensagem.className = "mensagem " + tipo;
                                                                                }

                                                                                function renderizar() {
                                                                                  lista.innerHTML = "";
                                                                                    textoVazio.style.display = listarTarefas().length === 0 ? "block" : "none";

                                                                                      listarTarefas().forEach((t) => {
                                                                                          const li = document.createElement("li");
                                                                                              li.className = "tarefa" + (t.status ? "" : " concluida");
                                                                                                  li.innerHTML = `
                                                                                                        <div>
                                                                                                                <span class="titulo"><b>#${t.codigo} - ${t.titulo}</b></span><br>
                                                                                                                        <span class="badge">Prioridade ${t.prioridade}</span>
                                                                                                                                <span class="status">${t.status ? "Em execução" : "Concluída"}</span>
                                                                                                                                      </div>
                                                                                                                                            <div class="acoes">
                                                                                                                                                    <button class="btn-concluir">Concluir</button>
                                                                                                                                                            <button class="btn-prioridade">Prioridade</button>
                                                                                                                                                                  </div>
                                                                                                                                                                      `;
                                                                                                                                                                          li.querySelector(".btn-concluir").onclick = () => {
                                                                                                                                                                                try { concluirTarefa(t.codigo); mostrarMensagem("Tarefa concluída!", "sucesso"); renderizar(); }
                                                                                                                                                                                      catch (e) { mostrarMensagem(e.message, "erro"); }
                                                                                                                                                                                          };
                                                                                                                                                                                              li.querySelector(".btn-prioridade").onclick = () => {
                                                                                                                                                                                                    const nova = Number(prompt("Nova prioridade (1 a 3):"));
                                                                                                                                                                                                          try { alterarPrioridade(t.codigo, nova); mostrarMensagem("Prioridade alterada!", "sucesso"); renderizar(); }
                                                                                                                                                                                                                catch (e) { mostrarMensagem(e.message, "erro"); }
                                                                                                                                                                                                                    };
                                                                                                                                                                                                                        lista.appendChild(li);
                                                                                                                                                                                                                          });
                                                                                                                                                                                                                          }

                                                                                                                                                                                                                          form.addEventListener("submit", (e) => {
                                                                                                                                                                                                                            e.preventDefault();
                                                                                                                                                                                                                              const titulo = document.getElementById("titulo").value.trim();
                                                                                                                                                                                                                                const prioridade = Number(document.getElementById("prioridade").value);
                                                                                                                                                                                                                                  try {
                                                                                                                                                                                                                                      cadastrarTarefa(titulo, prioridade);
                                                                                                                                                                                                                                          mostrarMensagem("Tarefa cadastrada com sucesso!", "sucesso");
                                                                                                                                                                                                                                              form.reset();
                                                                                                                                                                                                                                                  renderizar();
                                                                                                                                                                                                                                                    } catch (erro) {
                                                                                                                                                                                                                                                        mostrarMensagem(erro.message, "erro");
                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                          });

                                                                                                                                                                                                                                                          renderizar();