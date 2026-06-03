/* --- Variáveis Globais e Resets --- */
:root {
    --primary-color: #2c5e3b;
    --secondary-color: #a0522d;
    --dark-color: #1a1a1a;
    --light-color: #f4f4f4;
    --accent-color: #e67e22;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background-color: var(--light-color);
    color: var(--dark-color);
    line-height: 1.6;
}

/* --- Cabeçalho e Menu --- */
header {
    background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1535083783855-76ae62b2914e?auto=format&fit=crop&w=1200&q=80') no-repeat center/cover;
    color: white;
    text-align: center;
    padding: 6rem 2rem;
}

header h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 2px;
}

nav {
    background-color: var(--primary-color);
    position: sticky;
    top: 0;
    z-index: 1000;
}

nav ul {
    display: flex;
    justify-content: center;
    list-style: none;
}

nav ul li a {
    color: white;
    display: block;
    padding: 1rem 2rem;
    text-decoration: none;
    font-weight: bold;
    transition: background 0.3s;
}

nav ul li a:hover {
    background-color: var(--secondary-color);
}

main {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
}

/* --- Grid e Elementos de Card --- */
.grid-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}

.card:hover {
    transform: translateY(-5px);
}

.card-interativo {
    cursor: pointer;
}

.card-img {
    width: 100%;
    height: 180px;
    object-fit: cover;
}

.card-content {
    padding: 1.5rem;
}

.card-content h3 {
    color: var(--secondary-color);
    margin-bottom: 0.5rem;
}

.badge {
    display: inline-block;
    background-color: var(--primary-color);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
    margin-bottom: 1rem;
}

.divisor {
    margin: 3rem 0;
    border: 0;
    border-top: 1px solid #ccc;
}

#alerta-dieta {
    margin-top: 1.5rem;
    padding: 1rem;
    background: #e2f0d9;
    border-radius: 5px;
    display: none;
    transition: opacity 0.1s;
}

/* --- Layout de Colunas (Tabela + Aside) --- */
.layout-conteudo {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin-top: 1rem;
}

.secao-tabela {
    flex: 2;
    min-width: 300px;
}

.tabela-container {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    background: white;
}

th, td {
    padding: 1rem;
    border: 1px solid #ddd;
    text-align: left;
}

th {
    background-color: var(--primary-color);
    color: white;
}

tr:nth-child(even) {
    background-color: #f9f9f9;
}

/* Estilização do Conteúdo Lateral (Aside) */
.barra-lateral {
    flex: 1;
    min-width: 260px;
    background-color: #eaeaea;
    padding: 1.5rem;
    border-radius: 8px;
    height: fit-content;
}

.barra-lateral h3 {
    color: var(--primary-color);
    margin-bottom: 1rem;
    border-bottom: 2px solid var(--primary-color);
    padding-bottom: 0.3rem;
}

.barra-lateral p {
    font-size: 0.9rem;
    margin-bottom: 1rem;
}

.info-box {
    background-color: white;
    padding: 1rem;
    border-radius: 5px;
    border: 1px dashed var(--secondary-color);
    margin-top: 1.5rem;
}

/* --- Quiz --- */
.quiz-container {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    margin-top: 3rem;
    border-left: 5px solid var(--accent-color);
}

.quiz-container label {
    display: block;
    margin-bottom: 0.5rem;
    cursor: pointer;
}

button {
    background-color: var(--accent-color);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
    margin-top: 1rem;
}

button:hover {
    background-color: #d35400;
}

#resultado-quiz {
    margin-top: 1rem;
    font-weight: bold;
}

/* --- Rodapé --- */
footer {
    background-color: var(--dark-color);
    color: #888;
    text-align: center;
    padding: 2rem;
    margin-top: 4rem;
}