
alert("JAVASCRIPT FUNCIONANDO!");

document.getElementById("contador").textContent = "3 tarefas";

document.getElementById("listaTarefas").innerHTML = `
    <div class="card-tarefa">
        <h3>Estudar JavaScript</h3>
        <p>Código: 1</p>
        <p>Prioridade: Alta</p>
    </div>

    <div class="card-tarefa">
        <h3>Fazer atividade escolar</h3>
        <p>Código: 2</p>
        <p>Prioridade: Média</p>
    </div>

    <div class="card-tarefa">
        <h3>Organizar os materiais</h3>
        <p>Código: 3</p>
        <p>Prioridade: Baixa</p>
    </div>
`;

$0