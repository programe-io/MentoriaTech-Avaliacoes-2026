const tarefas = [];

const btnCadastrar =
document.getElementById("btnCadastrar");

btnCadastrar.addEventListener(
    "click",
    cadastrarTarefa
);

function cadastrarTarefa() {

    const titulo =
    document.getElementById("titulo").value.trim();

    const prioridade =
    Number(
        document.getElementById("prioridade").value
    );

    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres.");
        return;
    }

    if (prioridade < 1 || prioridade > 3) {
        alert("Prioridade inválida.");
        return;
    }

    const tarefa = {
        id: Date.now(),
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    document.getElementById("titulo").value = "";

    renderizar();
}

function renderizar() {

    const lista =
    document.getElementById("listaTarefas");

    lista.innerHTML = "";

    tarefas.forEach(tarefa => {

        const div =
        document.createElement("div");

        div.className =
        tarefa.concluida
            ? "tarefa concluida"
            : "tarefa";

        div.innerHTML = `
            <h3>${tarefa.titulo}</h3>
            <p>Prioridade: ${tarefa.prioridade}</p>

            <button onclick="concluir(${tarefa.id})">
                Concluir
            </button>

            <button onclick="alterar(${tarefa.id})">
                Alterar Prioridade
            </button>
        `;

        lista.appendChild(div);
    });
}

function concluir(id){

    const tarefa =
    tarefas.find(t => t.id === id);

    if(tarefa){
        tarefa.concluida = true;
    }

    renderizar();
}

function alterar(id){

    const tarefa =
    tarefas.find(t => t.id === id);

    if(!tarefa) return;

    const nova =
    Number(
        prompt(
            "1 = Alta\n2 = Média\n3 = Baixa"
        )
    );

    if(
        nova >= 1 &&
        nova <= 3
    ){
        tarefa.prioridade = nova;
    }

    renderizar();
}