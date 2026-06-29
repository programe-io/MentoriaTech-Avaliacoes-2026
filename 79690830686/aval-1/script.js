// ======================
// ESTILOS DO BLOG
// ======================

document.body.style.backgroundColor = "#f5f5f5";
document.body.style.color = "#333";
document.body.style.fontFamily = "Arial, Helvetica, sans-serif";

const header = document.querySelector("header");

if (header) {
    header.style.backgroundColor = "#0099cc";
    header.style.color = "#fff";
    header.style.padding = "20px";

    const titulo = header.querySelector("h1");
    if (titulo) {
        titulo.style.textAlign = "center";
    }
}

const nav = document.querySelector("nav");

if (nav) {
    nav.style.marginTop = "15px";
    nav.style.textAlign = "center";
}

document.querySelectorAll("nav a").forEach(link => {
    link.style.color = "#fff";
    link.style.textDecoration = "none";
    link.style.margin = "0 15px";
    link.style.fontWeight = "bold";
});

// ======================
// BOTÃO VOLTAR AO TOPO
// ======================

// Cria o botão
const botaoTopo = document.createElement("button");

botaoTopo.innerHTML = "⬆";
botaoTopo.title = "Voltar ao topo";

document.body.appendChild(botaoTopo);

// Estilos do botão
botaoTopo.style.position = "fixed";
botaoTopo.style.bottom = "30px";
botaoTopo.style.right = "30px";
botaoTopo.style.width = "55px";
botaoTopo.style.height = "55px";
botaoTopo.style.border = "none";
botaoTopo.style.borderRadius = "50%";
botaoTopo.style.background = "#0099cc";
botaoTopo.style.color = "#fff";
botaoTopo.style.fontSize = "22px";
botaoTopo.style.cursor = "pointer";
botaoTopo.style.boxShadow = "0 5px 15px rgba(0,0,0,.3)";
botaoTopo.style.display = "none";
botaoTopo.style.transition = "0.3s";

// Mostrar o botão quando rolar a página
window.addEventListener("scroll", () => {

    if (window.scrollY > 250) {
        botaoTopo.style.display = "block";
    } else {
        botaoTopo.style.display = "none";
    }

});

// Voltar ao topo suavemente
botaoTopo.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// Efeito ao passar o mouse
botaoTopo.addEventListener("mouseenter", () => {
    botaoTopo.style.background = "#007399";
    botaoTopo.style.transform = "scale(1.1)";
});

botaoTopo.addEventListener("mouseleave", () => {
    botaoTopo.style.background = "#0099cc";
    botaoTopo.style.transform = "scale(1)";
});