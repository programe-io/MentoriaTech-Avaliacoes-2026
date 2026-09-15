<title>Spider-Man 🕷️</title>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        scroll-behavior: smooth;
    }

    body {
        font-family: Arial, sans-serif;
        background: #050505;
        color: white;
        overflow-x: hidden;
    }

    /* MENU */
    header {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 1000;

        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 18px 8%;
        background: rgba(0, 0, 0, 0.92);
        border-bottom: 3px solid #e50914;
    }

    .logo {
        font-size: 28px;
        font-weight: bold;
        color: #e50914;
    }

    .logo span {
        color: white;
    }

    nav a {
        color: white;
        text-decoration: none;
        margin-left: 20px;
        font-weight: bold;
        transition: .3s;
    }

    nav a:hover {
        color: #e50914;
    }

    /* HERO */
    .hero {
        height: 100vh;
        min-height: 650px;

        display: flex;
        justify-content: center;
        align-items: center;

        text-align: center;

        background:
            linear-gradient(
                rgba(0,0,0,.65),
                rgba(100,0,0,.65)
            ),
            url("https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Spider-Man_%2846%29.jpg/800px-Spider-Man_%2846%29.jpg");

        background-size: cover;
        background-position: center;
    }

    .hero-content {
        max-width: 800px;
        padding: 30px;
    }

    .hero h1 {
        font-size: clamp(55px, 10vw, 110px);
        color: #e50914;
        text-shadow: 5px 5px #000;
    }

    .hero h1 span {
        color: white;
    }

    .hero p {
        font-size: 21px;
        line-height: 1.6;
        margin: 20px 0 30px;
    }

    .btn {
        border: none;
        background: #e50914;
        color: white;
        padding: 16px 30px;
        border-radius: 8px;
        font-weight: bold;
        font-size: 17px;
        cursor: pointer;
        transition: .3s;
    }

    .btn:hover {
        background: white;
        color: #e50914;
        transform: scale(1.08);
    }

    /* MENSAGEM */
    #mensagem {
        margin-top: 25px;
        font-size: 24px;
        color: #ffd700;
        min-height: 35px;
        font-weight: bold;
    }

    /* SEÇÕES */
    section {
        padding: 90px 8%;
    }

    .titulo {
        text-align: center;
        margin-bottom: 45px;
    }

    .titulo h2 {
        font-size: 42px;
        color: #e50914;
    }

    .titulo p {
        margin-top: 10px;
        color: #aaa;
    }

    /* PODERES */
    .cards {
        display: grid;
        grid-template-columns:
            repeat(auto-fit, minmax(220px, 1fr));
        gap: 25px;
    }

    .card {
        background: #141414;
        border: 2px solid #e50914;
        border-radius: 15px;
        padding: 30px;
        text-align: center;
        transition: .4s;
    }

    .card:hover {
        transform: translateY(-12px);
        box-shadow: 0 10px 35px rgba(229,9,20,.5);
    }

    .icone {
        font-size: 50px;
        margin-bottom: 15px;
    }

    .card h3 {
        color: #e50914;
        margin-bottom: 12px;
    }

    .card p {
        color: #ccc;
        line-height: 1.5;
    }

    /* GALERIA */
    .galeria {
        display: grid;
        grid-template-columns:
            repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
    }

    .galeria img {
        width: 100%;
        height: 350px;
        object-fit: cover;

        border-radius: 15px;
        border: 3px solid #222;

        transition: .4s;
    }

    .galeria img:hover {
        transform: scale(1.05);
        border-color: #e50914;
        box-shadow: 0 0 25px #e50914;
    }

    /* CONTADOR */
    .contador {
        text-align: center;
        background: #0e0e0e;
    }

    #numero {
        font-size: 70px;
        color: #e50914;
        font-weight: bold;
        margin: 20px;
    }

    /* FRASE */
    .frase {
        text-align: center;
        background:
            linear-gradient(
                rgba(120,0,0,.7),
                rgba(0,0,0,.9)
            );
    }

    .frase h2 {
        font-size: 40px;
        max-width: 850px;
        margin: auto;
    }

    /* RODAPÉ */
    footer {
        background: #000;
        border-top: 2px solid #e50914;
        padding: 30px;
        text-align: center;
        color: #777;
    }

    /* TEIA */
    .teia {
        position: fixed;
        font-size: 70px;
        opacity: .08;
        pointer-events: none;
        animation: balancar 3s infinite ease-in-out;
    }

    .teia1 {
        top: 100px;
        right: 20px;
    }

    .teia2 {
        bottom: 30px;
        left: 20px;
    }

    @keyframes balancar {
        0%, 100% {
            transform: rotate(-10deg);
        }

        50% {
            transform: rotate(10deg);
        }
    }

    /* RESPONSIVO */
    @media (max-width: 700px) {

        header {
            padding: 15px 5%;
        }

        .logo {
            font-size: 20px;
        }

        nav a {
            font-size: 12px;
            margin-left: 7px;
        }

        .hero h1 {
            font-size: 55px;
        }

        .hero p {
            font-size: 17px;
        }

        section {
            padding: 60px 6%;
        }
    }
</style>
