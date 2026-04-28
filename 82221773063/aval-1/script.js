// Selecionando os elementos que vamos usar
const inputTarefa = document.querySelector('#inputTarefa');
const btnAdicionar = document.querySelector('#btnAdicionar');
const lista = document.querySelector('#listaTarefas');

// Função para adicionar a tarefa
function adicionarTarefa() {
    const textoTarefa = inputTarefa.value;

        if (textoTarefa === '') {
                alert("Digite algo primeiro!");
                        return;
                            }

                                // Criar um novo item de lista (li)
                                    const novaLi = document.createElement('li');
                                        
                                            // Definir o conteúdo do item com um botão de excluir
                                                novaLi.innerHTML = `
                                                        <span>${textoTarefa}</span>
                                                                <button class="btn-excluir">Remover</button>
                                                                    `;

                                                                        // Adicionar funcionalidade ao botão de excluir desse item específico
                                                                            novaLi.querySelector('.btn-excluir').addEventListener('click', function() {
                                                                            