// Array para armazenar as tarefas simulando o banco de dados
let tarefas = [];
let proximoCodigo = 1;

// Função para cadastrar uma nova tarefa com validações
function cadastrarTarefa() {
    const inputTitulo = document.getElementById('titulo');
    const selectPrioridade = document.getElementById('prioridade');
    const divErro = document.getElementById('mensagem-erro');
    
    const titulo = inputTitulo.value.trim();
    const prioridade = parseInt(selectPrioridade.value);

    // Validação do título (mínimo 5 caracteres)
    if (titulo.length < 5) {
        divErro.textContent = "Erro: O título deve ter no mínimo 5 caracteres.";
        return;
    }

    // Validação da prioridade (entre 1 e 3)
    if (isNaN(prioridade) || prioridade < 1 || prioridade > 3) {
        divErro.textContent = "Erro: A prioridade deve ser entre 1 (alta) e 3 (baixa).";
        return;
    }

    // Limpa mensagem de erro caso passe na validação
    divErro.textContent = "";

    // Objeto da nova tarefa
    const novaTarefa = {
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(novaTarefa);
    
    // Limpa o campo de entrada e atualiza a interface
    inputTitulo.value = "";
    listarTarefas();
}

// Função para listar todas as tarefas na tela
function listarTarefas() {
    const listaUl = document.getElementById('lista-tarefas');
    listaUl.innerHTML = "";

    tarefas.forEach(tarefa => {
        const li = document.createElement('li');
        li.className = `tarefa-item ${tarefa.concluida ? 'concluida' : ''}`;

        // Define o texto da prioridade
        let textoPrioridade = tarefa.prioridade === 1 ? 'Alta' : tarefa.prioridade === 2 ? 'Média' : 'Baixa';

        li.innerHTML = `
            <div>
                <strong>#${tarefa.codigo}</strong> - ${tarefa.titulo}
                <span class="prioridade-tag p-${tarefa.prioridade}">${textoPrioridade}</span>
            </div>
            <div class="botoes-acoes">
                ${!tarefa.concluida ? `<button class="btn-concluir" onclick="marcarComoConcluida(${tarefa.codigo})">✓</button>` : ''}
                <button class="btn-prioridade" onclick="alterarPrioridade(${tarefa.codigo})">⇅ Alt. Prioridade</button>
            </div>
        `;

        listaUl.appendChild(li);
    });
}

// Função para marcar uma tarefa como concluída buscando pelo código
function marcarComoConcluida(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);
    if (tarefa) {
        tarefa.concluida = true;
        listarTarefas();
    }
}

// Função para alterar ciclicamente a prioridade de uma tarefa (1 -> 2 -> 3 -> 1)
function alterarPrioridade(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);
    if (tarefa) {
        // Altera o valor respeitando a regra de validação de 1 a 3
        tarefa.prioridade = tarefa.prioridade === 3 ? 1 : tarefa.prioridade + 1;
        listarTarefas();
    }
}
