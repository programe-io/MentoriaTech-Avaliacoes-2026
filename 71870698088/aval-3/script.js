// 3. Armazenamento das tarefas com arrays
let tarefas = [];
let proximoId = 1; // 7. Geração automática de códigos

// 4. Organização do algoritmo em funções (Cadastro)
function cadastrarTarefa() {
    const inputTitulo = document.getElementById("tituloTarefa");
    const mensagemErro = document.getElementById("mensagemErro");
    const titulo = inputTitulo.value.trim();

    // 5. Validação dos dados da tarefa
    if (titulo === "") {
        mensagemErro.textContent = "Erro: O título da tarefa não pode estar vazio.";
        return;
    }

    mensagemErro.textContent = ""; // Limpa erro se houver

    // 6. Cadastro e modelagem de uma tarefa (Objeto)
    const novaTarefa = {
        id: proximoId++, // ID automático sequencial
        titulo: titulo
    };

    tarefas.push(novaTarefa);
    inputTitulo.value = ""; // Limpa o campo de entrada

    // Atualiza a tela
    listarTarefas();
}

// 8. Listagem das tarefas cadastradas
function listarTarefas() {
    const listaHtml = document.getElementById("listaTarefas");
    listaHtml.innerHTML = ""; // Limpa a lista atual

    tarefas.forEach(tarefa => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>ID: ${tarefa.id}</strong> - ${tarefa.titulo}`;
        listaHtml.appendChild(li);
    });
}

// 9. Busca de tarefas com find
function buscarTarefa() {
    const idBusca = parseInt(document.getElementById("buscaId").value);
    const resultadoDiv = document.getElementById("resultadoBusca");

    if (isNaN(idBusca)) {
        resultadoDiv.innerHTML = "<p class='error'>Digite um ID válido para buscar.</p>";
        return;
    }

    // Usando o método .find() do Array
    const tarefaEncontrada = tarefas.find(tarefa => tarefa.id === idBusca);

    if (tarefaEncontrada) {
        resultadoDiv.innerHTML = `
            <div class="item-busca">
                <strong>Encontrada:</strong> ID ${tarefaEncontrada.id} — ${tarefaEncontrada.titulo}
            </div>
        `;
    } else {
        resultadoDiv.innerHTML = `<p class='error'>Tarefa com ID ${idBusca} não encontrada.</p>`;
    }
}
