// ==============================
// MODO ESCURO
// ==============================

const temaBtn = document.getElementById("temaBtn");

temaBtn.addEventListener("click", function () {

    document.body.classList.toggle("escuro");

    if (document.body.classList.contains("escuro")) {

        temaBtn.textContent = "☀️";

    } else {

        temaBtn.textContent = "🌙";

    }

});


// ==============================
// AGENDA
// ==============================

const atividade = document.getElementById("atividade");
const horario = document.getElementById("horario");
const categoria = document.getElementById("categoria");

const adicionarBtn = document.getElementById("adicionarBtn");

const lista = document.getElementById("lista");
const contador = document.getElementById("contador");

let atividades = [];


// ADICIONAR ATIVIDADE

adicionarBtn.addEventListener("click", function () {

    const nome = atividade.value.trim();
    const hora = horario.value;
    const tipo = categoria.value;

    if (nome === "" || hora === "") {

        alert("Preencha a atividade e o horário.");

        return;
    }


    const novaAtividade = {

        nome: nome,

        hora: hora,

        categoria: tipo

    };


    atividades.push(novaAtividade);

    atividades.sort(function (a, b) {

        return a.hora.localeCompare(b.hora);

    });


    mostrarAtividades();


    atividade.value = "";

    horario.value = "";

});


// MOSTRAR ATIVIDADES

function mostrarAtividades() {

    lista.innerHTML = "";


    if (atividades.length === 0) {

        lista.innerHTML = `
            <div class="vazio">

                <span>📅</span>

                <p>Sua rotina está vazia.</p>

                <small>
                    Adicione uma atividade para começar.
                </small>

            </div>
        `;

        contador.textContent = "0 atividades";

        return;
    }


    atividades.forEach(function (item, index) {

        const div = document.createElement("div");

        div.classList.add("item");


        let nomeCategoria = "";

        if (item.categoria === "estudo") {
            nomeCategoria = "📚 Estudo";
        }

        else if (item.categoria === "escola") {
            nomeCategoria = "🏫 Escola";
        }

        else if (item.categoria === "descanso") {
            nomeCategoria = "😴 Descanso";
        }

        else if (item.categoria === "lazer") {
            nomeCategoria = "🎮 Lazer";
        }

        else {
            nomeCategoria = "📌 Outro";
        }


        div.innerHTML = `

            <div class="item-info">

                <span class="item-hora">
                    ${item.hora}
                </span>

                <div>

                    <strong>
                        ${item.nome}
                    </strong>

                    <div class="item-categoria">
                        ${nomeCategoria}
                    </div>

                </div>

            </div>

            <button
                class="excluir"
                onclick="excluirAtividade(${index})"
            >
                🗑️
            </button>

        `;


        lista.appendChild(div);

    });


    contador.textContent =
        atividades.length +
        (atividades.length === 1
            ? " atividade"
            : " atividades");

}


// EXCLUIR ATIVIDADE

function excluirAtividade(index) {

    atividades.splice(index, 1);

    mostrarAtividades();

}


// ==============================
// LISTA DE TAREFAS
// ==============================

const novaTarefa = document.getElementById("novaTarefa");

const adicionarTarefa =
    document.getElementById("adicionarTarefa");

const listaTarefas =
    document.getElementById("listaTarefas");


adicionarTarefa.addEventListener("click", function () {

    adicionarNovaTarefa();

});


novaTarefa.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        adicionarNovaTarefa();

    }

});


function adicionarNovaTarefa() {

    const texto = novaTarefa.value.trim();


    if (texto === "") {

        alert("Digite uma tarefa.");

        return;
    }


    const li = document.createElement("li");

    li.textContent = "☐ " + texto;


    li.addEventListener("click", function () {

        li.classList.toggle("concluida");

        if (li.classList.contains("concluida")) {

            li.textContent = "☑ " + texto;

        } else {

            li.textContent = "☐ " + texto;

        }

    });


    listaTarefas.appendChild(li);


    novaTarefa.value = "";

}