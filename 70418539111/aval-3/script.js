
// ANIMAÇÃO DOS CARDS AO ROLAR A PÁGINA

const cards = document.querySelectorAll(".club-card");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 120}ms`;
    observer.observe(card);
});


// EFEITO DE CLIQUE NOS CLUBES

cards.forEach(card => {
    card.addEventListener("click", () => {

        cards.forEach(item => {
            item.classList.remove("selected");
        });

        card.classList.add("selected");

    });
});


// DESTAQUE DO AL-NASSR

const alNassr = document.querySelector(".current");

if (alNassr) {
    alNassr.addEventListener("mouseenter", () => {
        alNassr.style.boxShadow =
            "0 0 35px #eab30888";
    });

    alNassr.addEventListener("mouseleave", () => {
        alNassr.style.boxShadow =
            "0 0 25px #eab30820";
    });
}


// EFEITO DE PARTÍCULAS

const particleContainer = document.createElement("div");

particleContainer.className = "particles";

document.body.appendChild(particleContainer);

for (let i = 0; i < 45; i++) {

    const particle = document.createElement("span");

    particle.className = "particle";

    particle.style.left = Math.random() * 100 + "%";

    particle.style.animationDuration =
        (Math.random() * 8 + 5) + "s";

    particle.style.animationDelay =
        Math.random() * 5 + "s";

    particleContainer.appendChild(particle);
}


// EFEITO SIUUUU

const celebrate = document.getElementById("celebrate");

if (celebrate) {

    celebrate.addEventListener("click", () => {

        celebrate.textContent = "SIUUUUUU! 🔥";

        document.body.classList.add("celebration");

        setTimeout(() => {

            celebrate.textContent = "SIUUUU! ⚡";

            document.body.classList.remove("celebration");

        }, 2500);

    });

}
