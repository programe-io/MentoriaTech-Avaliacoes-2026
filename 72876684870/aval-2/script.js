
function trocar(parte, item) {
    document.getElementById(parte).textContent = item;
}

function finalizar() {
    const mensagem = document.getElementById("mensagem");

    mensagem.innerHTML = "🎀 Uau! Seu look ficou maravilhoso! 💖✨";

    document.querySelector(".boneca-area").style.boxShadow =
        "0 0 25px #ff69b4";
}

function resetar() {
    document.getElementById("cabelo").textContent = "🎀";
    document.getElementById("rosto").textContent = "👧🏻";
    document.getElementById("roupa").textContent = "👗";
    document.getElementById("sapato").textContent = "👠";

    document.getElementById("mensagem").textContent =
        "Escolha um look bem kawaii! ✨";

    document.querySelector(".boneca-area").style.boxShadow =
        "0 8px 20px #e78ab533";
}
