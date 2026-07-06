function boasVindas() {
    alert("🎬 Bem-vindo ao CineMax!\nDesejamos um ótimo filme!");
}

function comprar(filme) {
    alert("Você escolheu o filme: " + filme);
}

const formulario = document.querySelector("form");

formulario.addEventListener("submit", function(event){
    event.preventDefault();

    alert("Mensagem enviada com sucesso!");

    formulario.reset();
});