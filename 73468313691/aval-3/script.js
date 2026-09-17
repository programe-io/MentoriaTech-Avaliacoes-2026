```javascript
/*
=====================================================
1. CONTADOR
=====================================================
*/

const number = document.getElementById("number");

const plus = document.getElementById("plus");

const minus = document.getElementById("minus");

const reset = document.getElementById("reset");


let count = 0;


function updateCounter() {

    number.textContent = count;

}


plus.addEventListener("click", function () {

    count++;

    updateCounter();

});


minus.addEventListener("click", function () {

    count--;

    updateCounter();

});


reset.addEventListener("click", function () {

    count = 0;

    updateCounter();

});



/*
=====================================================
2. TEMA ESCURO
=====================================================
*/

const themeButton =
    document.getElementById("themeButton");


themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark");


    if (
        document.body.classList.contains("dark")
    ) {

        themeButton.textContent =
            "☀️ Tema claro";

    } else {

        themeButton.textContent =
            "🌙 Tema escuro";

    }

});



/*
=====================================================
3. TODO LIST
=====================================================
*/

const todoForm =
    document.getElementById("todoForm");

const taskInput =
    document.getElementById("taskInput");

const taskList =
    document.getElementById("taskList");


let tasks =
    JSON.parse(
        localStorage.getItem("tasks")
    ) || [];



/*
Salvar tarefas
*/

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}



/*
Mostrar tarefas na tela
*/

function renderTasks() {

    taskList.innerHTML = "";


    tasks.forEach(function (task, index) {

        const li =
            document.createElement("li");


        if (task.completed) {

            li.classList.add("completed");

        }


        const span =
            document.createElement("span");


        span.textContent = task.text;


        span.addEventListener(
            "click",
            function () {

                tasks[index].completed =
                    !tasks[index].completed;

                saveTasks();

                renderTasks();

            }
        );


        const deleteButton =
            document.createElement("button");


        deleteButton.textContent =
            "Excluir";


        deleteButton.classList.add(
            "delete"
        );


        deleteButton.addEventListener(
            "click",
            function () {

                tasks.splice(index, 1);

                saveTasks();

                renderTasks();

            }
        );


        li.appendChild(span);

        li.appendChild(deleteButton);

        taskList.appendChild(li);

    });

}



/*
Adicionar tarefa
*/

todoForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const text =
            taskInput.value.trim();


        if (text === "") {

            alert("Digite uma tarefa.");

            return;

        }


        tasks.push({

            text: text,

            completed: false

        });


        saveTasks();

        renderTasks();


        taskInput.value = "";

        taskInput.focus();

    }
);



/*
Carregar tarefas salvas
*/

renderTasks();



/*
=====================================================
4. FORMULÁRIO
=====================================================
*/

const contactForm =
    document.getElementById("contactForm");

const nameInput =
    document.getElementById("name");

const emailInput =
    document.getElementById("email");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            nameInput.value.trim();

        const email =
            emailInput.value.trim();


        if (name === "") {

            formMessage.textContent =
                "Digite seu nome.";

            formMessage.style.color =
                "var(--danger)";

            return;

        }


        if (!email.includes("@")) {

            formMessage.textContent =
                "Digite um email válido.";

            formMessage.style.color =
                "var(--danger)";

            return;

        }


        formMessage.textContent =
            "Formulário enviado com sucesso!";

        formMessage.style.color =
            "var(--success)";


        contactForm.reset();

    }
);



/*
=====================================================
5. MODAL
=====================================================
*/

const modal =
    document.getElementById("modal");

const openModal =
    document.getElementById("openModal");

const closeModal =
    document.getElementById("closeModal");


openModal.addEventListener(
    "click",
    function () {

        modal.classList.add("active");

    }
);


closeModal.addEventListener(
    "click",
    function () {

        modal.classList.remove("active");

    }
);



/*
Fechar clicando fora do modal
*/

modal.addEventListener(
    "click",
    function (event) {

        if (event.target === modal) {

            modal.classList.remove("active");

        }

    }
);



/*
Fechar com ESC
*/

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            modal.classList.remove("active");

        }

    }
);
```
