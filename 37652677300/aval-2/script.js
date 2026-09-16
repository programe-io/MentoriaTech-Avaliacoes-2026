function adicionarTarefa() {

    let campo = document.getElementById("tarefa");
    let texto = campo.value;

    if (texto === "") {
        alert("Digite uma tarefa!");
        return;
    }

    let lista = document.getElementById("listaTarefas");

    let tarefa = document.createElement("li");

    tarefa.innerHTML = `
        <span onclick="concluirTarefa(this)">
            ${texto}
        </span>

        <button 
            class="excluir" 
            onclick="excluirTarefa(this)"
        >
            Excluir
        </button>
    `;

    lista.appendChild(tarefa);

    campo.value = "";
}


function concluirTarefa(tarefa) {

    tarefa.classList.toggle("concluida");

}


function excluirTarefa(botao) {

    let tarefa = botao.parentElement;

    tarefa.remove();

}
