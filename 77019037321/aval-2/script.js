
// ==========================================
// 1. ARRAY E VARIÁVEIS
// ==========================================

// Array para armazenar as tarefas
let tarefas = [];

// Código automático das tarefas
let proximoCodigo = 1;


// ==========================================
// 2. FUNÇÃO PARA VALIDAR TAREFA
// ==========================================

function validarTarefa(descricao, prioridade) {

    // Validar descrição
    if (descricao.trim() === "") {
        alert("Informe a descrição da tarefa!");
        return false;
    }

    // Validar prioridade
    const prioridadesValidas = ["Baixa", "Média", "Alta"];

    if (!prioridadesValidas.includes(prioridade)) {
        alert("Selecione uma prioridade válida!");
        return false;
    }

    return true;
}


// ==========================================
// 3. FUNÇÃO PARA CADASTRAR TAREFA
// ==========================================

function cadastrarTarefa() {

    const descricao = document.getElementById("descricao").value;
    const prioridade = document.getElementById("prioridade").value;

    // Validar dados
    if (!validarTarefa(descricao, prioridade)) {
        return;
    }

    // Criar objeto tarefa
    const tarefa = {
        codigo: proximoCodigo,
        descricao: descricao.trim(),
        prioridade: prioridade,
        concluida: false
    };

    // Adicionar tarefa ao array
    tarefas.push(tarefa);

    // Gerar próximo código
    proximoCodigo++;

    alert("Tarefa cadastrada com sucesso!");

    // Limpar formulário
    document.getElementById("descricao").value = "";
    document.getElementById("prioridade").value = "";

    // Atualizar lista
    listarTarefas();
}


// ==========================================
// 4. FUNÇÃO PARA LISTAR TAREFAS
// ==========================================

function listarTarefas() {

    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    // Verificar se existem tarefas
    if (tarefas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    // Percorrer todas as tarefas
    tarefas.forEach(function(tarefa) {

        let classePrioridade = "";

        // Definir classe conforme prioridade
        if (tarefa.prioridade === "Alta") {
            classePrioridade = "prioridade-alta";

        } else if (tarefa.prioridade === "Média") {
            classePrioridade = "prioridade-media";

        } else {
            classePrioridade = "prioridade-baixa";
        }

        // Exibir tarefa
        lista.innerHTML += `
            <div class="tarefa ${tarefa.concluida ? 'concluida' : ''}">

                <h3>Código: ${tarefa.codigo}</h3>

                <p>
                    Descrição: ${tarefa.descricao}
                </p>

                <p class="${classePrioridade}">
                    Prioridade: ${tarefa.prioridade}
                </p>

                <p class="status">
                    Status: ${tarefa.concluida ? 'Concluída' : 'Pendente'}
                </p>

                ${!tarefa.concluida ? `
                    <button onclick="concluirTarefa(${tarefa.codigo})">
                        Concluir
                    </button>
                ` : ''}

            </div>
        `;
    });
}


// ==========================================
// 5. FUNÇÃO PARA BUSCAR TAREFA
// ==========================================

function buscarTarefa() {

    const codigo = Number(
        document.getElementById("codigoBusca").value
    );

    // Procurar tarefa pelo código
    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    const resultado = document.getElementById("resultadoBusca");

    // Verificar se encontrou
    if (!tarefa || codigo <= 0) {

        resultado.innerHTML = "<p>Tarefa não encontrada!</p>";
        return;
    }

    // Exibir resultado
    resultado.innerHTML = `
        <div class="tarefa">

            <h3>Tarefa encontrada</h3>

            <p>Código: ${tarefa.codigo}</p>

            <p>Descrição: ${tarefa.descricao}</p>

            <p>Prioridade: ${tarefa.prioridade}</p>

            <p>Status: ${tarefa.concluida ? 'Concluída' : 'Pendente'}</p>

        </div>
    `;
}


// ==========================================
// 6. FUNÇÃO PARA CONCLUIR TAREFA
// ==========================================

function concluirTarefa(codigo) {

    // Buscar tarefa
    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    if (tarefa.concluida) {
        alert("Esta tarefa já foi concluída!");
        return;
    }

    // Alterar status
    tarefa.concluida = true;

    alert("Tarefa concluída com sucesso!");

    // Atualizar lista
    listarTarefas();
}


// ==========================================
// 7. FUNÇÃO PARA ALTERAR PRIORIDADE
// ==========================================

function alterarPrioridade() {

    const codigo = Number(
        document.getElementById("codigoAlterar").value
    );

    const novaPrioridade =
        document.getElementById("novaPrioridade").value;

    // Buscar tarefa pelo código
    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    // Validar nova prioridade
    const prioridadesValidas = ["Baixa", "Média", "Alta"];

    if (!prioridadesValidas.includes(novaPrioridade)) {
        alert("Selecione uma prioridade válida!");
        return;
    }

    // Atualizar prioridade
    tarefa.prioridade = novaPrioridade;

    alert("Prioridade alterada com sucesso!");

    // Limpar campos
    document.getElementById("codigoAlterar").value = "";
    document.getElementById("novaPrioridade").value = "";

    // Atualizar lista
    listarTarefas();
}


// ==========================================
// 8. INICIALIZAÇÃO DO SISTEMA
// ==========================================

// Exibir tarefas ao abrir a página
listarTarefas();
