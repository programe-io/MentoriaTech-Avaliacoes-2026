<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Renderização</title>
    <link rel="stylesheet" href="style.css">
    <script src="app.js" defer></script>
</head>
<body>
    <main class="container">
        <h1>Lista de tarefas diárias</h1>
        <p>Organize as tarefas do seu dia.</p>

        <form id="form-tarefa">
            <input
                type="text"
                id="input-titulo"
                placeholder="Digite uma nova tarefa"
                aria-label="Título da tarefa"
            >
            <button type="submit">Adicionar</button>
        </form>

        <ul id="lista-tarefas"></ul>
        <small>Tarefas concluídas aparecem riscadas.</small>
    </main>
</body>
</html>

