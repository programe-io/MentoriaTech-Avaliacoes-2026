
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mini Feed</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <!-- Cabeçalho -->
    <header>
        <div class="header-content">
            <h1>Mini Feed</h1>

            <nav>
                <a href="#">Início</a>
                <a href="#">Perfil</a>
            </nav>
        </div>
    </header>

    <!-- Conteúdo principal -->
    <main>

        <!-- Nova publicação -->
        <section class="new-post">
            <div class="user">
                <div class="avatar">A</div>

                <div>
                    <strong>Agatha</strong>
                    <span>O que você está pensando?</span>
                </div>
            </div>

            <button>Publicar</button>
        </section>

        <!-- Primeira postagem -->
        <article class="post">

            <div class="post-header">
                <div class="avatar">M</div>

                <div>
                    <strong>Maria Silva</strong>
                    <span>Há 10 minutos</span>
                </div>
            </div>

            <p class="post-text">
                Hoje foi um dia incrível! 
                Aproveitando cada momento e aprendendo coisas novas. ❤️
            </p>

            <img 
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900"
                alt="Paisagem bonita com natureza">

            <div class="post-actions">
                <button onclick="curtir(this)">♡ Curtir</button>
                <button onclick="comentar()">💬 Comentar</button>
            </div>

        </article>

        <!-- Segunda postagem -->
        <article class="post">

            <div class="post-header">
                <div class="avatar">J</div>

                <div>
                    <strong>João Pedro</strong>
                    <span>Há 30 minutos</span>
                </div>
            </div>

            <p class="post-text">
                Nunca pare de estudar e buscar seus sonhos.
                Cada pequeno passo faz diferença! 🚀
            </p>

            <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900"
                alt="Mesa com computador para estudos">

            <div class="post-actions">
                <button onclick="curtir(this)">♡ Curtir</button>
                <button onclick="comentar()">💬 Comentar</button>
            </div>

        </article>

        <!-- Terceira postagem -->
        <article class="post">

            <div class="post-header">
                <div class="avatar">L</div>

                <div>
                    <strong>Lucas Santos</strong>
                    <span>Há 1 hora</span>
                </div>
            </div>

            <p class="post-text">
                Um pouco de tranquilidade para deixar
                o dia ainda melhor! 🌅
            </p>

            <img 
                src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=900"
                alt="Nascer do sol em uma paisagem">

            <div class="post-actions">
                <button onclick="curtir(this)">♡ Curtir</button>
                <button onclick="comentar()">💬 Comentar</button>
            </div>

        </article>

    </main>

    <!-- Rodapé -->
    <footer>
        <p>© 2026 Mini Feed - Todos os direitos reservados.</p>
        <p>Desenvolvido com HTML e CSS ❤️</p>
    </footer>

    <script>
        function curtir(botao) {
            if (botao.innerHTML.includes("♡")) {
                botao.innerHTML = "❤️ Curtido";
            } else {
                botao.innerHTML = "♡ Curtir";
            }
        }

        function comentar() {
            let comentario = prompt("Digite seu comentário:");

            if (comentario) {
                alert("Comentário enviado: " + comentario);
            }
        }
    </script>

</body>
</html>
