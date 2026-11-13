
let tarefas = [];
let codigo = 1;

const botao = document.getElementById("btnCadastrar");

botao.addEventListener("click", function() {

    const titulo = document.getElementById("titulo").value.trim();

    const prioridade = document.getElementById("prioridade").value;

    if (titulo.length < 5) {
        alert("Digite um título com pelo menos 5 caracteres!");
        return;
    }

    const tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    codigo++;

    document.getElementById("titulo").value = "";

    mostrarTarefas();

    alert("Tarefa cadastrada com sucesso!");

});

function mostrarTarefas() {

    const lista = document.getElementById("listaTarefas");

    const mensagem = document.getElementById("mensagemVazia");

    lista.innerHTML = "";

    mensagem.style.display = tarefas.length === 0 ? "block" : "none";

    tarefas.forEach(function(tarefa) {

        const div = document.createElement("div");

        div.className = tarefa.concluida ? "tarefa concluida" : "tarefa";

        div.innerHTML = `
            <h3>${tarefa.titulo}</h3>
            <p>Código: ${tarefa.codigo}</p>
            <p>Prioridade: ${tarefa.prioridade}</p>
            <p>Status: ${tarefa.concluida ? "Concluída" : "Pendente"}</p>
            <button onclick="concluir(${tarefa.codigo})">Concluir</button>
            <button class="excluir" onclick="excluir(${tarefa.codigo})">Excluir</button>
        `;

        lista.appendChild(div);

    });

}

function concluir(id) {

    const tarefa = tarefas.find(t => t.codigo === id);

    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        mostrarTarefas();
    }

}

function excluir(id) {

    tarefas = tarefas.filter(t => t.codigo !== id);

    mostrarTarefas();

}

mostrarTarefas();
