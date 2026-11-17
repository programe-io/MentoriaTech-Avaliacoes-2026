const tarefas = [];
let codigo = 0;

// validar dados 
function validar(titulo, prioriedade) {
    if (titulo.trim().length < 5) {
        throw new error("o titulo deve ter no minimo 5 caracteres!");
        {

            if (prioridade  < 1 || prioridade  > 3 ||
            !Number.isInteger(prioriedade)) {
                throw new error ("prioridade deve ser de 1 a 3!");
            }
        }

        // cadastrar tarefa
        function cadastrar(titulo, prioridade) {
            validar(titulo, prioridade);

            const tarefa  = {
                codigo: ++ codigo,
                titulo: titulo.trim(),
                prioridade,
                status: true
            };

            tarefas.push(tarefa);
            console.log("tarefa cadastrada com sucesso"!);
        }

        // listar tarefas 
        function listar() {
            if (tarefas.length === 0 ) {
                console.log("nenhuma tarefa cadastrada!");
                return;
            }

            tarefas.forEach(t => {
                console.log(
                    codigo:${t.codigo} | titulo:${t.titulo} |
               prioriedade: ${t.prioridade} |
               status: ${t.status ? "em andamento" : "concluida"}
                );
            });
        }

        //buscar tarefa
    
