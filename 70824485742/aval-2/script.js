/*

============================================
GERENCIADOR DE TAREFAS
============================================
Conceitos utilizados:
Arrays
Objetos
Funções
Parâmetros
Condicionais
Operadores lógicos
try/catch
push
find
Manipulação do DOM
*/
// ============================================
// 1. ARRAY PRINCIPAL
// ============================================

const tarefas = [];

// ============================================
// 2. GERADOR DE CÓDIGOS
// ============================================

let proximoCodigo = 0;

// ============================================
// 3. ELEMENTOS DO HTML
// ============================================

const formTarefa = document.getElementById("formTarefa");
const tituloInput = document.getElementById("titulo");
const prioridadeInput = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");
const contadorTarefas = document.getElementById("contadorTarefas");
const codigoBusca = document.getElementById("codigoBusca");
const btnBuscar = document.getElementById("btnBuscar");
const resultadoBusca = document.getElementById("resultadoBusca");

// ============================================
// 4. VALIDAR DADOS DA TAREFA
// ============================================

function validarDadosDaTarefa(titulo, prioridade) {

if (titulo.trim().length < 5) {
    throw new Error(
        "O título deve possuir no mínimo 5 caracteres."
    );
}

prioridade = Number(prioridade);

if (prioridade < 1 || prioridade > 3) {
    throw new Error(
        "A prioridade deve estar entre 1 e 3."
    );
}

return true;

}

// ============================================
// 5. CADASTRAR TAREFA
// ============================================

function cadastrarTarefa(titulo, prioridade) {

validarDadosDaTarefa(titulo, prioridade);

proximoCodigo++;

const novaTarefa = {
    codigo: proximoCodigo,
    titulo: titulo.trim(),
    prioridade: Number(prioridade),
    status: true
};

tarefas.push(novaTarefa);

return novaTarefa;

}

// ============================================
// 6. LISTAR TAREFAS
// ============================================

function listarTarefas() {
return tarefas;
}

// ============================================
// 7. BUSCAR TAREFA COM FIND
// ============================================

function buscarTarefa(codigo) {

const tarefa = tarefas.find(
    tarefa => tarefa.codigo === Number(codigo)
);

if (!tarefa) {
    throw new Error(
        `A tarefa com código ${codigo} não foi encontrada.`
    );
}

return tarefa;

}

// ============================================
// 8. CONCLUIR TAREFA
// ============================================

function concluirTarefa(codigo) {

const tarefa = buscarTarefa(codigo);

if (!tarefa.status) {
    throw new Error(
        "Essa tarefa já foi concluída."
    );
}

tarefa.status = false;

return tarefa;

}

// ============================================
// 9. ALTERAR PRIORIDADE
// ============================================

function alterarPrioridade(codigo, novaPrioridade) {

const tarefa = buscarTarefa(codigo);

// Reutilização da função de validação
validarDadosDaTarefa(
    tarefa.titulo,
    novaPrioridade
);

tarefa.prioridade = Number(novaPrioridade);

return tarefa;

}

// ============================================
// 10. EXIBIR MENSAGEM
// ============================================

function exibirMensagem(texto, tipo) {

mensagem.textContent = texto;

mensagem.className = `mensagem ${tipo}`;

setTimeout(() => {
    mensagem.className = "mensagem";
    mensagem.textContent = "";
}, 4000);

}

// ============================================
// 11. TRANSFORMAR PRIORIDADE EM TEXTO
// ============================================

function obterTextoPrioridade(prioridade) {

if (prioridade === 1) {
    return "1 - Alta";
}

if (prioridade === 2) {
    return "2 - Média";
}

return "3 - Baixa";

}

// ============================================
// 12. EXIBIR TAREFAS NA TELA
// ============================================

