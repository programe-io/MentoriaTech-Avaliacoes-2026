
document.body.style.fontFamily = "Arial, sans-serif";
document.body.style.backgroundColor = "#f0f0f0";
document.body.style.color = "#333";
document.body.style.margin = "0";
document.body.style.padding = "20px";

const titulo = document.querySelector("h1");

if (titulo) {
    titulo.style.color = "#007bff";
    titulo.style.textAlign = "center";
    titulo.style.fontSize = "32px";
}

const paragrafos = document.querySelectorAll("p");

paragrafos.forEach((paragrafo) => {
    paragrafo.style.fontSize = "18px";
    paragrafo.style.lineHeight = "1.6";
});
