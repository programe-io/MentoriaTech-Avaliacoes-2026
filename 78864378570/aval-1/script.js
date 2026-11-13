
/* =================================
   BLOG DE MOTOS - MIQUÉIAS MARCOS
   ================================= */

/* RESET */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
}

:root {
    --vermelho: #ff1e1e;
    --preto: #080808;
    --cinza: #181818;
    --branco: #ffffff;
}

body {
    background: var(--preto);
    color: var(--branco);
    font-family: Arial, sans-serif;
    overflow-x: hidden;
}

/* MENU PRINCIPAL */

header {
    width: 100%;
    background: #050505;
    padding: 22px 8%;
    border-bottom: 2px solid var(--vermelho);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 27px;
    font-weight: bold;
    color: white;
    text-transform: uppercase;
}

.logo span {
    color: var(--vermelho);
}

nav ul {
    display: flex;
    gap: 30px;
    list-style: none;
}

nav ul li a {
    color: white;
    text-decoration: none;
    font-weight: bold;
    transition: .3s;
}

nav ul li a:hover {
    color: var(--vermelho);
}

/* CAPA DO BLOG */

.hero {
    height: 100vh;

    background:
    linear-gradient(
        rgba(0,0,0,.65),
        rgba(0,0,0,.85)
    ),
    url("https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1600")
    center/cover no-repeat;

    display: flex;
    align-items: center;
    padding: 0 10%;
}

.hero-content {
    max-width: 650px;
}

.hero h1 {
    font-size: 65px;
    font-weight: 900;
    margin-bottom: 25px;
    text-transform: uppercase;
}

.hero h1 span {
    color: var(--vermelho);
}

.hero p {
    font-size: 19px;
    line-height: 1.8;
    color: #ddd;
    margin-bottom: 30px;
}

/* BOTÃO */

.btn {
    display: inline-block;
    padding: 16px 35px;
    background: var(--vermelho);
    color: white;
    text-decoration: none;
    font-weight: bold;
    border-radius: 5px;
    transition: .3s;
}

.btn:hover {
    background: white;
    color: var(--vermelho);
    transform: scale(1.05);
}

/* SOBRE MIM */

.sobre {
    padding: 100px 10%;
    text-align: center;
}

.sobre h2 {
    font-size: 38px;
    color: var(--vermelho);
    margin-bottom: 25px;
}

.sobre p {
    max-width: 850px;
    margin: auto;
    line-height: 1.9;
    font-size: 18px;
    color: #ccc;
}

/* GALERIA DE MOTOS */

.motos {
    padding: 90px 8%;
    background: #151515;
    text-align: center;
}

.motos h2 {
    font-size: 38px;
    color: var(--vermelho);
    margin-bottom: 45px;
}

.cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
}

.card {
    background: #222;
    border-radius: 10px;
    overflow: hidden;
    transition: .4s;
}

.card:hover {
    transform: translateY(-12px);
    box-shadow: 0 10px 25px rgba(255,0,0,.3);
}

.card img {
    width: 100%;
    height: 250px;
    object-fit: cover;
}

.card h3 {
    color: var(--vermelho);
    margin: 20px;
    font-size: 25px;
}

.card p {
    color: #ccc;
    padding: 0 20px 25px;
    line-height: 1.7;
}

/* FRASE */

.frase {
    padding: 100px 10%;
    text-align: center;

    background:
    linear-gradient(rgba(0,0,0,.8),rgba(0,0,0,.8)),
    url("https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1600")
    center/cover;
}

.frase h2 {
    font-size: 32px;
    font-style: italic;
}

.frase p {
    color: var(--vermelho);
    margin-top: 20px;
    font-size: 20px;
}

/* CONTATO */

.contato {
    padding: 90px 10%;
    text-align: center;
}

.contato h2 {
    color: var(--vermelho);
    margin-bottom: 30px;
}

.contato input,
.contato textarea {
    display: block;
    width: 100%;
    max-width: 600px;
    margin: 15px auto;
    padding: 17px;
    background: #222;
    border: 1px solid #444;
    color: white;
    border-radius: 5px;
    font-size: 16px;
}

.contato textarea {
    height: 150px;
}

/* RODAPÉ */

footer {
    background: #050505;
    padding: 40px 20px;
    text-align: center;
    border-top: 2px solid var(--vermelho);
}

footer h2 {
    font-size: 28px;
    margin-bottom: 15px;
}

footer span {
    color: var(--vermelho);
}

footer p {
    color: #999;
    margin: 10px;
}

/* ANIMAÇÕES */

@keyframes aparecer {
    from {
        opacity: 0;
        transform: translateY(40px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.hero-content {
    animation: aparecer 1.5s ease;
}

/* RESPONSIVIDADE */

@media (max-width: 768px) {

    header {
        padding: 20px;
    }

    nav {
        flex-direction: column;
        gap: 20px;
    }

    nav ul {
        flex-wrap: wrap;
        justify-content: center;
        gap: 15px;
    }

    .hero {
        padding: 30px;
        height: 85vh;
    }

    .hero h1 {
        font-size: 38px;
    }

    .cards {
        grid-template-columns: 1fr;
    }

    .sobre,
    .motos,
    .contato {
        padding: 60px 20px;
    }

    .frase h2 {
        font-size: 23px;
    }
}
