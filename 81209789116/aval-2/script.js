// Aguarda o carregamento da página
window.onload = function () {

    const botoes = document.querySelectorAll("button");

    // Percorre todos os botões
    for (let i = 0; i < botoes.length; i++) {

        botoes[i].onclick = function () {

            // Obtém o nome do produto
            let nome = this.parentElement.querySelector("h3").textContent;

            // Pergunta se deseja comprar
            let confirmar = confirm("Deseja comprar o produto: " + nome + "?");

            if (confirmar) {
                alert("Compra realizada com sucesso!");

                this.textContent = "Comprado";
                this.style.backgroundColor = "#2ecc71";
                this.disabled = true;
            } else {
                alert("Compra cancelada.");
            }
        };
    }

    console.log("Prime Calçados carregada com sucesso!");

};