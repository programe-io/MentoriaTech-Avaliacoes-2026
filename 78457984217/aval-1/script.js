// Selecionando os elementos do HTML
const inputTarefa = document.getElementById('inputTarefa');
const btnAdicionar = document.getElementById('btnAdicionar');
const listaTarefas = document.getElementById('listaTarefas');

// Função para adicionar uma nova tarefa
function adicionarTarefa() {
    const textoTarefa = inputTarefa.value.trim();

        // Se o campo estiver vazio, não faz nada
            if (textoTarefa === "") {
                    alert("Por favor, digite uma tarefa!");
                            return;
                                }

                                    // 1. Cria um elemento <li> (item da lista)
                                        const li = document.createElement('li');
                                            li.textContent = textoTarefa;

                                                // 2. Permite clicar no item para marcá-lo como concluído
                                                    li.addEventListener('click', function(e) {
                                                            // Evita que o clique no botão de remover acione isso
                                                                    if (e.target.tagName !== 'BUTTON') {
                                                                                li.classList.toggle('concluido');
                                                                                        }
                                                                                            });

                                                                                                // 3. Cria um botão de deletar para cada tarefa
                                                                                                    const btnRemover = document.createElement('button');
                                                                                                        btnRemover.textContent = 'X';
                                                                                                            btnRemover.classList.add('btn-remover');
                                                                                                                
                                                                                                                    // Ação de apagar o item ao clicar no "X"
                                                                                                                        btnRemover.addEventListener('click', function() {
                                                                                                                                listaTarefas.removeChild(li);
                                                                                                                                    });

                                                                                                                                        // 4. Junta tudo: coloca o botão dentro do <li>, e o <li> dentro da lista <ul>
                                                                                                                                            li.appendChild(btnRemover);
                                                                                                                                                listaTarefas.appendChild(li);

                                                                                                                                                    // 5. Limpa a caixa de texto e foca nela novamente
                                                                                                                                                        inputTarefa.value = "";
                                                                                                                                                            inputTarefa.focus();
                                                                                                                                                            }

                                                                                                                                                            // Evento ao clicar no botão "Adicionar"
                                                                                                                                                            btnAdicionar.addEventListener('click', adicionarTarefa);

                                                                                                                                                            // Evento ao apertar a tecla "Enter" no teclado dentro do campo de texto
                                                                                                                                                            inputTarefa.addEventListener('keypress', function(evento) {
                                                                                                                                                                if (evento.key === 'Enter') {
                                                                                                                                                                        adicionarTarefa();
                                                                                                                                                                            }
                                                                                                                                                                            });