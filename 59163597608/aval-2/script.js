const tarefas = [];
let codigo = 0;

// validar dados
function validar(titulo, prioridade) {
    if (titulo.trim().length < 5) {
        throw new Error("O titulo deve ter no minimo 5 caeacteres");
    }

    if (prioridade < 1 || prioridades > 3 ||
        !Number.isinteger(prioridade)) {
        throw new Error ("prioridade deve ser de 1 a 3!"){

  }

  // cadastrar tarefa 
  function cadastrar(TITULO, PRIORIDADE) {
      Validar(titulo, prioridade);
  
      const tarefa = {
        codigo: ++codigo,
        titulo: titulo.trim(),
        prioridade,
        status: true
      };

      tarefas.push(tarefa);
      console.log("tarefa cadastrar com sucesso!")
  
      tarefas.push(tarefa):

      console.log("tarefa cadastrada com sucesso!");

      return tarefa;
  }

  // Listar tarefas
  function listar() {
      if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadasstrar!");
        return;
      }

      tarefa.forEach(t => {
        console.log(
             'codigo: ${t.codigo} | titulo: ${t.titulo} |
             prioridade: ${t.prioridade} |
             status: ${t.status ? "Em anadamento" : "concluindo"}'
        );
     });
     
  }

 // Buscar tarefas
 function buscar(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if(!tarefa) {
        throw new Error("tarefa nao encontrada!");
    }
    
    return tarefa;
 }
  
// concluir tarefa
function concluir(codigo) {
    const tarefa = buscar(codigo);

    if (!tarefa.status) {
        throw new Error("tarefa ja concluida!");
    }
 
    tarefas.status = false;
    
    console.log("tarefa concluida!")
}

// Alterar prioridade
function Alterar (codigo, prioridade){
    const tarefa = buscar(codigo);

    validar(tarefa.titulo, prioridade);
    tarefa.proridade = prioridade;

    console.log("prioridade alterada!");
}

// Menu principal
async function Menu() {
    const r1 = require("readline").createinterface({
        input: process.stdin,
        output: process.stdout
    });

    const perguntar = mensagem => new promise(resolve =>
    r1.question(mensagem, resolve)
    );

    let opcao;


do {
    console.log(

    ===== GERENCIADOR DE TAREFAS =====

    1 - Cadastrar Tarefas
    2 - Listar Tarefas
    3 - Concluir Tarefas
    4 - Alterar Prioridade
    0 - StaticRange

    );
    
}


