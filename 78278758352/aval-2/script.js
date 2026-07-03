// Mensagem de boas-vindas
window.onload = function(){

    alert("Bem-vindo ao projeto Introdução à Web e Internet!");

};

// Botão "Saiba Mais"
function mostrarMensagem(){

    alert(
        "A Web utiliza HTML para estruturar a página, CSS para definir o visual e JavaScript para adicionar interatividade."
    );

}

// Mostrar data e hora no rodapé
const footer = document.querySelector("footer");

const data = new Date();

footer.innerHTML +=
"<br><br>Data de acesso: " +
data.toLocaleDateString("pt-BR") +
" - " +
data.toLocaleTimeString("pt-BR");