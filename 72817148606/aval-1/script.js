let tarefas = [];
let contadorCodigo = 1;

function cadastrarTarefa() {
  const tituloInput = document.getElementById("titulo");
    const prioridadeInput = document.getElementById("prioridade");
      const mensagemDiv = document.getElementById("mensagem");
        
          mensagemDiv.textContent = "";

            const titulo = tituloInput.value.trim();
              const prioridade = parseInt(prioridadeInput.value);

                // Regras de validação da imagem[span_2](start_span)[span_2](end_span)
                  if (titulo.length < 5) {
                      mensagemDiv.textContent = "O título deve ter no mínimo 5 caracteres.";
                          return;
                            }
                              if (isNaN(prioridade) || prioridade < 1 || prioridade > 3) {
                                  mensagemDiv.textContent = "A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).";
                                      return;
                                        }

                                          const novaTarefa = {
                                              codigo: contadorCodigo++,
                                                  titulo: titulo,
                                                      prioridade: prioridade,
                                                          concluida: false // status de conclusão inicial
                                                            };

                                                              tarefas.push(novaTarefa);
                                                                listarTarefas();
                                                                  
                                                                    tituloInput.value = "";
                                                                      prioridadeInput.value = "";
                                                                      }

                                                                      function listarTarefas() {
                                                                        const lista = document.getElementById("listaTarefas");
                                                                          lista.innerHTML = "";

                                                                            tarefas.forEach(t => {
                                                                                const item = document.createElement("li");
                                                                                    item.textContent = `Cód: ${t.codigo} | Título: ${t.titulo} | Prioridade: ${t.prioridade} | Status: ${t.concluida ? "Concluída" : "Pendente"}`;
                                                                                        lista.appendChild(item);
                                                                                          });
                                                                                          }
                                                                                          