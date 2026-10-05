// ==========================================
// SISTEMA DE GERENCIAMENTO DE TAREFAS
// ==========================================


// ==========================================
// TAREFAS PRÉ-CADASTRADAS
// ==========================================

let tarefas = [

    {
        codigo: 1,
        titulo: "Estudar JavaScript",
        prioridade: 1,
        concluida: false
    },

    {
        codigo: 2,
        titulo: "Fazer atividade de programação",
        prioridade: 1,
        concluida: true
    },

    {
        codigo: 3,
        titulo: "Organizar os arquivos do projeto",
        prioridade: 2,
        concluida: false
    },

    {
        codigo: 4,
        titulo: "Criar apresentação do trabalho",
        prioridade: 2,
        concluida: false
    },

    {
        codigo: 5,
        titulo: "Revisar conteúdo da aula",
        prioridade: 3,
        concluida: true
    },

    {
        codigo: 6,
        titulo: "Entregar projeto final",
        prioridade: 1,
        concluida: false
    }

];


// ==========================================
// ELEMENTOS DO HTML
// ==========================================

const form = document.getElementById("formTarefa");

const tituloInput =
    document.getElementById("titulo");

const prioridadeInput =
    document.getElementById("prioridade");

const listaTarefas =
    document.getElementById("listaTarefas");

const estadoVazio =
    document.getElementById("estadoVazio");

const mensagem =
    document.getElementById("mensagem");

const totalTarefas =
    document.getElementById("totalTarefas");

const tarefasConcluidas =
    document.getElementById("tarefasConcluidas");

const tarefasPendentes =
    document.getElementById("tarefasPendentes");

const contador =
    document.getElementById("contador");


// ==========================================
// CADASTRAR NOVA TAREFA
// ==========================================

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const titulo =
        tituloInput.value.trim();

    const prioridade =
        Number(prioridadeInput.value);


    // Validação do título
    if (titulo.length < 5) {

        mostrarMensagem(
            "O título deve possuir no mínimo 5 caracteres.",
            "erro"
        );

        tituloInput.focus();

        return;
    }


    // Validação da prioridade
    if (
        prioridade < 1 ||
        prioridade > 3 ||
        !prioridade
    ) {

        mostrarMensagem(
            "Selecione uma prioridade entre 1 e 3.",
            "erro"
        );

        prioridadeInput.focus();

        return;
    }


    // Criar nova tarefa
    const novaTarefa = {

        codigo: gerarCodigo(),

        titulo: titulo,

        prioridade: prioridade,

        concluida: false

    };


    // Adicionar tarefa
    tarefas.push(novaTarefa);


    // Limpar formulário
    form.reset();


    // Atualizar tela
    renderizarTarefas();

    atualizarEstatisticas();


    mostrarMensagem(
        "Tarefa cadastrada com sucesso!",
        "sucesso"
    );

});


// ==========================================
// GERAR CÓDIGO
// ==========================================

function gerarCodigo() {

    if (tarefas.length === 0) {
        return 1;
    }

    return Math.max(
        ...tarefas.map(tarefa => tarefa.codigo)
    ) + 1;
}


// ==========================================
// LISTAR TAREFAS
// ==========================================

function renderizarTarefas() {

    const elementos =
        listaTarefas.querySelectorAll(".tarefa");


    elementos.forEach(elemento => {
        elemento.remove();
    });


    if (tarefas.length === 0) {

        estadoVazio.style.display = "block";

        atualizarContador();

        return;
    }


    estadoVazio.style.display = "none";


    tarefas.forEach(tarefa => {

        const elemento =
            criarElementoTarefa(tarefa);

        listaTarefas.appendChild(elemento);

    });


    atualizarContador();
}


// ==========================================
// CRIAR ELEMENTO DA TAREFA
// ==========================================

