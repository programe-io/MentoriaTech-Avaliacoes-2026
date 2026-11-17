
// FUNÇÃO CURTIR

function curtir(botao) {

    const icone = botao.querySelector("i");

    const post = botao.closest(".post");

    const curtidas = post.querySelector(".post-info strong");

    let numero = Number(
        curtidas.textContent.replace(/\D/g, "")
    );

    if (botao.classList.contains("curtido")) {

        botao.classList.remove("curtido");

        icone.classList.remove("fas");
        icone.classList.add("far");

        numero--;

    } else {

        botao.classList.add("curtido");

        icone.classList.remove("far");
        icone.classList.add("fas");

        numero++;
    }

    curtidas.textContent = numero.toLocaleString("pt-BR") + " curtidas";
}


// FUNÇÃO SEGUIR

let seguindo = false;

function seguir() {

    const botao = document.querySelector(
        ".botoes-perfil button:first-child"
    );

    if (!seguindo) {

        botao.textContent = "Seguindo";
        botao.style.background = "#efefef";
        botao.style.color = "#262626";

        seguindo = true;

    } else {

        botao.textContent = "Seguir";
        botao.style.background = "#0095f6";
        botao.style.color = "white";

        seguindo = false;
    }
}


// TROCAR ABAS

function mostrarAba(aba, botao) {

    document.getElementById("posts").hidden =
        aba !== "posts";

    document.getElementById("marcados").hidden =
        aba !== "marcados";

    document.querySelectorAll(".aba").forEach(item => {
        item.classList.remove("ativa");
    });

    botao.classList.add("ativa");
}
