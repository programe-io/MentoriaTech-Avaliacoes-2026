
// ==========================================
// 1. GERENCIADOR DE TAREFAS
// ==========================================


const tarefas = [];


let proximoCodigo = 0;




function validarDadosDaTarefa(titulo, prioridade) {

  
    if (titulo.length < 5) {
        throw new Error("O título deve possuir no mínimo 5 caracteres.");
    }

   
    if (prioridade < 1 || prioridade > 3) {
        throw new Error("A prioridade deve estar entre 1 e 3.");
    }
}




function cadastrarTarefa(titulo, prioridade) {

    try {

      
        validarDadosDaTarefa(titulo, prioridade);

     
        proximoCodigo++;

     
        const novaTarefa = {
            codigo: proximoCodigo,
            titulo: titulo,
            prioridade: prioridade,
            status: true
        };

        
        tarefas.push(novaTarefa);

        console.log("Tarefa cadastrada com sucesso!");
        return novaTarefa;

    } catch (erro) {

        console.error("Erro ao cadastrar tarefa:", erro.message);
        return null;
    }
}




function listarTarefas() {

    return tarefas;
}




function buscarTarefa(codigo) {

    
    const tarefa = tarefas.find(
        (tarefa) => tarefa.codigo === codigo
    );

    
    if (!tarefa) {
        throw new Error("Tarefa não encontrada. Código inválido.");
    }

    return tarefa;
}




function concluirTarefa(codigo) {

    try {

       
        const tarefa = buscarTarefa(codigo);

       
        if (!tarefa.status) {
            throw new Error("Esta tarefa já foi concluída.");
        }

       
        tarefa.status = false;

        console.log("Tarefa concluída com sucesso!");

        return tarefa;

    } catch (erro) {

        console.error("Erro ao concluir tarefa:", erro.message);
        return null;
    }
}




function alterarPrioridade(codigo, novaPrioridade) {

    try {

      const tarefa = buscarTarefa(codigo);

        
        validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

    
        tarefa.prioridade = novaPrioridade;

        console.log("Prioridade alterada com sucesso!");

        return tarefa;

    } catch (erro) {

        console.error("Erro ao alterar prioridade:", erro.message);
        return null;
    }
}




function exibirTarefas() {

    console.log("\n========== LISTA DE TAREFAS ==========");

    if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada.");
        return;
    }

    tarefas.forEach((tarefa) => {

        console.log("-----------------------------------");

        console.log("Código:", tarefa.codigo);
        console.log("Título:", tarefa.titulo);
        console.log("Prioridade:", tarefa.prioridade);

        console.log(
            "Status:",
            tarefa.status ? "Em andamento" : "Concluída"
        );

    });

    console.log("=====================================");
}


cadastrarTarefa("Estudar JavaScript", 1);

cadastrarTarefa("Fazer atividade", 2);

cadastrarTarefa("Organizar os estudos", 3);

cadastrarTarefa("Aprender funções", 1);


console.log("\nTarefas cadastradas:");

console.log(listarTarefas());



exibirTarefas();




try {

    const tarefaEncontrada = buscarTarefa(1);

    console.log("\nTarefa encontrada:");
    console.log(tarefaEncontrada);

} catch (erro) {

    console.error(erro.message);
}




concluirTarefa(1);




alterarPrioridade(2, 1);




cadastrarTarefa("Oi", 1);

cadastrarTarefa("Estudar HTML", 5);


concluirTarefa(100);

concluirTarefa(1);


alterarPrioridade(2, 8);




console.log("\n========== RESULTADO FINAL ==========");

exibirTarefas();
