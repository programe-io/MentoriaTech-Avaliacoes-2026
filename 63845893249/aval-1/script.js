
const imagensLula = [
    {
        url: "https://commons.wikimedia.org/wiki/Special:FilePath/Lula%20-%20foto%20oficial%202023%20%28cropped%29.jpg",
        descricao: "Luiz Inácio Lula da Silva"
    }
];

const galeria = document.getElementById("galeria");
const botao = document.getElementById("mostrar");

botao.addEventListener("click", () => {
    galeria.innerHTML = "";

    imagensLula.forEach((imagem) => {
        const foto = document.createElement("img");

        foto.src = imagem.url;
        foto.alt = imagem.descricao;
        foto.style.width = "300px";
        foto.style.borderRadius = "12px";

        const titulo = document.createElement("h3");
        titulo.textContent = imagem.descricao;

        galeria.appendChild(foto);
        galeria.appendChild(titulo);
    });
});
