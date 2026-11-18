
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Instagram JavaScript</title>

    <style>
        body {
            background: #fafafa;
            font-family: Arial;
            margin: 0;
        }

        header {
            background: white;
            padding: 20px;
            border-bottom: 1px solid #ddd;
            text-align: center;
            font-size: 25px;
            font-weight: bold;
        }

        .container {
            width: 450px;
            max-width: 95%;
            margin: 20px auto;
        }

        .stories, .post, .criar {
            background: white;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 10px;
            margin-bottom: 20px;
        }

        .stories {
            display: flex;
            gap: 15px;
            overflow-x: auto;
        }

        .story {
            text-align: center;
            font-size: 12px;
        }

        .story div {
            width: 55px;
            height: 55px;
            border-radius: 50%;
            background: linear-gradient(45deg, orange, purple);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 25px;
        }

        .post img {
            width: 100%;
            margin-top: 10px;
            border-radius: 5px;
        }

        button {
            border: none;
            background: none;
            font-size: 22px;
            cursor: pointer;
        }

        input {
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            width: 90%;
            margin-top: 8px;
        }

        .publicar {
            background: #0095f6;
            color: white;
            font-size: 15px;
            padding: 10px 20px;
            border-radius: 5px;
            margin-top: 10px;
        }
    </style>
</head>

<body>

<header>Instagram</header>

<div class="container">

    <!-- STORIES -->
    <div class="stories">
        <div class="story">
            <div>👩</div>
            <p>Maria</p>
        </div>

        <div class="story">
            <div>👨</div>
            <p>Pedro</p>
        </div>

        <div class="story">
            <div>👩‍🦱</div>
            <p>Ana</p>
        </div>

        <div class="story">
            <div>🧑</div>
            <p>Lucas</p>
        </div>
    </div>

    <!-- CRIAR PUBLICAÇÃO -->
    <div class="criar">
        <h3>Criar publicação</h3>

        <input type="text" id="imagem"
        placeholder="Cole o link de uma imagem">

        <input type="text" id="legenda"
        placeholder="Escreva uma legenda">

        <button class="publicar" onclick="publicar()">
            Publicar
        </button>
    </div>

    <!-- FEED -->
    <div id="feed">

        <div class="post">
            <h3>👩 mariana_oficial</h3>

            <img src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800">

            <button onclick="curtir(this)">🤍</button>
            <span>1.250 curtidas</span>

            <p><strong>mariana_oficial</strong>
            Que lugar maravilhoso! ❤️</p>

            <input type="text" placeholder="Escreva um comentário..."
            onkeydown="comentar(event, this)">

            <div class="comentarios"></div>
        </div>

    </div>

</div>

<script>

    // FUNÇÃO DE CURTIR
    function curtir(botao) {

        if (botao.innerHTML === "🤍") {
            botao.innerHTML = "❤️";
        } else {
            botao.innerHTML = "🤍";
        }

    }

    // FUNÇÃO DE COMENTAR
    function comentar(evento, campo) {

        if (evento.key === "Enter") {

            let texto = campo.value.trim();

            if (texto !== "") {

                let comentario = document.createElement("p");

                comentario.innerHTML =
                    "<strong>Você:</strong> " + texto;

                campo.nextElementSibling.appendChild(comentario);

                campo.value = "";

            }

        }

    }

    // FUNÇÃO DE PUBLICAR
    function publicar() {

        let imagem = document.getElementById("imagem").value;
        let legenda = document.getElementById("legenda").value;

        if (imagem === "" || legenda === "") {
            alert("Preencha todos os campos!");
            return;
        }

        let post = document.createElement("div");

        post.className = "post";

        let titulo = document.createElement("h3");
        titulo.textContent = "👤 Seu perfil";

        let foto = document.createElement("img");
        foto.src = imagem;
        foto.alt = "Imagem da publicação";

        let botao = document.createElement("button");
        botao.textContent = "🤍";
        botao.onclick = function() {
            curtir(this);
        };

        let texto = document.createElement("p");
        texto.textContent = legenda;

        let campo = document.createElement("input");
        campo.placeholder = "Escreva um comentário...";
        campo.onkeydown = function(evento) {
            comentar(evento, this);
        };

        let comentarios = document.createElement("div");
        comentarios.className = "comentarios";

        post.append(
            titulo,
            foto,
            botao,
            texto,
            campo,
            comentarios
        );

        document.getElementById("feed").prepend(post);

        document.getElementById("imagem").value = "";
        document.getElementById("legenda").value = "";

        alert("Publicação criada com sucesso!");

    }

</script>

</body>
</html>
