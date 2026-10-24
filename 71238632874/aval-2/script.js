const tarefas = [];
let proximoCodigo = 1;

function validarTarefa(titulo, prioridade) {
    if (!titulo || titulo.length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres.");
    }
    if (prioridade < 1 || prioridade > 3) {
        throw new Error("A prioridade deve estar entre 1 e 3.");
    }
}

function buscarTarefa(codigo) {
    const tarefaEncontrada = tarefas.find(t => t.codigo === codigo);
    if (!tarefaEncontrada) throw new Error(`Código ${codigo} não encontrado.`);
    return tarefaEncontrada;
}

function cadastrarTarefa(titulo, prioridade) {
    validarTarefa(titulo, prioridade);
    const novaTarefa = {
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: parseInt(prioridade),
        status: true
    };
    tarefas.push(novaTarefa);
    return novaTarefa;
}

function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);
    if (tarefa.status === false) throw new Error("A tarefa já estava concluída.");
    tarefa.status = false;
}

function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = buscarTarefa(codigo);
    validarTarefa("Título Válido", novaPrioridade);
    tarefa.prioridade = parseInt(novaPrioridade);
}

// Funções de controle da Interface Visual
function renderizarJanela() {
    const container = document.getElementById("listaTarefasContenedor");
    container.innerHTML = "";
    
    if(tarefas.length === 0) {
        container.innerHTML = `<p class="vazio">Nenhuma tarefa cadastrada ainda.</p>`;
        return;
    }

    tarefas.forEach(t => {
        const div = document.createElement("div");
        div.className = `tarefa-item ${!t.status ? 'concluida' : ''}`;
        
        div.innerHTML = `
            <div class="tarefa-dados">
                <span class="tarefa-titulo">#${t.codigo} - ${t.titulo}</span>
                <span class="badge prio-${t.prioridade}">Prio ${t.prioridade}</span>
            </div>
            <div class="acoes">
                ${t.status ? `<button class="btn-concluir" onclick="interfaceConcluir(${t.codigo})">✓</button>` : ''}
                <button class="btn-acao" onclick="interfaceMudarPrio(${t.codigo})">↕ Prio</button>
            </div>
        `;
        container.appendChild(div);
    });
}

function interfaceCadastrar() {
    const erroDiv = document.getElementById("mensagemErro");
    const tInput = document.getElementById("tituloInput");
    const pInput = document.getElementById("prioridadeInput");
    erroDiv.innerText = "";

    try {
        cadastrarTarefa(tInput.value, pInput.value);
        tInput.value = "";
        renderizarJanela();
    } catch(e) {
        erroDiv.innerText = e.message;
    }
}

function interfaceConcluir(id) {
    try {
        concluirTarefa(id);
        renderizarJanela();
    } catch(e) {
        alert(e.message);
    }
}

function interfaceMudarPrio(id) {
    const novaPrio = prompt("Digite a nova prioridade (1, 2 ou 3):");
    if(novaPrio === null) return;
    try {
        alterarPrioridade(id, novaPrio);
        renderizarJanela();
    } catch(e) {
        alert(e.message);
    }
}
const tarefas = [];
let proximoCodigo = 1;

function validarTarefa(titulo, prioridade) {
    if (!titulo || titulo.length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres.");
    }
    if (prioridade < 1 || prioridade > 3) {
        throw new Error("A prioridade deve estar entre 1 e 3.");
    }
}

function buscarTarefa(codigo) {
    const tarefaEncontrada = tarefas.find(t => t.codigo === codigo);
    if (!tarefaEncontrada) throw new Error(`Código ${codigo} não encontrado.`);
    return tarefaEncontrada;
}

function cadastrarTarefa(titulo, prioridade) {
    validarTarefa(titulo, prioridade);
    const novaTarefa = {
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: parseInt(prioridade),
        status: true
    };
    tarefas.push(novaTarefa);
    return novaTarefa;
}

function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);
    if (tarefa.status === false) throw new Error("A tarefa já estava concluída.");
    tarefa.status = false;
}