function atualizarLista() {

const lista = listarTarefas();

listaTarefas.innerHTML = "";

contadorTarefas.textContent =
    `${lista.length} ${
        lista.length === 1 ? "tarefa cadastrada" : "tarefas cadastradas"
    }`;

if (lista.length === 0) {

    listaTarefas.innerHTML = `
        <tr>
            <td colspan="5" class="vazio">
                Nenhuma tarefa cadastrada.
            </td>
        </tr>
    `;

    return;
}

lista.forEach(tarefa => {

    const linha = document.createElement("tr");

    const statusTexto = tarefa.status
        ? "Pendente"
        : "Concluída";

    const statusClasse = tarefa.status
        ? "pendente"
        : "concluida";

    linha.innerHTML = `
        <td>${tarefa.codigo}</td>

        <td>${tarefa.titulo}</td>

        <td>
            <span class="prioridade prioridade-${tarefa.prioridade}">
                ${obterTextoPrioridade(tarefa.prioridade)}
            </span>
        </td>

        <td>
            <span class="status ${statusClasse}">
                ${statusTexto}
            </span>
        </td>

        <td>
            <div class="acoes">

                <button
                    class="btn btn-concluir"
                    onclick="executarConclusao(${tarefa.codigo})"
                    ${!tarefa.status ? "disabled" : ""}
                >
                    Concluir
                </button>

                <button
                    class="btn btn-prioridade"
                    onclick="executarAlteracaoPrioridade(${tarefa.codigo})"
                >
                    Prioridade
                </button>

            </div>
        </td>
    `;

    listaTarefas.appendChild(linha);
});

}

// ============================================
// 13. CADASTRO PELO FORMULÁRIO
// ============================================

formTarefa.addEventListener("submit", function(event) {

event.preventDefault();

const titulo = tituloInput.value;
const prioridade = prioridadeInput.value;

try {

    const tarefa = cadastrarTarefa(
        titulo,
        prioridade
    );

    exibirMensagem(
        `Tarefa "${tarefa.titulo}" cadastrada com sucesso! Código: ${tarefa.codigo}`,
        "sucesso"
    );

    formTarefa.reset();

    atualizarLista();

} catch (erro) {

    exibirMensagem(
        erro.message,
        "erro"
    );
}

});

// ============================================
// 14. EXECUTAR CONCLUSÃO
// ============================================

function executarConclusao(codigo) {

try {

    const tarefa = concluirTarefa(codigo);

    exibirMensagem(
        `Tarefa "${tarefa.titulo}" concluída com sucesso!`,
        "sucesso"
    );

    atualizarLista();

} catch (erro) {

    exibirMensagem(
        erro.message,
        "erro"
    );
}

}

// ============================================
// 15. ALTERAR PRIORIDADE
// ============================================

function executarAlteracaoPrioridade(codigo) {

try {

    const tarefa = buscarTarefa(codigo);

    const novaPrioridade = prompt(
        `Digite a nova prioridade para "${tarefa.titulo}":\n\n1 - Alta\n2 - Média\n3 - Baixa`
    );

    // Usuário cancelou o prompt
    if (novaPrioridade === null) {
        return;
    }

    alterarPrioridade(
        codigo,
        novaPrioridade
    );

    exibirMensagem(
        `Prioridade da tarefa "${tarefa.titulo}" alterada com sucesso!`,
        "sucesso"
    );

    atualizarLista();

} catch (erro) {

    exibirMensagem(
        erro.message,
        "erro"
    );
}

}

// ============================================
// 16. BUSCAR TAREFA
// ============================================

btnBuscar.addEventListener("click", function() {

const codigo = codigoBusca.value;

if (!codigo) {

    resultadoBusca.innerHTML = `
        <div class="resultado">
            Digite um código para realizar a busca.
        </div>
    `;

    return;
}

try {

    const tarefa = buscarTarefa(codigo);

    resultadoBusca.innerHTML = `
        <div class="resultado">
            <strong>Tarefa encontrada!</strong><br><br>

            <strong>Código:</strong>
            ${tarefa.codigo}<br>

            <strong>Título:</strong>
            ${tarefa.titulo}<br>

            <strong>Prioridade:</strong>
            ${obterTextoPrioridade(tarefa.prioridade)}<br>

            <strong>Status:</strong>
            ${tarefa.status ? "Pendente" : "Concluída"}
        </div>
    `;

} catch (erro) {

    resultadoBusca.innerHTML = `
        <div class="mensagem erro">
            ${erro.message}
        </div>
    `;
}

});

// ============================================
// 17. PERMITIR BUSCA COM ENTER
// ============================================

codigoBusca.addEventListener("keydown", function(event) {

if (event.key === "Enter") {
    btnBuscar.click();
}

});

// ============================================
// 18. LISTAGEM INICIAL
// ============================================

atualizarLista();