
// Array de tarefas
let tarefas = [
    {
            id: 1,
                    titulo: "estudar JavaScript",
                            concluida: false
                                },
                                    {
                                            id: 2,
                                                    titulo: "montar o slide de apresentação do trabalho",
                                                            concluida: true
                                                                }
                                                                ];

                                                                // Contador de códigos
                                                                let contadorCodigo = 2;

                                                                // Função para gerar código
                                                                function gerarCodigo() {
                                                                    return ++contadorCodigo;
                                                                    }

                                                                    // Mapeamento dos elementos HTML
                                                                    const formTarefa = document.getElementById("form-tarefa");

                                                                    const inputTitulo = document.getElementById("input-titulo");

                                                                    const listaTarefas = document.getElementById("lista-tarefas");

                                                                    // Função render
                                                                    function render() {

                                                                        listaTarefas.innerHTML = "";

                                                                            tarefas.forEach(function(tarefa) {

                                                                                    const item = document.createElement("li");

                                                                                            item.textContent = tarefa.titulo;

                                                                                                    if (tarefa.concluida) {
                                                                                                                item.style.textDecoration = "line-through";
                                                                                                                        }

                                                                                                                                listaTarefas.appendChild(item);

                                                                                                                                    });

                                                                                                                                    }

                                                                                                                                    // Chamada inicial
                                                                                                                                    render();

                                                                                                                                    // Evento de submissão do formulário
                                                                                                                                    formTarefa.addEventListener("submit", function(event) {

                                                                                                                                        event.preventDefault();

                                                                                                                                            const novoTitulo = inputTitulo.value.trim();

                                                                                                                                                if (novoTitulo === "") {
                                                                                                                                                        return;
                                                                                                                                                            }

                                                                                                                                                                const novaTarefa = {
                                                                                                                                                                        id: gerarCodigo(),
                                                                                                                                                                                titulo: novoTitulo,
                                                                                                                                                                                        concluida: false
                                                                                                                                                                                            };

                                                                                                                                                                                                tarefas.push(novaTarefa);

                                                                                                                                                                                                    inputTitulo.value = "";

                                                                                                                                                                                                        render();

                                                                                                                                                                                                        });
                                                                                                                                                                                                        