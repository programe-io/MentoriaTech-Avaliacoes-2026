const tarefas = [
    {
        codigo: 1,
        titulo: 'Cadastrar Clientes',
        prioridade: 1,
        status: true
    }
];

// Mostra a tarefa inicialmente
console.log(tarefas);

// Altera a prioridade para 2
tarefas[0].prioridade = 2;

// Mostra a tarefa após a alteração
console.log(tarefas);
