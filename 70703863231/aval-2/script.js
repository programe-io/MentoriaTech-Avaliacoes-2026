// ========================================
// ARRAY DE TAREFAS
// ========================================

let tarefas = [];

// ========================================
// GERADOR DE CÓDIGOS
// ========================================

let proximoCodigo = 0;

// ========================================
// FILTRO ATUAL
// ========================================

let filtroAtual = "todas";

// ========================================
// ELEMENTOS DO HTML
// ========================================

const formTarefa =
document.getElementById("formTarefa");

const listaTarefas =
document.getElementById("listaTarefas");

const listaVazia =
document.getElementById("listaVazia");

const mensagem =
document.getElementById("mensagem");

const contador =
document.getElementById("contador");

const totalTarefas =
document.getElementById("totalTarefas");

const tarefasPendentes =
document.getElementById("tarefasPendentes");

const tarefasConcluidas =
document.getElementById("tarefasConcluidas");

// ========================================
// MOSTRAR MENSAGEM
// ========================================

function mostrarMensagem(texto, tipo) {

mensagem.textContent = texto;

mensagem.className =
    "mensagem " + tipo;


setTimeout(() => {

    mensagem.textContent = "";

    mensagem.className =
        "mensagem";

}, 4000);

}

// ========================================
// VALIDAR DADOS DA TAREFA
// ========================================

function validarDadosDaTarefa(
titulo,
prioridade
) {

// Validação do título

if (titulo.length < 5) {

    throw new Error(
        "O título deve possuir no mínimo 5 caracteres."
    );

}


// Validação da prioridade

if (
    prioridade < 1 ||
    prioridade > 3
) {

    throw new Error(
        "A prioridade deve estar entre 1 e 3."
    );

}

}

// ========================================
// CADASTRAR TAREFA
// ========================================

function cadastrarTarefa(
titulo,
prioridade
) {

// Validar os dados

validarDadosDaTarefa(
    titulo,
    prioridade
);


// Incrementar código

proximoCodigo++;


// Criar objeto da tarefa

const novaTarefa = {

    codigo: proximoCodigo,

    titulo: titulo,

    prioridade: prioridade,

    // true = pendente
    // false = concluída

    status: true

};


// Adicionar ao array

tarefas.push(novaTarefa);


// Atualizar tela

listarTarefas();

}

// ========================================
// BUSCAR TAREFA
// ========================================

function buscarTarefa(codigo) {

const tarefa =
    tarefas.find(
        (tarefa) =>
            tarefa.codigo === codigo
    );


// Se não encontrou

if (!tarefa) {

    throw new Error(
        "Tarefa não encontrada."
    );

}


return tarefa;

}

// ========================================
// LISTAR TAREFAS
// ========================================

function listarTarefas() {

listaTarefas.innerHTML = "";


// Filtrar tarefas

let tarefasExibidas;


if (filtroAtual === "pendentes") {

    tarefasExibidas =
        tarefas.filter(
            (tarefa) =>
                tarefa.status === true
        );

}

else if (
    filtroAtual === "concluidas"
) {

    tarefasExibidas =
        tarefas.filter(
            (tarefa) =>
                tarefa.status === false
        );

}

else {

    tarefasExibidas =
        tarefas;

}


// Verificar lista vazia

if (
    tarefasExibidas.length === 0
) {

    listaVazia.style.display =
        "block";

}

else {

    listaVazia.style.display =
        "none";

}


// Criar linhas

tarefasExibidas.forEach(
    (tarefa) => {

        const linha =
            document.createElement("tr");


        // Definir prioridade

        let textoPrioridade;

        let classePrioridade;


        if (tarefa.prioridade === 1) {

            textoPrioridade =
                "Alta";

            classePrioridade =
                "prioridade-alta";

        }

        else if (
            tarefa.prioridade === 2
        ) {

            textoPrioridade =
                "Média";

            classePrioridade =
                "prioridade-media";

        }

        else {

            textoPrioridade =
                "Baixa";

            classePrioridade =
                "prioridade-baixa";

        }


        // Definir status

        const textoStatus =
            tarefa.status
                ? "Pendente"
                : "Concluída";


        const classeStatus =
            tarefa.status
                ? "status-pendente"
                : "status-concluida";


        // Classe do título

        const classeTitulo =
            tarefa.status
                ? ""
                : "tarefa-concluida";


        // Botão de conclusão

        let botaoConclusao = "";


        if (tarefa.status) {

            botaoConclusao = `

                <button
                    class="btn-acao btn-concluir"
                    onclick="concluirTarefaInterface(${tarefa.codigo})"
                >
                    ✓ Concluir
                </button>

            `;

        }


        // Montar linha

        linha.innerHTML = `

            <td>
                <span class="codigo">
                    #${tarefa.codigo}
                </span>
            </td>


            <td>
                <span class="${classeTitulo}">
                    ${tarefa.titulo}
                </span>
            </td>


            <td>

                <span
                    class="prioridade ${classePrioridade}"
                >
                    ${tarefa.prioridade} -
                    ${textoPrioridade}
                </span>

            </td>


            <td>

                <span
                    class="status ${classeStatus}"
                >
                    ${textoStatus}
                </span>

            </td>


            <td>

                <div class="acoes">

                    ${botaoConclusao}

                    <button
                        class="btn-acao btn-prioridade"
                        onclick="alterarPrioridadeInterface(${tarefa.codigo})"
                    >
                        ★ Prioridade
                    </button>

                </div>

            </td>

        `;


        listaTarefas.appendChild(linha);

    }
);


atualizarEstatisticas();

}

