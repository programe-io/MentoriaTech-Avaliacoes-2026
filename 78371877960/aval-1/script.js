
/* =====================================
   BLOG GAMER DO JOARBI
   JavaScript - Interatividade
===================================== */

// NOME DO PROPRIETÁRIO
const nomeDono = "Joarbi";

console.log("Bem-vindo ao Blog Gamer do " + nomeDono + "!");

// MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", function () {
    alert("🎮 Bem-vindo ao Blog Gamer do Joarbi! Divirta-se!");
});

// BOTÃO DE MENSAGEM
function boasVindas() {
    alert("Olá! Você está visitando o Blog Gamer do Joarbi! 🎮");
}

// PESQUISAR JOGOS
function pesquisarJogos() {
    const pesquisa = document
        .getElementById("pesquisa")
        .value.toLowerCase();

    const cards = document.querySelectorAll(".card");

    cards.forEach(function (card) {
        const nome = card.querySelector("h3").textContent.toLowerCase();

        if (nome.includes(pesquisa)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// CURTIR JOGOS
function curtirJogo(botao) {
    if (botao.classList.contains("curtido")) {
        botao.classList.remove("curtido");
        botao.textContent = "🤍 Curtir";
    } else {
        botao.classList.add("curtido");
        botao.textContent = "❤️ Curtido!";
    }
}

// ADICIONAR NOVO JOGO
function adicionarJogo() {
    const nome = document.getElementById("nomeJogo").value;
    const descricao = document.getElementById("descricaoJogo").value;

    if (nome.trim() === "" || descricao.trim() === "") {
        alert("Preencha o nome e a descrição do jogo!");
        return;
    }

    const lista = document.querySelector(".jogos");

    const novoCard = document.createElement("div");
    novoCard.className = "card";

    const conteudo = document.createElement("div");
    conteudo.className = "card-content";

    const titulo = document.createElement("h3");
    titulo.textContent = nome;

    const texto = document.createElement("p");
    texto.textContent = descricao;

    const botao = document.createElement("button");
    botao.textContent = "🤍 Curtir";
    botao.onclick = function () {
        curtirJogo(botao);
    };

    conteudo.appendChild(titulo);
    conteudo.appendChild(texto);
    conteudo.appendChild(botao);

    novoCard.appendChild(conteudo);
    lista.appendChild(novoCard);

    document.getElementById("nomeJogo").value = "";
    document.getElementById("descricaoJogo").value = "";

    alert("🎮 Jogo adicionado ao Blog do Joarbi!");
}

// ATUALIZAR ANO AUTOMATICAMENTE
const rodape = document.querySelector("footer");

if (rodape) {
    rodape.innerHTML = `
        <p>© ${new Date().getFullYear()} - Blog Gamer do Joarbi</p>
        <p>Desenvolvido com ❤️ e 🎮</p>
    `;
}
