let tarefas = [];
let proximocodigo = 1;

const formulario = document.getElementById("forTarefa");
const listaTarefas = document.getElementById("listaTarefa");

// 1. Cadastrar uma nova tarefa
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = document.getElementById("prioridade").value;
    
    if (titulo === "") {
        alert("digite o título da tarefa.");
        return;
    }

    const tarefa = {
        codigo: proximocodigo++,
        titulo: titulo,
        prioridade: prioridade,
        status: "pendente",
        conclusão: "não concluída"
    };

    tarefas.push(tarefa);

     formulario.reset();
     listaTarefas();
     };

     // 2. listar as tarefas cadastradas
     function listaTarefas() {
        listaTarefas.innerHTML = "";

        tarefas.forEach(function(tarefa) {
            const linha = document.createElement("tr");

            const dados = [
                tarefa.codigo,
                tarefa.titulo,
                tarefa.prioridade,
                tarefa.status,
                tarefa.conclusao

            ];

            dados.forEach(function(dado, indice) {
                const celula = document.createElement("td");
                celula.textContent = dado

                if (indice === 3) {
                    celula.className =
                    tarefa.status === "concluída"
                        ? "concluída"
                        : "pendente"
                        
                   }
                    
                    linha.appendChild(celula);
            });

            // coluna de ações
            const acoes = document.createElement("td");

            const botaoConluir = document.createElement("button");
            botaoConluir.textContent = "concluir";
            botaoConluir.className = "btn-concluir";
            botaoConluir.disabled =  tarefa.status === "conluída";

            botaoConluir.addEventListener("click", function() {
                concluirTarefa(tarefa.codigo);
            });

            const botaoprioridade = document.createElement("button");
            botaoprioridade.textContent = "alterar prioridade";
            botaoprioridade.className = "btn-alterar";

            botaoprioridade.addEventListener("click", function() {
                alterarprioridade(tarefa.codigo);
            });
    }

    // 3. Marmar uma tarefa como concluída
    function concluirTarefa(codigo) {
        const tarefa = tarefas.find(function(t) {
            return t.codigo === codigo;
        });

        if (!tarefa) {
            alert("tarefa não encontrada.");
            return;
        }

        tarefa.status = "concluída";
        tarefa.conclusao = new Date().toLocaleDateString("pt-BR");

        liatarTarefas();
        }

        // 4. alterar a prioridade de uma tarefa
        function alterarprioridade(codigo) ;
          const tarefa = tarefas.find(function(t) {
            return t.codigo === codigo;
          });

          if (!tarefa) {
            alert("tarefa não encontrada.");
            return;
          }

          const novaprioridade = prompt(
            "Digite a nova prioridade: baixa,média ou alta"
          );

          if (novaprioridade === null) {
            return;
          } 

          const prioridade = novaprioridade.trim().toLocaleLowerCase();

          const prioridadeValidas = {
            "baixa": "baixa",
            "média": "média",
            "média": "média",
            "alta": "alta"
          };
           if (!prioridadeValidas0[prioridade]) {
            alert("prioridade inválida! use baixa, média ou alta.");
            return;
           }

           tarefa.prioridade = prioridadeValidas[prioridade];

           listaTarefas();
           }                 