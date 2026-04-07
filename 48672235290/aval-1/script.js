<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Robô Chat</title>
<style>
  body {
    font-family: Arial;
    background: #222;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .chat {
    width: 300px;
    background: #333;
    padding: 15px;
    border-radius: 10px;
  }

  .mensagens {
    height: 200px;
    overflow-y: auto;
    margin-bottom: 10px;
  }

  input {
    width: 100%;
    padding: 8px;
    border: none;
    border-radius: 5px;
  }
</style>
</head>

<body>

<div class="chat">
  <div class="mensagens" id="chat"></div>
  <input type="text" id="input" placeholder="Digite algo..." onkeydown="enviar(event)">
</div>

<script>
function enviar(event) {
  if (event.key === "Enter") {
    let input = document.getElementById("input");
    let chat = document.getElementById("chat");

    let texto = input.value.trim();
    if (texto === "") return;

    // Mostrar mensagem do usuário
    chat.innerHTML += "<p><b>Você:</b> " + texto + "</p>";

    // Resposta do robô
    let resposta = responder(texto);

    setTimeout(() => {
      chat.innerHTML += "<p><b>Robô:</b> " + resposta + "</p>";
      chat.scrollTop = chat.scrollHeight;
    }, 500);

    input.value = "";
  }
}

function responder(msg) {
  msg = msg.toLowerCase();

  if (msg.includes("oi") || msg.includes("olá")) {
    return "Olá humano! 🤖";
  } else if (msg.includes("seu nome")) {
    return "Eu sou um robô em JavaScript!";
  } else if (msg.includes("tudo bem")) {
    return "Tudo ótimo! E você?";
  } else if (msg.includes("hora")) {
    return "Agora são " + new Date().toLocaleTimeString();
  } else {
    return "Não entendi... tente outra coisa!";
  }
}
</script>

</body>
</html>