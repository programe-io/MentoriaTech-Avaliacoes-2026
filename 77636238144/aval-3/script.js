<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<title>Oferta</title>
<style>
body{ background:#111; color:white; font-family:Arial; display:flex; justify-content:center; align-items:center; height:100vh; margin:0; }
.box{ text-align:center; background:#1e1e1e; padding:40px; border-radius:20px; }
#timer{ font-size:50px; font-weight:bold; color:#00ff88; margin:20px 0; letter-spacing:3px; }
.botao{ background:#00ff88; border:none; padding:15px 35px; border-radius:30px; font-weight:bold; font-size:18px; cursor:pointer; }
</style>
</head>
<body>
<div class="box">
  <h2>🔥 OFERTA ACABA EM:</h2>
  <div id="timer">10:00</div>
  <p>Garanta seu horário com 20% OFF</p>
  <button class="botao">QUERO MINHA VAGA</button>
</div>

<script>
let tempo = 600; // 10 minutos em segundos

function atualizar() {
  let minutos = Math.floor(tempo / 60);
  let segundos = tempo % 60;
  
  // Deixa com 2 dígitos: 09:05
  minutos = minutos < 10 ? "0" + minutos : minutos;
  segundos = segundos < 10 ? "0" + segundos : segundos;
  
  document.getElementById("timer").innerHTML = minutos + ":" + segundos;
  
  if (tempo > 0) {
    tempo--;
  } else {
    document.getElementById("timer").innerHTML = "EXPIRADO!";
    document.getElementById("timer").style.color = "red";
  }
}

setInterval(atualizar, 1000);
</script>
</body>
</html>