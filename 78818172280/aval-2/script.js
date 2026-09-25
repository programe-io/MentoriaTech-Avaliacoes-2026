<script>
    // =========================
    // FRASES DO SITE
    // =========================

    const frases = [
        "O universo é maior do que conseguimos imaginar.",
        "Cada estrela conta uma história através da luz.",
        "Explorar é descobrir novas possibilidades.",
        "O céu noturno é uma janela para o passado.",
        "Há sempre algo novo para aprender."
    ];

    let indice = 0;

    const texto = document.querySelector("p");

    function trocarFrase() {
        texto.style.opacity = "0";

        setTimeout(() => {
            texto.textContent = frases[indice];

            texto.style.opacity = "1";

            indice++;

            if (indice >= frases.length) {
                indice = 0;
            }
        }, 400);
    }

    // Troca a frase a cada 4 segundos
    setInterval(trocarFrase, 4000);


    // =========================
    // BOTÃO INTERATIVO
    // =========================

    const botao = document.querySelector(".botao");

    botao.addEventListener("click", function(event) {
        event.preventDefault();

        alert(
            "✨ Continue explorando! " +
            "O universo está cheio de coisas incríveis para descobrir."
        );
    });


    // =========================
    // EFEITO DE MOVIMENTO DO MOUSE
    // =========================

    const conteudo = document.querySelector(".conteudo");

    document.addEventListener("mousemove", (event) => {

        const x = (window.innerWidth / 2 - event.clientX) / 40;
        const y = (window.innerHeight / 2 - event.clientY) / 40;

        conteudo.style.transform =
            `perspective(1000px)
             rotateY(${x}deg)
             rotateX(${y}deg)`;
    });


    // Volta ao normal quando o mouse sai
    document.addEventListener("mouseleave", () => {
        conteudo.style.transform =
            "perspective(1000px) rotateY(0deg) rotateX(0deg)";
    });
</script