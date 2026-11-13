
/* =====================================
   BLOG DE MAQUIAGEM DA MAYSA
   JAVASCRIPT - INTERATIVIDADE
===================================== */

// NOME DA DONA DO BLOG

const nomeDona = "Maysa";

console.log("Bem-vinda ao Blog de Maquiagem da " + nomeDona + "!");


// MENSAGEM DE BOAS-VINDAS

window.addEventListener("load", function() {

    alert("💄 Bem-vinda ao Blog de Maquiagem da Maysa! 🌸");

});


// FUNÇÃO DE BOAS-VINDAS

function boasVindas() {

    alert("Olá! Você está no Blog de Maquiagem da Maysa! 💗");

}


// PESQUISAR MAQUIAGENS

function pesquisarMaquiagem() {

    const pesquisa = document
        .getElementById("pesquisa")
        .value.toLowerCase();

    const cards = document.querySelectorAll(".card");

    cards.forEach(function(card) {

        const nome = card
            .querySelector("h3")
            .textContent.toLowerCase();

        if (nome.includes(pesquisa)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


// CURTIR MAQUIAGENS

function curtirMaquiagem(botao) {

    if (botao.classList.contains("curtido")) {

        botao.classList.remove("curtido");

        botao.textContent = "🤍 Curtir";

    } else {

        botao.classList.add("curtido");

        botao.textContent = "💗 Curtido!";

    }

}


// ADICIONAR NOVA MAQUIAGEM

function adicionarMaquiagem() {

    const nome = document.getElementById("nomeMaquiagem").value;

    const descricao = document.getElementById("descricaoMaquiagem").value;

    if (nome.trim() === "" || descricao.trim() === "") {

        alert("Por favor, preencha o nome e a descrição!");

        return;

    }

    const lista = document.querySelector(".maquiagens");

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

    botao.onclick = function() {

        curtirMaquiagem(botao);

    };

    conteudo.appendChild(titulo);

    conteudo.appendChild(texto);

    conteudo.appendChild(botao);

    novoCard.appendChild(conteudo);

    lista.appendChild(novoCard);

    document.getElementById("nomeMaquiagem").value = "";

    document.getElementById("descricaoMaquiagem").value = "";

    alert("🌸 Nova maquiagem adicionada ao blog da Maysa!");

}


// ATUALIZAR ANO DO RODAPÉ

const rodape = document.querySelector("footer");

if (rodape) {

    rodape.innerHTML = `
        <p>© ${new Date().getFullYear()} - Blog de Maquiagem da Maysa</p>
        <p>Feito com 💗, beleza e criatividade!</p>
    `;

}
