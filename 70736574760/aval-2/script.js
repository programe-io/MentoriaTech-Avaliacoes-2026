// Array para armazenar as tarefas
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
let codigo = Number(localStorage.getItem("codigo")) || 0;

// Validar os dados
function validarDadosDaTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres!");
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error("A prioridade deve estar entre 1 e 3!");
    }
}

// Buscar tarefa pelo código
function buscarTarefa(codigoBusca) {
    let tarefa = tarefas.find(t => t.codigo === codigoBusca);

    if (!tarefa) {
        throw new Error("Tarefa não encontrada!");
    }

    return tarefa;
}

// Cadastrar tarefa
function cadastrarTarefa(titulo, prioridade) {
    validarDadosDaTarefa(titulo, prioridade);

    codigo++;

    let tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);
    salvarDados();

    return tarefa;
}

// Listar tarefas
function listarTarefas() {
    return tarefas;
}

// Concluir tarefa
function concluirTarefa(codigoBusca) {
    let tarefa = buscarTarefa(codigoBusca);

    if (!tarefa.status) {
        throw new Error("Essa tarefa já foi concluída!");
    }

    tarefa.status = false;
    salvarDados();
}

// Alterar prioridade
function alterarPrioridade(codigoBusca, novaPrioridade) {
    let tarefa = buscarTarefa(codigoBusca);

    validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;
    salvarDados();
}

// Salvar no navegador
function salvarDados() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    localStorage.setItem("codigo", codigo);
}

// Exibir tarefas na tela
function exibirTarefas() {
    let lista = document.getElementById("listaTarefas");
    lista.innerHTML = "";

    if (listarTarefas().length === 0) {
        lista.innerHTML = '<p class="vazio">Nenhuma tarefa cadastrada.</p>';
        return;
    }

    tarefas.forEach(tarefa => {
        let div = document.createElement("div");
        div.className = tarefa.status ? "tarefa" : "tarefa concluida";

        let titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        let codigoTexto = document.createElement("p");
        codigoTexto.textContent = "Código: " + tarefa.codigo;

        let prioridadeTexto = document.createElement("p");
        prioridadeTexto.textContent = "Prioridade: " + 
            ["", "Alta", "Média", "Baixa"][tarefa.prioridade];

        let statusTexto = document.createElement("p");
        statusTexto.textContent = "Status: " +
            (tarefa.status ? "Em andamento" : "Concluída");

        div.append(titulo, codigoTexto, prioridadeTexto, statusTexto);

        let acoes = document.createElement("div");
        acoes.className = "acoes";

        if (tarefa.status) {
            let btnConcluir = document.createElement("button");
            btnConcluir.textContent = "Concluir";
            btnConcluir.onclick = () => {
                try {
                    concluirTarefa(tarefa.codigo);
                    exibirTarefas();
                } catch (erro) {
                    alert(erro.message);
                }
            };

            acoes.appendChild(btnConcluir);
        }

        let btnPrioridade = document.createElement("button");
        btnPrioridade.textContent = "Alterar prioridade";

        btnPrioridade.onclick = () => {
            let nova = prompt("Digite a nova prioridade (1 Alta, 2 Média, 3 Baixa):");

            if (nova === null) return;

            try {
                let valor = Number(nova);

                if (!Number.isInteger(valor)) {
                    throw new Error("Digite um número inteiro!");
                }

                alterarPrioridade(tarefa.codigo, valor);
                exibirTarefas();

                alert("Prioridade alterada com sucesso!");
            } catch (erro) {
                alert(erro.message);
            }
        };

        acoes.appendChild(btnPrioridade);
        div.appendChild(acoes);
        lista.appendChild(div);
    });
}

// Cadastro pelo formulário
document.getElementById("formTarefa").addEventListener("submit", function(event) {
    event.preventDefault();

    let titulo = document.getElementById("titulo").value.trim();
    let prioridade = Number(document.getElementById("prioridade").value);

    try {
        cadastrarTarefa(titulo, prioridade);

        alert("Tarefa cadastrada com sucesso!");

        document.getElementById("formTarefa").reset();
        exibirTarefas();

    } catch (erro) {
        alert(erro.message);
    }
});

// Mostrar tarefas ao abrir
exibirTarefas();