<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minha Adega Digital</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>🍷 Minha Adega</h1>
        
        <!-- Formulário de Cadastro -->
        <form id="form-vinho">
            <input type="text" id="nome" placeholder="Nome do Vinho" required>
            <input type="text" id="tipo" placeholder="Tipo (Ex: Tinto, Branco, Seco)" required>
            <input type="number" id="safra" placeholder="Ano da Safra" required>
            <input type="number" id="quantidade" placeholder="Quantidade" min="1" required>
            <button type="submit">Adicionar à Adega</button>
        </form>

        <!-- Lista de Vinhos -->
        <h2>Estoque Atual</h2>
        <ul id="lista-vinhos"></ul>
    </div>

    <script src="script.js"></script>
</body>
</html>$0