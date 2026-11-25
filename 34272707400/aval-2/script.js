
// GERENCIADOR DE TAREFAS

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

let proximoId = Number(localStorage.getItem("proximoIdTarefa")) || 1;

// SALVAR DADOS
function salvarDados() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    localStorage.setItem("proximoIdTarefa", proximoId);
}

// CADASTRAR TAREFA
document.getElementById("formTarefa").addEventListener("submit", function(event) {

    event.preventDefault();

    let nome = document.getElementById("nome").value.trim();
    let descricao = document.getElementById("descricao").value.trim();
    let data = document.getElementById("data").value;
    let prioridade = document.getElementById("prioridade").value;

    if (nome === "" || data === "") {
        alert("Preencha os campos obrigatórios!");
        return;
    }

    let tarefa = {
        id: proximoId++,
        nome: nome,
        descricao: descricao,
        data: data,
        prioridade: prioridade,
        status: "Pendente"
    };

    tarefas.push(tarefa);

    salvarDados();

    alert("Tarefa cadastrada com sucesso!");

    document.getElementById("formTarefa").reset();

    listarTarefas();
    atualizarRelatorio();

});

// LISTAR TAREFAS
function listarTarefas(lista = tarefas) {

    let tabela = document.getElementById("listaTarefas");

    tabela.innerHTML = "";

    if (lista.length === 0) {
        tabela.innerHTML =
            '<tr><td colspan="7">Nenhuma tarefa cadastrada.</td></tr>';
        return;
    }

    lista.forEach(function(tarefa) {

        let linha = document.createElement("tr");

        function criarCelula(valor) {
            let celula = document.createElement("td");
            celula.textContent = valor;
            return celula;
        }

        linha.appendChild(criarCelula(tarefa.id));
        linha.appendChild(criarCelula(tarefa.nome));
        linha.appendChild(criarCelula(tarefa.descricao));
        linha.appendChild(criarCelula(
            new Date(tarefa.data + "T00:00:00").toLocaleDateString("pt-BR")
        ));
        linha.appendChild(criarCelula(tarefa.prioridade));
        linha.appendChild(criarCelula(tarefa.status));

        let acoes = document.createElement("td");

        let concluir = document.createElement("button");

        concluir.textContent =
            tarefa.status === "Concluída"
                ? "Reabrir"
                : "Concluir";

        concluir.onclick = function() {
            alterarStatus(tarefa.id);
        };

        let editar = document.createElement("button");
        editar.textContent = "Editar";

        editar.onclick = function() {
            editarTarefa(tarefa.id);
        };

        let excluir = document.createElement("button");
        excluir.textContent = "Excluir";

        excluir.onclick = function() {
            excluirTarefa(tarefa.id);
        };

        acoes.appendChild(concluir);
        acoes.appendChild(editar);
        acoes.appendChild(excluir);

        linha.appendChild(acoes);

        tabela.appendChild(linha);

    });

}

// EDITAR TAREFA
function editarTarefa(id) {

    let tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    let novoNome = prompt("Novo nome:", tarefa.nome);

    if (novoNome === null) return;

    novoNome = novoNome.trim();

    if (novoNome === "") {
        alert("Nome inválido!");
        return;
    }

    let novaDescricao = prompt(
        "Nova descrição:",
        tarefa.descricao
    );

    if (novaDescricao === null) return;

    let novaData = prompt(
        "Nova data (AAAA-MM-DD):",
        tarefa.data
    );

    if (novaData === null) return;

    if (!/^\d{4}-\d{2}-\d{2}$/.test(novaData)) {
        alert("Data inválida!");
        return;
    }

    let novaPrioridade = prompt(
        "Prioridade (Baixa, Média ou Alta):",
        tarefa.prioridade
    );

    if (novaPrioridade === null) return;

    novaPrioridade = novaPrioridade.trim().toLowerCase();

    let prioridades = {
        "baixa": "Baixa",
        "média": "Média",
        "media": "Média",
        "alta": "Alta"
    };

    if (!prioridades[novaPrioridade]) {
        alert("Prioridade inválida!");
        return;
    }

    tarefa.nome = novoNome;
    tarefa.descricao = novaDescricao;
    tarefa.data = novaData;
    tarefa.prioridade = prioridades[novaPrioridade];

    salvarDados();
    listarTarefas();
    atualizarRelatorio();

    alert("Tarefa atualizada!");

}

// EXCLUIR TAREFA
function excluirTarefa(id) {

    let confirmar = confirm("Deseja excluir esta tarefa?");

    if (!confirmar) return;

    tarefas = tarefas.filter(t => t.id !== id);

    salvarDados();
    listarTarefas();
    atualizarRelatorio();

    alert("Tarefa excluída!");

}

// ALTERAR STATUS
function alterarStatus(id) {

    let tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) return;

    tarefa.status =
        tarefa.status === "Pendente"
            ? "Concluída"
            : "Pendente";

    salvarDados();
    listarTarefas();
    atualizarRelatorio();

}

// PESQUISAR TAREFAS
function pesquisarTarefas() {

    let pesquisa = document.getElementById("pesquisa")
        .value.trim().toLowerCase();

    let resultado = tarefas.filter(function(tarefa) {

        return tarefa.nome.toLowerCase().includes(pesquisa);

    });

    listarTarefas(resultado);

}

// FILTRAR TAREFAS
function filtrarTarefas(status) {

    if (status === "Todas") {
        listarTarefas();
        return;
    }

    let resultado = tarefas.filter(function(tarefa) {
        return tarefa.status === status;
    });

    listarTarefas(resultado);

}

// RELATÓRIO
function atualizarRelatorio() {

    let total = tarefas.length;

    let pendentes = tarefas.filter(
        t => t.status === "Pendente"
    ).length;

    let concluidas = tarefas.filter(
        t => t.status === "Concluída"
    ).length;

    document.getElementById("totalTarefas").textContent =
        "Total de tarefas: " + total;

    document.getElementById("pendentes").textContent =
        "Tarefas pendentes: " + pendentes;

    document.getElementById("concluidas").textContent =
        "Tarefas concluídas: " + concluidas;

}

// INICIALIZAR SISTEMA
listarTarefas();
atualizarRelatorio();
