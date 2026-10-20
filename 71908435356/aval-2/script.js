// 3. Armazenamento das tarefas com arrays
const tarefas = [];

// 7. Geração automática de códigos (Controle de Autoincremento)
let proximoId = 1;

// 5. Validação dos dados da tarefa
function validarDados(titulo, prioridade) {
    if (!titulo || titulo.trim() === "") {
        return "O título da tarefa não pode estar vazio.";
    }
    const prioridadesAceitas = ["baixa", "média", "alta"];
    if (!prioridadesAceitas.includes(prioridade)) {
        return "Selecione uma prioridade válida (Baixa, Média ou Alta).";
    }
    return null; // Dados válidos, nenhum erro encontrado
}

// 6. Cadastro e modelagem de uma tarefa
function cadastrarTarefa(titulo, prioridade) {
    const erro = validarDados(titulo, prioridade);
    
    if (erro) {
        exibirErro(erro);
        return false;
    }

    // Modelagem do objeto da tarefa
    const novaTarefa = {
        id: proximoId,
        titulo: titulo.trim(),
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(novaTarefa); // Inserção no Array
    proximoId++; // Incremento do ID automático
    exibirErro(""); // Limpa erros antigos
    listarTarefas(); // Atualiza a interface
    return true;
}

// 8. Listagem das tarefas cadastradas
function listarTarefas() {
    const tabela = document.getElementById("tabelaTarefas");
    tabela.innerHTML = ""; // Limpa a tabela atual

    // Percorre o array gerando o HTML dinâmico
    tarefas.forEach(tarefa => {
        const linha = document.createElement("tr");
        if (tarefa.concluida) {
            linha.classList.add("concluida-linha");
        }

        linha.innerHTML = `
            <td><strong>#${tarefa.id}</strong></td>
            <td>${tarefa.concluida ? "✅ Concluída" : "⏳ Pendente"}</td>
            <td>${tarefa.titulo}</td>
            <td><span class="badge ${tarefa.prioridade}">${tarefa.prioridade}</span></td>
        `;
        tabela.appendChild(linha);
    });
}

// 9. Busca de tarefas com find
function buscarTarefaPorId(id) {
    return tarefas.find(tarefa => tarefa.id === parseInt(id));
}

// 10. Conclusão de uma tarefa
function concluirTarefa(id) {
    const tarefa = buscarTarefaPorId(id);
    if (!tarefa) {
        exibirErro(`Tarefa com ID ${id} não foi encontrada.`);
        return false;
    }
    tarefa.concluida = true;
    exibirErro("");
    listarTarefas();
    return true;
}

// 11. Alteração da prioridade
function alterarPrioridade(id, novaPrioridade) {
    const tarefa = buscarTarefaPorId(id);
    if (!tarefa) {
        exibirErro(`Tarefa com ID ${id} não foi encontrada.`);
        return false;
    }
    
    // Valida apenas a prioridade isolada
    const erroPrioridade = validarDados("ValidandoApenasPrioridade", novaPrioridade);
    if (erroPrioridade) {
        exibirErro(erroPrioridade);
        return false;
    }

    tarefa.prioridade = novaPrioridade;
    exibirErro("");
    listarTarefas();
    return true;
}

// ==========================================
// 12. Funções de Controle da Interface (UI)
// ==========================================
function dispararCadastro() {
    const titulo = document.getElementById("inputTitulo").value;
    const prioridade = document.getElementById("selectPrioridade").value;
    
    const sucesso = cadastrarTarefa(titulo, prioridade);
    if (sucesso) {
        document.getElementById("inputTitulo").value = "";
        document.getElementById("selectPrioridade").value = "";
    }
}

function dispararBusca() {
    const id = document.getElementById("inputBuscaId").value;
    const tarefa = buscarTarefaPorId(id);
    if (tarefa) {
        alert(`Tarefa Encontrada:\nID: #${tarefa.id}\nTítulo: ${tarefa.titulo}\nPrioridade: ${tarefa.prioridade}\nStatus: ${tarefa.concluida ? "Concluída" : "Pendente"}`);
    } else {
        exibirErro(`Tarefa com o ID ${id} não existe.`);
    }
}

function dispararConclusao() {
    const id = document.getElementById("inputBuscaId").value;
    concluirTarefa(id);
}

function dispararAlteracaoPrioridade() {
    const id = document.getElementById("inputBuscaId").value;
    const novaPrioridade = document.getElementById("selectPrioridade").value;
    alterarPrioridade(id, novaPrioridade);
}

function exibirErro(mensagem) {
    document.getElementById("mensagemErro").innerText = mensaje = mensagem;
}
