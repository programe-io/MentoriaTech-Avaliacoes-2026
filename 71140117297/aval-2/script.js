
let tarefas = [];
let geradorCodigo = 0;
let filtroAtual = "todas";

function validarDadosTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
        throw new Error("Digite pelo menos 5 caracteres no título.");
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error("Selecione uma prioridade válida.");
    }
}

function cadastrarTarefa(titulo, prioridade) {
    validarDadosTarefa(titulo, prioridade);

    let tarefa = {
        codigo: ++geradorCodigo,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);
}

function concluirTarefa(codigo) {
    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) return;

    tarefa.status = false;
    mostrarTarefas();
}

function excluirTarefa(codigo) {
    tarefas = tarefas.filter(t => t.codigo !== codigo);
    mostrarTarefas();
}

function atualizarPrioridade(codigo, novaPrioridade) {
    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) return;

    if (novaPrioridade < 1 || novaPrioridade > 3) {
        alert("Prioridade inválida.");
        return;
    }

    tarefa.prioridade = novaPrioridade;
    mostrarTarefas();
}

function nomePrioridade(valor) {
    return ["Baixa", "Média", "Alta"][valor - 1];
}

function atualizarResumo() {
    let concluidas = tarefas.filter(t => !t.status).length;

    document.getElementById("total").textContent = tarefas.length;

    document.getElementById("pendentes").textContent =
        tarefas.length - concluidas;

    document.getElementById("concluidas").textContent = concluidas;
}

function mostrarTarefas() {
    let lista = document.getElementById("listaTarefas");
    let pesquisa = document.getElementById("pesquisa").value.toLowerCase();

    lista.innerHTML = "";

    let filtradas = tarefas.filter(tarefa => {
        let nomeCorreto = tarefa.titulo.toLowerCase().includes(pesquisa);

        let filtroCorreto =
            filtroAtual === "todas" ||
            (filtroAtual === "pendentes" && tarefa.status) ||
            (filtroAtual === "concluidas" && !tarefa.status);

        return nomeCorreto && filtroCorreto;
    });

    filtradas.forEach(tarefa => {
        let elemento = document.createElement("div");
        elemento.className = tarefa.status ? "tarefa" : "tarefa concluida";

        let info = document.createElement("div");
        info.className = "info";

        let titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        let codigo = document.createElement("p");
        codigo.textContent = "Código: " + tarefa.codigo;

        let prioridade = document.createElement("span");
        prioridade.className = "prioridade " +
            ["baixa", "media", "alta"][tarefa.prioridade - 1];

        prioridade.textContent =
            "Prioridade: " + nomePrioridade(tarefa.prioridade);

        info.append(titulo, codigo, prioridade);

        let acoes = document.createElement("div");
        acoes.className = "acoes";

        if (tarefa.status) {
            let concluir = document.createElement("button");
            concluir.className = "concluir";
            concluir.textContent = "Concluir";
            concluir.onclick = () => concluirTarefa(tarefa.codigo);
            acoes.appendChild(concluir);
        }

        let editar = document.createElement("button");
        editar.className = "editar";
        editar.textContent = "Prioridade";

        editar.onclick = () => {
            let nova = prompt("Digite 1 para Baixa, 2 para Média ou 3 para Alta:");

            if (nova === null || nova.trim() === "") return;

            atualizarPrioridade(tarefa.codigo, Number(nova));
        };

        let excluir = document.createElement("button");
        excluir.className = "excluir";
        excluir.textContent = "Excluir";

        excluir.onclick = () => {
            if (confirm("Deseja excluir esta tarefa?")) {
                excluirTarefa(tarefa.codigo);
            }
        };

        acoes.append(editar, excluir);
        elemento.append(info, acoes);
        lista.appendChild(elemento);
    });

    document.getElementById("mensagemVazia").style.display =
        filtradas.length === 0 ? "block" : "none";

    atualizarResumo();
}

function iniciarSistema() {
    const formulario = document.getElementById("formTarefa");
    const pesquisa = document.getElementById("pesquisa");

    if (!formulario || !pesquisa) {
        console.error("Não foi possível encontrar o formulário ou a pesquisa no HTML.");
        return;
    }

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        let titulo = document.getElementById("titulo").value.trim();

        let prioridade = Number(
            document.getElementById("prioridade").value
        );

        try {
            cadastrarTarefa(titulo, prioridade);

            formulario.reset();

            mostrarTarefas();

            alert("Tarefa cadastrada com sucesso!");

        } catch (erro) {
            alert(erro.message);
        }
    });

    pesquisa.addEventListener("input", mostrarTarefas);

    document.querySelectorAll(".filtro").forEach(botao => {
        botao.addEventListener("click", function() {
            filtroAtual = this.dataset.filtro;

            document.querySelectorAll(".filtro").forEach(item => {
                item.classList.remove("ativo");
            });

            this.classList.add("ativo");

            mostrarTarefas();
        });
    });

    mostrarTarefas();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciarSistema);
} else {
    iniciarSistema();
}
