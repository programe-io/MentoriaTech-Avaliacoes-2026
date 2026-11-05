let tarefas = [];
let proximoCodigo = 1;

function cadastrarTarefa() {
  const titulo = document.getElementById("titulo").value;
    const prioridade = document.getElementById("prioridade").value;

      if (titulo.trim() === "") {
          alert("Digite o título da tarefa!");
              return;
                }

                  const tarefa = {
                      codigo: proximoCodigo++,
                          titulo: titulo,
                              prioridade: prioridade,
                                  status: "Pendente"
                                    };

                                      tarefas.push(tarefa);

                                        document.getElementById("titulo").value = "";

                                          mostrarTarefas();
                                          }

                                          function mostrarTarefas() {
                                            const lista = document.getElementById("listaTarefas");

                                              lista.innerHTML = "";

                                                tarefas.forEach(function(tarefa) {
                                                    const item = document.createElement("li");

                                                        item.innerHTML = `
                                                              <strong>${tarefa.titulo}</strong>
                                                                    <p>Código: ${tarefa.codigo}</p>
                                                                          <p>Prioridade: ${tarefa.prioridade}</p>
                                                                                <p>Status: ${tarefa.status}</p>

                                                                                      <div class="acoes">
                                                                                              <button onclick="concluirTarefa(${tarefa.codigo})">
                                                                                                        Concluir
                                                                                                                </button>

                                                                                                                        <button onclick="excluirTarefa(${tarefa.codigo})">
                                                                                                                                  Excluir
                                                                                                                                          </button>
                                                                                                                                                </div>
                                                                                                                                                    `;

                                                                                                                                                        if (tarefa.status === "Concluída") {
                                                                                                                                                              item.classList.add("concluida");
                                                                                                                                                                  }

                                                                                                                                                                      lista.appendChild(item);
                                                                                                                                                                        });
                                                                                                                                                                        }

                                                                                                                                                                        function concluirTarefa(codigo) {
                                                                                                                                                                          const tarefa = tarefas.find(t => t.codigo === codigo);

                                                                                                                                                                            if (tarefa) {
                                                                                                                                                                                tarefa.status = "Concluída";
                                                                                                                                                                                    mostrarTarefas();
                                                                                                                                                                                      }
                                                                                                                                                                                      }

                                                                                                                                                                                      function excluirTarefa(codigo) {
                                                                                                                                                                                        tarefas = tarefas.filter(t => t.codigo !== codigo);
                                                                                                                                                                                          mostrarTarefas();
                                                                                                                                                                                          }