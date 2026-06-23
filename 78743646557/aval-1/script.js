<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Exemplo JS</title>
</head>
<body>

  <h1 id="titulo">Texto original</h1>

  <button onclick="mudarTexto()">Clique aqui</button>

  <script>
    function mudarTexto() {
      document.getElementById("titulo").innerText = "Texto alterado com JavaScript!";
    }
  </script>

</body>
</html>