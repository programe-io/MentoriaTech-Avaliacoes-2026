let pontos = 0;
let xp = 10920;


// TROCAR PÁGINA

function abrirPagina(nome) {

    document.querySelectorAll(".pagina")
        .forEach(pagina => {
            pagina.classList.remove("ativa");
        });

    document.getElementById(nome)
        .classList.add("ativa");


    document.querySelectorAll(".menu")
        .forEach(menu => {
            menu.classList.remove("ativo");
        });


    const menus = document.querySelectorAll(".menu");

    const paginas = [
        "inicio",
        "jogos",
        "amigos",
        "mensagens",
        "ranking",
        "perfil"
    ];

    const indice = paginas.indexOf(nome);

    if (menus[indice]) {
        menus[indice].classList.add("ativo");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ABRIR JOGO

function abrirJogo() {

    document.getElementById("modalJogo")
        .classList.add("aberto");

    pontos = 0;

    document.getElementById("pontos")
        .textContent = pontos;
}


// FECHAR JOGO

function fecharJogo() {

    document.getElementById("modalJogo")
        .classList.remove("aberto");
}


// JOGAR

function pontuar() {

    pontos += 100;

    document.getElementById("pontos")
        .textContent = pontos;


    const mensagens = [
        "🔥 Muito bom!",
        "🚀 Continue!",
        "⭐ Excelente!",
        "💜 Você está voando!",
        "🏆 Mais pontos!"
    ];


    const aleatorio =
        Math.floor(
            Math.random() * mensagens.length
        );


    document.getElementById("mensagemJogo")
        .textContent = mensagens[aleatorio];


    xp += 100;

    document.getElementById("xpPerfil")
        .textContent = xp.toLocaleString("pt-BR");

    document.getElementById("xpAna")
        .textContent =
        xp.toLocaleString("pt-BR") + " XP";
}


// GANHAR XP

function ganharXP() {

    xp += 50;

    document.getElementById("xpPerfil")
        .textContent =
        xp.toLocaleString("pt-BR");

    document.getElementById("xpAna")
        .textContent =
        xp.toLocaleString("pt-BR") + " XP";

    alert("🎉 Você ganhou 50 XP!");
}


// ENVIAR MENSAGEM

function enviarMensagem() {

    const input =
        document.getElementById("mensagemInput");

    const texto = input.value.trim();

    if (texto === "") {
        return;
    }


    const mensagem =
        document.createElement("div");

    mensagem.className = "msg enviada";

    mensagem.textContent = texto;


    document.querySelector(".mensagens")
        .appendChild(mensagem);


    input.value = "";

    const mensagens =
        document.querySelector(".mensagens");

    mensagens.scrollTop =
        mensagens.scrollHeight;
}