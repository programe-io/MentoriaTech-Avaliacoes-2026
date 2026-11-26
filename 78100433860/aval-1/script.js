
const arquivo = document.getElementById("arquivo");
const tela = document.getElementById("tela");

arquivo.addEventListener("change", function() {

    const file = this.files[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    tela.innerHTML = "";

    if (file.type.startsWith("image/")) {

        const img = document.createElement("img");
        img.src = url;
        tela.appendChild(img);

    } else if (file.type.startsWith("video/")) {

        const video = document.createElement("video");
        video.src = url;
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        tela.appendChild(video);

    } else {
        alert("Arquivo não suportado!");
    }
});

function telaCheia() {
    tela.requestFullscreen();
}

function limpar() {
    tela.innerHTML = "<p>Sua imagem aparecerá aqui</p>";
    arquivo.value = "";
}
