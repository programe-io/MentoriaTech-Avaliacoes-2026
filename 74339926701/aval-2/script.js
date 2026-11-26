// Lista que armazena as tarefas
let tarefas = [];

// Elementos do DOM
const formCadastro = document.getElementById('form-cadastro');
const tabelaTarefas = document.getElementById('tabela-tarefas');
const btnConcluir = document.getElementById('btn-concluir');
const btnAlterarPrioridade = document.getElementById('btn-alterar-prioridade');

// Função auxiliar para validar prioridade (entre 1 e 3)
function validarPrioridade(valor) {
    return Number.isInteger(valor) && valor >= 1 && valor <= 3;
}

// 1. Cadastrar uma nova tarefa
formCadastro.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const codigo = document.getElementById('codigo').value.trim();
    const titulo = document.getElementById('titulo').value.trim();
    const prioridade = parseInt(document.getElementById('prioridade').value);

    // Validação: Código único
    const codigoExiste = tarefas.some(t => t.codigo.toLowerCase() === codigo.toLowerCase());
    if (codigoExiste) {
        alert('Erro: Já existe uma tarefa cadastrada com este código.');
        return;
    }

    // Validação: Título com no mínimo 5 caracteres
    if (titulo.length < 5) {
        alert('Erro: O título da tarefa deve ter no mínimo 5 caracteres.');
        return;
    }

    // Validação: Prioridade entre 1 e 3
    if (!validarPrioridade(prioridade)) {
        alert('Erro: A prioridade deve ser um valor entre 1 (Alta) e 3 (Baixa).');
        return;
    }

    // Criação do objeto tarefa (inicia sempre como pendente / false)
    const novaTarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(novaTarefa);
    formCadastro.reset();
    listarTarefas();
});

// 2. Listar as tarefas cadastradas
function listarTarefas() {
    tabelaTarefas.innerHTML = '';

    if (tarefas.length === 0) {
        tabelaTarefas.innerHTML = '<tr><td colspan="4" style="text-align:center;">Nenhuma tarefa cadastrada.</td></tr>';
        return;
    }

    const textoPrioridade = {
        1: '1 - Alta',
        2: '2 - Média',
        3: '3 - Baixa'
    };

    tarefas.forEach(tarefa => {
        const linha = document.createElement('tr');
        
        const statusTexto = tarefa.concluida ? 'Concluída' : 'Pendente';
        const statusClasse = tarefa.concluida ? 'status-concluida' : 'status-pendente';

        linha.innerHTML = `
            <td>${tarefa.codigo}</td>
            <td>${tarefa.titulo}</td>
            <td class="prioridade-${tarefa.prioridade}">${textoPrioridade[tarefa.prioridade]}</td>
            <td class="${statusClasse}">${statusTexto}</td>
        `;

        tabelaTarefas.appendChild(linha);
    });
}

// 3. Marcar uma tarefa como concluída
btnConcluir.addEventListener('click', function() {
    const codigoBusca = document.getElementById('codigo-busca').value.trim();

    if (!codigoBusca) {
        alert('Informe o código da tarefa.');
        return;
    }

    const tarefa = tarefas.find(t => t.codigo.toLowerCase() === codigoBusca.toLowerCase());

    if (!tarefa) {
        alert('Tarefa não encontrada!');
        return;
    }

    if (tarefa.concluida) {
        alert('Esta tarefa já está marcada como concluída.');
        return;
    }

    tarefa.concluida = true;
    listarTarefas();
    alert(`Tarefa "${tarefa.titulo}" marcada como concluída!`);
});

// 4. Alterar a prioridade de uma tarefa
btnAlterarPrioridade.addEventListener('click', function() {
    const codigoBusca = document.getElementById('codigo-busca').value.trim();
    const novaPrioridade = parseInt(document.getElementById('nova-prioridade').value);

    if (!codigoBusca) {
        alert('Informe o código da tarefa.');
        return;
    }

    // Validação: Prioridade entre 1 e 3
    if (!validarPrioridade(novaPrioridade)) {
        alert('Erro: Selecione uma prioridade válida entre 1 (Alta) e 3 (Baixa).');
        return;
    }

    const tarefa = tarefas.find(t => t.codigo.toLowerCase() === codigoBusca.toLowerCase());

    if (!tarefa) {
        alert('Tarefa não encontrada!');
        return;
    }

    tarefa.prioridade = novaPrioridade;
    document.getElementById('nova-prioridade').value = '';
    listarTarefas();
    alert(`Prioridade da tarefa "${tarefa.titulo}" alterada com sucesso!`);
});

// Inicializa a tabela vazia ao carregar
listarTarefas();
