/* ==========================================================================
   1. CONFIGURAÇÃO INICIAL E ESTADO DA APLICAÇÃO
   ========================================================================== */
// Nosso "banco de dados" em memória (Array de Objetos)
const estadoAplicacao = {
    tarefas: [
        { id: 1, text: "Aprender HTML e CSS", concluida: true },
        { id: 2, text: "Dominar o JavaScript", concluida: false }
    ]
};

// Mapeamento dos elementos do HTML (DOM)
const elFormulario = document.getElementById('form-tarefa');
const elInput = document.getElementById('input-tarefa');
const elLista = document.getElementById('lista-tarefas');
const elContador = document.getElementById('contador-tarefas');

/* ==========================================================================
   2. FUNÇÕES DE MANIPULAÇÃO LOGICA (Regras de Negócio)
   ========================================================================== */

/**
 * Adiciona uma nova tarefa ao estado
 * @param {string} texto 
 */
function adicionarTarefa(texto) {
    // Validação básica para evitar texto vazio
    if (texto.trim() === '') {
        alert('Por favor, digite uma tarefa válida!');
        return;
    }

    const novaTarefa = {
        id: Date.now(), // Gera um ID único baseado no timestamp atual
        text: texto,
        concluida: false
    };

    estadoAplicacao.tarefas.push(novaTarefa);
    
    // Atualiza a tela após modificar os dados
    renderizarInterface();
}

/**
 * Alterna o status de concluída/pendente de uma tarefa
 * @param {number} id 
 */
function alternarStatusTarefa(id) {
    estadoAplicacao.tarefas = estadoAplicacao.tarefas.map(tarefa => {
        if (tarefa.id === id) {
            return { ...tarefa, concluida: !tarefa.concluida };
        }
        return tarefa;
    });
    
    renderizarInterface();
}

/**
 * Remove uma tarefa do estado
 * @param {number} id 
 */
function deletarTarefa(id) {
    estadoAplicacao.tarefas = estadoAplicacao.tarefas.filter(tarefa => tarefa.id !== id);
    renderizarInterface();
}

/* ==========================================================================
   3. FUNÇÕES DE RENDERIZAÇÃO (Atualização do HTML)
   ========================================================================== */

/**
 * Desenha a lista de tarefas atualizada na tela
 */
function renderizarInterface() {
    // Limpa a lista atual para não duplicar
    elLista.innerHTML = '';

    // Se não houver tarefas, exibe uma mensagem
    if (estadoAplicacao.tarefas.length === 0) {
        elLista.innerHTML = '<li class="mensagem-vazia">Nenhuma tarefa por aqui! 🎉</li>';
        atualizarContador(0);
        return;
    }

    // Percorre o array e cria os elementos HTML dinamicamente
    estadoAplicacao.tarefas.forEach(tarefa => {
        const li = document.createElement('li');
        li.className = `item-tarefa ${tarefa.concluida ? 'concluida' : ''}`;

        // Conteúdo interno do item da lista
        li.innerHTML = `
            <span onclick="alternarStatusTarefa(${tarefa.id})">${tarefa.text}</span>
            <button class="btn-deletar" onclick="deletarTarefa(${tarefa.id})">❌</button>
        `;

        elLista.appendChild(li);
    });

    // Atualiza o contador de tarefas pendentes
    const pendentes = estadoAplicacao.tarefas.filter(t => !t.concluida).length;
    atualizarContador(pendentes);
}

/**
 * Atualiza o texto do contador na tela
 * @param {number} qtd 
 */
function atualizarContador(qtd) {
    if (elContador) {
        elContador.textContent = `${qtd} tarefa(s) pendente(s)`;
    }
}

/* ==========================================================================
   4. ESCUTADORES DE EVENTOS (Event Listeners)
   ========================================================================== */

// Evento de envio do formulário (quando o usuário aperta Enter ou clica no botão)
if (elFormulario) {
    elFormulario.addEventListener('submit', function(evento) {
        evento.preventDefault(); // Evita que a página recarregue
        
        adicionarTarefa(elInput.value);
        elInput.value = ''; // Limpa o campo de texto
        elInput.focus();   // Devolve o foco para o campo
    });
}

// Inicializa a tela com os dados padrão assim que o script carrega
renderizarInterface();
console.log("Aplicação JavaScript inicializada com sucesso!");