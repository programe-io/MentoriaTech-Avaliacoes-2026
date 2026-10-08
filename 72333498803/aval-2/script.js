// Lista que armazenará as tarefas
let tarefas = [];

let proximoCodigo = 1;


// Pegando os elementos do HTML
const formulario = document.getElementById("formTarefa");
const titulo = document.getElementById("titulo");
const prioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");


// CADASTRAR TAREFA
formulario.addEventListener("submit", function(event) {

    // Impede a página de recarregar
    event.preventDefault();

    const tituloTexto = titulo.value.trim();
    const prioridadeValor = Number(prioridade.value);


    // Verifica o tamanho do título
    if (tituloTexto.length < 5) {

        mensagem.textContent =
            "O título deve ter no mínimo 5 caracteres.";

        mensagem.className = "erro";

        return;
    }


    // Verifica a prioridade
    if (
        prioridade.value === "" ||
        prioridadeValor < 1 ||
        prioridadeValor > 3
    ) {

        mensagem.textContent =
            "Escolha uma prioridade entre 1 e 3.";

        mensagem.className = "erro";

        return;
    }


    // Cria uma nova tarefa
    const tarefa = {

        codigo: proximoCodigo,

        titulo: tituloTexto,

        prioridade: prioridadeValor,

        concluida: false
    };


    // Coloca a tarefa na lista
    tarefas.push(tarefa);

    proximoCodigo++;


    // Limpa os campos
    titulo.value = "";
    prioridade.value = "";


    // Mostra mensagem
    mensagem.textContent =
        "Tarefa cadastrada com sucesso!";

    mensagem.className = "sucesso";


    // Atualiza a lista
    mostrarTarefas();

});


// MOSTRAR TAREFAS
function mostrarTarefas() {

    listaTarefas.innerHTML = "";


    if (tarefas.length === 0) {

        listaTarefas.innerHTML =
            "<p>Nenhuma tarefa cadastrada.</p>";

        return;
    }


    tarefas.forEach(function(tarefa) {

        const div = document.createElement("div");

        div.className = "tarefa";


        if (tarefa.concluida) {
            div.classList.add("concluida");
        }


        let nomePrioridade;

        if (tarefa.prioridade === 1) {
            nomePrioridade = "Alta";
        } 
        else if (tarefa.prioridade === 2) {
            nomePrioridade = "Média";
        } 
        else {
            nomePrioridade = "Baixa";
        }


        let status;

        if (tarefa.concluida) {
            status = "Concluída";
        } 
        else {
            status = "Pendente";
        }


        div.innerHTML = `
            <h3>${tarefa.titulo}</h3>

            <p>
                <strong>Código:</strong>
                ${tarefa.codigo}
            </p>

            <p>
                <strong>Prioridade:</strong>
                ${tarefa.prioridade} - ${nomePrioridade}
            </p>

            <p>
                <strong>Status:</strong>
                ${status}
            </p>

            <div class="acoes">

                ${
                    !tarefa.concluida
                    ? `
                    <button
                        class="btn-concluir"
                        onclick="concluirTarefa(${tarefa.codigo})">
                        Concluir
                    </button>
                    `
                    : ""
                }

                <button
                    class="btn-prioridade"
                    onclick="alterarPrioridade(${tarefa.codigo})">
                    Alterar prioridade
                </button>

            </div>
        `;


        listaTarefas.appendChild(div);

    });
}


// CONCLUIR TAREFA
function concluirTarefa(codigo) {

    const tarefa = tarefas.find(function(tarefa) {

        return tarefa.codigo === codigo;

    });


    if (tarefa) {

        tarefa.concluida = true;

        mostrarTarefas();

    }

}


// ALTERAR PRIORIDADE
function alterarPrioridade(codigo) {

    const tarefa = tarefas.find(function(tarefa) {

        return tarefa.codigo === codigo;

    });


    if (!tarefa) {
        return;
    }


    const novaPrioridade = prompt(
        "Digite a nova prioridade:\n\n" +
        "1 - Alta\n" +
        "2 - Média\n" +
        "3 - Baixa"
    );


    const valor = Number(novaPrioridade);


    if (
        novaPrioridade === null ||
        valor < 1 ||
        valor > 3 ||
        !Number.isInteger(valor)
    ) {

        alert("Digite apenas 1, 2 ou 3.");

        return;
    }


    tarefa.prioridade = valor;

    mostrarTarefas();

}