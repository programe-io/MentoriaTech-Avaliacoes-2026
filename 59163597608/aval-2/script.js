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
  }

  // Listar tarefas
  function listar()
      if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadasstrar!");
        return;
      }

      tarefa.foreach(t=> {
        console.log(
             codigo: $(t.codigo) | titulo: $(t.titulo) |
             prioridade: $(t.prioridade) |
             status: $(t.status ? "Em anadamento" : "concluindo")
        );
      });
 }

 // Buscar tarefa


        
        

