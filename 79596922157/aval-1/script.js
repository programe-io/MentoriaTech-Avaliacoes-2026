// Mensagem de boas-vindas
window.addEventListener("load", () => {
    console.log("Bem-vindo ao blog de produtividade para estudantes!");
});

// Barra de progresso da leitura
const progressBar = document.createElement("div");
progressBar.style.position = "fixed";
progressBar.style.top = "0";
progressBar.style.left = "0";
progressBar.style.height = "5px";
progressBar.style.backgroundColor = "#3498db";
progressBar.style.width = "0%";
progressBar.style.zIndex = "1000";

document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = progress + "%";
});

// Botão voltar ao topo
const topButton = document.createElement("button");
topButton.innerText = "↑";
topButton.id = "topButton";

topButton.style.position = "fixed";
topButton.style.bottom = "20px";
topButton.style.right = "20px";
topButton.style.padding = "12px 16px";
topButton.style.fontSize = "20px";
topButton.style.border = "none";
topButton.style.borderRadius = "50%";
topButton.style.cursor = "pointer";
topButton.style.display = "none";
topButton.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
topButton.style.zIndex = "1000";

document.body.appendChild(topButton);

// Mostrar ou esconder o botão
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
});

// Voltar ao topo suavemente
topButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Interação com as dicas
const tips = document.querySelectorAll(".tip");

tips.forEach(tip => {
    tip.addEventListener("click", () => {
        tip.style.transform = "scale(1.03)";
        tip.style.transition = "0.3s";

        setTimeout(() => {
            tip.style.transform = "scale(1)";
        }, 300);
    });
});