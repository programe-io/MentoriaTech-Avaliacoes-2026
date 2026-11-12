
// FUNÇÃO DE CURTIR E DESCURTIR
function curtir(botao) {

    if (botao.innerHTML === "♡ Curtir") {

        botao.innerHTML = "♥ Curtido!";
        botao.classList.add("like");

    } else {

        botao.innerHTML = "♡ Curtir";
        botao.classList.remove("like");

    }

}

// MENSAGEM NO CONSOLE
console.log("🌀 Mini Feed de Re:Zero carregado!");

console.log("Bem-vindo ao mundo de Subaru Natsuki!");
