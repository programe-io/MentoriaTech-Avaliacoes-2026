
/* ANO AUTOMÁTICO NO RODAPÉ */

const elementoAno = document.getElementById("ano");

if (elementoAno) {
    elementoAno.textContent = new Date().getFullYear();
}


/* FORMULÁRIO DE CONTATO */

const formulario = document.getElementById("formContato");

if (formulario) {
    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();

        if (!nome || !email || !mensagem) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        alert(
            "Obrigado, " + nome + "!\n\n" +
            "Os campos foram preenchidos corretamente.\n" +
            "Para receber a mensagem de verdade, " +
            "é necessário conectar o formulário a um servidor."
        );

        formulario.reset();
    });
}


/* NAVEGAÇÃO SUAVE */

document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener("click", function(event) {
        const seletor = this.getAttribute("href");
        const destino = document.querySelector(seletor);

        if (destino) {
            event.preventDefault();

            destino.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


/* MENSAGEM NO CONSOLE */

console.log("MeuSite carregado com sucesso!");