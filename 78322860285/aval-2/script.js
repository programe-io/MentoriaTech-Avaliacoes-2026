/* =========================================================
   RESET / CONFIGURAÇÕES GERAIS
========================================================= */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    background: #0f172a;
    color: #f8fafc;
    line-height: 1.6;
    min-height: 100vh;
}

/* =========================================================
   VARIÁVEIS
========================================================= */

:root {
    --primary: #6366f1;
    --primary-dark: #4f46e5;
    --secondary: #8b5cf6;
    --background: #0f172a;
    --background-light: #1e293b;
    --card: #1e293b;
    --text: #f8fafc;
    --text-muted: #94a3b8;
    --border: #334155;
    --success: #22c55e;
    --danger: #ef4444;
    --warning: #f59e0b;
    --white: #ffffff;
    --radius: 12px;
    --transition: 0.3s ease;
}

/* =========================================================
   LINKS
========================================================= */

a {
    color: inherit;
    text-decoration: none;
    transition: var(--transition);
}

a:hover {
    color: var(--primary);
}

/* =========================================================
   HEADER
========================================================= */

header {
    width: 100%;
    background: rgba(15, 23, 42, 0.95);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 1000;
    backdrop-filter: blur(10px);
}

.navbar {
    max-width: 1200px;
    margin: auto;
    padding: 18px 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logo {
    font-size: 26px;
    font-weight: bold;
    color: var(--white);
}

.logo span {
    color: var(--primary);
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 30px;
}

.nav-links a {
    color: var(--text-muted);
    font-size: 16px;
    font-weight: 500;
}

.nav-links a:hover {
    color: var(--white);
}

/* =========================================================
   BOTÕES
========================================================= */

.btn {
    display: inline-block;
    padding: 12px 22px;
    border-radius: var(--radius);
    border: none;
    cursor: pointer;
    font-size: 15px;
    font-weight: bold;
    transition: var(--transition);
}

.btn-primary {
    background: var(--primary);
    color: white;
}

.btn-primary:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
}

.btn-secondary {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text);
}

.btn-secondary:hover {
    background: var(--background-light);
    border-color: var(--primary);
}

/* =========================================================
   HERO
========================================================= */

.hero {
    min-height: 650px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 80px 20px;
    background:
        radial-gradient(
            circle at top left,
            rgba(99, 102, 241, 0.25),
            transparent 35%
        ),
        radial-gradient(
            circle at bottom right,
            rgba(139, 92, 246, 0.2),
            transparent 35%
        );
}

.hero-content {
    max-width: 850px;
}

.hero h1 {
    font-size: clamp(40px, 7vw, 75px);
    line-height: 1.1;
    margin-bottom: 25px;
}

.hero h1 span {
    color: var(--primary);
}

.hero p {
    max-width: 650px;
    margin: 0 auto 35px;
    color: var(--text-muted);
    font-size: 19px;
}

.hero-buttons {
    display: flex;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
}

/* =========================================================
   CONTAINER
========================================================= */

.container {
    width: 90%;
    max-width: 1200px;
    margin: auto;
}

/* =========================================================
   SEÇÕES
========================================================= */

section {
    padding: 90px 0;
}

.section-title {
    text-align: center;
    margin-bottom: 55px;
}

.section-title h2 {
    font-size: 40px;
    margin-bottom: 12px;
}

.section-title p {
    color: var(--text-muted);
}

/* =========================================================
   CARDS
========================================================= */

.cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
}

.card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 30px;
    transition: var(--transition);
}

.card:hover {
    transform: translateY(-8px);
    border-color: var(--primary);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.card-icon {
    width: 55px;
    height: 55px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(99, 102, 241, 0.15);
    color: var(--primary);
    font-size: 24px;
    margin-bottom: 20px;
}

.card h3 {
    font-size: 22px;
    margin-bottom: 12px;
}

.card p {
    color: var(--text-muted);
}

/* =========================================================
   SOBRE
========================================================= */

.about {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
}

.about-image {
    min-height: 400px;
    border-radius: 20px;
    background: linear-gradient(
        135deg,
        var(--primary),
        var(--secondary)
    );
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 80px;
}

.about-content h2 {
    font-size: 42px;
    margin-bottom: 20px;
}

.about-content p {
    color: var(--text-muted);
    margin-bottom: 20px;
}

/* =========================================================
   ESTATÍSTICAS
========================================================= */

.stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    text-align: center;
}

.stat {
    padding: 30px;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
}

.stat h3 {
    font-size: 40px;
    color: var(--primary);
}

.stat p {
    color: var(--text-muted);
}

/* =========================================================
   FORMULÁRIO
========================================================= */

