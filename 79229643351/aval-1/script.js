<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Pessoal - Universo Barbie</title>
    <link rel="stylesheet" href="index.css">
</head>
<body>

    <header>
        <h1>Diário da Barbieland</h1>
        <p>Resenhas, curiosidades e reflexões sobre o filme Barbie</p>
    </header>

    <nav>
        <a href="#perfil">Perfil</a>
        <a href="#novo-post">Escrever Post</a>
        <a href="#posts">Postagens</a>
    </nav>

    <main class="container">
        
        <!-- Espaço para o nome da Barbie -->
        <section id="perfil" class="barbie-profile">
            <h2>Bem-vinda ao blog de:</h2>
            <div class="nome-destaque" id="exibirNome">Barbie Estereotipada</div>
            <p>Personalize este espaço digitando o nome da sua Barbie favorita abaixo:</p>
            <div class="input-group">
                <input type="text" id="campoNome" placeholder="Ex: Barbie Presidente, Barbie Sereia...">
                <button id="btnAtualizarNome">Atualizar Nome</button>
            </div>
        </section>

        <!-- Formulário para criar novas postagens via JavaScript -->
        <section id="novo-post" class="barbie-profile">
            <h2>Nova Postagem no Diário</h2>
            <form id="formPost" style="display: flex; flex-direction: column; gap: 12px; max-width: 500px; margin: 0 auto;">
                <input type="text" id="tituloPost" placeholder="Título da postagem" required style="padding: 10px; border-radius: 12px; border: 2px solid var(--rosa-medio);">
                <textarea id="conteudoPost" rows="4" placeholder="Escreva suas impressões sobre o filme..." required style="padding: 10px; border-radius: 12px; border: 2px solid var(--rosa-medio); font-family: inherit;"></textarea>
                <input type="text" id="tagsPost" placeholder="Tags separadas por vírgula (Ex: Cinema, Moda)" style="padding: 10px; border-radius: 12px; border: 2px solid var(--rosa-medio);">
                <button type="submit" style="background-color: var(--rosa-principal); color: white; border: none; padding: 12px; border-radius: 25px; font-weight: bold; cursor: pointer;">Publicar no Blog</button>
            </form>
        </section>

        <!-- Lista de Postagens -->
        <section id="posts">
            <article class="post">
                <span class="post-date">Publicado em 18 de Novembro de 2026</span>
                <h3>Minha primeira impressão sobre o filme da Barbie</h3>
                <p>Assistir ao filme dirigido por Greta Gerwig foi uma experiência visual incrível. A direção de arte da Barbieland, onde cada detalhe parece um brinquedo real em tamanho humano, cria uma nostalgia imediata.</p>
                <span class="tag">#Cinema</span>
                <span class="tag">#Resenha</span>
            </article>
        </section>

    </main>

    <footer>
        <p>Blog Pessoal Temático &bull; Criado por <span id="nomeRodape">Barbie Estereotipada</span></p>
    </footer>

    <!-- Conexão com o arquivo JavaScript -->
    <script src="index.js"></script>
</body>
</html>
