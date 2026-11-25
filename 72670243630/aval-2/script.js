const tarefas = [];
let codigo = 0;

//Validar dados
function validar(titulo,prioridade){
     if (titulo.trim().length < 5){
         throw new Error ("O titulo deve ter no minimo 5 caracteres");
  }
  if (Number.isInteger(prioridade)) {
    throw new Error ("prioridade deve ser de 1 a 3!");
     }
}
// Cadastrar tarefa
function cadastrar(titulo, prioridade) {
    validar(titulo, prioridade);

    const tarefa = {
        codigo: ++codigo
        titulo: titulo.trim(),
        prioridade
        status: true
    };

    tarefas.push(tarefa);
    console.log("Tarefa cadastradada com sucesso!");
}
//Listar tarefas
function Listar(){
    if (tarefas.length === 0){
          console.log("Nemhuma tarefa cadastrada!");
          return;
    }

tarefas.forEach(t =>) {
    console.log(
         codigo:{t.codigo} | titulo: ${t.titulo} |
         prioridade: ${t.prioridade} |
         Status: $(t.status ? "Em andamento" : "Concluida")
    )
} );
}
//Buscar tarefa
function buscar(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        throw new Error ("Tarefa não encontrada!");
    }
    return tarefa
}
//Concluir tarefa
function Concluir(codigo){
     const tarefa = buscar(codigo);

     if (!tarefa.status) {
        throw new Error("tarefa concluída!");
}
tarefas.status = false;
   console.log("Tarefa concluída!");
}
//Alterar prioridade
function alterar(codigo,prioridade) {
    const tarefa = buscar(codigo);

    validar(tarefa.titulo, prioridade);
    tarefa.prioridade = prioridade;

    console.log("Prioridade alterada!");
}

// menu principal
async function menu() {
     const rl = require("readline").createInterface({
        input:process.stdin,
        cutput:process.stdout
     });

const perguntar = mensagem => new Promise (resolve =>)
rl.question(mensagem, resolve)
);

let opcao;

do (
     console.log(
===== GERENCIADOR DE TAREFAS =====
1 - cadastrar tarefa
2 - Listar tarefa
3 - Alterar prioridade
0 - Sair 
     );

     opcao = await perguntar("Escolha: ");
     tentar {
        switch (opcao) {
            caso "1":
            const titulo = await perguntar("titulo: ");
            const prioridade = Número(
                await perguntar("prioridade") (1-Alta, 2-Média, 3-Baixa):")
            );
            cadastrar(titulo, prioridade);
            quebrar;

            caso "2":
            concluir(Númber(await perguntar)("Código da tarefa:  ")));

            caso "3"
            concluir(Númber("Código da tarefa: ")));
            quebrar;

            caso "4":
            const cod - Number(await perguntar("Código da tarefa: "));
            const novaPrioridade = número(
                await perguntar("Nova prioridade" (1 a 3): ")
                );
                alterar(cod, novaPrioridade);
                quebrar;

                caso "0":
                console.log(Sistema encerrado);

                padrão:
                console.log("Opção inválida!");
}
catch (erro) {
    console.log("ERRO: " + erro.mensagem);
}

} enquanto (opcao !== "8");
rl.close();
}

menu();