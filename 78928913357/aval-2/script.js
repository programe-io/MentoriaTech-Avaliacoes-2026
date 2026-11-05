// 1. Contador Decrescente para o Próximo Bolão
// Define a data do evento para daqui a 10 dias a contar de hoje (exemplo dinâmico)
const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 10);

function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    // Cálculos de tempo
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Inserir no HTML adicionando um zero à esquerda se for menor que 10
    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

    // Se o tempo acabar
    if (difference < 0) {
        clearInterval(interval);
        document.getElementById("countdown").innerHTML = "<h4>O Bolão já começou! 🤠</h4>";
    }
}

// Atualiza o contador a cada 1 segundo
const interval = setInterval(updateCountdown, 1000);
updateCountdown();


// 2. Sistema de Visualização da Galeria (Modal)
function openModal(imgUrl) {
    const modal = document.getElementById("galleryModal");
    const modalImg = document.getElementById("imgModal");
    modal.style.display = "block";
    modalImg.src = imgUrl;
}

function closeModal() {
    document.getElementById("galleryModal").style.display = "none";
}
