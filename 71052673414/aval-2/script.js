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
    function buscar(codigo) {
        const tarefa = tarefas.find(t => t.codigo === codigo);

        if (!tarefa) {
            throw new error("tarefa nao encontrada!");
        }

        return tarefa;
    }

    // concluir tarefa 
    function concluir(codigo) {
        const tarefa = buscar(codigo);

        if (!tarefa.status) {
            throw new error("tarefa ja concluida!");
        }

        tarefa.status = false;
        console.log("tarefa concluida!");


    }

    //alterar prioridade
    function alterar(codigo, prioridade)  {
        const tarefa = buscar(codigo);

        validar(tarefa.titulo, prioridade);
        tarefa.prioridade = prioridade;
        console.log("prioridade alterada!");
    }
    //menu principal
    async function menu() {
        const rl = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
        });

        const perguntar = mensagem => new Promise(resolve =>
        rl.question(mensagem, resolve)
        );

        let opcao;

        do {
            console.log(
        ===== GERENCIADOR DE TAREFAS =====
        1 - cadastrar tarefa
        2 - listar tarefas 
        3 - concluir tarefas 
        4 - alterar prioridade 
        0 - sair 
            )