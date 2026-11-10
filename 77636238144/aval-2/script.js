<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<title>Gerador de Senhas</title>
<style>
body{ background:#111; font-family:Arial; display:flex; justify-content:center; align-items:center; height:100vh; margin:0; }
.card{ background:#1e1e1e; padding:35px; border-radius:20px; text-align:center; width:320px; color:white; }
input{ width:100%; padding:15px; border-radius:10px; border:none; text-align:center; font-size:18px; margin:15px 0; background:#2a2a2a; color:#00ff88; }
button{ width:100%; padding:14px; border:none; border-radius:30px; background:#00ff88; font-weight:bold; cursor:pointer; font-size:16px; }
button:hover{ background:#00cc6e; }
</style>
</head>
<body>
<div class="card">
  <h2>🔐 Gerador de Senha</h2>
  <input type="text" id="senha" readonly placeholder="Clique em gerar">
  <button onclick="gerar()">Gerar Senha Forte</button>
  <button onclick="copiar()" style="background:white; margin-top:10px;">Copiar</button>
</div>

<script>
function gerar() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!";
  let senha = "";
  for (let i = 0; i < 12; i++) {
    senha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  document.getElementById("senha").value = senha;
}

function copiar() {
  let campo = document.getElementById("senha");
  campo.select();
  document.execCommand("copy");
  alert("Senha copiada! ✅");
}
</script>
</body>
</html>