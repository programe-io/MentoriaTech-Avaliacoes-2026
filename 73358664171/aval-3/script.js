let concluidas = 0;

function adicionar() {
  const campo = document.getElementById("tarefa");
    const texto = campo.value.trim();

      if (texto === "") {
          alert("Digite uma tarefa!");
              return;
                }

                  const item = document.createElement("li");
                    item.textContent = texto;

                      item.onclick = function() {
                          if (!item.classList.contains("concluida")) {
                                item.classList.add("concluida");
                                      concluidas++;
                                          } else {
                                                item.classList.remove("concluida");
                                                      concluidas--;
                                                          }

                                                              document.getElementById("contador").textContent =
                                                                    "Tarefas concluídas: " + concluidas;
                                                                      };

                                                                        document.getElementById("lista").appendChild(item);
                                                                          campo.value = "";
                                                                          }