
from flask import Flask, render_template_string

app = Flask(__name__)

html = """
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Instagram Clone</title>
    <style>
        body {
            background: #fafafa;
            font-family: Arial;
            text-align: center;
        }

        header {
            background: white;
            padding: 15px;
            border-bottom: 1px solid #ddd;
        }

        .post {
            background: white;
            width: 350px;
            margin: 30px auto;
            border: 1px solid #ddd;
            border-radius: 10px;
            overflow: hidden;
        }

        img {
            width: 100%;
        }

        button {
            border: none;
            background: white;
            font-size: 25px;
            cursor: pointer;
        }

        .legenda {
            padding: 15px;
        }
    </style>
</head>

<body>

<header>
    <h1>Instagram</h1>
</header>

<div class="post">
    <h3>👤 enzo_oficial</h3>

    <img src="https://picsum.photos/400/400">

    <div class="legenda">
        <button onclick="curtir()">❤️</button>
        <button onclick="comentar()">💬</button>

        <p id="likes">0 curtidas</p>

        <strong>enzo_oficial</strong>
        <p>Bem-vindo ao meu Instagram! 🔥</p>
    </div>
</div>

<script>
    let likes = 0;

    function curtir() {
        likes++;
        document.getElementById("likes").innerText =
            likes + " curtidas";
    }

    function comentar() {
        let texto = prompt("Digite seu comentário:");

        if (texto) {
            alert("Comentário publicado: " + texto);
        }
    }
</script>

</body>
</html>
"""

@app.route("/")
def inicio():
    return render_template_string(html)

if __name__ == "__main__":
    app.run(debug=True)
