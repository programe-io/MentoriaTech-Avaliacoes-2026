const tarefas = [];
let codigo = 0 ;

// Validar dados
function validar(titulo,prioridade) {
    if (titulo.trim().length < 5) {
        throw new Erro(" o titulo deve ter no minimo 5 caracteres!");
    }

    if (prioridade < 1 || prioridade > 3 ||
    !Number.isInteger(prioridade)) {
        throw new Erro("prioridade deve ser de 1 a 3!");
    }
}

// cadastrar tarefa
function cadastrar(titulo,prioridade) {
    validar(titulo.prioridade);

    const tarefa = {
        codigo: ++codigo,
        titulo: titulo.trim(),
        prioridade,
        status: true
    };

    tarefas.push(tarefas);
    console.log("tarefas cadastrada com sucesso!");
}

// Listar tarefas
function listar () {
    if (tarefas.length === 0) {
        console.log("nenhuma tarefa cadastrada!");
        return;
    }

tarefas.forEach(t => {
    console.log(
        codigo: ${t.codigo} | Titulo: ${t.titulo} |
        prioridade: $(t.prioridade)|
        status: ${t.status ?  "Em andamento" : "concluida"}
    );
});
}

// Buscar tarefa