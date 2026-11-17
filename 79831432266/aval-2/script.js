
// SISTEMA DE CURTIDAS

document.querySelectorAll(".curtir").forEach(botao => {
    botao.addEventListener("click", function() {
        let numero = this.querySelector("span");
        let quantidade = Number(numero.textContent);

        if (this.classList.contains("ativo")) {
            quantidade--;
            this.classList.remove("ativo");
        } else {
            quantidade++;
            this.classList.add("ativo");
        }

        numero.textContent = quantidade;
    });
});

// SISTEMA DE COMENTÁRIOS

document.querySelectorAll(".comentar").forEach(botao => {
    botao.addEventListener("click", function() {
        let area = this.parentElement.querySelector(".comentarios");

        if (area.querySelector("input")) {
            area.querySelector("input").focus();
            return;
        }

        let campo = document.createElement("input");
        campo.placeholder = "Escreva seu comentário...";

        let enviar = document.createElement("button");
        enviar.textContent = "Enviar";

        enviar.onclick = function() {
            let texto = campo.value.trim();

            if (texto === "") {
                alert("Digite um comentário!");
                return;
            }

            let comentario = document.createElement("p");
            comentario.textContent = "👤 Você: " + texto;

            area.appendChild(comentario);
            campo.remove();
            enviar.remove();
        };

        area.appendChild(campo);
        area.appendChild(enviar);
    });
});

// FRASES ALEATÓRIAS

const frases = [
    "😂 Minha cama é meu lugar favorito!",
    "❤️ Espalhe amor por onde passar!",
    "✨ Acredite em você e nos seus sonhos!",
    "🤣 Meu dinheiro não desaparece, ele tira férias!",
    "🌻 Seja feliz do seu jeito!",
    "😎 Quem acredita sempre alcança!",
    "😂 Hoje eu ia fazer tudo, mas fiquei com preguiça!"
];

document.getElementById("novaFrase").addEventListener("click", function() {
    const sorteio = Math.floor(Math.random() * frases.length);

    document.getElementById("fraseAleatoria").textContent =
        frases[sorteio];
});

// PESQUISA DE CONTEÚDO

document.getElementById("pesquisa").addEventListener("input", function() {
    const texto = this.value.toLowerCase();

    document.querySelectorAll(".post, .frase, .musica").forEach(item => {
        const conteudo = (
            item.textContent + " " +
            (item.dataset.search || "")
        ).toLowerCase();

        item.style.display = conteudo.includes(texto) ? "block" : "none";
    });
});
