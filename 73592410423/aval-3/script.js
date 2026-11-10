**JavaScript**
```javascript
const formulario = document.querySelector("#form-tarefa");
const campo = document.querySelector("#nova-tarefa");
const lista = document.querySelector("#lista-tarefas");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

    const tarefa = document.createElement("li");
      tarefa.textContent = campo.value;
        lista.appendChild(tarefa);

          tarefa.addEventListener("click", function () {
              tarefa.classList.toggle("concluida");
                });

                  campo.value = "";
                  });
                  ```