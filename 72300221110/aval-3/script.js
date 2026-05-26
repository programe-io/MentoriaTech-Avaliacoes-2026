<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Organização de Caixas</title>

  <style>

    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
    }

    header {
      background-color: #1e3a8a;
      color: white;
      text-align: center;
      padding: 20px;
    }

    nav {
      background-color: #2563eb;
      padding: 10px;
      text-align: center;
    }

    nav a {
      color: white;
      text-decoration: none;
      margin: 0 15px;
      font-weight: bold;
    }

    nav a:hover {
      text-decoration: underline;
    }

    .container {
      display: flex;
      padding: 20px;
      gap: 20px;
    }

    aside {
      width: 250px;
      background-color: #dbeafe;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
    }

    aside img {
      width: 100%;
      border-radius: 10px;
      margin-top: 10px;
    }

    main {
      flex: 1;
    }

    article {
      background-color: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
    }

    h3 {
      color: #1e3a8a;
      text-align: center;
    }

    p {
      font-size: 18px;
      color: #333;
      text-align: center;
    }

    span {
      color: #1e3a8a;
      font-weight: bold;
    }

    button {
      padding: 10px 15px;
      background-color: #2563eb;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      display: block;
      margin: 10px auto;
    }

    button:hover {
      background-color: #1e3a8a;
    }

    .resultado {
      margin-top: 15px;
      font-size: 18px;
      text-align: center;
    }

    footer {
      background-color: #1e3a8a;
      color: white;
      text-align: center;
      padding: 15px;
      margin-top: 20px;
    }

  </style>
</head>

<body>

  <header>
    <h1>Organização de Produtos em Caixas</h1>
  </header>

  <nav>
    <a href="#">Início</a>
    <a href="#">Sistema</a>
    <a href="#">Ajuda</a>
  </nav>

  <div class="container">

    <aside>
      <h2>Informações</h2>

      <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Imagem ilustrativa">

      <p>
        Sistema que organiza produtos em caixas:
        <span>Extra (50)</span>, <span>Grande (20)</span>, <span>Média (5)</span> e <span>Pequena (1)</span>.
      </p>
    </aside>

    <main>

      <article>

        <h3>Calcular Organização</h3>

        <p>
          Clique no botão para iniciar o cálculo.
        </p>

        <button onclick="calcular()">Calcular Caixas</button>

        <div class="resultado" id="resultado">
          Resultado aparecerá aqui...
        </div>

      </article>

    </main>

  </div>

  <footer>
    Sistema de exemplo - HTML + CSS + JavaScript
  </footer>

  <script>

    function calcular() {

      let quantCaixaExtra = 0;
      let quantCaixaGrande = 0;
      let quantCaixaMedia = 0;
      let quantCaixaPequena = 0;

      let quantProdutos = parseInt(prompt("Informe a quantidade de produtos:"));

      while (quantProdutos > 0) {

        if (quantProdutos >= 50) {
          quantCaixaExtra++;
          quantProdutos -= 50;

        } else if (quantProdutos >= 20) {
          quantCaixaGrande++;
          quantProdutos -= 20;

        } else if (quantProdutos >= 5) {
          quantCaixaMedia++;
          quantProdutos -= 5;

        } else {
          quantCaixaPequena++;
          quantProdutos -= 1;
        }
      }

      document.getElementById("resultado").innerHTML =
        `
        Caixas utilizadas:<br><br>
        Extra: <span>${quantCaixaExtra}</span><br>
        Grande: <span>${quantCaixaGrande}</span><br>
        Média: <span>${quantCaixaMedia}</span><br>
        Pequena: <span>${quantCaixaPequena}</span>
        `;
    }

  </script>

</body>

</html>