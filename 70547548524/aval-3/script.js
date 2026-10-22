
document.body.innerHTML = `
    <h1>Bem-vindo à minha página!</h1>

    <p>Este é um exemplo de página criada com JavaScript.</p>

    <p>O título está centralizado e na cor azul.</p>
`;

document.body.style.fontFamily = "Arial, sans-serif";
document.body.style.backgroundColor = "#f0f0f0";
document.body.style.color = "#333";
document.body.style.margin = "0";
document.body.style.padding = "20px";

const titulo = document.querySelector("h1");

titulo.style.color = "#007bff";
titulo.style.textAlign = "center";
titulo.style.fontSize = "32px";

const paragrafos = document.querySelectorAll("p");

paragrafos.forEach((paragrafo) => {
    paragrafo.style.fontSize = "18px";
    paragrafo.style.lineHeight = "1.6";
});
