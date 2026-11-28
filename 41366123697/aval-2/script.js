let tarefas = []

function adicionarTarefa(tarefa) {
    tarefas.push(tarefa)
    console.log(`Tarefa "${tarefa}" adicionada com sucesso!`)
}   

function listarTarefas() {
    if (tarefas.length === 0) {
        console.log("Nenhuma tarefa encontrada.")
    } else {
        console.log("Lista de tarefas:")
        tarefas.forEach((tarefa, index) => {
            console.log(`${index + 1}. ${tarefa}`)
        })
    }

    function removerTarefa(index) {
        if (index < 1 || index > tarefas.length) {
            console.log("Índice inválido. Nenhuma tarefa removida.")
        } else {
            const tarefaRemovida = tarefas.splice(index - 1, 1)
            console.log(`Tarefa "${tarefaRemovida}" removida com sucesso!`)
        }
        
        console.log("Tarefas restantes:")
        listarTarefas()
    }

    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    })

    if (tarefas.length > 0) {
        readline.question("Deseja remover alguma tarefa? (s/n) ", (resposta) => {
            if (resposta.toLowerCase() === 's') {
                readline.question("Digite o índice da tarefa que deseja remover: ", (indice) => {
                    removerTarefa(parseInt(indice))
                    readline.close()
                })
            } else {
                console.log("Nenhuma tarefa removida.")
                readline.close()
            }