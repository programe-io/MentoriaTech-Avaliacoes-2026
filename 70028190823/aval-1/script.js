const form = document.getElementById("form-tarefa");
const lista = document.getElementById("lista-tarefas");
const mensagem = document.getElementById("mensagem");
const contador = document.getElementById("contador");


// ===============================
// Listar tarefas
// ===============================

async function carregarTarefas() {

    try {

        const resposta = await fetch("/api/tarefas");

        const tarefas = await resposta.json();

        renderizarTarefas(tarefas);

    } catch (erro) {

        mostrarMensagem(
            "Não foi possível carregar as tarefas.",
            "erro"
        );
    }
}


// ===============================
// Cadastrar tarefa
// ===============================

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const codigo = document
        .getElementById("codigo")
        .value
        .trim();

    const titulo = document
        .getElementById("titulo")
        .value
        .trim();

    const prioridade = document
        .getElementById("prioridade")
        .value;


    // Validação no JavaScript
    if (titulo.length < 5) {

        mostrarMensagem(
            "O título deve ter no mínimo 5 caracteres.",
            "erro"
        );

        return;
    }


    if (prioridade < 1 || prioridade > 3) {

        mostrarMensagem(
            "A prioridade deve ser entre 1 e 3.",
            "erro"
        );

        return;
    }


    try {

        const resposta = await fetch("/api/tarefas", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                codigo,
                titulo,
                prioridade
            })

        });


        const dados = await resposta.json();


        if (!resposta.ok) {

            mostrarMensagem(
                dados.erro,
                "erro"
            );

            return;
        }


        mostrarMensagem(
            "Tarefa cadastrada com sucesso!",
            "sucesso"
        );


        form.reset();

        document.getElementById("prioridade").value = "2";

        carregarTarefas();


    } catch (erro) {

        mostrarMensagem(
            "Erro ao cadastrar a tarefa.",
            "erro"
        );
    }

});


// ===============================
// Renderizar tarefas
// ===============================

function renderizarTarefas(tarefas) {

    contador.textContent =
        `${tarefas.length} ${
            tarefas.length === 1 ? "tarefa" : "tarefas"
        }`;


    if (tarefas.length === 0) {

        lista.innerHTML = `
            <p class="vazio">
                Nenhuma tarefa cadastrada.
            </p>
        `;

        return;
    }


    lista.innerHTML = "";


    tarefas.forEach(tarefa => {

        const elemento = document.createElement("div");

        elemento.className =
            `tarefa ${tarefa.concluida ? "concluida" : ""}`;


        const prioridadeTexto = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };


        const prioridadeClasse = {
            1: "alta",
            2: "media",
            3: "baixa"
        };


        elemento.innerHTML = `

            <div class="tarefa-topo">

                <span class="codigo">
                    ${tarefa.codigo}
                </span>

                <span class="prioridade ${prioridadeClasse[tarefa.prioridade]}">
                    Prioridade ${tarefa.prioridade} -
                    ${prioridadeTexto[tarefa.prioridade]}
                </span>

            </div>


            <div class="titulo">
                ${tarefa.titulo}
            </div>


            <div>
                Status:
                <strong>
                    ${tarefa.concluida
                        ? "Concluída"
                        : "Pendente"}
                </strong>
            </div>


            <div class="acoes">

                ${
                    !tarefa.concluida
                    ? `
                        <button
                            class="btn-concluir"
                            onclick="concluirTarefa(${tarefa.id})"
                        >
                            ✓ Concluir
                        </button>
                    `
                    : ""
                }


                <button
                    class="btn-prioridade"
                    onclick="alterarPrioridade(${tarefa.id})"
                >
                    Alterar prioridade
                </button>

            </div>
        `;


        lista.appendChild(elemento);

    });
}


// ===============================
// Concluir tarefa
// ===============================

async function concluirTarefa(id) {

    try {

        const resposta = await fetch(
            `/api/tarefas/${id}/concluir`,
            {
                method: "PUT"
            }
        );


        const dados = await resposta.json();


        if (!resposta.ok) {

            mostrarMensagem(
                dados.erro,
                "erro"
            );

            return;
        }


        carregarTarefas();


    } catch (erro) {

        mostrarMensagem(
            "Erro ao concluir tarefa.",
            "erro"
        );
    }
}


// ===============================
// Alterar prioridade
// ===============================

async function alterarPrioridade(id) {

    const novaPrioridade = prompt(
        "Digite a nova prioridade:\n\n" +
        "1 - Alta\n" +
        "2 - Média\n" +
        "3 - Baixa"
    );


    if (novaPrioridade === null) {
        return;
    }


    const prioridade = Number(novaPrioridade);


    if (![1, 2, 3].includes(prioridade)) {

        mostrarMensagem(
            "A prioridade deve ser 1, 2 ou 3.",
            "erro"
        );

        return;
    }


    try {

        const resposta = await fetch(
            `/api/tarefas/${id}/prioridade`,
            {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    prioridade
                })
            }
        );


        const dados = await resposta.json();


        if (!resposta.ok) {

            mostrarMensagem(
                dados.erro,
                "erro"
            );

            return;
        }


        carregarTarefas();


    } catch (erro) {

        mostrarMensagem(
            "Erro ao alterar prioridade.",
            "erro"
        );
    }
}


// ===============================
// Mensagens
// ===============================

function mostrarMensagem(texto, tipo) {

    mensagem.innerHTML = `
        <div class="${tipo}">
            ${texto}
        </div>
    `;


    setTimeout(() => {
        mensagem.innerHTML = "";
    }, 3000);
}


// Carrega tarefas ao abrir a página
carregarTarefas();
