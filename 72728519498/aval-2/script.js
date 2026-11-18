
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gerenciador de Tarefas</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="container">

        <h1>Gerenciador de Tarefas</h1>

        <h2>Cadastrar Tarefa</h2>

        <input type="text" id="titulo" placeholder="Digite o título da tarefa">

        <select id="prioridade">
            <option value="">Selecione a prioridade</option>
            <option value="1">1 - Baixa</option>
            <option value="2">2 - Média</option>
            <option value="3">3 - Alta</option>
        </select>

        <button onclick="cadastrarTarefa()">Cadastrar Tarefa</button>

        <h2>Lista de Tarefas</h2>

        <table>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Título</th>
                    <th>Prioridade</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>

            <tbody id="listaTarefas"></tbody>
        </table>

    </div>

    <script src="script.js"></script>

</body>
</html>
