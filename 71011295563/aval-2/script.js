const texto =
"Estudante de Desenvolvimento de Sistemas • Apaixonada por Tecnologia e Astronomia";

let i = 0;

function escreverTexto() {
    if(i < texto.length){
        document.getElementById("textoDigitando").innerHTML += texto.charAt(i);
        i++;
        setTimeout(escreverTexto, 50);
    }
}

escreverTexto();

function mostrarMensagem(){
    alert(
        "Olá! Sou Valina Rosendo. Obrigada por visitar meu portfólio!"
    );
}

function mudarCor(){
    document.body.classList.toggle("tema-claro");
}

function mostrarData(){
    const data = new Date();

    document.getElementById("resultado").innerHTML =
    "Data e hora atual: " + data.toLocaleString("pt-BR");
}

window.addEventListener("scroll", () => {

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        const posicao = card.getBoundingClientRect().top;

        if(posicao < window.innerHeight - 100){
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }

    });

});

document.querySelectorAll(".card").forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition = "0.8s";
});