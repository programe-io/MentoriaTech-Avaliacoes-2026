
let tarefas = JSON.parse(
    localStorage.getItem("tarefas")
) || [];

// SALVAR TAREFAS NO NAVEGADOR
function salvar() {
    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );
\}

// ADICIONAR NOVA TAREFA
function adicionar() {

    let campo = document.getElementById("tarefa");
    let texto = campo.value.trim();

    if (texto === "") {
        alert("Digite uma tarefa!");
        return;
    \}

    tarefas.push({
        nome: texto,
        feita: false
    \});

    campo.value = "";

    salvar();
    atualizar();
\}

// CONCLUIR OU DESFAZER TAREFA
function concluir(index) {

    tarefas[index].feita = !tarefas[index].feita;

    salvar();
    atualizar();
\}

// EXCLUIR TAREFA
function excluir(index) {

    tarefas.splice(index, 1);

    salvar();
    atualizar();
\}

// ATUALIZAR A LISTA E AS ESTATÍSTICAS
function atualizar() {

    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    tarefas.forEach((tarefa, index) => {

        let item = document.createElement("li");

        let texto = document.createElement("span");
        texto.textContent = tarefa.nome;

        if (tarefa.feita) {
            texto.classList.add("concluida");
        \}

        // BOTÃO CONCLUIR
        let botaoConcluir = document.createElement("button");

        botaoConcluir.textContent =
            tarefa.feita ? "Desfazer" : "Concluir";

        botaoConcluir.onclick = () => concluir(index);

        // BOTÃO EXCLUIR
        let botaoExcluir = document.createElement("button");

        botaoExcluir.textContent = "Excluir";
        botaoExcluir.classList.add("excluir");

        botaoExcluir.onclick = () => excluir(index);

        // ADICIONAR ELEMENTOS
        item.appendChild(texto);
        item.appendChild(botaoConcluir);
        item.appendChild(botaoExcluir);

        lista.appendChild(item);

    \});

    // ATUALIZAR ESTATÍSTICAS
    document.getElementById("total").textContent =
        tarefas.length;

    document.getElementById("pendentes").textContent =
        tarefas.filter(t => !t.feita).length;

    document.getElementById("concluidas").textContent =
        tarefas.filter(t => t.feita).length;
\}

// ADICIONAR TAREFA PRESSIONANDO ENTER
document.getElementById("tarefa")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            adicionar();
        \}

    \});

// CARREGAR TAREFAS AO ABRIR A PÁGINA
atualizar();$0