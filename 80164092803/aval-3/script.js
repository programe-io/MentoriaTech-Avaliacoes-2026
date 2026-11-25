
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clone Instagram</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f2f2f2;
            margin: 0;
            color: #333;
        }

        header {
            background: white;
            padding: 20px;
            text-align: center;
            border-bottom: 1px solid #ddd;
        }

        main {
            max-width: 450px;
            margin: 30px auto;
            padding: 15px;
        }

        .post {
            background: white;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
        }

        .imagem {
            background: #ddd;
            padding: 60px;
            text-align: center;
            border-radius: 8px;
        }

        button {
            padding: 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
        }

        .curtir {
            background: #e1306c;
            color: white;
        }

        .publicar {
            background: #3897f0;
            color: white;
        }

        input {
            padding: 10px;
            width: 65%;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
    </style>
</head>

<body>

    <header>
        <h1>Instagram</h1>
    </header>

    <main>

        <section class="post">
            <h3>Meu primeiro post</h3>

            <p>Bem-vindo ao meu Instagram!</p>

            <div class="imagem">
                📷 Minha publicação
            </div>

            <button class="curtir" onclick="curtir()">
                ❤️ Curtir
            </button>

            <p id="contador">0 curtidas</p>

            <input type="text" id="comentario"
                placeholder="Escreva um comentário">

            <button onclick="comentar()">Comentar</button>

            <div id="comentarios"></div>
        </section>

        <section class="post">
            <h3>Criar publicação</h3>

            <input type="text" id="publicacao"
                placeholder="O que você está pensando?">

            <button class="publicar" onclick="publicar()">
                Publicar
            </button>
        </section>

        <div id="feed"></div>

    </main>

    <script>
        let curtidas = 0;

        function curtir() {
            curtidas++;

            document.getElementById("contador").innerText =
                curtidas + " curtidas";
        }

        function comentar() {
            let texto = document.getElementById("comentario").value;

            if (texto.trim() === "") {
                alert("Digite um comentário!");
                return;
            }

            let novoComentario = document.createElement("p");

            novoComentario.innerText = texto;

            document.getElementById("comentarios")
                .appendChild(novoComentario);

            document.getElementById("comentario").value = "";
        }

        function publicar() {
            let texto = document.getElementById("publicacao").value;

            if (texto.trim() === "") {
                alert("Digite algo para publicar!");
                return;
            }

            let novoPost = document.createElement("section");

            novoPost.className = "post";

            let titulo = document.createElement("h3");
            titulo.innerText = "Nova publicação";

            let conteudo = document.createElement("p");
            conteudo.innerText = texto;

            novoPost.appendChild(titulo);
            novoPost.appendChild(conteudo);

            document.getElementById("feed")
                .prepend(novoPost);

            document.getElementById("publicacao").value = "";
        }
    </script>

</body>
</html>
