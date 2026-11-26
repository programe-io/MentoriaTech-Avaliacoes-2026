
const projecao = document.getElementById("projecao");
const texto = document.getElementById("texto");
const arquivo = document.getElementById("arquivo");
const cor = document.getElementById("cor");
const tamanho = document.getElementById("tamanho");

function mostrarTexto() {
    if (!texto.value.trim()) {
        alert("Digite um texto primeiro!");
        return;
    }

    projecao.replaceChildren();

    const elemento = document.createElement("div");
    elemento.textContent = texto.value;
    elemento.style.fontSize = tamanho.value + "px";
    elemento.style.fontWeight = "bold";

    projecao.appendChild(elemento);
    aplicarFundo();
}

function mostrarImagem() {
    const imagemArquivo = arquivo.files[0];

    if (!imagemArquivo) {
        alert("Selecione uma imagem!");
        return;
    }

    if (window.imagemURL) {
        URL.revokeObjectURL(window.imagemURL);
    }

    window.imagemURL = URL.createObjectURL(imagemArquivo);

    const imagem = document.createElement("img");
    imagem.src = window.imagemURL;
    imagem.alt = "Imagem projetada";

    projecao.replaceChildren(imagem);
    aplicarFundo();
}

function aplicarFundo() {
    projecao.style.backgroundColor = cor.value;
}

function telaCheia() {
    if (!document.fullscreenElement) {
        projecao.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

function limparTela() {
    projecao.replaceChildren();

    const titulo = document.createElement("h1");
    titulo.textContent = "PROJETOR PRO";

    const subtitulo = document.createElement("p");
    subtitulo.textContent = "Sua apresentação começa aqui";

    projecao.append(titulo, subtitulo);
    projecao.style.backgroundColor = "#000000";
}

tamanho.addEventListener("input", () => {
    const elemento = projecao.querySelector("div");

    if (elemento) {
        elemento.style.fontSize = tamanho.value + "px";
    }
});

cor.addEventListener("input", aplicarFundo);
