
// Array que armazena todas as tarefas
const tarefas = [];

// Gerador automático de códigos
let proximoCodigo = 0;


// 1. VALIDAR DADOS DA TAREFA
function validarDadosDaTarefa(titulo, prioridade) {

    if (titulo.trim().length < 5) {
        throw new Error(
            "O título deve possuir no mínimo 5 caracteres."
        );
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error(
            "A prioridade deve estar entre 1 e 3."
        );
    }
}


// 2. CADASTRAR TAREFA
function cadastrarTarefa(titulo, prioridade) {

    validarDadosDaTarefa(titulo, prioridade);

    proximoCodigo++;

    const novaTarefa = {
        codigo: proximoCodigo,
        titulo: titulo.trim(),
        prioridade: Number(prioridade),
        status: true
    };

    tarefas.push(novaTarefa);

    return novaTarefa;
}


// 3. LISTAR TAREFAS
function listarTarefas() {
    return tarefas;
}


// 4. BUSCAR TAREFA PELO CÓDIGO
function buscarTarefa(codigo) {

    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === Number(codigo)
    );

    if (!tarefa) {
        throw new Error("Tarefa não encontrada.");
    }

    return tarefa;
}


// 5. CONCLUIR TAREFA
function concluirTarefa(codigo) {

    const tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error("Esta tarefa já foi concluída.");
    }

    tarefa.status = false;

    return tarefa;
}


// 6. ALTERAR PRIORIDADE
function alterarPrioridade(codigo, novaPrioridade) {

    const tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(
        tarefa.titulo,
        Number(novaPrioridade)
    );

    tarefa.prioridade = Number(novaPrioridade);

    return tarefa;
}


// 7. EXIBIR MENSAGENS
function mostrarMensagem(texto, tipo) {

    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;
    mensagem.className = tipo;
}


// 8. ATUALIZAR ESTATÍSTICAS
function atualizarEstatisticas() {

    const total = tarefas.length;

    const concluidas = tarefas.filter(
        tarefa => tarefa.status === false
    ).length;

    const andamento = tarefas.filter(
        tarefa => tarefa.status === true
    ).length;

    document.getElementById("total").textContent = total;

    document.getElementById("andamento").textContent = andamento;

    document.getElementById("concluidas").textContent = concluidas;
}


// 9. EXIBIR TAREFAS NA TELA
function exibirTarefas(lista = listarTarefas()) {

    const container = document.getElementById("listaTarefas");

    container.innerHTML = "";

    if (lista.length === 0) {

        container.innerHTML =
            '<p class="vazio">Nenhuma tarefa encontrada.</p>';

        return;
    }

    lista.forEach(tarefa => {

        const elemento = document.createElement("div");

        elemento.className = "tarefa";

        if (!tarefa.status) {
            elemento.classList.add("concluida");
        }

        let prioridadeTexto = "";

        if (tarefa.prioridade === 1) {
            prioridadeTexto = "Alta";
        } else if (tarefa.prioridade === 2) {
            prioridadeTexto = "Média";
        } else {
            prioridadeTexto = "Baixa";
        }

        elemento.innerHTML = `
            <div>
                <h3>${tarefa.titulo}</h3>

                <p>Código: ${tarefa.codigo}</p>

                <p>
                    Prioridade:
                    <span class="prioridade-${tarefa.prioridade}">
                        ${prioridadeTexto}
                    </span>
                </p>

                <p>
                    Status:
                    ${tarefa.status ? "Em andamento" : "Concluída"}
                </p>
            </div>

            <div class="acoes">

                ${
                    tarefa.status
                    ? `<button class="btn-concluir"
                        data-acao="concluir"
                        data-codigo="${tarefa.codigo}">
                        Concluir
                       </button>`
                    : ""
                }

                <button class="btn-prioridade"
                    data-acao="prioridade"
                    data-codigo="${tarefa.codigo}">
                    Alterar prioridade
                </button>

            </div>
        `;

        container.appendChild(elemento);
    });
}


// 10. CADASTRO PELO FORMULÁRIO
document.getElementById("formTarefa")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const titulo = document.getElementById("titulo").value;

    const prioridade = Number(
        document.getElementById("prioridade").value
    );

    try {

        cadastrarTarefa(titulo, prioridade);

        mostrarMensagem(
            "Tarefa cadastrada com sucesso!",
            "sucesso"
        );

        this.reset();

        exibirTarefas();

        atualizarEstatisticas();

    } catch (erro) {

        mostrarMensagem(erro.message, "erro");
    }
});


// 11. BUSCAR TAREFA
document.getElementById("btnBuscar")
.addEventListener("click", function() {

    const codigo = document.getElementById("codigoBusca").value;

    if (!codigo || Number(codigo) <= 0) {
        mostrarMensagem("Informe um código válido.", "erro");
        return;
    }

    try {

        const tarefa = buscarTarefa(codigo);

        exibirTarefas([tarefa]);

        mostrarMensagem("Tarefa encontrada!", "sucesso");

    } catch (erro) {

        mostrarMensagem(erro.message, "erro");
    }
});


// 12. MOSTRAR TODAS AS TAREFAS
document.getElementById("btnLimpar")
.addEventListener("click", function() {

    document.getElementById("codigoBusca").value = "";

    exibirTarefas();

    mostrarMensagem("", "");
});


// 13. AÇÕES DAS TAREFAS
document.getElementById("listaTarefas")
.addEventListener("click", function(event) {

    const botao = event.target.closest("button[data-acao]");

    if (!botao) return;

    const codigo = Number(botao.dataset.codigo);

    const acao = botao.dataset.acao;

    try {

        if (acao === "concluir") {

            concluirTarefa(codigo);

            mostrarMensagem(
                "Tarefa concluída com sucesso!",
                "sucesso"
            );

        } else if (acao === "prioridade") {

            const novaPrioridade = prompt(
                "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa"
            );

            if (novaPrioridade === null) return;

            if (novaPrioridade.trim() === "") {
                throw new Error("Informe uma prioridade.");
            }

            alterarPrioridade(codigo, novaPrioridade);

            mostrarMensagem(
                "Prioridade alterada com sucesso!",
                "sucesso"
            );
        }

        exibirTarefas();

        atualizarEstatisticas();

    } catch (erro) {

        mostrarMensagem(erro.message, "erro");
    }
});


// 14. INICIALIZAÇÃO DO SISTEMA
exibirTarefas();

atualizarEstatisticas();
