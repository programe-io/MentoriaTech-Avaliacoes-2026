function scrollToMusic() {
    document.getElementById("musicas").scrollIntoView({
        behavior: "smooth"
    });
}

function playSong(song, artist) {
    document.getElementById("songName").textContent = song;
    document.getElementById("artistName").textContent = artist;

    const player = document.getElementById("player");

    player.style.transform = "translateX(-50%) scale(1.03)";

    setTimeout(() => {
        player.style.transform = "translateX(-50%) scale(1)";
    }, 200);
}

function favorite(button) {
    button.classList.toggle("active");

    if (button.classList.contains("active")) {
        button.textContent = "♥";
    } else {
        button.textContent = "♡";
    }
}

function showMessage() {
    document.getElementById("message").classList.add("show");
}

function closeMessage() {
    document.getElementById("message").classList.remove("show");
}

document.getElementById("themeBtn").addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        this.textContent = "☀️";
        document.documentElement.style.setProperty("--background", "#1d1117");
        document.documentElement.style.setProperty("--dark", "#fff");
    } else {
        this.textContent = "🌙";
        document.documentElement.style.setProperty("--background", "#fff8fb");
        document.documentElement.style.setProperty("--dark", "#351d2a");
    }
});

document.addEventListener("mousemove", function(e) {

    if (Math.random() > 0.93) {

        const heart = document.createElement("span");

        heart.textContent = "♡";
        heart.style.position = "fixed";
        heart.style.left = e.clientX + "px";
        heart.style.top = e.clientY + "px";
        heart.style.color = "#e85d8f";
        heart.style.fontSize = "18px";
        heart.style.pointerEvents = "none";
        heart.style.animation = "floatHeart 2s forwards";
        heart.style.zIndex = "1";

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 2000);
    }
});

const style = document.createElement("style");

style.innerHTML = `
@keyframes floatHeart {
    0% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }

    100% {
        opacity: 0;
        transform: translateY(-100px) scale(1.5);
    }
}
`;

document.head.appendChild(style);