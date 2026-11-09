// FUNÇÃO PARA CURTIR UMA PUBLICAÇÃO

function curtir(botao) {

    let numeroCurtidas = botao.querySelector("span");

    let curtidas = Number(numeroCurtidas.textContent);

    // Verifica se o post já foi curtido
    if (botao.classList.contains("curtido")) {

        curtidas--;
        botao.classList.remove("curtido");

        botao.style.color = "#666";

    } else {

        curtidas++;
        botao.classList.add("curtido");

        botao.style.color = "#e63946";
    }

    numeroCurtidas.textContent = curtidas;
}


// FUNÇÃO PARA CRIAR UMA NOVA PUBLICAÇÃO

function criarPost() {

    let texto = document.getElementById("textoPost").value;

    // Verifica se o campo está vazio
    if (texto.trim() === "") {

        alert("Escreva algo antes de publicar!");

        return;
    }


    // Cria o novo post
    let novoPost = document.createElement("article");

    novoPost.classList.add("post");


    // Conteúdo do novo post
    novoPost.innerHTML = `

        <div class="post-topo">

            <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
                alt="Foto do usuário"
            >

            <div>
                <h3>Seu Perfil</h3>
                <p>@conectado • agora mesmo</p>
            </div>

        </div>

        <p class="texto-post">
            ${texto}
        </p>

        <div class="acoes">

            <button class="botao-curtir" onclick="curtir(this)">
                ❤️ <span>0</span>
            </button>

            <button onclick="alert('Área de comentários em desenvolvimento!')">
                💬 Comentar
            </button>

            <button onclick="alert('Post compartilhado com sucesso!')">
                ↗ Compartilhar
            </button>

        </div>
    `;


    // Adiciona o post ao feed
    let areaPosts = document.getElementById("novosPosts");

    areaPosts.prepend(novoPost);


    // Limpa o campo de texto
    document.getElementById("textoPost").value = "";

}