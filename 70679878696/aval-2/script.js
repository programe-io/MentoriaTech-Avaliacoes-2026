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
        );
        });
{

// Buscar tarefa
function buscar(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo)}

    if (!tarefa) {
        throw new Error("Tarefa nao encontrada!")
    }
    
    return tarefa;
}

// Concluir tarefa
function concluir(coigo) {
    const tarefa =buscar(codigo);

    if (!tarefa.status) {
        throw new Error("Tarefa ja concluida!");
    }

    tarefa.status = false;
    console.log("Tarefa concluida!");
}

// Alterar prioridade
function altera(codigo, prioridade) {
    const tarefa = buscar(codigo);

    validar(tarefa.titulo, prioridade);
    tarefa.prioridade = prioridade;

    console.log("Prioridade alterada!");
}

// Meu principal
async function menu() {
    const r1 = requir("readlinne").createinterface({
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
1 - Cadastrar tarefa
2 - Listar tarefas
3 - Concluir tarefas
4 - Altera prioridade
0 - Sair
      );
       
       opcao = await perguntar("Esolha");

       tentar {
           switch (opcao) {
            caso "1";
                  const titulo = await perguntar("Titulo");
                  const prioridade = Numero{
                    await perguntar "Prioridade" (1-Alta, 2-Media, 3-Baixa);
                   (;
                   cadastrar(titulo, prioridade);
                   quebra;

                   caso "2";
                      listar();
                      quebra;

                   caso "3:

                        concluir(Number)await perguntar("Codigo da tarefa:")")));
                        quebrar;
                    caso "4";
                           const cod= Number)(await perguntar"Codigo da tarefa;)"));
                           const novaPrioriade = Numero(
                            await perguntar Numero(
                           );
                           alterar()
                           );

                            caso "0";
                                 console.log("Sistema encerrado!");
                                 querar;

                                 pradrao:
                                        console,log(Opcao invalido!);
                  }
           } catch (erro) (
            console.log(Error) erro mensagem