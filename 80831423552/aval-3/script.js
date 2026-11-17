
// TIKTOK 2026 - @JADSON

// CURTIR VÍDEO
function likeVideo(button) {
    let count = button.querySelector("small");
    let number = parseInt(count.innerText.replace("K", "")) || 0;

    if (!button.classList.contains("liked")) {
        button.classList.add("liked");
        button.style.color = "#fe2c55";
        count.innerText = number + 1;
    } else {
        button.classList.remove("liked");
        button.style.color = "white";
        count.innerText = number - 1;
    }
}

// COMENTÁRIOS
function commentVideo() {
    let comment = prompt("Digite seu comentário:");

    if (comment && comment.trim() !== "") {
        alert("Comentário publicado: " + comment);
    }
}

// COMPARTILHAR
function shareVideo() {
    if (navigator.share) {
        navigator.share({
            title: "TikTok @jadson",
            text: "Confira este vídeo!",
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copiado!");
    }
}

// PUBLICAR VÍDEO
function uploadVideo() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";

    input.onchange = function() {
        const file = input.files[0];

        if (file) {
            alert("Vídeo selecionado: " + file.name);
        }
    };

    input.click();
}

// PESQUISA
document.getElementById("search")
.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        alert("Pesquisando por: " + this.value);
    }
});

// REPRODUÇÃO DOS VÍDEOS
document.querySelectorAll(".video-card video")
.forEach(video => {

    video.addEventListener("click", function() {
        if (this.paused) {
            this.play();
        } else {
            this.pause();
        }
    });

});

// MENSAGEM INICIAL
console.log("TikTok 2026 carregado!");
console.log("Perfil: @jadson");
