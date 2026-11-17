const tarefas =[] ;
let codigo = 0;

// validar dados
function validar(titulo, prioridade){ 
     if(titulo.trim().length < 5) {
        throw new Error("0 titulo dever ter no minimo % caracteres!");
        {

            if(prioridade <1 || prioridade > 3 ||
            !Number.isInteger(prioridade)) {
             throw new Error("prioridade dever ser de 1 a 31");


             
             \\ Cadastrar tarefas
             function Cadastrar(titulo, prioridade) {
                validar(titulo, prioridade);

                const tarefa ={
                    codigo:++codigo,
                    titulo: titulo.trim(),
                    prioridade
                    status: true
                    

                    taferas.push(tarefas);
                    console.log("Tarefa cadastrada com sucesso!");


                    \\ Listar taferas
                    function Listar(){
                        if (tarefas.length ===0)
                        console,log("Nemhuma tarefa cadastrada!");
                        return;


                        taferas.forEach(t => {
                            console.log)
                           ,{ Ex
                            prioridade;${t.codigo} | titulo:${t.titulo}|
                            status; ${t.status ?"Em andamento" : "concluida"
                            }



\\ buscar tarefas
