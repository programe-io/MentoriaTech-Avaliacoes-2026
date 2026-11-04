
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Mini Feed</title>
</head>
<body>

    <h1>Meu Mini Feed</h1>

    <h2>Nova publicação</h2>

    <input type="text" id="nome" placeholder="Seu nome">

    <br><br>

    <textarea id="mensagem" placeholder="O que você está pensando?"></textarea>

    <br><br>

    <button onclick="publicar()">Publicar</button>

    <h2>Feed de publicações</h2>

    <div id="feed"></div>

    <script src="script.js"></script>

</body>
</html>
