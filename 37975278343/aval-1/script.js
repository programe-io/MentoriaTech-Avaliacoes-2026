// Botão de compra
const botao = document.getElementById("comprar");

botao.addEventListener("click", () => {
    alert("Obrigado pelo interesse! Em breve você será redirecionado para a compra.");
});

// Efeito 3D acompanhando o mouse
const imagem = document.querySelector(".imagem img");

document.addEventListener("mousemove", (e) => {

    const x = (window.innerWidth / 2 - e.clientX) / 35;
    const y = (window.innerHeight / 2 - e.clientY) / 35;

    imagem.style.transform = `
        rotateY(${x}deg)
        rotateX(${-y}deg)
        scale(1.05)
    `;
});

// Retorna ao estado normal
document.addEventListener("mouseleave", () => {

    imagem.style.transform = `
        rotateY(0deg)
        rotateX(0deg)
        scale(1)
    `;

});