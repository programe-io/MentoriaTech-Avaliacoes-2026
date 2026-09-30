/* Reset Básico */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #121214;
    color: #e1e1e6;
}

/* Header */
header {
    background-color: #202024;
    border-bottom: 2px solid #ff2a2a;
    position: sticky;
    top: 0;
    z-index: 100;
}

.header-content {
    max-width: 900px;
    margin: 0 auto;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header-content h1 {
    color: #ff2a2a;
    font-size: 24px;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-weight: 800;
}

nav {
    display: flex;
    gap: 20px;
}

nav a {
    text-decoration: none;
    color: #c4c4cc;
    font-weight: 600;
    transition: color 0.2s ease;
}

nav a:hover {
    color: #ff2a2a;
}

/* Principal */
main {
    max-width: 600px;
    margin: 25px auto;
    padding: 0 15px;
}

/* Cards (Estrutura Comum) */
.new-post-card, .post-card {
    background-color: #202024;
    border: 1px solid #29292e;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

/* Informações do Usuário & Cabeçalho do Post */
.user-info, .post-header {
    display: flex;
    align-items: center;
    gap: 12px;
}

.new-post-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background-color: #ff2a2a;
    color: #ffffff;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 8px rgba(255, 42, 42, 0.4);
}

.user-info span, .post-time {
    display: block;
    font-size: 13px;
    color: #8d8d99;
    margin-top: 2px;
}

/* Botão de Publicar */
.btn-publish {
    background-color: #ff2a2a;
    color: #ffffff;
    border: none;
    padding: 10px 18px;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.1s;
}

.btn-publish:hover {
    background-color: #d62222;
    transform: translateY(-1px);
}

/* Postagem */
.post-text {
    margin: 15px 0;
    line-height: 1.5;
    color: #c4c4cc;
}

.post-image {
    width: 100%;
    max-height: 420px;
    object-fit: cover;
    border-radius: 6px;
    border: 1px solid #29292e;
}

/* Ações */
.post-actions {
    display: flex;
    gap: 12px;
    margin-top: 15px;
}

.btn-action {
    background-color: #29292e;
    border: 1px solid #323238;
    padding: 8px 14px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    color: #c4c4cc;
    transition: all 0.2s ease;
}

.btn-action:hover {
    background-color: #323238;
    color: #ff2a2a;
    border-color: #ff2a2a;
}

/* Rodapé */
footer {
    background-color: #121214;
    border-top: 1px solid #29292e;
    color: #8d8d99;
    text-align: center;
    padding: 25px;
    font-size: 14px;
    margin-top: 40px;
}