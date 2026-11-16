// 8. Geração automática de código
let contadorCodigo = 0;

function gerarCodigo() {
  return ++contadorCodigo;
}

// 7. Estrutura do array de tarefas
const tarefas = [
  { id: gerarCodigo(), título: "estudar JavaScript", concluída: false },
  { id: gerarCodigo(), título: "montar o slide de apresentação do trabalho", concluída: true }
];

// 9. Mapeamento dos elementos do DOM
const formTarefa = document.getElementById("form-tarefa");
const inputTitulo = document.getElementById("input-titulo");
const listaTarefas = document.getElementById("lista-tarefas");

// 10. Construção da função render
function render() {
  listaTarefas.innerHTML = "";

  tarefas.forEach((tarefa) => {
    const li = document.createElement("li");
    li.textContent = tarefa.título;

    // Verificação de tarefas concluídas
    if (tarefa.concluída) {
      li.style.textDecoration = "line-through";
    }

    // Inserção do item na lista
    listaTarefas.appendChild(li);
  });
}

// 11. Chamada inicial da função render
render();

// 12. Evento de submissão do formulário
formTarefa.addEventListener("submit", (event) => {
  event.preventDefault();

  // Validação do título digitado
  const novoTitulo = inputTitulo.value.trim();

  if (novoTitulo === "") {
    return;
  }

  // Criação e inserção da nova tarefa
  const novaTarefa = {
    id: gerarCodigo(),
    título: novoTitulo,
    concluída: false
  };

  tarefas.push(novaTarefa);

  inputTitulo.value = "";
  render();
});