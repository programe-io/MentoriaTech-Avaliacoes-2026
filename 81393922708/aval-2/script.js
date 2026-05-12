function atualizarRelogio() {
  const agora = new Date();

  let horas = agora.getHours();
  let minutos = agora.getMinutes();
  let segundos = agora.getSeconds();

  horas = horas.toString().padStart(2, "0");
  minutos = minutos.toString().padStart(2, "0");
  segundos = segundos.toString().padStart(2, "0");

  const horario = `${horas}:${minutos}:${segundos}`;

  document.getElementById("relogio").textContent = horario;
}

setInterval(atualizarRelogio, 1000);

atualizarRelogio();