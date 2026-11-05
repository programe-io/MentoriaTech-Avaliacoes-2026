
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
}

html {
    scroll-behavior: smooth;
}

body {
    background-color: #f5f5f5;
    color: #222;
}

header {
    background-color: #111;
    color: white;
    padding: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

header h1 {
    letter-spacing: 4px;
}

nav a {
    color: white;
    text-decoration: none;
    margin-left: 20px;
    font-size: 15px;
}

nav a:hover {
    color: #d4af37;
}

.banner {
    background: linear-gradient(
        rgba(0,0,0,0.5),
        rgba(0,0,0,0.5)
    ),
    url("https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400");

    background-size: cover;
    background-position: center;
    height: 450px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    color: white;
    text-align: center;
}

.banner h2 {
    font-size: 45px;
    margin-bottom: 15px;
}

.banner p {
    font-size: 18px;
    margin-bottom: 25px;
}

.botao {
    background-color: #d4af37;
    color: black;
    padding: 14px 30px;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
}

.botao:hover {
    background-color: white;
}

.marcas {
    padding: 60px 30px;
    text-align: center;
}

.marcas h2,
.tendencias h2,
.sobre h2 {
    font-size: 30px;
    margin-bottom: 30px;
}

.container {
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;
}

.produto {
    background-color: white;
    width: 280px;
    padding-bottom: 20px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    transition: 0.3s;
}

.produto:hover {
    transform: translateY(-8px);
}

.produto img {
    width: 100%;
    height: 250px;
    object-fit: cover;
}

.produto h3 {
    margin: 15px;
    font-size: 22px;
}

.produto p {
    color: #666;
}

.tendencias {
    background-color: #222;
    color: white;
    text-align: center;
    padding: 60px 20%;
}

.tendencias p,
.sobre p {
    line-height: 1.8;
    font-size: 17px;
}

.sobre {
    padding: 60px 20%;
    text-align: center;
}

footer {
    background-color: #111;
    color: white;
    text-align: center;
    padding: 25px;
    line-height: 1.8;
}

@media (max-width: 600px) {
    header {
        flex-direction: column;
        gap: 20px;
    }

    nav a {
        margin: 5px;
        font-size: 13px;
    }

    .banner h2 {
        font-size: 32px;
    }

    .tendencias,
    .sobre {
        padding: 40px 20px;
    }
}
