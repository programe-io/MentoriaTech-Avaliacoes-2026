
const message = document.getElementById("message");

document.getElementById("newTask").addEventListener("click", () => {
  message.textContent = "Você selecionou: Nova Tarefa.";
});

document.getElementById("newProject").addEventListener("click", () => {
  message.textContent = "Você selecionou: Novo Projeto.";
});

// As caixas de seleção permitem marcar tarefas como concluídas.
document.querySelectorAll(".task-check").forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const taskName = checkbox.nextElementSibling.querySelector("p").textContent;

    if (checkbox.checked) {
      message.textContent = `Tarefa concluída: ${taskName}`;
    } else {
      message.textContent = `Tarefa reaberta: ${taskName}`;
    }
  });
});
