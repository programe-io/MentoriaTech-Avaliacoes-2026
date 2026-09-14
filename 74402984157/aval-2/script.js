// --- ESTADO DA APLICAÇÃO (Funções auxiliares implícitas no vídeo) ---
let tarefas = [];
let codigoAtual = 1;

function buscarTarefa(codigo) {
    return tarefas.find(tarefa => tarefa.codigo === codigo);
}

function validarDadosTarefa(titulo, prioridade) {
    if (!titulo || prioridade <= 0) {
        alert("Dados inválidos. Preencha corretamente.");
        return false;
    }
    return true;
}

function cadastrarTarefa(titulo, prioridade) {
    if (validarDadosTarefa(titulo, prioridade)) {
        let novaTarefa = {
            codigo: codigoAtual++,
            titulo: titulo,
            prioridade: prioridade,
            status: true // true = pendente, false = concluída
        };
        tarefas.push(novaTarefa);
        return novaTarefa;
    }
}

function listarTarefas() {
    return tarefas;
}


// --- CÓDIGO EXIBIDO NO VÍDEO DO INSTRUTOR ---

function concluirTarefa(codigo) {
    let tarefa = buscarTarefa(codigo);
    if(tarefa) {
        tarefa.status = false;
    }
}

function alterarPrioridade(codigo, novaPrioridade) {
    let tarefa = buscarTarefa(codigo);
    if(tarefa && validarDadosTarefa(tarefa.titulo, novaPrioridade)) {
        tarefa.prioridade = novaPrioridade;
    }
}

// Testes executados no console do VSCode no vídeo:
cadastrarTarefa('Cadastrar Clientes', 1);
console.log(listarTarefas());

alterarPrioridade(1, 2);
console.log(listarTarefas());


// --- INTEGRAÇÃO COM O HTML (DOM) ---

function atualizarTela() {
    const lista = document.getElementById('listaTarefas');
    lista.innerHTML = '';

    listarTarefas().forEach(tarefa => {
        const li = document.createElement('li');
        
        // Aplica a classe CSS se a tarefa estiver concluída (status === false)
        if (!tarefa.status) {
            li.classList.add('concluida');
        }

        li.innerHTML = `
            <div>
                <strong>${tarefa.titulo}</strong> (Prioridade: ${tarefa.prioridade})
            </div>
            <div class="acoes">
                <button onclick="concluirNaTela(${tarefa.codigo})">Concluir</button>
            </div>
        `;
        lista.appendChild(li);
    });
}

function adicionarTarefaDOM() {
    const inputTitulo = document.getElementById('tituloTarefa');
    const inputPrioridade = document.getElementById('prioridadeTarefa');

    const titulo = inputTitulo.value;
    const prioridade = parseInt(inputPrioridade.value);

    if (titulo && prioridade) {
        cadastrarTarefa(titulo, prioridade);
        inputTitulo.value = '';
        inputPrioridade.value = '';
        atualizarTela();
    }
}

function concluirNaTela(codigo) {
    concluirTarefa(codigo);
    atualizarTela();
}

// Renderiza a lista inicial (com a tarefa de teste do console) ao carregar a página
atualizarTela();