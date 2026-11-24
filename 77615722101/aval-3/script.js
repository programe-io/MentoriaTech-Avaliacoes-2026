<header>
    <h1>Mini Cópia do Insta 📸</h1>
</header>
function curtir(botao) {

    const acoes = botao.parentElement;
    const contador = acoes.querySelector(".curtidas");
    const botoes = acoes.querySelectorAll("button");

    let quantidade = Number(
        contador.dataset.quantidade || 0
    );

    if (botao.innerHTML === "❤️") {

        botao.innerHTML = "🤍";
        quantidade--;

    } else {

        botao.innerHTML = "❤️";
        quantidade++;

        botoes[1].innerHTML = "👎";
    }

    contador.dataset.quantidade = quantidade;
    contador.innerHTML = quantidade + " curtidas";
}


function descurtir(botao) {

    const acoes = botao.parentElement;
    const contador = acoes.querySelector(".curtidas");
    const botoes = acoes.querySelectorAll("button");

    let quantidade = Number(
        contador.dataset.quantidade || 0
    );

    if (botoes[0].innerHTML === "❤️") {

        botoes[0].innerHTML = "🤍";
        quantidade--;

    }

    contador.dataset.quantidade = quantidade;
    contador.innerHTML = quantidade + " curtidas";
}
