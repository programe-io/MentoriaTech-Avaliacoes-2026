const inputTarefa = document.getElementById("inputTarefa");
const botaoAdicionar = document.getElementById("botaoAdicionar");
const listaTarefas = document.getElementById("listaTarefas");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }

    function mostrarTarefas() {

        listaTarefas.innerHTML = "";

            tarefas.forEach(function(tarefa, indice) {

                    const li = document.createElement("li");

                            const texto = document.createElement("span");

                                    texto.textContent = tarefa.nome;

                                            texto.classList.add("texto-tarefa");

                                                    if (tarefa.concluida) {
                                                                texto.classList.add("concluida");
                                                                        }

                                                                                texto.addEventListener("click", function() {

                                                                                            tarefas[indice].concluida = !tarefas[indice].concluida;

                                                                                                        salvarTarefas();

                                                                                                                    mostrarTarefas();

                                                                                                                            });

                                                                                                                                    const botaoExcluir = document.createElement("button");

                                                                                                                                            botaoExcluir.textContent = "Excluir";

                                                                                                                                                    botaoExcluir.classList.add("botaoExcluir");

                                                                                                                                                            botaoExcluir.addEventListener("click", function() {

                                                                                                                                                                        tarefas.splice(indice, 1);

                                                                                                                                                                                    salvarTarefas();

                                                                                                                                                                                                mostrarTarefas();

                                                                                                                                                                                                        });

                                                                                                                                                                                                                li.appendChild(texto);

                                                                                                                                                                                                                        li.appendChild(botaoExcluir);

                                                                                                                                                                                                                                listaTarefas.appendChild(li);

                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                    function adicionarTarefa() {

                                                                                                                                                                                                                                        const nomeTarefa = inputTarefa.value.trim();

                                                                                                                                                                                                                                            if (nomeTarefa === "") {

                                                                                                                                                                                                                                                    alert("Digite uma tarefa!");

                                                                                                                                                                                                                                                            return;
                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                    const novaTarefa = {
                                                                                                                                                                                                                                                                            nome: nomeTarefa,
                                                                                                                                                                                                                                                                                    concluida: false
                                                                                                                                                                                                                                                                                        };

                                                                                                                                                                                                                                                                                            tarefas.push(novaTarefa);

                                                                                                                                                                                                                                                                                                salvarTarefas();

                                                                                                                                                                                                                                                                                                    mostrarTarefas();

                                                                                                                                                                                                                                                                                                        inputTarefa.value = "";

                                                                                                                                                                                                                                                                                                            inputTarefa.focus();
                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                            botaoAdicionar.addEventListener("click", adicionarTarefa);

                                                                                                                                                                                                                                                                                                            inputTarefa.addEventListener("keypress", function(evento) {

                                                                                                                                                                                                                                                                                                                if (evento.key === "Enter") {
                                                                                                                                                                                                                                                                                                                        adicionarTarefa();
                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                                                                                            mostrarTarefas();