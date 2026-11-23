
// Sistema de seguir
const seguir = document.getElementById("seguir");

seguir.addEventListener("click", function() {

    let seguidores = document.getElementById("seguidores");

    let total = Number(seguidores.textContent);

    if (this.textContent === "Seguir") {

        total++;
        this.textContent = "Seguindo";

    } else {

        total--;
        this.textContent = "Seguir";

    }

    seguidores.textContent = total;

});


// Sistema de curtidas
document.querySelectorAll(".curtir").forEach(botao => {

    botao.addEventListener("click", function() {

        let numero = this.querySelector("span");

        let total = Number(numero.textContent);

        if (this.classList.contains("curtido")) {

            total--;
            this.classList.remove("curtido");
            this.style.background = "#fce4e4";

        } else {

            total++;
            this.classList.add("curtido");
            this.style.background = "#ffb3b3";

        }

        numero.textContent = total;

    });

});


// Adicionar publicação
function adicionarPost() {

    const descricao = prompt(
        "Digite a legenda da publicação:"
    );

    if (!descricao || !descricao.trim()) {
        return;
    }

    const galeria = document.getElementById("galeria");

    const novoPost = document.createElement("article");

    novoPost.className = "publicacao";

    novoPost.innerHTML = `
        <img src="https://placehold.co/600x400/e67e22/fff?text=Nova+Comida"
        alt="Nova publicação">

        <div class="legenda">
            <h3>🍽️ Nova publicação</h3>
            <p></p>
            <button class="curtir">
                ❤️ <span>0</span>
            </button>
        </div>
    `;

    novoPost.querySelector(".legenda p").textContent = descricao;

    const botaoCurtir = novoPost.querySelector(".curtir");

    botaoCurtir.addEventListener("click", function() {

        const numero = this.querySelector("span");
        const total = Number(numero.textContent);

        const curtido = this.classList.toggle("curtido");

        numero.textContent = total + (curtido ? 1 : -1);

        this.style.background = curtido ? "#ffb3b3" : "#fce4e4";

    });

    galeria.prepend(novoPost);

    document.getElementById("posts").textContent =
        galeria.querySelectorAll(".publicacao").length;

}
