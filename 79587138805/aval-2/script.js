// Array para armazenar as tarefas
let listaTarefas = [];

// Adicionar nova tarefa
function adicionarTarefa(descricao) {
    if (descricao.trim() === "") {
        alert("Por favor, digite uma tarefa válida!");
        return;
    \}
    
    const tarefa = {
        id: Date.now(),
        descricao: descricao,
        concluida: false
    \};
    
    listaTarefas.push(tarefa);
    console.log(`Tarefa "\${descricao\}" adicionada!`);
    exibirTarefas();
\}

// Marcar tarefa como concluída
function concluirTarefa(id) {
    const tarefa = listaTarefas.find(item => item.id === id);
    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        exibirTarefas();
    \}
\}

// Remover tarefa
function removerTarefa(id) {
    listaTarefas = listaTarefas.filter(item => item.id !== id);
    exibirTarefas();
\}

// Exibir todas as tarefas no console e na página
function exibirTarefas() {
    console.clear();
    console.log("=== LISTA DE TAREFAS ===");
    
    let saidaTela = "<h2>Minhas Tarefas</h2><ul>";
    
    listaTarefas.forEach(tarefa => {
        const status = tarefa.concluida ? "✅ Concluída" : "⏳ Pendente";
        const estilo = tarefa.concluida ? "text-decoration: line-through;" : "";
        
        console.log(`\${status\} - \${tarefa.descricao\}`);
        saidaTela += `
            <li style="\${estilo\} padding: 5px 0;">
                \${status\}: \${tarefa.descricao\}
                <button onclick="concluirTarefa(\${tarefa.id\})">Alternar</button>
                <button onclick="removerTarefa(\${tarefa.id\})">Excluir</button>
            </li>
        `;
    \});
    
    saidaTela += "</ul>";
    document.body.innerHTML = saidaTela;
\}

// Fluxo principal
function iniciar() {
    let continuar = true;
    
    while (continuar) {
        const tarefa = prompt("Digite uma nova tarefa (ou cancele para encerrar):");
        if (tarefa === null) {
            continuar = false;
        \} else {
            adicionarTarefa(tarefa);
        \}
    \}
\}

// Iniciar o programa
iniciar();$0