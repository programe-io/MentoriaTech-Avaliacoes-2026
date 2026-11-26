<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PetGram - Feed Social de Pets</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <header class="header">
        <div class="container header-content">
            <h1 class="logo">🐾 PetGram</h1>
            <nav class="nav">
                <button class="filter-btn active" data-filter="Todos">Todos</button>
                <button class="filter-btn" data-filter="Cachorro">🐶 Cães</button>
                <button class="filter-btn" data-filter="Gato">🐱 Gatos</button>
                <button class="filter-btn" data-filter="Salvos">🔖 Salvos</button>
            </nav>
        </div>
    </header>

    <main class="container main-feed">

        <section class="stories-bar" aria-label="Stories dos pets">
            <div class="story-item">
                <div class="story-ring">
                    <img src="https://unsplash.com" alt="Thor">
                </div>
                <span>Thor</span>
            </div>
            <div class="story-item">
                <div class="story-ring">
                    <img src="https://unsplash.com" alt="Mia">
                </div>
                <span>Mia</span>
            </div>
            <div class="story-item">
                <div class="story-ring">
                    <img src="https://unsplash.com" alt="Bolinha">
                </div>
                <span>Bolinha</span>
            </div>
            <div class="story-item">
                <div class="story-ring">
                    <img src="https://unsplash.com" alt="Luna">
                </div>
                <span>Luna</span>
            </div>
            <div class="story-item">
                <div class="story-ring">
                    <img src="https://unsplash.com" alt="Max">
                </div>
                <span>Max</span>
            </div>
        </section>

        <section class="new-post-card">
            <div class="new-post-header">
                <img src="https://unsplash.com" alt="Avatar de Thor" class="avatar">
                <strong>Compartilhe um momento do seu pet</strong>
            </div>

            <form id="post-form">
                <textarea id="post-caption" rows="2" placeholder="Escreva uma legenda fofa ou divertida..." required></textarea>
                
                <div class="form-row">
                    <select id="post-pet-type">
                        <option value="Cachorro">🐶 Cachorro</option>
                        <option value="Gato">🐱 Gato</option>
                        <option value="Outros">🐾 Outros</option>
                    </select>
                    <input type="url" id="post-image" placeholder="Cole a URL da foto do pet (opcional)">
                </div>

                <div class="form-actions">
                    <button type="submit" class="btn-publish">Publicar Foto</button>
                </div>
            </form>
        </section>

        <section id="feed-container"></section>

    </main>

    <footer class="footer">
        <p>&copy; 2026 PetGram — Feito para apaixonados por animais 🐾</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>
