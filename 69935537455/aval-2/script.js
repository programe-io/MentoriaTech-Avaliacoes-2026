
// Array principal para armazenar as tarefas
const tarefas = [];

// Gerador automático de códigos
let proximoCodigo = 0;


// 1. FUNÇÃO PARA VALIDAR OS DADOS
function validarDadosDaTarefa(titulo, prioridade) {

    if (titulo.trim().length < 5) {
        throw new Error(
            "O título deve possuir no mínimo 5 caracteres."
        );
    }

    if (prioridade < 1 || prioridade > 3 ||
        !Number.isInteger(prioridade)) {
        throw new Error(
            "A prioridade deve estar entre 1 e 3."
        );
    }
}


// 2. FUNÇÃO PARA CADASTRAR UMA TAREFA
function cadastrarTarefa(titulo, prioridade) {

    validarDadosDaTarefa(titulo, prioridade);

    const novaTarefa = {
        codigo: ++proximoCodigo,
        titulo: titulo.trim(),
        prioridade: prioridade,
        status: true
    };

    tarefas.push(novaTarefa);

    return novaTarefa;
}


// 3. FUNÇÃO PARA LISTAR AS TAREFAS
function listarTarefas() {
    return tarefas;
}


// 4. FUNÇÃO PARA BUSCAR UMA TAREFA
function buscarTarefa(codigo) {

    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === Number(codigo)
    );

    if (!tarefa) {
        throw new Error("Tarefa não encontrada!");
    }

    return tarefa;
}


// 5. FUNÇÃO PARA CONCLUIR UMA TAREFA
function concluirTarefa(codigo) {

    const tarefa = buscarTarefa(codigo);

    if (!tarefa.status) {
        throw new Error("Esta tarefa já foi concluída!");
    }

    tarefa.status = false;

    return tarefa;
}


// 6. FUNÇÃO PARA ALTERAR A PRIORIDADE
function alterarPrioridade(codigo, novaPrioridade) {

    const tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(
        tarefa.titulo,
        novaPrioridade
    );

    tarefa.prioridade = novaPrioridade;

    return tarefa;
}


// 7. FUNÇÃO PARA ATUALIZAR A TELA
function atualizarTela() {

    const corpoTabela = document.getElementById("listaTarefas");

    corpoTabela.innerHTML = "";

    const lista = listarTarefas();

    lista.forEach(tarefa => {

        const linha = document.createElement("tr");

        let statusTexto = tarefa.status
            ? "Em andamento"
            : "Concluída";

        let classeStatus = tarefa.status
            ? "pendente"
            : "concluido";

        let prioridadeTexto = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        let classePrioridade = {
            1: "alta",
            2: "media",
            3: "baixa"
        };

        linha.innerHTML = `
            <td>${tarefa.codigo}</td>

            <td>${tarefa.titulo}</td>

            <td class="${classePrioridade[tarefa.prioridade]}">
                ${prioridadeTexto[tarefa.prioridade]}
            </td>

            <td>
                <span class="status ${classeStatus}">
                    ${statusTexto}
                </span>
            </td>

            <td>
                <div class="acoes">

                    ${
                        tarefa.status
                        ? `<button class="btn-concluir"
                            data-action="concluir"
                            data-id="${tarefa.codigo}">
                            Concluir
                           </button>`
                        : "Finalizada"
                    }

                    <button class="btn-prioridade"
                        data-action="prioridade"
                        data-id="${tarefa.codigo}">
                        Alterar
                    </button>

                </div>
            </td>
        `;

        corpoTabela.appendChild(linha);
    });

    // Atualizar os indicadores
    document.getElementById("total").textContent =
        lista.length;

    document.getElementById("andamento").textContent =
        lista.filter(tarefa => tarefa.status).length;

    document.getElementById("concluidas").textContent =
        lista.filter(tarefa => !tarefa.status).length;

    // Mostrar mensagem quando não houver tarefas
    document.getElementById("mensagemVazia").style.display =
        lista.length === 0 ? "block" : "none";
}


// 8. EVENTO DE CADASTRO
document.getElementById("formTarefa")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const titulo = document.getElementById("titulo").value;

        const prioridade = Number(
            document.getElementById("prioridade").value
        );

        try {

            cadastrarTarefa(titulo, prioridade);

            alert("Tarefa cadastrada com sucesso!");

            this.reset();

            atualizarTela();

        } catch (erro) {

            alert(erro.message);

        }
    });


// 9. EVENTOS DOS BOTÕES DA TABELA
document.getElementById("listaTarefas")
    .addEventListener("click", function(event) {

        const botao = event.target.closest("button");

        if (!botao) return;

        const codigo = Number(botao.dataset.id);

        const acao = botao.dataset.action;

        try {

            if (acao === "concluir") {

                concluirTarefa(codigo);

                alert("Tarefa concluída com sucesso!");

            }

            else if (acao === "prioridade") {

                const novaPrioridade = Number(
                    prompt(
                        "Digite a nova prioridade:\n" +
                        "1 - Alta\n" +
                        "2 - Média\n" +
                        "3 - Baixa"
                    )
                );

                if (!Number.isInteger(novaPrioridade)) {
                    throw new Error("Informe uma prioridade válida.");
                }

                alterarPrioridade(codigo, novaPrioridade);

                alert("Prioridade alterada com sucesso!");

            }

            atualizarTela();

        } catch (erro) {

            alert(erro.message);

        }
    });


// Inicializar a tela
atualizarTela();
