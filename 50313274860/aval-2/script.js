
const formulario = document.getElementById('formTarefa');
const campoTitulo = document.getElementById('titulo');
const campoPrioridade = document.getElementById('prioridade');
const elementoTarefas = document.getElementById('tarefas');
const mensagem = document.getElementById('mensagem');

formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    try {
        cadastrarTarefa(
            campoTitulo.value.trim(),
            Number(campoPrioridade.value)
        );

        mensagem.textContent = 'Tarefa cadastrada com sucesso!';
        mensagem.style.color = '#24945b';

        formulario.reset();
        renderizarTarefas();
    } catch (erro) {
        mensagem.textContent = erro.message;
        mensagem.style.color = '#d93025';
    }
});

function renderizarTarefas() {
    elementoTarefas.innerHTML = '';

    const lista = listarTarefas();

    if (lista.length === 0) {
        elementoTarefas.innerHTML =
            '<p class="vazio">Nenhuma tarefa cadastrada.</p>';
        return;
    }

    lista.forEach(function(tarefa) {
        const card = document.createElement('div');
        card.className = tarefa.status
            ? 'tarefa'
            : 'tarefa concluida';

        const informacoes = document.createElement('div');

        const titulo = document.createElement('h3');
        titulo.textContent = tarefa.titulo;

        const codigo = document.createElement('p');
        codigo.textContent = 'Código: ' + tarefa.codigo;

        const prioridade = document.createElement('p');
        const nomesPrioridade = {
            1: 'Baixa',
            2: 'Média',
            3: 'Alta'
        };

        prioridade.textContent =
            'Prioridade: ' + nomesPrioridade[tarefa.prioridade];

        const status = document.createElement('p');
        status.textContent = tarefa.status
            ? 'Status: Pendente'
            : 'Status: Concluída';

        informacoes.append(titulo, codigo, prioridade, status);

        const acoes = document.createElement('div');
        acoes.className = 'acoes';

        if (tarefa.status) {
            const botaoConcluir = document.createElement('button');
            botaoConcluir.textContent = 'Concluir';
            botaoConcluir.className = 'btn-concluir';

            botaoConcluir.addEventListener('click', function() {
                try {
                    concluirTarefa(tarefa.codigo);
                    mensagem.textContent = 'Tarefa concluída!';
                    mensagem.style.color = '#24945b';
                    renderizarTarefas();
                } catch (erro) {
                    mensagem.textContent = erro.message;
                    mensagem.style.color = '#d93025';
                }
            });

            acoes.appendChild(botaoConcluir);
        }

        const botaoPrioridade = document.createElement('button');
        botaoPrioridade.textContent = 'Alterar prioridade';
        botaoPrioridade.className = 'btn-alterar';

        botaoPrioridade.addEventListener('click', function() {
            const novaPrioridade = prompt(
                'Informe a nova prioridade (1, 2 ou 3):'
            );

            if (novaPrioridade === null || novaPrioridade.trim() === '') {
                return;
            }

            try {
                const valor = Number(novaPrioridade);

                alterarPrioridade(tarefa.codigo, valor);

                mensagem.textContent = 'Prioridade alterada com sucesso!';
                mensagem.style.color = '#24945b';

                renderizarTarefas();
            } catch (erro) {
                mensagem.textContent = erro.message;
                mensagem.style.color = '#d93025';
            }
        });

        acoes.appendChild(botaoPrioridade);
        card.append(informacoes, acoes);
        elementoTarefas.appendChild(card);
    });
}

renderizarTarefas();
