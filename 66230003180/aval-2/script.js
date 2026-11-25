let tarefas = [];

function cadastrarTarefa() {

    let codigo = document.getElementById("codigo").value.trim();
    let titulo = document.getElementById("titulo").value.trim();
    let prioridade = Number(document.getElementById("prioridade").value);

    if (codigo === "" || titulo === "" || !prioridade) {
        alert("Preencha todos os campos!");
        return;
    }

    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    if (prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

    if (tarefas.some(t => t.codigo === codigo)) {
        alert("Esse código já está cadastrado!");
        return;
    }

    tarefas.push({
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    });

    listarTarefas();

    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("prioridade").value = "";
}

function listarTarefas() {

    let lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    tarefas.forEach((tarefa, index) => {

        let linha = document.createElement("tr");

        let dados = [
            tarefa.codigo,
            tarefa.titulo,
            tarefa.prioridade == 1 ? "Alta" :
            tarefa.prioridade == 2 ? "Média" : "Baixa",
            tarefa.concluida ? "Concluída" : "Pendente"
        ];

        dados.forEach(dado => {
            let celula = document.createElement("td");
            celula.textContent = dado;
            linha.appendChild(celula);
        });

        let acoes = document.createElement("td");

        let concluir = document.createElement("button");
        concluir.textContent = "Concluir";
        concluir.disabled = tarefa.concluida;
        concluir.onclick = () => marcarConcluida(index);

        let alterar = document.createElement("button");
        alterar.textContent = "Alterar prioridade";
        alterar.onclick = () => alterarPrioridade(index);

        acoes.appendChild(concluir);
        acoes.appendChild(alterar);

        linha.appendChild(acoes);

        lista.appendChild(linha);
    });
}

function marcarConcluida(index) {

    tarefas[index].concluida = true;

    listarTarefas();

    alert("Tarefa concluída!");
}

function alterarPrioridade(index) {

    let novaPrioridade = Number(
        prompt("Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa")
    );

    if (![1, 2, 3].includes(novaPrioridade)) {
        alert("Digite uma prioridade válida!");
        return;
    }

    tarefas[index].prioridade = novaPrioridade;

    listarTarefas();

    alert("Prioridade alterada!");
}