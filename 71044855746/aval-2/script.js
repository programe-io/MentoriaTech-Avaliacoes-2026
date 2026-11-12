
function cadastrar() {
    let codigo = Number(document.getElementById("codigo").value);
    let titulo = document.getElementById("titulo").value;
    let prioridadeTexto = document.getElementById("prioridade").value;
    let prioridade = Number(prioridadeTexto);

    if (codigo <= 0 || titulo.trim().length < 5 ||
        prioridadeTexto === "" || prioridade < 1 || prioridade > 3) {
        alert("Preencha os campos corretamente!");
        return;
    }

    if (tarefas.some(t => t.codigo === codigo)) {
        alert("Esse código já está cadastrado!");
        return;
    }

    tarefas.push({
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        status: "Pendente"
    });

    alert("Tarefa cadastrada com sucesso!");

    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("prioridade").value = "";

    listar();
}
