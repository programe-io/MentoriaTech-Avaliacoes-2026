const formulario = document.getElementById("form-tarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("lista-tarefas");
const contador = document.getElementById("contador");
const mensagem = document.getElementById("mensagem");

let tarefas = [];
let proximoCodigo = 1;

// Carrega as tarefas salvas no navegador.
try {
    const dados = JSON.parse(
        localStorage.getItem("gerenciadorTarefas")
    );

    if (Array.isArray(dados)) {
        tarefas = dados;
        proximoCodigo = tarefas.reduce(
            (maior, tarefa) => Math.max(maior, tarefa.codigo || 0),
            0
        ) + 1;
    \}
\} catch (erro) {
    tarefas = [];
\}

// Salva as tarefas no navegador.
function salvarTarefas() {
    localStorage.setItem(
        "gerenciadorTarefas",
        JSON.stringify(tarefas)
    );
\}

// Mostra mensagens para o usuário.
function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = mensagem \${tipo\};
\}

// Converte o número da prioridade em texto.
function nomePrioridade(valor) {
    const nomes = {
        1: "Alta",
        2: "Média",
        3: "Baixa"
    \};

    return nomes[valor];
\}

// Cadastra uma nova tarefa.
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const titulo = campoTitulo.value.trim();
    const prioridade = Number(campoPrioridade.value);

    if (titulo.length < 5) {
        mostrarMensagem(
            "O título precisa ter pelo menos 5 caracteres.",
            "erro"
        );
        return;
    \}

    if (![1, 2, 3].includes(prioridade)) {
        mostrarMensagem(
            "A prioridade deve ser entre 1 e 3.",
            "erro"
        );
        return;
    \}

    const tarefa = {
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    \};

    tarefas.push(tarefa);

    salvarTarefas();
    renderizarTarefas();

    formulario.reset();
    campoPrioridade.value = "1";

    mostrarMensagem(
        "Tarefa cadastrada com sucesso!",
        "sucesso"
    );
\});

// Lista todas as tarefas cadastradas.
function renderizarTarefas() {
    listaTarefas.replaceChildren();

    const concluidas = tarefas.filter(
        tarefa => tarefa.concluida
    ).length;

    contador.textContent =
        \${tarefas.length\} tarefa(s) · \${concluidas\} concluída(s);

    if (tarefas.length === 0) {
        const vazio = document.createElement("p");
        vazio.className = "vazio";
        vazio.textContent = "Nenhuma tarefa cadastrada ainda.";
        listaTarefas.appendChild(vazio);
        return;
    \}

    tarefas.forEach(function(tarefa) {
        const cartao = document.createElement("article");
        cartao.className = "tarefa";

        if (tarefa.concluida) {
            cartao.classList.add("concluida");
        \}

        const info = document.createElement("div");
        info.className = "info-tarefa";

        const nome = document.createElement("p");
        nome.className = "nome-tarefa";
        nome.textContent =
            \${tarefa.codigo\}. \${tarefa.titulo\};

        const detalhes = document.createElement("div");
        detalhes.className = "detalhes";

        const prioridade = document.createElement("span");
        prioridade.className =
            etiqueta-prioridade prioridade-\${tarefa.prioridade\};

        prioridade.textContent =
            Prioridade \${tarefa.prioridade\} — \${nomePrioridade(tarefa.prioridade)\};

        const status = document.createElement("span");
        status.textContent = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        detalhes.append(prioridade, status);
        info.append(nome, detalhes);

        const … Ler mais
$0