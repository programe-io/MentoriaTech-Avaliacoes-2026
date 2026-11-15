let bancoTarefas = [];
let seqCodigo = 100;

function cadastrar() {
  const campoTitulo = document.getElementById("inputTitulo");
    const campoPrioridade = document.getElementById("inputPrioridade");
      const caixaErro = document.getElementById("erroMsg");

        caixaErro.textContent = "";

          const titulo = campoTitulo.value.trim();
            const prioridade = parseInt(campoPrioridade.value);

              // Validações obrigatórias especificadas no projeto[span_7](start_span)[span_7](end_span)
                if (titulo.length < 5) {
                    caixaErro.textContent = "Validação falhou: O título deve ter no mínimo 5 caracteres[span_8](start_span)[span_8](end_span).";
                        return;
                          }
                            if (isNaN(prioridade) || prioridade < 1 || prioridade > 3) {
                                caixaErro.textContent = "Validação falhou: A prioridade deve ser um valor entre 1 (alta) e 3 (baixa)[span_9](start_span)[span_9](end_span).";
                                    return;
                                      }

                                        const nova = {
                                            codigo: seqCodigo++,
                                                titulo: titulo,
                                                    prioridade: prioridade,
                                                        concluida: false
                                                          };

                                                            bancoTarefas.push(nova);
                                                              atualizarInterface();

                                                                campoTitulo.value = "";
                                                                  campoPrioridade.value = "";
                                                                  }

                                                                  function mudarStatus(codigo) {
                                                                    const t = bancoTarefas.find(item => item.codigo === codigo);
                                                                      if (t) {
                                                                          t.concluida = !t.concluida;
                                                                              atualizarInterface();
                                                                                }
                                                                                }

                                                                                function alterarPrioridade(codigo, novoValor) {
                                                                                  const t = bancoTarefas.find(item => item.codigo === codigo);
                                                                                    const p = parseInt(novoValor);
                                                                                      
                                                                                        if (t && p >= 1 && p <= 3) {
                                                                                            t.prioridade = p;
                                                                                                atualizarInterface();
                                                                                                  } else {
                                                                                                      alert("Prioridade inválida! Deve ser entre 1 e 3[span_10](start_span)[span_10](end_span).");
                                                                                                          atualizarInterface();
                                                                                                            }
                                                                                                            }

                                                                                                            function atualizarInterface() {
                                                                                                              const painel = document.getElementById("painelTarefas");
                                                                                                                painel.innerHTML = "";

                                                                                                                  if (bancoTarefas.length === 0) {
                                                                                                                      painel.innerHTML = "<p>Nenhuma tarefa cadastrada ainda.</p>";
                                                                                                                          return;
                                                                                                                            }

                                                                                                                              bancoTarefas.forEach(t => {
                                                                                                                                  const card = document.createElement("div");
                                                                                                                                      card.className = `tarefa-card ${t.concluida ? "concluida" : ""}`;
                                                                                                                                          card.innerHTML = `
                                                                                                                                                <div><b>Código:</b> #${t.codigo} | <b>Título:</b> ${t.titulo}</div>
                                                                                                                                                      <div class="acoes-linha">
                                                                                                                                                              <span>Prioridade atual:</span>
                                                                                                                                                                      <select onchange="alterarPrioridade(${t.codigo}, this.value)">
                                                                                                                                                                                <option value="1" ${t.prioridade === 1 ? "selected" : ""}>1 - Alta</option>
                                                                                                                                                                                          <option value="2" ${t.prioridade === 2 ? "selected" : ""}>2 - Média</option>
                                                                                                                                                                                                    <option value="3" ${t.prioridade === 3 ? "selected" : ""}>3 - Baixa</option>
                                                                                                                                                                                                            </select>
                                                                                                                                                                                                                    <button onclick="mudarStatus(${t.codigo})">
                                                                                                                                                                                                                              ${t.concluida ? "Marcar Pendente" : "Marcar Concluída"}
                                                                                                                                                                                                                                      </button>
                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                `;
                                                                                                                                                                                                                                                    painel.appendChild(card);
                                                                                                                                                                                                                                                      });
                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                      