.form-container {
    max-width: 700px;
    margin: auto;
    background: var(--card);
    padding: 40px;
    border-radius: 20px;
    border: 1px solid var(--border);
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
}

.form-group input,
.form-group textarea,
.form-group select {
    width: 100%;
    padding: 14px 16px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--background);
    color: var(--text);
    outline: none;
    transition: var(--transition);
}

.form-group textarea {
    min-height: 150px;
    resize: vertical;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

/* =========================================================
   TABELA
========================================================= */

.table-container {
    width: 100%;
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    background: var(--card);
    border-radius: var(--radius);
    overflow: hidden;
}

thead {
    background: var(--primary);
}

th,
td {
    padding: 16px;
    text-align: left;
    border-bottom: 1px solid var(--border);
}

tbody tr {
    transition: var(--transition);
}

tbody tr:hover {
    background: #273449;
}

/* =========================================================
   BADGES
========================================================= */

.badge {
    display: inline-block;
    padding: 5px 12px;
    border-radius: 50px;
    font-size: 12px;
    font-weight: bold;
}

.badge-success {
    background: rgba(34, 197, 94, 0.15);
    color: var(--success);
}

.badge-danger {
    background: rgba(239, 68, 68, 0.15);
    color: var(--danger);
}

.badge-warning {
    background: rgba(245, 158, 11, 0.15);
    color: var(--warning);
}

/* =========================================================
   ALERTAS
========================================================= */

.alert {
    padding: 16px 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    border: 1px solid transparent;
}

.alert-success {
    background: rgba(34, 197, 94, 0.1);
    color: #86efac;
    border-color: rgba(34, 197, 94, 0.3);
}

.alert-danger {
    background: rgba(239, 68, 68, 0.1);
    color: #fca5a5;
    border-color: rgba(239, 68, 68, 0.3);
}

.alert-warning {
    background: rgba(245, 158, 11, 0.1);
    color: #fcd34d;
    border-color: rgba(245, 158, 11, 0.3);
}

/* =========================================================
   FOOTER
========================================================= */

footer {
    background: #020617;
    border-top: 1px solid var(--border);
    padding: 50px 20px 25px;
}

.footer-content {
    max-width: 1200px;
    margin: auto;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 40px;
}

.footer-column h3 {
    margin-bottom: 20px;
}

.footer-column p {
    color: var(--text-muted);
}

.footer-column ul {
    list-style: none;
}

.footer-column li {
    margin-bottom: 10px;
}

.footer-column a {
    color: var(--text-muted);
}

.footer-column a:hover {
    color: var(--white);
}

.footer-bottom {
    max-width: 1200px;
    margin: 40px auto 0;
    padding-top: 20px;
    border-top: 1px solid var(--border);
    text-align: center;
    color: var(--text-muted);
}

/* =========================================================
   ANIMAÇÕES
========================================================= */

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in {
    animation: fadeIn 0.8s ease forwards;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.05);
    }

    100% {
        transform: scale(1);
    }
}

.pulse {
    animation: pulse 2s infinite;
}

/* =========================================================
   RESPONSIVIDADE
========================================================= */

@media (max-width: 900px) {

    .cards {
        grid-template-columns: repeat(2, 1fr);
    }

    .stats {
        grid-template-columns: repeat(2, 1fr);
    }

    .about {
        grid-template-columns: 1fr;
    }

    .footer-content {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 600px) {

    .navbar {
        padding: 15px;
    }

    .nav-links {
        display: none;
    }

    .hero {
        min-height: 550px;
        padding: 60px 20px;
    }

    .hero h1 {
        font-size: 42px;
    }

    .hero p {
        font-size: 16px;
    }

    section {
        padding: 60px 0;
    }

    .section-title h2 {
        font-size: 32px;
    }

    .cards {
        grid-template-columns: 1fr;
    }

    .stats {
        grid-template-columns: 1fr;
    }

    .footer-content {
        grid-template-columns: 1fr;
    }

    .form-container {
        padding: 25px;
    }
}

/* =========================================================
   UTILITÁRIOS
========================================================= */

.text-center {
    text-align: center;
}

.text-left {
    text-align: left;
}

.text-right {
    text-align: right;
}

.mt-1 {
    margin-top: 10px;
}

.mt-2 {
    margin-top: 20px;
}

.mt-3 {
    margin-top: 30px;
}

.mb-1 {
    margin-bottom: 10px;
}

.mb-2 {
    margin-bottom: 20px;
}

.mb-3 {
    margin-bottom: 30px;
}

.hidden {
    display: none;
}

.flex {
    display: flex;
}

.flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

.flex-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
