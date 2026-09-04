// MENU MOBILE

function toggleMenu() {
    const nav = document.querySelector("nav");
    nav.classList.toggle("active");
}


// BOTÃO JOGAR

function startGame() {

    const message = document.createElement("div");

    message.innerHTML = `
        <div class="game-message">
            <h2>🔥 BATALHA INICIADA!</h2>
            <p>Prepare-se para entrar na arena.</p>
            <button onclick="this.parentElement.parentElement.remove()">
                FECHAR
            </button>
        </div>
    `;

    document.body.appendChild(message);
}


// SAIBA MAIS

function showInfo() {

    alert(
        "FREE FIRE\n\n" +
        "Entre na arena, escolha seu personagem, " +
        "encontre equipamentos e lute pela vitória!"
    );
}


// ESCOLHER PERSONAGEM

function selectCharacter(character) {

    alert(
        "🔥 Personagem selecionado!\n\n" +
        "Você escolheu: " + character
    );
}


// CRIAR PARTÍCULAS

const particleContainer = document.querySelector(".particles");

for (let i = 0; i < 60; i++) {

    const particle = document.createElement("span");

    particle.classList.add("particle");

    particle.style.left = Math.random() * 100 + "%";

    particle.style.animationDuration =
        (Math.random() * 5 + 3) + "s";

    particle.style.animationDelay =
        Math.random() * 5 + "s";

    particle.style.opacity =
        Math.random();

    particleContainer.appendChild(particle);
}


// ESTILO DA JANELA DE MENSAGEM

const style = document.createElement("style");

style.innerHTML = `

.game-message {
    position: fixed;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    width: min(90%, 450px);

    padding: 40px;

    text-align: center;

    background: #111;
    border: 2px solid #ff6500;

    box-shadow: 0 0 50px rgba(255, 80, 0, .5);

    z-index: 9999;
}

.game-message h2 {
    color: #ff6500;
    margin-bottom: 15px;
}

.game-message p {
    color: #bbb;
    margin-bottom: 25px;
}

.game-message button {
    padding: 12px 25px;
    background: #ff6500;
    color: white;
    border: none;
}

`;

document.head.appendChild(style);