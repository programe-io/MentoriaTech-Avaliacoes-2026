function mostrarMensagem() {

    alert(
        "Olá! Eu sou Janice Pereira da Rocha Trindade. " +
        "Tenho 16 anos, estudo no 2º ano do Ensino Médio, " +
        "faço Desenvolvimento de Sistemas e também estudo Inglês. " +
        "Meu grande objetivo é me tornar uma fisioterapeuta!"
    );

}


// Efeito no botão quando o usuário passa o mouse

const botao = document.querySelector("button");

botao.addEventListener("mouseenter", function () {

    botao.innerText = "Vamos conhecer! ✨";

});

botao.addEventListener("mouseleave", function () {

    botao.innerText = "Conheça minha história";

});