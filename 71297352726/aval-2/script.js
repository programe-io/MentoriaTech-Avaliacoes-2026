
let tarefas = [];
let codigo = 0;

const form = document.getElementById("formTarefa");

// Cadastrar
form.addEventListener("submit", function(e) {
    e.preventDefault();

    let titulo = document.getElementById("titulo").value.trim();
    let prioridade = document.getElementById("prioridade").value;

    if (!titulo) return;

    tarefas.push({
        codigo: ++codigo,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    });

    form.reset();
    listar();
});

// Listar
function listar() {
    let lista = document.getElementById("lista");
    let pesquisa = document.getElementById("pesquisa").value.toLowerCase();

    lista.innerHTML = "";

    tarefas
        .filter(t => t.titulo.toLowerCase().includes(pesquisa))
        .forEach(t => {
            lista.innerHTML += `
                <div class="tarefa">
                    <div>
                        <h3 class="${t.status ? '' : 'finalizada'}">
                            ${escapeHTML(t.titulo)}
                        </h3>
                        <small>Código: ${t.codigo}</small>
                    </div>

                    <div class="acoes">
                        <span class="prioridade">${t.prioridade}</span>

                        <button class="concluir"
                            onclick="concluir(${t.codigo})">
                            ${t.status ? 'Concluir' : 'Concluída'}
                        </button>

                        <button class="excluir"
                            onclick="excluir(${t.codigo})">
                            Excluir
                        </button>
                    </div>
                </div>
            `;
        });

    document.getElementById("total").textContent = tarefas.length;

    document.getElementById("pendentes").textContent =
        tarefas.filter(t => t.status).length;

    document.getElementById("concluidas").textContent =
        tarefas.filter(t => !t.status).length;
}

// Proteger o texto digitado
function escapeHTML(texto) {
    let elemento = document.createElement("span");
    elemento.textContent = texto;
    return elemento.innerHTML;
}

// Concluir
function concluir(codigo) {
    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.status = false;
        listar();
    }
}

// Excluir
function excluir(codigo) {
    tarefas = tarefas.filter(t => t.codigo !== codigo);
    listar();
}

// Pesquisar
document.getElementById("pesquisa")
    .addEventListener("input", listar);

// Iniciar
listar();