function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = buscarTarefa(codigo);
    validarTarefa("Título Válido", novaPrioridade);
    tarefa.prioridade = parseInt(novaPrioridade);
}

// Funções de controle da Interface Visual
function renderizarJanela() {
    const container = document.getElementById("listaTarefasContenedor");
    container.innerHTML = "";
    
    if(tarefas.length === 0) {
        container.innerHTML = `<p class="vazio">Nenhuma tarefa cadastrada ainda.</p>`;
        return;
    }

    tarefas.forEach(t => {
        const div = document.createElement("div");
        div.className = `tarefa-item ${!t.status ? 'concluida' : ''}`;
        
        div.innerHTML = `
            <div class="tarefa-dados">
                <span class="tarefa-titulo">#${t.codigo} - ${t.titulo}</span>
                <span class="badge prio-${t.prioridade}">Prio ${t.prioridade}</span>
            </div>
            <div class="acoes">
                ${t.status ? `<button class="btn-concluir" onclick="interfaceConcluir(${t.codigo})">✓</button>` : ''}
                <button class="btn-acao" onclick="interfaceMudarPrio(${t.codigo})">↕ Prio</button>
            </div>
        `;
        container.appendChild(div);
    });
}

function interfaceCadastrar() {
    const erroDiv = document.getElementById("mensagemErro");
    const tInput = document.getElementById("tituloInput");
    const pInput = document.getElementById("prioridadeInput");
    erroDiv.innerText = "";

    try {
        cadastrarTarefa(tInput.value, pInput.value);
        tInput.value = "";
        renderizarJanela();
    } catch(e) {
        erroDiv.innerText = e.message;
    }
}

function interfaceConcluir(id) {
    try {
        concluirTarefa(id);
        renderizarJanela();
    } catch(e) {
        alert(e.message);
    }
}

function interfaceMudarPrio(id) {
    const novaPrio = prompt("Digite a nova prioridade (1, 2 ou 3):");
    if(novaPrio === null) return;
    try {
        alterarPrioridade(id, novaPrio);
        renderizarJanela();
    } catch(e) {
        alert(e.message);
    }
}
const tarefas = [];
let proximoCodigo = 1;

function validarTarefa(titulo, prioridade) {
    if (!titulo || titulo.length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres.");
    }
    if (prioridade < 1 || prioridade > 3) {
        throw new Error("A prioridade deve estar entre 1 e 3.");
    }
}

function buscarTarefa(codigo) {
    const tarefaEncontrada = tarefas.find(t => t.codigo === codigo);
    if (!tarefaEncontrada) throw new Error(`Código ${codigo} não encontrado.`);
    return tarefaEncontrada;
}

function cadastrarTarefa(titulo, prioridade) {
    validarTarefa(titulo, prioridade);
    const novaTarefa = {
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: parseInt(prioridade),
        status: true
    };
    tarefas.push(novaTarefa);
    return novaTarefa;
}

function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);
    if (tarefa.status === false) throw new Error("A tarefa já estava concluída.");
    tarefa.status = false;
}

function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = buscarTarefa(codigo);
    validarTarefa("Título Válido", novaPrioridade);
    tarefa.prioridade = parseInt(novaPrioridade);
}

// Funções de controle da Interface Visual
function renderizarJanela() {
    const container = document.getElementById("listaTarefasContenedor");
    container.innerHTML = "";
    
    if(tarefas.length === 0) {
        container.innerHTML = `<p class="vazio">Nenhuma tarefa cadastrada ainda.</p>`;
        return;
    }

    tarefas.forEach(t => {
        const div = document.createElement("div");
        div.className = `tarefa-item ${!t.status ? 'concluida' : ''}`;
        
        div.innerHTML = `
            <div class="tarefa-dados">
                <span class="tarefa-titulo">#${t.codigo} - ${t.titulo}</span>
                <span class="badge prio-${t.prioridade}">Prio ${t.prioridade}</span>
            </div>
            <div class="acoes">
                ${t.status ? `<button class="btn-concluir" onclick="interfaceConcluir(${t.codigo})">✓</button>` : ''}
                <button class="btn-acao" onclick="interfaceMudarPrio(${t.codigo})">↕ Prio</button>
            </div>
        `;
        container.appendChild(div);
    });
}

