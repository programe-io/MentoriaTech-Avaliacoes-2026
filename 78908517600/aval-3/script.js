
// CURTIR VÍDEOS
function like(button) {
    button.classList.toggle("liked");

    let counter = button.nextElementSibling;
    let number = parseFloat(counter.innerText);

    if (button.classList.contains("liked")) {
        button.innerText = "❤️";
        counter.innerText = (number + 0.1).toFixed(1) + "K";
    } else {
        button.innerText = "🤍";
        counter.innerText = (number - 0.1).toFixed(1) + "K";
    }
}

// COMENTÁRIOS
function comment() {
    let text = prompt("Digite seu comentário:");

    if (text) {
        alert("Comentário enviado: " + text);
    }
}

// COMPARTILHAR
function share() {
    if (navigator.share) {
        navigator.share({
            title: "Meu TikTok",
            text: "Confira este vídeo!"
        });
    } else {
        alert("Compartilhe este vídeo com seus amigos!");
    }
}

// NAVEGAÇÃO ENTRE VÍDEOS
let currentVideo = 0;

let videos = document.querySelectorAll(".video");

// MOSTRAR VÍDEO
function showVideo(index) {
    videos.forEach(video => {
        video.classList.remove("active");
    });

    videos[index].classList.add("active");
}

// PRÓXIMO VÍDEO
function nextVideo() {
    currentVideo++;

    if (currentVideo >= videos.length) {
        currentVideo = 0;
    }

    showVideo(currentVideo);
}

// VÍDEO ANTERIOR
function previousVideo() {
    currentVideo--;

    if (currentVideo < 0) {
        currentVideo = videos.length - 1;
    }

    showVideo(currentVideo);
}

// NAVEGAÇÃO COM MOUSE
document.querySelector(".app").addEventListener("wheel", function(e) {
    if (e.deltaY > 0) {
        nextVideo();
    } else if (e.deltaY < 0) {
        previousVideo();
    }
});

// NAVEGAÇÃO COM CELULAR
let startY = 0;

document.querySelector(".app").addEventListener("touchstart", function(e) {
    startY = e.touches[0].clientY;
});

document.querySelector(".app").addEventListener("touchend", function(e) {
    let endY = e.changedTouches[0].clientY;

    if (startY - endY > 50) {
        nextVideo();
    } else if (endY - startY > 50) {
        previousVideo();
    }
});
