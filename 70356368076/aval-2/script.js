// MUNDO DOS ANIMAIS 🐾

// 1. SISTEMA DE PESQUISA
function pesquisarAnimal() {
    let input = document.getElementById("pesquisa");
    let filtro = input.value.toLowerCase();

    let animais = document.querySelectorAll(".card");

    animais.forEach(function(card) {
        let nome = card.querySelector("h3").textContent.toLowerCase();

        if (nome.includes(filtro)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// 2. CURIOSIDADES
const curiosidades = [
    "🐘 Elefantes conseguem reconhecer outros elefantes.",
    "🦁 Os leões vivem em grupos chamados alcateias.",
    "🐬 Golfinhos usam sons para se comunicar.",
    "🦒 As girafas têm línguas que podem chegar a 50 cm.",
    "🐅 As listras de cada tigre são únicas.",
    "🦜 Algumas araras podem viver por muitas décadas."
];

function mostrarCuriosidade() {
    let numero = Math.floor(Math.random() * curiosidades.length);

    alert(curiosidades[numero]);
}

// 3. SISTEMA DE CURTIDAS
document.querySelectorAll(".card").forEach(function(card) {
    let botao = document.createElement("button");

    botao.textContent = "❤️ Curtir";
    botao.style.cssText = `
        background: #16834a;
        color: white;
        border: none;
        padding: 10px 20px;
        margin: 0 15px 15px;
        border-radius: 8px;
        cursor: pointer;
    `;

    botao.addEventListener("click", function() {
        if (botao.textContent === "❤️ Curtir") {
            botao.textContent = "💚 Curtido!";
        } else {
            botao.textContent = "❤️ Curtir";
        }
    });

    card.appendChild(botao);
});

// 4. MENSAGEM DE BOAS-VINDAS
console.log("🌎 Bem-vindo ao Mundo dos Animais!");