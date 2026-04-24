<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Link com JavaScript</title>
</head>
<body>

    <h1>Exemplo de link em JavaScript</h1>

    <div id="container"></div>

    <script>
        // Criar o elemento de link
        const link = document.createElement("a");

        // Definir o destino
        link.href = "https://www.google.com";

        // Texto do link
        link.innerText = " 