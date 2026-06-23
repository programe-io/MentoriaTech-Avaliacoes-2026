
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>JavaScript - Maximizar</title>

<style>
body{
    font-family: Arial;
    text-align: center;
    margin-top: 50px;
\}

#caixa{
    width: 300px;
    height: 150px;
    background: #4CAF50;
    color: white;
    margin: auto;
    padding: 20px;
    transition: 0.5s;
\}

button{
    margin-top: 20px;
    padding: 10px 20px;
    cursor: pointer;
\}
</style>
</head>

<body>

<header>
    <h1>Exemplo JavaScript</h1>
</header>

<div id="caixa">
    Caixa Normal
</div>

<button onclick="maximizar()">Maximizar</button>

<script>
function maximizar(){
    const caixa = document.getElementById("caixa");

    caixa.style.width = "600px";
    caixa.style.height = "300px";
    caixa.innerHTML = "Caixa Maximizada";
\}
</script>

</body>
</html>$0