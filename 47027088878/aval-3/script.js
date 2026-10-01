const cidade = document.getElementById("cidade");
const buscar = document.getElementById("buscar");

const nomeCidade = document.getElementById("nomeCidade");
const temperatura = document.getElementById("temperatura");
const condicao = document.getElementById("condicao");
const umidade = document.getElementById("umidade");
const vento = document.getElementById("vento");
const icone = document.getElementById("icone");


buscar.addEventListener("click", () => {

    if (cidade.value.trim() === "") {

        alert("Digite uma cidade!");

        return;
    }


    nomeCidade.textContent = cidade.value;

    const temperaturaAleatoria =
        Math.floor(Math.random() * 16) + 20;

    const umidadeAleatoria =
        Math.floor(Math.random() * 40) + 50;

    const ventoAleatorio =
        Math.floor(Math.random() * 20) + 5;


    temperatura.textContent = temperaturaAleatoria;

    umidade.textContent =
        umidadeAleatoria + "%";

    vento.textContent =
        ventoAleatorio + " km/h";


    const condicoes = [
        ["☀️", "Ensolarado"],
        ["🌤️", "Parcialmente nublado"],
        ["☁️", "Nublado"],
        ["🌧️", "Chuvoso"]
    ];


    const clima =
        condicoes[
            Math.floor(Math.random() * condicoes.length)
        ];


    icone.textContent = clima[0];

    condicao.textContent = clima[1];

});