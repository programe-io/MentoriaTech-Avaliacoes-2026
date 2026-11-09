class Tarefa {
    constructor(codigo, titulo, prioridade) {
        this.codigo = codigo;
        this.titulo = titulo;
        this.prioridade = Number(prioridade);
        this.concluida = false;
    \}
\}

class GerenciadorDeTarefas {
    constructor() {
        this.tarefas = [];
        this.proximoCodigo = 1;
    \}

    cadastrarTarefa(titulo, prioridade) {
        // Validação: Mínimo de 5 caracteres
        if (!titulo || titulo.trim().length < 5) {
            return { sucesso: false, mensagem: "O título deve ter no mínimo 5 caracteres." \};
        \}

        // Validação: Prioridade entre 1 e 3
        const prioNum = Number(prioridade);
        if (![1, 2, 3].includes(prioNum)) {
            return { sucesso: false, mensagem: "A prioridade deve ser um valor entre 1 e 3." \};
        \}

        const novaTarefa = new Tarefa(this.proximoCodigo++, titulo.trim(), prioNum);
        this.tarefas.push(novaTarefa);
        return { sucesso: true, mensagem: `Tarefa "\${novaTarefa.titulo\}" cadastrada com sucesso!` \};
    \}

    marcarComoConcluida(codigo) {
        const tarefa = this.tarefas.find(t => t.codigo === codigo);
        if (tarefa) {
            tarefa.concluida = !tarefa.concluida; // Alterna entre concluída e pendente
        \}
    \}

    alterarPrioridade(codigo) {
        const tarefa = this.tarefas.find(t => t.codigo === codigo);
        if (tarefa) {
            // Ciclo de prioridade: 1 -> 2 -> 3 -> 1
            tarefa.prioridade = tarefa.prioridade === 3 ? 1 : tarefa.prioridade + 1;
        \}
    \}
\}

// Inicializando o sistema na interface
const gerenciador = new GerenciadorDeTarefas();

const form = document.getElementById("task-form");
const inputTitulo = document.getElementById("titulo");
const selectPrioridade = document.getElementById("prioridade");
const divMensagem = document.getElementById("mensagem");
const ulTaskList = document.getElementById("task-list");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const resultado = gerenciador.cadastrarTarefa(inputTitulo.value, selectPrioridade.value);
    
    exibirMensagem(resultado.mensagem, resultado.sucesso);

    if (resultado.sucesso) {
        inputTitulo.value = "";
        atualizarTela();
    \}
\});

function exibirMensagem(texto, sucesso) {
    divMensagem.textContent = texto;
    divMensagem.className = `mensagem \${sucesso ? 'sucesso' : 'erro'\}`;
    
    setTimeout(() => {
        divMensagem.className = "mensagem oculto";
    \}, 4000);
\}

function atualizarTela() {
    ulTaskList.innerHTML = "";

    if (gerenciador.tarefas.length === 0) {
        ulTaskList.innerHTML = "<p style='text-align: center; color: #888;'>Nenhuma tarefa cadastrada.</p>";
        return;
    \}

    gerenciador.tarefas.forEach(t => {
        const li = document.createElement("li");
        li.className = "task-item";

        const textoPrioridade = t.prioridade === 1 ? "Alta" : t.prioridade === 2 ? "Média" : "Baixa";

        li.innerHTML = `
            <div class="task-info \${t.concluida ? 'concluida' : ''\}">
                <span><strong>[#\${t.codigo\}]</strong> \${t.titulo\}</span>
                <br><small>Prioridade: \${textoPrioridade\} | Status: \${t.concluida ? 'Concluída' : 'Pendente'\}</small>
            </div>
            <div class="task-actions">
                <button class="btn-concluir" onclick="toggleConcluida(\${t.codigo\})">\${t.concluida ? 'Desfazer' : 'Concluir'\}</button>
                <button class="btn-prioridade" onclick="mudarPrioridade(\${t.codigo\})">Mudar Prio</button>
            </div>
        `;

        ulTaskList.appendChild(li);
    \});
\}

function toggleConcluida(codigo) {
    gerenciador.marcarComoConcluida(codigo);
    atualizarTela();
\}

function mudarPrioridade(codigo) {
    gerenciador.alterarPrioridade(codigo);
    atualizarTela();
\}

// Renderiza a lista vazia ao carregar
atualizarTela();$0