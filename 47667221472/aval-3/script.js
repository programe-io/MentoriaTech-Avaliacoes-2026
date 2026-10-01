function atualizarRelogio() {

    const agora = new Date();

    let horas = agora.getHours();
    let minutos = agora.getMinutes();
    let segundos = agora.getSeconds();

    horas = horas.toString().padStart(2, "0");
    minutos = minutos.toString().padStart(2, "0");
    segundos = segundos.toString().padStart(2, "0");

    document.getElementById("hora").textContent =
        `${horas}:${minutos}:${segundos}`;

    const dia = agora.getDate().toString().padStart(2, "0");
    const mes = (agora.getMonth() + 1).toString().padStart(2, "0");
    const ano = agora.getFullYear();

    document.getElementById("data").textContent =
        `${dia}/${mes}/${ano}`;
}

setInterval(atualizarRelogio, 1000);

atualizarRelogio();