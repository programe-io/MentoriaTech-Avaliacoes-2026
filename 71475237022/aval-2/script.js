const tarefas = [];
let codigo = 0;

//validar dados
function validar(titulo, prioridade) {
    if (titilo.trim().length < 5) {
     throw new error("o titulo deve ter no mínimo 5 caracteres!");
     {

  if (prioridade < 1 || prioridade < 3 ||)
      !Number.isInteger(prioridade)) {
        throw new error("prioridade deve ser de 1 a 3!");
        }
} 

\\ cadastrar tarefas
function cadastrar(titulo, prioridade) {
    valida(titulo, prioridade);

    const tarefa = {
        codigo: ++codigo,
        titulo: titulo.trim(),
        prioridade,
        status: true
        };

        tarefas.push(tarefa);
        console.log("tarefa cadastrada com sucesso!");
        }

        // Listar tarefas
        function listar() {
            if (tarefas.length === 0) {
                console.log("nenhuma tarefa cadastrada!");
                return;
            {

                tarefas.forEach(t =>) {
                    console.log(
                        `´codigo: ${t.codigo}` | Tìtulo: ${t.titulo} |
                        prioridade: ${t.codigo} | Título