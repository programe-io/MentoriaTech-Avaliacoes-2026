<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Trocar Imagem</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      margin-top: 40px;
    }

    img {
      width: 350px;
      border-radius: 10px;
      margin-bottom: 20px;
    }

    button {
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
    }
  </style>
</head>
<body>

  <h1>Trocar Imagem com JavaScript</h1>

  <img id="foto" src="https://picsum.photos/id/237/350/250" alt="Imagem">

  <br>

  <button onclick="trocarImagem()">Trocar Imagem</button>

  <script>
    function trocarImagem() {
      const imagem = document.getElementById("foto");

      if (imagem.src.includes("237")) {
        imagem.src = "https://picsum.photos/id/1025/350/250";
      } else {
        imagem.src = "https://picsum.photos/id/237/350/250";
      }
    }
  </script>

</body>
</html>