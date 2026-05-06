// Função para atualizar o relógio
function atualizarRelogio() {
  const agora = new Date();

  let horas = agora.getHours();
  let minutos = agora.getMinutes();
  let segundos = agora.getSeconds();

  // Adiciona zero à esquerda se necessário
  horas = horas < 10 ? "0" + horas : horas;
  minutos = minutos < 10 ? "0" + minutos : minutos;
  segundos = segundos < 10 ? "0" + segundos : segundos;

  const horario = `${horas}:${minutos}:${segundos}`;

  document.getElementById("relogio").innerText = horario;
}

// Atualiza a cada 1 segundo
setInterval(atualizarRelogio, 1000);