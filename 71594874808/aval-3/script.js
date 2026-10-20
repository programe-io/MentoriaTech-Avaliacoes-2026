// 3. Armazenamento das tarefas com arrays
const listaTarefas = [];
let contadorCodigo = 1; // 7. Controle interno para geração automática de códigos

// 12. Organização e responsabilidade das funções (Renderização da Interface)
function listarTarefas() {
    const corpoTabela = document.getElementById('lista-tarefas-corpo');
    corpoTabela.innerHTML = ''; // Limpa antes de reconstruir

    // 8. Tratamento para lista vazia
    if (listaTarefas.length === 0) {
        corpoTabela.innerHTML = `<tr><td colspan="5" style="text-align:center; color: #94a3b8;">Nenhuma tarefa pendente ou cadastrada.</td></tr>`;
        return;
    }

    listaTarefas.forEach(tarefa => {
        const linha = document.createElement('tr');
        
        // Aplica classe visual diferenciada se concluída
        if (tarefa.concluida) {
            linha.classList.add('linha-concluida');
        }

        linha.innerHTML = `
            <td><strong>${tarefa.codigo}</strong></td>
            <td class="${tarefa.concluida ? 'status-concluida' : ''}">${tarefa.titulo}</td>
            <td><span class="badge ${tarefa.prioridade.toLowerCase()}">${tarefa.prioridade}</span></td>
            <td>
                <span class="${tarefa.concluida ? 'status-concluida' : 'status-pendente'}">
                    ${tarefa.concluida ? 'Concluída' : 'Pendente'}
                </span>
            </td>
            <td>
                ${!tarefa.concluida ? `<button class="btn-success" onclick="concluirTarefaExterna('\${tarefa.codigo}')">Concluir</button>` : '—'}
            </td>
        `;
        corpoTabela.appendChild(linha);
    });
}

// Emissor de notificações na tela
function exibirMensagem(texto, tipo) {
    const box = document.getElementById('mensagem');
    box.innerText = texto;
    box.style.display = 'block';
    
    if (tipo === 'erro') {
        box.style.backgroundColor = '#fee2e2';
        box.style.color = '#dc2626';
    } else {
        box.style.backgroundColor = '#dcfce7';
        box.style.color = '#15803d';
    }
}

// 5. Validação dos dados da tarefa
function validarDadosTarefa(titulo, prioridade) {
    if (!titulo || titulo.trim().length < 3) {
        exibirMensagem("Erro: O título precisa ter no mínimo 3 caracteres.", "erro");
        return false;
    }
    const prioridadesValidas = ["Baixa", "Média", "Alta"];
    if (!prioridadesValidas.includes(prioridade)) {
        exibirMensagem("Erro: Nível de prioridade inválido.", "erro");
        return false;
    }
    return true;
}

// 6. Cadastro e modelagem de uma tarefa
function cadastrarTarefa(titulo, prioridade) {
    if (!validarDadosTarefa(titulo, prioridade)) {
        return false;
    }

    // 7. Geração automática de códigos
    const codigo = `TASK-${contadorCodigo++}`;

    const novaTarefa = {
        codigo: codigo,
        titulo: titulo.trim(),
        prioridade: prioridade,
        concluida: false // Estado inicial padrão
    };

    listaTarefas.push(novaTarefa);
    exibirMensagem(`Tarefa ${codigo} criada com sucesso!`, "sucesso");
    listarTarefas();
    return true;
}

// 9. Busca de tarefas com find
function buscarTarefaPorCodigo(codigo) {
    return listaTarefas.find(t => t.codigo.toUpperCase() === codigo.trim().toUpperCase());
}

// 10. Conclusão de uma tarefa
function concluirTarefa(codigo) {
    const tarefa = buscarTarefaPorCodigo(codigo);

    // Tratamento preventivo de registro ausente
    if (!tarefa) {
        exibirMensagem(`Erro: Código ${codigo} não localizado.`, "erro");
        return;
    }

    tarefa.concluida = true; // Inversão/Definição de estado fixo
    exibirMensagem(`Tarefa ${codigo} marcada como concluída!`, "sucesso");
    listarTarefas();
}

// 11. Alteração da prioridade
function alterarPrioridadeTarefa(codigo, novaPrioridade) {
    const tarefa = buscarTarefaPorCodigo(codigo);

    if (!tarefa) {
        exibirMensagem(`Erro: Código ${codigo} não localizado para alteração.`, "erro");
        return;
    }

    const prioridadesValidas = ["Baixa", "Média", "Alta"];
    if (!prioridadesValidas.includes(novaPrioridade)) {
        exibirMensagem("Erro: Nova prioridade inválida.", "erro");
        return;
    }

    tarefa.prioridade = novaPrioridade; // Substituição direta de propriedade
    exibirMensagem(`Prioridade da tarefa ${codigo} modificada para ${novaPrioridade}.`, "sucesso");
    listarTarefas();
}

// Vinculação global temporária para uso do botão na tabela dinâmica
window.concluirTarefaExterna = function(codigo) {
    concluirTarefa(codigo);
}

// --- INTERCEPTADORES DE INTERAÇÃO (Listeners) ---

// Form: Cadastrar Tarefa
document.getElementById('form-tarefa').addEventListener('submit', function(e) {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const prioridade = document.getElementById('prioridade').value;

    if (cadastrarTarefa(titulo, prioridade)) {
        this.reset();
    }
});

// Form: Mudar Prioridade
document.getElementById('form-alterar-prioridade').addEventListener('submit', function(e) {
    e.preventDefault();
    const codigo = document.getElementById('alt-prioridade-codigo').value;
    const novaPrioridade = document.getElementById('alt-prioridade-nova').value;
    
    alterarPrioridadeTarefa(codigo, novaPrioridade);
    this.reset();
});

// Inicializa visual vazio estruturado
listarTarefas();
