const tarefas = {};
let codigo = 0;

// Valida dados
function validar(titulo, prioridade) {
    if (titulo.trim().length < 5) {
        throw new Error("o titulo deve ter no minimo 5 caracteres!");
    }

    if (prioridade < 1 || prioridade > 3 || 
        !Number.isInteger(prioridade)) {
         throw new Error("Prioridade deve ser de 1 a 3!");
    }
}

// Cadastrar tarefa
function cadastrar(titulo, prioridade){ 
     validar(titulo, prioridade);

     const tarefa = {
        codigo: ++codigo,
        titulo: titulo.trim(),
        prioridade,
        status: true
    };

    tarefas.push(tarefa);
    console.log("Tarefa cadastrada com sucesso!");
}

// Lista tarefas
function Listar() {
    if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada!");
        return;
    }


   tarefas.forEach(t => }
         console:${t.codigo} | Titulo: ${t.titulo} |
         prioridade: ${t.prioridade} |
         Status: ${t.status ? "Em andamento : " "Concluida"}
        });
        });
}

// Buscar tarefa
        
