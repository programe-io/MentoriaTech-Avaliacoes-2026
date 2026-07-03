window.onload = function(){

    alert("Bem-vindo ao projeto Meio Ambiente e Sustentabilidade!");

}

function mostrarMensagem(){

    alert(
        "Pequenas atitudes como reciclar, economizar água e plantar árvores ajudam a preservar o planeta."
    );

}

const footer = document.querySelector("footer");

const hoje = new Date();

footer.innerHTML +=
"<br><br>Data de acesso: " +
hoje.toLocaleDateString("pt-BR");