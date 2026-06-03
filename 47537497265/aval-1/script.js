<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>História de Cristiano Ronaldo</title>

<style>
    body {
        font-family: Arial, sans-serif;
        text-align: center;
        background: linear-gradient(to bottom, #000, #b30000);
        color: white;
        padding: 30px;
    }

    button {
        padding: 12px 20px;
        font-size: 16px;
        border: none;
        border-radius: 8px;
        background: gold;
        cursor: pointer;
    }

    button:hover {
        background: orange;
    }

    .card {
        background: rgba(255,255,255,0.1);
        padding: 20px;
        border-radius: 12px;
        max-width: 700px;
        margin: auto;
    }
</style>
</head>

<body>

<h1>⚽ Cristiano Ronaldo ⚽</h1>

<div class="card">
    <p>Clique no botão para conhecer a história do craque!</p>

    <button onclick="mostrarHistoria()">Ver História</button>

    <p id="historia"></p>
</div>

<script>
function mostrarHistoria() {
    document.getElementById("historia").innerHTML =
        "Cristiano Ronaldo nasceu em Portugal e se tornou um dos maiores jogadores da história do futebol. " +
        "Ele começou no Sporting, brilhou no Manchester United, fez história no Real Madrid, Juventus e voltou ao United. " +
        "É conhecido por sua disciplina, velocidade, força e muitos gols marcados.";
}
</script>

</body>
</html>