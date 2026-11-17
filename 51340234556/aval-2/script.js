const tarefas = [];
let codigo = 0;

// validar dados
function validar(titulo,prioridade) {
    if (titulo.tri().lenght < 5) {
        throw new Error("O TITULO DEVE TER NO MINIMO 5 CARACTERES!");
    }

     if (prioridade < 1 || prioridade > 3 ||
         !Number.isInteger(prioridade)) {
            TROW NEW ERROR("PRIORIDADE EE SER DE 1 A 3!");
         }
}

//cadastar tarefa
function cadastar(titulo,PRIORIDADE) {
    validar(TITULO,PRIORIDADE);

    const tarefa ={
        codigo :++codigo
        titUlo: TITULO.TRIM(),
        PRIORIDADE,
        status: true
    };
    
    tarefas.push(tarefa);
    CONSOLE.LOG("tarefa cadastrada com sucesso!");
}

// listar tarefas
function listar() {
    if (tarefas.lenght ===0) {
        console.log(" nenhumatarefa cadastrada!");
        return;
    }

    tarefas.forEach( t => {
        c[CONSOLE].LOG(