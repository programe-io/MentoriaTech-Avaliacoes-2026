const imcForm = document.getElementById("imc-form");
const imcResultado = document.getElementById("imc-resultado");

const tarefaForm = document.getElementById("tarefa-form");
const tarefaInput = document.getElementById("tarefa-input");
const listaTarefas = document.getElementById("lista-tarefas");

const STORAGE_KEY = "tarefas_imc_app_v1";
let tarefas = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function classificarIMC(imc) {
  if (imc < 18.5) return "Abaixo do peso";
    if (imc < 25) return "Peso normal";
      if (imc < 30) return "Sobrepeso";
        if (imc < 35) return "Obesidade grau I";
          if (imc < 40) return "Obesidade grau II";
            return "Obesidade grau III";
            }

            imcForm.addEventListener("submit", (event) => {
              event.preventDefault();
                const peso = parseFloat(document.getElementById("peso").value);
                  const altura = parseFloat(document.getElementById("altura").value);

                    if (!peso || !altura || altura <= 0) {
                        imcResultado.textContent = "Informe valores válidos de peso e altura.";
                            return;
                              }

                                const imc = peso / (altura * altura);
                                  const categoria = classificarIMC(imc);
                                    imcResultado.innerHTML = `<strong>IMC: ${imc.toFixed(2)}</strong> — ${categoria}`;
                                    });

                                    function salvarTarefas() {
                                      localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
                                      }

                                      function renderizarTarefas() {
                                        listaTarefas.innerHTML = "";

                                          tarefas.forEach((tarefa) => {
                                              const li = document.createElement("li");
                                                  li.className = `item-tarefa ${tarefa.concluida ? "concluida" : ""}`;

                                                      const label = document.createElement("label");
                                                          label.className = "tarefa-texto";

                                                              const checkbox = document.createElement("input");
                                                                  checkbox.type = "checkbox";
                                                                      checkbox.checked = tarefa.concluida;
                                                                          checkbox.addEventListener("change", () => {
                                                                                tarefa.concluida = checkbox.checked;
                                                                                      salvarTarefas();
                                                                                            renderizarTarefas();
                                                                                                });

                                                                                                    const span = document.createElement("span");
                                                                                                        span.textContent = tarefa.titulo;

                                                                                                            label.append(checkbox, span);

                                                                                                                const btnRemover = document.createElement("button");
                                                                                                                    btnRemover.type = "button";
                                                                                                                        btnRemover.className = "btn-remover";
                                                                                                                            btnRemover.textContent = "Excluir";
                                                                                                                                btnRemover.addEventListener("click", () => {
                                                                                                                                      tarefas = tarefas.filter((item) => item.id !== tarefa.id);
                                                                                                                                            salvarTarefas();
                                                                                                                                                  renderizarTarefas();
                                                                                                                                                      });

                                                                                                                                                          li.append(label, btnRemover);
                                                                                                                                                              listaTarefas.appendChild(li);
                                                                                                                                                                });
                                                                                                                                                                }

                                                                                                                                                                tarefaForm.addEventListener("submit", (event) => {
                                                                                                                                                                  event.preventDefault();
                                                                                                                                                                    const titulo = tarefaInput.value.trim();
                                                                                                                                                                      if (!titulo) return;

                                                                                                                                                                        tarefas.push({
                                                                                                                                                                            id: crypto.randomUUID(),
                                                                                                                                                                                titulo,
                                                                                                                                                                                    concluida: false,
                                                                                                                                                                                      });

                                                                                                                                                                                        tarefaInput.value = "";
                                                                                                                                                                                          salvarTarefas();
                                                                                                                                                                                            renderizarTarefas();
                                                                                                                                                                                            });

                                                                                                                                                                                            renderizarTarefas();
                                                                                                                                                                                            