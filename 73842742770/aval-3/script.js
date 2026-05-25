function abrirMenu(){
    const menu = document.getElementById("menu");

    menu.classList.toggle("active");
}

function curtir(botao){

    if(botao.innerHTML.includes("Curtido")){
        botao.innerHTML = "👍 Curtir";
    }

    else{
        botao.innerHTML = "❤️ Curtido";
    }
}

function publicarPost(){

    const texto = document.getElementById("textoPost").value;

    const feed = document.getElementById("feed");

    if(texto.trim() === ""){
        alert("Digite algo para publicar!");
        return;
    }

    const novoPost = document.createElement("article");

    novoPost.classList.add("post");

    novoPost.innerHTML = `
    
        <div class="usuario">
            <img src="https://i.pravatar.cc/100?img=15">

            <div>
                <h3>Você</h3>
                <p>Agora mesmo</p>
            </div>
        </div>

        <p>${texto}</p>

        <div class="acoes">

            <button onclick="curtir(this)">
                👍 Curtir
            </button>

            <button>
                💬 Comentar
            </button>

            <button>
                ↗ Compartilhar
            </button>

        </div>
    `;

    feed.prepend(novoPost);

    document.getElementById("textoPost").value = "";
}