/* ==========================================================================
   Configurações Globais & Variáveis
   ========================================================================== */
:root {
    --primary-color: #2563eb;
    --primary-hover: #1d4ed8;
    --bg-color: #f8fafc;
    --card-bg: #ffffff;
    --text-color: #1e293b;
    --text-muted: #64748b;
    --border-color: #e2e8f0;
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --radius: 8px;
    --font-main: 'Inter', system-ui, -apple-system, sans-serif;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: var(--font-main);
    background-color: var(--bg-color);
    color: var(--text-color);
    line-height: 1.6;
}

a {
    text-decoration: none;
    color: inherit;
}

ul {
    list-style: none;
}

.container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
}

/* ==========================================================================
   Cabeçalho e Navegação
   ========================================================================== */
.header {
    background-color: var(--card-bg);
    border-bottom: 1px solid var(--border-color);
    position: sticky;
    top: 0;
    z-index: 100;
}

.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
}

.logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-color);
}

.logo span {
    color: var(--primary-color);
}

.nav ul {
    display: flex;
    gap: 20px;
}

.nav a {
    font-weight: 500;
    color: var(--text-muted);
    transition: color 0.2s ease;
}

.nav a:hover,
.nav a.active {
    color: var(--primary-color);
}

/* Botão do Menu Mobile */
.mobile-menu-btn {
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 30px;
    height: 24px;
    background: transparent;
    border: none;
    cursor: pointer;
}

.mobile-menu-btn span {
    width: 100%;
    height: 3px;
    background-color: var(--text-color);
    border-radius: 2px;
    transition: all 0.3s ease;
}

/* ==========================================================================
   Hero Section
   ========================================================================== */
.hero {
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    color: #ffffff;
    text-align: center;
    padding: 60px 20px;
    margin-bottom: 40px;
}

.hero h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
}

.hero p {
    font-size: 1.1rem;
    color: #94a3b8;
}

/* ==========================================================================
   Grid de Layout (Main + Sidebar)
   ========================================================================== */
.layout-grid {
    display: flex;
    gap: 30px;
    margin-bottom: 60px;
}

.main-content {
    flex: 3;
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.sidebar {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 30px;
}

/* ==========================================================================
   Cards dos Posts
   ========================================================================== */
.post-card {
    background-color: var(--card-bg);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    overflow: hidden;
    border: 1px solid var(--border-color);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.post-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.post-image {
    width: 100%;
    height: 250px;
    object-fit: cover;
}

.post-content {
    padding: 24px;
}

.category-tag {
    display: inline-block;
    background-color: #dbeafe;
    color: var(--primary-color);
    font-size: 0.8rem;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 20px;
    margin-bottom: 12px;
}

.post-card h2 {
    font-size: 1.5rem;
    margin-bottom: 8px;
    color: var(--text-color);
}

.post-meta {
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-bottom: 16px;
}

.post-excerpt {
    color: var(--text-muted);
    margin-bottom: 20px;
}

.btn-read-more {
    display: inline-block;
    color: var(--primary-color);
    font-weight: 600;
    transition: color 0.2s ease;
}

.btn-read-more:hover {
    color: var(--primary-hover);
}

/* ==========================================================================
   Sidebar Widgets
   ========================================================================== */
.widget {
    background-color: var(--card-bg);
    padding: 24px;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    border: 1px solid var(--border-color);
}

.widget-title {
    font-size: 1.2rem;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 2px solid var(--border-color);
}

.author-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 12px;
}

.search-form {
    display: flex;
    gap: 8px;
}

.search-form input {
    flex: 1;
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-family: inherit;
}

.search-form button {
    padding: 10px 16px;
    background-color: var(--primary-color);
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.2s ease;
}

.search-form button:hover {
    background-color: var(--primary-hover);
}

.category-list li {
    margin-bottom: 10px;
}

.category-list a {
    display: flex;
    justify-content: space-between;
    color: var(--text-muted);
    transition: color 0.2s ease;
}

.category-list a:hover {
    color: var(--primary-color);
}

/* ==========================================================================
   Rodapé
   ========================================================================== */
.footer {
    background-color: var(--card-bg);
    border-top: 1px solid var(--border-color);
    padding: 24px 0;
    margin-top: auto;
}

.footer-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
    color: var(--text-muted);
}

.social-links {
    display: flex;
    gap: 16px;
}

.social-links a:hover {
    color: var(--primary-color);
}

/* ==========================================================================
   Responsividade (Mobile & Tablet)
   ========================================================================== */
@media (max-width: 900px) {
    .layout-grid {
        flex-direction: column;
    }

    .mobile-menu-btn {
        display: flex;
    }

    .nav {
        display: none;
        position: absolute;
        top: 70px;
        left: 0;
        width: 100%;
        background-color: var(--card-bg);
        border-bottom: 1px solid var(--border-color);
        padding: 20px;
    }

    .nav.active {
        display: block;
    }

    .nav ul {
        flex-direction: column;
        gap: 16px;
    }

    .footer-container {
        flex-direction: column;
        gap: 16px;
        text-align: center;
    }
}