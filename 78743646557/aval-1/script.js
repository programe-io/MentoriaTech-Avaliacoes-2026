const imagem = document.getElementById("foto");
const botao = document.getElementById("trocarImagem");
const mensagem = document.getElementById("mensagem");

const imagens = [
    "https://picsum.photos/id/1015/700/400",
    "https://picsum.photos/id/1025/700/400",
    "https://picsum.photos/id/1035/700/400"
];

let indice = 0;

botao.addEventListener("click", () => {
    indice++;

    if (indice >= imagens.length) {
        indice = 0;
    }

    imagem.src = imagens[indice];
    mensagem.textContent = "Imagem alterada com sucesso!";
});