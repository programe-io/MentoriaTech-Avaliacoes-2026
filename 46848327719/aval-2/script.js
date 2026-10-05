// =============================
// BOTÃO CURTIR
// =============================

const botoesCurtir = document.querySelectorAll(".post-actions button:first-child");

botoesCurtir.forEach(function (botao) {
    botao.addEventListener("click", function () {

        if (botao.textContent.includes("❤️")) {
            botao.textContent = "💜 Curtido";
        } else {
            botao.textContent = "❤️ Curtir";
        }

    });
});


// =============================
// BOTÃO COMENTAR
// =============================

const botoesComentar = document.querySelectorAll(".post-actions button:nth-child(2)");

botoesComentar.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const comentario = prompt("Digite seu comentário:");

        if (comentario !== null && comentario.trim() !== "") {
            alert("Comentário enviado! 🎮");
        }

    });

});


// =============================
// BOTÃO PUBLICAR
// =============================

const botaoPublicar = document.querySelector(".new-post button");

botaoPublicar.addEventListener("click", function () {

    alert("Sua publicação foi criada! 🎮🔥");

});


// =============================
// MENSAGEM NO CONSOLE
// =============================

console.log("GameZone carregado com sucesso! 🎮");
console.log("Jogador: Rodrigo");
console.log("Estilo de jogo: FPS");
console.log("Plataforma: PC");