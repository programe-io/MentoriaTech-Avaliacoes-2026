<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Bicicleta com JavaScript</title>
</head>
<body>

<h1>Bicicleta Desenhada com JavaScript</h1>
<pre id="bicicleta"></pre>

<script>
  // Desenho da bicicleta em ASCII
  const bike = `
        __o
      _ \\<_
     (_)/(_)
  `;

  // Seleciona o elemento e insere o desenho
  document.getElementById('bicicleta').textContent = bike;
</script>

</body>
</html>