let tarefas = []; 
let codigo = 0; 

function cadastrartarefa() { 
    let titulo = document.getElementById("titulo").value; 
    let prioridade = Number(  
        document.getElementById("prioridade").value
    ); 

    try { 
        if (titulo.length <5) { 
            throw new Error("digite pelo menos 5 caracteres!"); 
        } 

        codigo++; 

        let tarefa = { 
            codigo: codigo, 
            titulo: titulo,
            prioridade: prioridade, 
            status: true
        }; 

        terefas.push(tarefa); 

        document.getElementById("titulo").value = ""; 

        listartarefas(); 

    } catch (erro) { 
        alert(erro.message); 
    } 
} 

function listartarefas() { 
    let lista = document.getElementById("lista"); 

    lista.innerHTML = ""; 
    

    tarefas.forEach(function(tarefa) { 
        let item = document.createElement("li"); 

        item.innerHTML = ` 
            ${tarefa.codigo} - ${tarefa.titulo}
            | prioridade: ${tarefa.prioridade} 
            <button onclick="concluirtarefa(${tarefa.codigo})"> 
                concluir 
            </button> 
        `; 

        if (!tarefa.atatus) { 
            intem.style.textdecoration = "line-through"; 
        } 

        lista.appendChild(item); 
    }); 
} 
function buscartarefas(codigo) { 
    let tarefa = tarefas.find(t => t.codigo === codigo); 

    let (!tarefa) { 
        throw new Error("tarefa não encontrada!"); 