// ========================================
// CONCLUIR TAREFA
// ========================================

function concluirTarefa(codigo) {

const tarefa =
    buscarTarefa(codigo);


// Verificar se já está concluída

if (!tarefa.status) {

    throw new Error(
        "Essa tarefa já está concluída."
    );

}


// Alterar status

tarefa.status = false;


// Atualizar tela

listarTarefas();

}

// ========================================
// ALTERAR PRIORIDADE
// ========================================

function alterarPrioridade(
codigo,
novaPrioridade
) {

// Buscar tarefa

const tarefa =
    buscarTarefa(codigo);


// Reutilizar validação

validarDadosDaTarefa(
    tarefa.titulo,
    novaPrioridade
);


// Alterar prioridade

tarefa.prioridade =
    novaPrioridade;


// Atualizar tela

listarTarefas();

}

// ========================================
// INTERFACE - CONCLUIR
// ========================================

function concluirTarefaInterface(codigo) {

try {

    concluirTarefa(codigo);


    mostrarMensagem(
        "Tarefa concluída com sucesso!",
        "sucesso"
    );


} catch (erro) {

    mostrarMensagem(
        erro.message,
        "erro"
    );

}

}

// ========================================
// INTERFACE - ALTERAR PRIORIDADE
// ========================================

function alterarPrioridadeInterface(
codigo
) {

try {

    const novaPrioridade =
        Number(
            prompt(
                "Digite a nova prioridade:\n\n" +
                "1 - Alta\n" +
                "2 - Média\n" +
                "3 - Baixa"
            )
        );


    // Cancelar

    if (Number.isNaN(novaPrioridade)) {

        return;

    }


    alterarPrioridade(
        codigo,
        novaPrioridade
    );


    mostrarMensagem(
        "Prioridade alterada com sucesso!",
        "sucesso"
    );


} catch (erro) {

    mostrarMensagem(
        erro.message,
        "erro"
    );

}

}

// ========================================
// ATUALIZAR ESTATÍSTICAS
// ========================================

function atualizarEstatisticas() {

const total =
    tarefas.length;


const concluidas =
    tarefas.filter(
        (tarefa) =>
            tarefa.status === false
    ).length;


const pendentes =
    tarefas.filter(
        (tarefa) =>
            tarefa.status === true
    ).length;


totalTarefas.textContent =
    total;

tarefasPendentes.textContent =
    pendentes;

tarefasConcluidas.textContent =
    concluidas;


// Texto da quantidade

if (total === 0) {

    contador.textContent =
        "Nenhuma tarefa cadastrada.";

}

else if (total === 1) {

    contador.textContent =
        "1 tarefa cadastrada.";

}

else {

    contador.textContent =
        `${total} tarefas cadastradas.`;

}

}

// ========================================
// CADASTRO PELO FORMULÁRIO
// ========================================

formTarefa.addEventListener(
"submit",
function (event) {

    event.preventDefault();


    try {

        // Pegar título

        const titulo =
            document
                .getElementById("titulo")
                .value
                .trim();


        // Pegar prioridade

        const prioridade =
            Number(
                document
                    .getElementById("prioridade")
                    .value
            );


        // Cadastrar

        cadastrarTarefa(
            titulo,
            prioridade
        );


        // Limpar formulário

        formTarefa.reset();


        // Mensagem

        mostrarMensagem(
            "Tarefa cadastrada com sucesso!",
            "sucesso"
        );


    } catch (erro) {

        mostrarMensagem(
            erro.message,
            "erro"
        );

    }

}

);

// ========================================
// FILTROS
// ========================================

const botoesFiltro =
document.querySelectorAll(
".filtro"
);

botoesFiltro.forEach(
(botao) => {

    botao.addEventListener(
        "click",
        function () {

            // Remover ativo

            botoesFiltro.forEach(
                (botao) => {

                    botao.classList.remove(
                        "ativo"
                    );

                }
            );


            // Ativar botão

            this.classList.add(
                "ativo"
            );


            // Definir filtro

            filtroAtual =
                this.dataset.filtro;


            // Atualizar lista

            listarTarefas();

        }
    );

}

);

// ========================================
// INICIAR SISTEMA
// ========================================

listarTarefas();