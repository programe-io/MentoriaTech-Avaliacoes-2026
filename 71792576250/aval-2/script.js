<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Lua com JavaScript</title>

  <style>
    body {
      margin: 0;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: radial-gradient(circle, #000020, #000000);
      font-family: Arial, sans-serif;
      color: white;
    \}

    .lua {
      width: 180px;
      height: 180px;
      border-radius: 50%;
      background-size: cover;
      background-position: center;
      box-shadow: 0 0 30px white;
      border: 3px solid white;
      transition: transform 0.5s;
    \}

    button {
      margin-top: 20px;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      border: none;
      border-radius: 8px;
    \}
  </style>
</head>

<body>

  <h1>🌙 Lua com JavaScript</h1>

  <div class="lua" id="lua"></div>

  <button onclick="mostrarLua()">Mostrar Lua</button>

  <script>
    function mostrarLua() {
      const lua = document.getElementById("lua");

      lua.style.backgroundImage =
        "url('https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg')";

      lua.style.transform = "scale(1.1)";
    \}
  </script>

</body>
</html>$0