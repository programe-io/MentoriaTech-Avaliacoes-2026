/* Reset e Variáveis */
:root {
    --bg-color: #f5f5f5;
    --card-bg: #ffffff;
    --text-color: #333;
    --accent-color: #6c63ff;
    --hover-color: #5751e0;
    --shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

body.dark-mode {
    --bg-color: #1a1a2e;
    --card-bg: #16213e;
    --text-color: #eee;
    --accent-color: #e94560;
    --hover-color: #ff6b81;
    --shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: var(--bg-color);
    color: var(--text-color);
    transition: background-color 0.3s, color 0.3s;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Cabeçalho */
.header {
    background: var(--card-bg);
    box-shadow: var(--shadow);
    padding: 15px 0;
    position: sticky;
    top: 0;
    z-index: 100;
}

.header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.8rem;
    color: var(--accent-color);
}

.navbar {
    display: flex;
    gap: 20px;
    align-items: center;
}

.navbar a {
    text-decoration: none;
    color: var(--text-color);
    font-weight: 500;
    transition: color 0.3s;
}

.navbar a:hover,
.navbar a.active {
    color: var(--accent-color);
}

.btn-toggle {
    background: none;
    border: 2px solid var(--accent-color);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    font-size: 1.2rem;
    transition: transform 0.3s;
}

.btn-toggle:hover {
    transform: rotate(30deg);
}

/* Hero */
.hero {
    text-align: center;
    padding: 60px 20px;
    background: linear-gradient(135deg, var(--accent-color), var(--hover-color));
    color: white;
}

.hero h2 {
    font-size: 2.5rem;
    margin-bottom: 10px;
}

#searchBar {
    margin-top: 20px;
    padding: 12px 20px;
    width: 100%;
    max-width: 400px;
    border: none;
    border-radius: 30px;
    font-size: 1rem;
    outline: none;
}

/* Grid de Posts */
.posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 25px;
    padding: 40px 0;
}

.post-card {
    background: var(--card-bg);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: var(--shadow);
    transition: transform 0.3s;
    cursor: pointer;
}

.post-card:hover {
    transform: translateY(-8px);
}

.post-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.post-info {
    padding: 20px;
}

.post-info h3 {
    margin-bottom: 10px;
    color: var(--accent-color);
}

.post-tag {
    display: inline-block;
    background: var(--accent-color);
    color: white;
    padding: 3px 10px;
    border-radius: 15px;
    font-size: 0.8rem;
    margin-bottom: 10px;
}

/* Modal */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 200;
}

.modal-content {
    background: var(--card-bg);
    padding: 30px;
    border-radius: 12px;
    max-width: 700px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
}

.close-btn {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 2rem;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-color);
}

.hidden {
    display: none;
}

/* Rodapé */
.footer {
    text-align: center;
    padding: 20px;
    background: var(--card-bg);
    margin-top: 40px;
}

/* Responsivo */
@media (max-width: 600px) {
    .hero h2 {
        font-size: 1.8rem;
    }
    
    .navbar a {
        font-size: 0.9rem;
    }
}