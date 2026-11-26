const input = document.getElementById("tarefaInput");
const botaoAdicionar = document.getElementById("adicionarBtn");
const lista = document.getElementById("listaTarefas");

function adicionarTarefa() {
  const texto = input.value.trim();

    if (texto === "") {
        alert("Por favor, digite uma tarefa.");
            return;
              }

                const item = document.createElement("li");
                  item.innerHTML = `
                      <span>${texto}</span>
                          <button class="remover-btn">X</button>
                            `;

                              item.querySelector(".remover-btn").addEventListener("click", () => {
                                  item.remove();
                                    });

                                      lista.appendChild(item);
                                        input.value = "";
                                          input.focus();
                                          }

                                          botaoAdicionar.addEventListener("click", adicionarTarefa);

                                          input.addEventListener("keypress", (evento) => {
                                            if (evento.key === "Enter") {
                                                adicionarTarefa();
                                                  }
                                                  });
                                                  