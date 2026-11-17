
// SISTEMA DE CURTIDAS
function like(element) {
    const count = element.querySelector("small");

    element.classList.toggle("liked");

    let number = parseFloat(
        count.innerText.replace(",", ".")
    );

    if (element.classList.contains("liked")) {
        number += 1;
    } else {
        number -= 1;
    }

    count.innerText = number.toLocaleString("pt-BR");
}


// SISTEMA DE COMENTÁRIOS
function comment() {
    const message = prompt("Escreva seu comentário:");

    if (message && message.trim()) {
        alert("Comentário enviado: " + message);
    }
}


// COMPARTILHAR VÍDEOS
function share() {
    if (navigator.share) {
        navigator.share({
            title: "Meu TikTok",
            text: "Confira este vídeo!"
        }).catch(error => {
            console.log("Compartilhamento cancelado");
        });
    } else {
        alert("Compartilhamento não disponível.");
    }
}


// ATIVAR E DESATIVAR ÁUDIO
function toggleSound(element) {
    const card = element.closest(".video-card");
    const video = card.querySelector("video");

    video.muted = !video.muted;

    element.innerHTML = video.muted
        ? '🔇 <small>Áudio</small>'
        : '🔊 <small>Áudio</small>';
}


// REPRODUÇÃO AUTOMÁTICA DOS VÍDEOS
const videos = document.querySelectorAll("video");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target;

        if (entry.isIntersecting) {
            video.play().catch(() => {});
        } else {
            video.pause();
        }
    });
}, {
    threshold: 0.6
});

videos.forEach(video => {
    observer.observe(video);
});


// CAMPO DE PESQUISA
const search = document.querySelector(".search");

search.addEventListener("input", function() {
    const value = this.value.toLowerCase();

    document.querySelectorAll(".video-card").forEach(card => {
        const content = card.innerText.toLowerCase();

        card.style.display = content.includes(value)
            ? "block"
            : "none";
    });
});


// BOTÃO DE PERFIL
function openProfile() {
    alert("Bem-vindo ao seu perfil!");
}

console.log("TikTok iniciado com sucesso!");
