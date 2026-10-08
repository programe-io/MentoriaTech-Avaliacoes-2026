// =====================================
// SISTEMA DE GERENCIAMENTO DE TAREFAS
// =====================================

let tarefas = [];
let proximoCodigo = 1;

// Elementos do HTML
const formulario = document.getElementById("formTarefa");
const tituloInput = document.getElementById("titulo");
const prioridadeInput = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");


// =====================================
// CADASTRAR NOVA TAREFA
// =====================================

formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    const titulo = tituloInput.value.trim();
    const prioridade = Number(prioridadeInput.value);


    // Validação do título
    if (titulo.length < 5) {

        mostrarMensagem(
            "❌ O título deve ter no mínimo 5 caracteres.",
            "red"
        );

        return;
    }


    // Validação da prioridade
    if (prioridade < 1 || prioridade > 3) {

        mostrarMensagem(
            "❌ A prioridade deve ser um valor entre 1 e 3.",
            "red"
        );

        return;
    }


    // Criar nova tarefa
    const novaTarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };


    // Adicionar tarefa
    tarefas.push(novaTarefa);

    proximoCodigo++;


    // Limpar formulário
    formulario.reset();


    // Atualizar lista
    listarTarefas();


    // Mensagem de sucesso
    mostrarMensagem(
        "✅ Tarefa cadastrada com sucesso!",
        "green"
    );
});


// =====================================
// LISTAR TAREFAS
// =====================================

function listarTarefas() {

    listaTarefas.innerHTML = "";


    // Nenhuma tarefa
    if (tarefas.length === 0) {

        listaTarefas.innerHTML = `
            <p class="sem-tarefas">
                Nenhuma tarefa cadastrada.
            </p>
        `;

        return;
    }


    // Percorrer tarefas
    tarefas.forEach(function (tarefa) {

        const elemento = document.createElement("div");

        elemento.classList.add("tarefa");


        // Tarefa concluída
        if (tarefa.concluida) {
            elemento.classList.add("concluida");
        }


        const prioridade =
            obterPrioridade(tarefa.prioridade);


        elemento.innerHTML = `

            <h3>${tarefa.titulo}</h3>

            <p>
                <strong>Código:</strong>
                ${tarefa.codigo}
            </p>

            <p>
                <strong>Prioridade:</strong>

                <span class="${prioridade.classe}">
                    ${tarefa.prioridade} - ${prioridade.nome}
                </span>
            </p>

            <p>
                <strong>Status:</strong>
                ${tarefa.concluida ? "Concluída" : "Pendente"}
            </p>

            <div class="acoes">

                ${
                    tarefa.concluida
                        ? ""
                        : `
                            <button
                                onclick="concluirTarefa(${tarefa.codigo})"
                            >
                                Marcar como concluída
                            </button>
                        `
                }

                <button
                    onclick="alterarPrioridade(${tarefa.codigo})"
                >
                    Alterar prioridade
                </button>

            </div>
        `;


        listaTarefas.appendChild(elemento);
    });
}


// =====================================
// MARCAR TAREFA COMO CONCLUÍDA
// =====================================

function concluirTarefa(codigo) {

    const tarefa = tarefas.find(function (item) {

        return item.codigo === codigo;
    });


    if (!tarefa) {

        mostrarMensagem(
            "❌ Tarefa não encontrada.",
            "red"
        );

        return;
    }


    tarefa.concluida = true;


    listarTarefas();


    mostrarMensagem(
        "✅ Tarefa marcada como concluída!",
        "green"
    );
}


// =====================================
// ALTERAR PRIORIDADE
// =====================================

function alterarPrioridade(codigo) {

    const tarefa = tarefas.find(function (item) {

        return item.codigo === codigo;
    });


    if (!tarefa) {

        mostrarMensagem(
            "❌ Tarefa não encontrada.",
            "red"
        );

        return;
    }


    // Cria uma pequena janela personalizada
    // dentro da página para escolher a prioridade.

    mostrarEditorPrioridade(tarefa);
}


// =====================================
// EDITOR DE PRIORIDADE
// =====================================

function mostrarEditorPrioridade(tarefa) {

    // Remove editor anterior, caso exista
    const editorExistente =
        document.getElementById("editorPrioridade");

    if (editorExistente) {
        editorExistente.remove();
    }


    const editor = document.createElement("div");

    editor.id = "editorPrioridade";

    editor.innerHTML = `

        <div class="editor-conteudo">

            <h3>Alterar prioridade</h3>

            <p>
                Tarefa:
                <strong>${tarefa.titulo}</strong>
            </p>

            <label for="novaPrioridade">
                Nova prioridade:
            </label>

            <select id="novaPrioridade">

                <option value="1">
                    1 - Alta
                </option>

                <option value="2">
                    2 - Média
                </option>

                <option value="3">
                    3 - Baixa
                </option>

            </select>

            <div class="editor-acoes">

                <button id="salvarPrioridade">
                    Salvar
                </button>

                <button id="cancelarPrioridade">
                    Cancelar
                </button>

            </div>

            <p id="erroPrioridade"></p>

        </div>
    `;


    document.body.appendChild(editor);


    // Seleciona a prioridade atual
    document.getElementById("novaPrioridade").value =
        tarefa.prioridade;


    // Botão salvar
    document
        .getElementById("salvarPrioridade")
        .addEventListener("click", function () {

            const novaPrioridade = Number(
                document.getElementById(
                    "novaPrioridade"
                ).value
            );


            // Validação
            if (
                novaPrioridade < 1 ||
                novaPrioridade > 3
            ) {

                document.getElementById(
                    "erroPrioridade"
                ).textContent =
                    "❌ A prioridade deve estar entre 1 e 3.";

                return;
            }


            // Alterar prioridade
            tarefa.prioridade = novaPrioridade;


            // Remover editor
            editor.remove();


            // Atualizar lista
            listarTarefas();


            // Mensagem
            mostrarMensagem(
                "✅ Prioridade alterada com sucesso!",
                "green"
            );
        });


    // Botão cancelar
    document
        .getElementById("cancelarPrioridade")
        .addEventListener("click", function () {

            editor.remove();
        });
}


// =====================================
// IDENTIFICAR PRIORIDADE
// =====================================

function obterPrioridade(valor) {

    if (valor === 1) {

        return {
            nome: "Alta",
            classe: "prioridade-alta"
        };
    }


    if (valor === 2) {

        return {
            nome: "Média",
            classe: "prioridade-media"
        };
    }


    return {
        nome: "Baixa",
        classe: "prioridade-baixa"
    };
}


// =====================================
// MOSTRAR MENSAGEM
// =====================================

function mostrarMensagem(texto, cor) {

    mensagem.textContent = texto;

    mensagem.style.color = cor;


    // Limpa mensagens anteriores
    clearTimeout(mostrarMensagem.timer);


    // Remove depois de 3 segundos
    mostrarMensagem.timer = setTimeout(
        function () {

            mensagem.textContent = "";

        },
        3000
    );
}


// =====================================
// INICIAR SISTEMA
// =====================================

listarTarefas();