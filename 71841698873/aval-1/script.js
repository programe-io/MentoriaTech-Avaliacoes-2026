<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Sistema de Alunos</title>
</head>
<body>

    <h1>Cadastro de Alunos</h1>

    <input type="text" id="nome" placeholder="Nome do aluno">
    <input type="number" id="nota1" placeholder="Nota 1">
    <input type="number" id="nota2" placeholder="Nota 2">

    <button onclick="cadastrarAluno()">Cadastrar</button>

    <ul id="lista"></ul>

    <!-- Ligação com o JavaScript -->
    <script src="script.js"></script>

</body>
</html>