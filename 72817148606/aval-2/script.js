let tarefas = [];
let idCounter = 1;

function cadastrarTarefa() {
  const titulo = document.getElementById("titulo").value.trim();
    const prioridade = parseInt(document.getElementById("prioridade").value);
      const msg = document.getElementById("mensagem");
        
          msg.textContent = "";

            if (titulo.length < 5) {
                msg.textContent = "Erro: O título deve ter no mínimo 5 caracteres[span_4](start_span)[span_4](end_span).";
                    return;
                      }
                        if (prioridade < 1 || prioridade > 3 || isNaN(prioridade)) {
                            msg.textContent = "Erro: A prioridade deve estar entre 1 e 3[span_5](start_span)[span_5](end_span).";
                                return;
                                  }

                                    tarefas.push({ codigo: idCounter++, titulo, prioridade, concluida: false });
                                      renderizar();
                                        
                                          document.getElementById("titulo").value = "";
                                            document.getElementById("prioridade").value = "";
                                            }

                                            function alternarConclusao(codigo) {
                                              const tarefa = tarefas.find(t => t.codigo === codigo);
                                                if (tarefa) {
                                                    tarefa.concluida = !tarefa.concluida;
                                                        renderizar();
                                                          }
                                                          }

                                                          function renderizar() {
                                                            const container = document.getElementById("containerTarefas");
                                                              container.innerHTML = "";

                                                                tarefas.forEach(t => {
                                                                    const div = document.createElement("div");
                                                                        div.className = `card-tarefa ${t.concluida ? "concluida" : ""}`;
                                                                            div.innerHTML = `
                                                                                  <span><b>#${t.codigo}</b> - ${t.titulo} (Prioridade: ${t.prioridade})</span>
                                                                                        <button class="btn-acao" onclick="alternarConclusao(${t.codigo})">
                                                                                                ${t.concluida ? "Desfazer" : "Concluir"}
                                                                                                      </button>
                                                                                                          `;
                                                                                                              container.appendChild(div);
                                                                                                                });
                                                                                                                }
                                                                                                                