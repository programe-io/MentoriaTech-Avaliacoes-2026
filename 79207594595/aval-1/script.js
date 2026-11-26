let slides = [
    ["Slide 1", "Bem-vindo à apresentação!"],
    ["Slide 2", "Este é o segundo slide."],
    ["Slide 3", "Este é o terceiro slide."],
    ["Slide 4", "Obrigado pela atenção!"]
];

let numero = 0;

function mostrar() {
    document.getElementById("titulo").innerText = slides[numero][0];
    document.getElementById("texto").innerText = slides[numero][1];
}

function avancar() {
    if (numero < slides.length - 1) {
        numero++;
        mostrar();
    }
}

function voltar() {
    if (numero > 0) {
        numero--;
        mostrar();
    }
}