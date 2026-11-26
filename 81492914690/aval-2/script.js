
let tarefas = [];

function adicionar() {

    let campo = document.getElementById("tarefa");
    let nome = campo.value.trim();

    if (nome === "") {
        alert("Digite uma tarefa!");
        return;
    }

    tarefas.push({
        nome: nome,
        concluida: false
    });

    campo.value = "";

    mostrarTarefas();
}

function mostrarTarefas() {

    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    tarefas.forEach((tarefa, indice) => {

        let item = document.createElement("li");

        let texto = document.createElement("span");
        texto.textContent = tarefa.nome;

        if (tarefa.concluida) {
            texto.classList.add("concluida");
        }

        let concluir = document.createElement("button");
        concluir.textContent = tarefa.concluida
            ? "Desfazer" : "Concluir";

        concluir.onclick = function() {
            tarefas[indice].concluida =
                !tarefas[indice].concluida;

            mostrarTarefas();
        };

        let excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.classList.add("excluir");

        excluir.onclick = function() {
            tarefas.splice(indice, 1);
            mostrarTarefas();
        };

        item.append(texto, concluir, excluir);

        lista.appendChild(item);
    });
}