function criarElementoTarefa(tarefa) {

    const div =
        document.createElement("div");


    div.classList.add("tarefa");


    if (tarefa.concluida) {
        div.classList.add("concluida");
    }


    // -------------------------------
    // BOTÃO DE CONCLUSÃO
    // -------------------------------

    const check =
        document.createElement("button");

    check.classList.add("check");

    check.innerHTML = "✓";

    check.title =
        "Marcar como concluída";


    check.addEventListener(
        "click",
        function() {

            marcarComoConcluida(
                tarefa.codigo
            );

        }
    );


    // -------------------------------
    // INFORMAÇÕES
    // -------------------------------

    const info =
        document.createElement("div");

    info.classList.add("tarefa-info");


    const codigo =
        document.createElement("div");

    codigo.classList.add(
        "tarefa-codigo"
    );

    codigo.textContent =
        `Tarefa #${String(tarefa.codigo).padStart(3, "0")}`;


    const titulo =
        document.createElement("div");

    titulo.classList.add("titulo");

    titulo.textContent =
        tarefa.titulo;


    const status =
        document.createElement("span");

    status.classList.add("status");

    status.textContent =
        tarefa.concluida
            ? "Concluída"
            : "Pendente";


    info.appendChild(codigo);

    info.appendChild(titulo);

    info.appendChild(status);


    // -------------------------------
    // AÇÕES
    // -------------------------------

    const acoes =
        document.createElement("div");

    acoes.classList.add("acoes");


    const selectPrioridade =
        document.createElement("select");

    selectPrioridade.classList.add(
        "prioridade",
        classePrioridade(tarefa.prioridade)
    );


    const opcoes = [

        {
            valor: 1,
            texto: "1 - Alta"
        },

        {
            valor: 2,
            texto: "2 - Média"
        },

        {
            valor: 3,
            texto: "3 - Baixa"
        }

    ];


    opcoes.forEach(opcao => {

        const option =
            document.createElement("option");


        option.value =
            opcao.valor;


        option.textContent =
            opcao.texto;


        if (
            opcao.valor ===
            tarefa.prioridade
        ) {

            option.selected = true;

        }


        selectPrioridade.appendChild(
            option
        );

    });


    selectPrioridade.addEventListener(
        "change",
        function() {

            alterarPrioridade(
                tarefa.codigo,
                Number(this.value)
            );

        }
    );


    acoes.appendChild(
        selectPrioridade
    );


    // -------------------------------
    // MONTAR TAREFA
    // -------------------------------

    div.appendChild(check);

    div.appendChild(info);

    div.appendChild(acoes);


    return div;
}


// ==========================================
// MARCAR COMO CONCLUÍDA
// ==========================================

function marcarComoConcluida(codigo) {

    const tarefa =
        tarefas.find(
            tarefa =>
                tarefa.codigo === codigo
        );


    if (!tarefa) {
        return;
    }


    tarefa.concluida =
        !tarefa.concluida;


    renderizarTarefas();

    atualizarEstatisticas();

}


// ==========================================
// ALTERAR PRIORIDADE
// ==========================================

function alterarPrioridade(
    codigo,
    novaPrioridade
) {

    if (
        novaPrioridade < 1 ||
        novaPrioridade > 3
    ) {

        mostrarMensagem(
            "A prioridade deve estar entre 1 e 3.",
            "erro"
        );

        return;
    }


    const tarefa =
        tarefas.find(
            tarefa =>
                tarefa.codigo === codigo
        );


    if (!tarefa) {
        return;
    }


    tarefa.prioridade =
        novaPrioridade;


    renderizarTarefas();

    atualizarEstatisticas();


    mostrarMensagem(
        "Prioridade alterada com sucesso!",
        "sucesso"
    );
}


// ==========================================
// DEFINIR CLASSE DA PRIORIDADE
// ==========================================

function classePrioridade(prioridade) {

    if (prioridade === 1) {
        return "alta";
    }

    if (prioridade === 2) {
        return "media";
    }

    return "baixa";
}


// ==========================================
// ATUALIZAR ESTATÍSTICAS
// ==========================================

function atualizarEstatisticas() {

    const total =
        tarefas.length;


    const concluidas =
        tarefas.filter(
            tarefa =>
                tarefa.concluida
        ).length;


    const pendentes =
        total - concluidas;


    totalTarefas.textContent =
        total;


    tarefasConcluidas.textContent =
        concluidas;


    tarefasPendentes.textContent =
        pendentes;
}


// ==========================================
// ATUALIZAR CONTADOR
// ==========================================

function atualizarContador() {

    const quantidade =
        tarefas.length;


    if (quantidade === 1) {

        contador.textContent =
            "1 tarefa";

    } else {

        contador.textContent =
            `${quantidade} tarefas`;

    }
}


// ==========================================
// EXIBIR MENSAGEM
// ==========================================

function mostrarMensagem(
    texto,
    tipo
) {

    mensagem.textContent =
        texto;


    mensagem.className =
        `mensagem ${tipo}`;


    setTimeout(() => {

        mensagem.textContent =
            "";

        mensagem.className =
            "mensagem";

    }, 3000);
}


// ==========================================
// INICIALIZAR SISTEMA
// ==========================================

renderizarTarefas();

atualizarEstatisticas();