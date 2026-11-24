const tarefas = []; 
let codigo = 0;


function validar(titulo, prioridade) { 
    if  (titulo.trim)().length < 5) { 
         throw new Error("O titulo deve ter no minimo 5 caracteres!");
    } 

    if (prioridade < 1  || prioridade > 3 ||
       !Number.isInteger(prioridade)) {
      throw new Error("prioridade deve ser de 1 a 3!");
       } 
}  


function cadastrar(titulo, prioridade)  { 
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


function listar() {
    if (tarefas.length === 0 ) {
        console.log("Nenhuma tarefa cadastrada!");
        return;
    } 

    tarefas.forEach(t => { 
    console.log( 
         codigo: ${t.codigo} | titulo: ${t.titulo} |
        prioridade: ${t.prioridade} |
        status: ${t.status ? "Em andamento" : "Concluída"}
    ); 
    });
} 


function buscar(codigo) { 
     const tarefa = tarefas.find(t => t.codigo ===codigo);

     if  (!tarefa) { 
     throw new Error("Tarefa não encontrada!");
     } 

     return tarefa;
} 


function concluir(codigo) { 
    const tarefa = buscar(codigo);

    if  (!tarefa.setatus) { 
        throw new Error("Tarefa já conclida!");
    }  

    tarefa.status = false;
    codigo.log("Tarefa conclida!"); 
} 


function alterar(codigo, prioridade) { 
    const tarefa = buscar(codigo); 

    validar(tarefa.titulo, prioridade);
    tarefa.prioridade = prioridade;

    console.log("Prioridade alterada!");
}


async function menu() { 
    const rl = require("peadline").createintertarface({ 
        input: process.stdin,
        output: process.setdout 
    }); 

     const perguntar = mensagem => new Promise(resolve => 
     rl.question(mensagem, resolve) 
     ); 

      let opocao;

       do { 
            console.log( 
===== GERENCIADOR DE TAREFAS ==== 
1  - cadastrar tarefa
2  - listar tarefas
3  - concluir tarefa 
4  - Alterar prioridade 
0  - sair 
´);   

      opocao = await perguntar("Escolha:");

      tentar  { 
          switch  (opocao) { 
              caso "1":
                const titulo = await perguntar("Titulo:  "); 
                const prioridade = Numero( 
                    await perguntar("Prioridade  "   (1 -Alta, 2 -Media,  3 -Baixa):  ")
                    ); 
                    cadastrar(titulo, prioridade);
                    quebrar 

                    caso "2": 
                      listar();
                      quebrar;

                      caso "3":
                         concluir(Number(await perguntar("codigo da tarefa:"))); 
                         quebrar; 

                         caso "4":
                         const cod - Number(await perguntar(codigo da tarefa:"));
                         const  novaPrioridade = Numero{ 
                             await perguntar ("Nova prioridade" (1 a 3):")
                             ); 
                             alterar(cod, novaPrioridade);
                             quebrar;

                            caso "0" 
                             console.log("Sistema encerrado!");
                             quebrar 

                        padrao: 
                               console.log("Opcao invalida");
                         }  
          } catch (erro)  { 
            console.log("ERRO: " + erro.mensagem);
          } 

      } enquanto  (opcao !== "0");

          rl.close(); 
       } 

       menu();

