let contadorCodigo = 0;

let tarefas = [
    {
            id: gerarCodigo(),
                    titulo: "Estudar JavaScript",
                            concluida: false
                                },
                                    {
                                            id: gerarCodigo(),
                                                    titulo: "Montar o Slide de Apresentação do Trabalho",
                                                            concluida: true
                                                                }
                                                                ];

                                                                function gerarCodigo() {
                                                                    return ++contadorCodigo;
                                                                    }

                                                                    // Mapeamento dos elementos do DOM
                                                                    const formTarefa = document.getElementById("form-tarefa");
                                                                    const inputTitulo = document.getElementById("input-titulo");
                                                                    const listaTarefas = document.getElementById("lista-tarefas");

                                                                    function render() {
                                                                        listaTarefas.innerHTML = "";

                                                                            tarefas.forEach((tarefa) => {
                                                                                    const li = document.createElement("li");

                                                                                            li.textContent = tarefa.titulo;

                                                                                                    if (tarefa.concluida) {
                                                                                                                li.classList.add("concluida");
                                                                                                                        }

                                                                                                                                listaTarefas.appendChild(li);
                                                                                                                                    });
                                                                                                                                    }

                                                                                                                                    // Adicionar nova tarefa
                                                                                                                                    formTarefa.addEventListener("submit", (e) => {
                                                                                                                                        e.preventDefault();

                                                                                                                                            const novoTitulo = inputTitulo.value.trim();

                                                                                                                                                if (novoTitulo === "") return;

                                                                                                                                                    const novaTarefa = {
                                                                                                                                                            id: gerarCodigo(),
                                                                                                                                                                    titulo: novoTitulo,
                                                                                                                                                                            concluida: false
                                                                                                                                                                                };

                                                                                                                                                                                    tarefas.push(novaTarefa);

                                                                                                                                                                                        inputTitulo.value = "";

                                                                                                                                                                                            render();
                                                                                                                                                                                            });

                                                                                                                                                                                            // Mostrar tarefas
                                                                                                                                                                                            render();