function interfaceCadastrar() {
    const erroDiv = document.getElementById("mensagemErro");
    const tInput = document.getElementById("tituloInput");
    const pInput = document.getElementById("prioridadeInput");
    erroDiv.innerText = "";

    try {
        cadastrarTarefa(tInput.value, pInput.value);
        tInput.value = "";
        renderizarJanela();
    } catch(e) {
        erroDiv.innerText = e.message;
    }
}

function interfaceConcluir(id) {
    try {
        concluirTarefa(id);
        renderizarJanela();
    } catch(e) {
        alert(e.message);
    }
}

function interfaceMudarPrio(id) {
    const novaPrio = prompt("Digite a nova prioridade (1, 2 ou 3):");
    if(novaPrio === null) return;
    try {
        alterarPrioridade(id, novaPrio);
        renderizarJanela();
    } catch(e) {
        alert(e.message);
    }
}
const tarefas = [];
let proximoCodigo = 1;

function validarTarefa(titulo, prioridade) {
    if (!titulo || titulo.length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres.");
    }
    if (prioridade < 1 || prioridade > 3) {
        throw new Error("A prioridade deve estar entre 1 e 3.");
    }
}

function buscarTarefa(codigo) {
    const tarefaEncontrada = tarefas.find(t => t.codigo === codigo);
    if (!tarefaEncontrada) throw new Error(`Código ${codigo} não encontrado.`);
    return tarefaEncontrada;
}

function cadastrarTarefa(titulo, prioridade) {
    validarTarefa(titulo, prioridade);
    const novaTarefa = {
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: parseInt(prioridade),
        status: true
    };
    tarefas.push(novaTarefa);
    return novaTarefa;
}

function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);
    if (tarefa.status === false) throw new Error("A tarefa já estava concluída.");
    tarefa.status = false;
}

function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = buscarTarefa(codigo);
    validarTarefa("Título Válido", novaPrioridade);
    tarefa.prioridade = parseInt(novaPrioridade);
}

// Funções de controle da Interface Visual
function renderizarJanela() {
    const container = document.getElementById("listaTarefasContenedor");
    container.innerHTML = "";
    
    if(tarefas.length === 0) {
        container.innerHTML = `<p class="vazio">Nenhuma tarefa cadastrada ainda.</p>`;
        return;
    }

    tarefas.forEach(t => {
        const div = document.createElement("div");
        div.className = `tarefa-item ${!t.status ? 'concluida' : ''}`;
        
        div.innerHTML = `
            <div class="tarefa-dados">
                <span class="tarefa-titulo">#${t.codigo} - ${t.titulo}</span>
                <span class="badge prio-${t.prioridade}">Prio ${t.prioridade}</span>
            </div>
            <div class="acoes">
                ${t.status ? `<button class="btn-concluir" onclick="interfaceConcluir(${t.codigo})">✓</button>` : ''}
                <button class="btn-acao" onclick="interfaceMudarPrio(${t.codigo})">↕ Prio</button>
            </div>
        `;
        container.appendChild(div);
    });
}

function interfaceCadastrar() {
    const erroDiv = document.getElementById("mensagemErro");
    const tInput = document.getElementById("tituloInput");
    const pInput = document.getElementById("prioridadeInput");
    erroDiv.innerText = "";

    try {
        cadastrarTarefa(tInput.value, pInput.value);
        tInput.value = "";
        renderizarJanela();
    } catch(e) {
        erroDiv.innerText = e.message;
    }
}

function interfaceConcluir(id) {
    try {
        concluirTarefa(id);
        renderizarJanela();
    } catch(e) {
        alert(e.message);
    }
}

function interfaceMudarPrio(id) {
    const novaPrio = prompt("Digite a nova prioridade (1, 2 ou 3):");
    if(novaPrio === null) return;
    try {
        alterarPrioridade(id, novaPrio);
        renderizarJanela();
    } catch(e) {
        alert(e.message);
    }
}
