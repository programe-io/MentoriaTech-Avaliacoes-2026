
function revelar() {
    const campoNome = document.getElementById("nome");
    const surpresa = document.getElementById("surpresa");
    const titulo = document.getElementById("titulo");
    const musica = document.getElementById("musica");

    const nome = campoNome.value.trim();

    if (nome === "") {
        alert(" Eric Artur ❤️");
        return;
    }

    titulo.innerText = `Essa poesia é para você, ${nome} ❤️`;

    surpresa.style.display = "block";

    surpresa.innerHTML = `
        <h2>Para ${nome} 💗</h2>

        <p>
            Entre tantas pessoas nesse mundo,
            meu coração encontrou um motivo
            para sorrir.
            <br><br>

            Se cada estrela fosse uma palavra,
            ainda faltariam palavras para
            descrever o quanto você é especial.
            <br><br>

            Você é como uma poesia acústica:
            mistura de sentimentos,
            versos e melodias que não saem
            da minha cabeça.
            <br><br>

            E se eu pudesse escolher
            uma música para tocar eternamente,
            escolheria aquela que me lembra você.
        </p>

        <div class="heart">❤️</div>
    `;

    if (musica) {
        musica.play().catch(() => {
            alert("Clique no botão de música para começar a ouvir ❤️");
        });
    }

    criarCoracoes();
}

function criarCoracoes() {
    for (let i = 0; i < 15; i++) {
        const coracao = document.createElement("div");

        coracao.innerHTML = "❤️";
        coracao.style.position = "fixed";
        coracao.style.left = Math.random() * 100 + "vw";
        coracao.style.bottom = "-30px";
        coracao.style.fontSize = "20px";
        coracao.style.pointerEvents = "none";
        coracao.style.zIndex = "999";

        document.body.appendChild(coracao);

        coracao.animate(
            [
                { transform: "translateY(0)", opacity: 1 },
                { transform: "translateY(-100vh)", opacity: 0 }
            ],
            {
                duration: 4000 + Math.random() * 3000,
                easing: "ease-out"
            }
        );

        setTimeout(() => coracao.remove(), 7500);
    }
}
