
// RELÓGIO DIGITAL

function atualizarRelogio() {
    const agora = new Date();

    const hora = agora.toLocaleTimeString("pt-BR");

    document.getElementById("relogio").textContent = hora;
}

setInterval(atualizarRelogio, 1000);

atualizarRelogio();


// ALTERAR TEMA

const botaoTema = document.getElementById("tema");

botaoTema.addEventListener("click", function() {

    document.body.classList.toggle("claro");

    if (document.body.classList.contains("claro")) {
        botaoTema.textContent = "☀️ Tema claro";
    } else {
        botaoTema.textContent = "🌙 Tema escuro";
    }

});


// MENSAGEM DA MÚSICA

const botaoMusica = document.getElementById("mensagemMusica");

botaoMusica.addEventListener("click", function() {

    document.getElementById("resultado").textContent =
        "♫ Essa música faz parte da minha história! ♡";

});


// SALVAR PENSAMENTOS

const botaoSalvar = document.getElementById("salvar");

botaoSalvar.addEventListener("click", function() {

    const texto = document.getElementById("textoDiario");

    const pensamento = texto.value.trim();

    if (pensamento === "") {
        document.getElementById("aviso").textContent =
            "Escreva alguma coisa antes de salvar! ♡";
        return;
    }

    const pensamentos = JSON.parse(
        localStorage.getItem("meuDiario") || "[]"
    );

    pensamentos.push(pensamento);

    localStorage.setItem(
        "meuDiario",
        JSON.stringify(pensamentos)
    );

    texto.value = "";

    document.getElementById("aviso").textContent =
        "Pensamento salvo com sucesso! ♡";

    mostrarPensamentos();

});


// MOSTRAR PENSAMENTOS SALVOS

function mostrarPensamentos() {

    const pensamentos = JSON.parse(
        localStorage.getItem("meuDiario") || "[]"
    );

    const area = document.getElementById("pensamentos");

    area.replaceChildren();

    pensamentos.forEach(function(item) {

        const paragrafo = document.createElement("p");

        paragrafo.textContent = "♡ " + item;

        area.appendChild(paragrafo);

    });

}

mostrarPensamentos();

console.log("Blog de Carlisson Emanuel iniciado! ♡");
