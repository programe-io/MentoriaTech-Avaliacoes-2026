let tarefas = []; 
let proximoCodigo = 1; 

function cadastrarTarefa(titulo, prioridade) { 
    if (!titulo || titulo.trim().length < 5) { 
        return { sucesso: false, mensagem: "Erro: O título deve ter no mínimo 5 caracteres." }; 
    } 

    const p = parseInt(prioridade); 
    if (isNaN(p) || p < 1 || p > 3) { 
        return { sucesso: false, mensagem: "Erro: A prioridade deve ser um valor entre 1 (alta) e 3 (baixa)." }; 
    } 

    const novaTarefa = { 
        codigo: proximoCodigo++, 
        titulo: titulo.trim(), 
        prioridade: p, 
        concluida: false 
    }; 

    tarefas.push(novaTarefa); 
    
    // CORREÇÃO: Uso de crases para permitir as aspas e a interpolação da variável
    return { sucesso: true, mensagem: `Tarefa "${novaTarefa.titulo}" cadastrada com sucesso!` }; 
} 

function renderizarTarefas() { 
    const ul = document.getElementById("listaTarefas"); 
    if (!ul) return; 

    ul.innerHTML = ""; 

    if (tarefas.length === 0) { 
        ul.innerHTML = "<li>Nenhuma tarefa cadastrada.</li>"; 
        return; // Boa prática para encerrar a execução aqui
    }

    // CORREÇÃO: O restante da lógica para renderizar as tarefas deve vir aqui
    tarefas.forEach(tarefa => {
        const li = document.createElement("li");
        li.textContent = `${tarefa.codigo} - ${tarefa.titulo} (Prioridade: ${tarefa.prioridade})`;
        ul.appendChild(li);
    });
} // CORREÇÃO: Fechamento da função que estava ausente
