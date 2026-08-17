<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog de Nayane Cordeiro</title>
    <style>
        * { box-sizing: border-box; }
        body { font-family: Arial, sans-serif; background:#f4f4f4; color:#222; margin:0; line-height:1.6; }
        header { background:#4C51BF; color:white; padding:30px; text-align:center; }
        nav { margin-top:18px; }
        nav a { color:white; text-decoration:none; margin:10px; font-weight:bold; }
        nav a:hover { text-decoration:underline; }
        button { padding:10px 15px; margin-top:15px; cursor:pointer; border:0; border-radius:5px; }
        main { width:80%; max-width:900px; margin:30px auto; }
        article { background:white; padding:20px; margin-bottom:20px; border-radius:8px; }
        aside { background:#eee; padding:20px; margin-top:20px; border-radius:8px; }
        #mensagem { font-weight:bold; margin-top:15px; }
        footer { background:#4C51BF; color:white; text-align:center; padding:20px; }
        .modo-escuro { background:#121212; color:white; }
        .modo-escuro article { background:#333; }
        .modo-escuro aside { background:#444; }
    </style>
</head>
<body>
    <header>
        <h1>Blog de Nayane Cordeiro</h1>
        <p>Um espaço para compartilhar ideias, estudos e experiências.</p>
        <nav>
            <a href="#inicio">Início</a>
            <a href="#posts">Posts</a>
            <a href="#sobre">Sobre</a>
            <a href="#contato">Contato</a>
        </nav>
        <button id="botaoTema">Alterar tema</button>
    </header>

    <main id="inicio">
        <section id="posts">
            <article>
                <h2>Minha primeira postagem</h2>
                <p>Publicado por Nayane Cordeiro Lopes</p>
                <p><strong>RA:</strong> 59421956044</p>
                <p>Olá! Este é o meu primeiro post no blog. Aqui posso compartilhar conteúdos sobre estudos, tecnologia e outros assuntos interessantes.</p>
            </article>
            <article>
                <h2>Aprendendo desenvolvimento web</h2>
                <p>Estou aprendendo a utilizar HTML, CSS e JavaScript para construir páginas para a internet.</p>
            </article>
        </section>

        <aside id="sobre">
            <h3>Sobre mim</h3>
            <p>Meu nome é Nayane Cordeiro Lopes e este blog foi criado para praticar desenvolvimento web.</p>
            <h3>Categorias</h3>
            <ul>
                <li>Estudos</li>
                <li>Tecnologia</li>
                <li>Programação</li>
                <li>Curiosidades</li>
            </ul>
            <button id="botaoMensagem">Clique aqui</button>
            <p id="mensagem"></p>
            <p id="contato"><strong>Contato:</strong> estudante@exemplo.com</p>
        </aside>
    </main>

    <footer><p>© <span id="anoAtual"></span> Blog de Nayane Cordeiro</p></footer>

    <script>
        const botaoTema = document.getElementById("botaoTema");
        botaoTema.addEventListener("click", function() {
            document.body.classList.toggle("modo-escuro");
        });

        const botaoMensagem = document.getElementById("botaoMensagem");
        const mensagem = document.getElementById("mensagem");
        botaoMensagem.addEventListener("click", function() {
            mensagem.textContent = "Olá! Você está visitando o blog de Nayane Cordeiro!";
        });

        document.getElementById("anoAtual").textContent = new Date().getFullYear();
    </script>
</body>
</html>
