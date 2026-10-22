
document.body.style.fontFamily = "Arial, sans-serif";
document.body.style.backgroundColor = "#f0f0f0";
document.body.style.color = "#333";
document.body.style.margin = "0";
document.body.style.padding = "20px";

const titulo = document.createElement("h1");
titulo.textContent = "Bem-vindo à minha página!";
titulo.style.color = "#007bff";
titulo.style.textAlign = "center";
titulo.style.fontSize = "32px";

document.body.appendChild(titulo);

const paragrafo1 = document.createElement("p");
paragrafo1.textContent =
    "Este é um exemplo de página criada com JavaScript.";
paragrafo1.style.fontSize = "18px";
paragrafo1.style.lineHeight = "1.6";

document.body.appendChild(paragrafo1);

const paragrafo2 = document.createElement("p");
paragrafo2.textContent =
    "O título está centralizado e na cor azul.";
paragrafo2.style.fontSize = "18px";
paragrafo2.style.lineHeight = "1.6";

document.body.appendChild(paragrafo2);
