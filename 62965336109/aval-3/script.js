// QUANDO A PÁGINA CARREGAR
document.addEventListener("DOMContentLoaded", function () {

    // MENSAGEM DE BOAS-VINDAS
    console.log("Site carregado com sucesso!");

    // SELECIONANDO ELEMENTOS
    const botao = document.getElementById("meuBotao");
    const texto = document.getElementById("texto");
    const contadorElemento = document.getElementById("contador");
    const relogio = document.getElementById("relogio");

    let contador = 0;

    // FUNÇÃO DO BOTÃO
    botao.addEventListener("click", function () {
        contador++;
        contadorElemento.textContent = "Cliques: " + contador;

        if (contador === 5) {
            alert("Você clicou 5 vezes!");
        }
    });

    // MUDAR TEXTO AO PASSAR O MOUSE
    texto.addEventListener("mouseover", function () {
        texto.textContent = "Você passou o mouse!";
    });

    texto.addEventListener("mouseout", function () {
        texto.textContent = "Passe o mouse aqui!";
    });

    // RELÓGIO EM TEMPO REAL
    function atualizarRelogio() {
        const agora = new Date();
        const horas = agora.getHours().toString().padStart(2, "0");
        const minutos = agora.getMinutes().toString().padStart(2, "0");
        const segundos = agora.getSeconds().toString().padStart(2, "0");

        relogio.textContent = `${horas}:${minutos}:${segundos}`;
    }

    setInterval(atualizarRelogio, 1000);

});