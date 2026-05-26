<style>
    body{
        margin: 0;
        font-family: Arial, sans-serif;
    }

    header{
        background-color: #007bff;
        color: white;
        padding: 20px;
        text-align: center;
    }

    nav{
        background-color: #0056b3;
        padding: 10px;
        text-align: center;
    }

    nav a{
        color: white;
        text-decoration: none;
        margin: 15px;
        font-weight: bold;
    }

    nav a:hover{
        color: yellow;
    }

    .container{
        display: flex;
    }

    aside{
        width: 25%;
        background-color: #f1f1f1;
        padding: 20px;
        height: 500px;
    }

    main{
        width: 75%;
        padding: 20px;
    }

    article{
        background-color: #f9f9f9;
        padding: 15px;
        margin-bottom: 20px;
        border-left: 5px solid #007bff;
        border-radius: 5px;
    }

    h3{
        color: #007bff;
    }

    img{
        width: 100%;
        max-width: 300px;
        border-radius: 10px;
        margin-top: 10px;
    }

    footer{
        background-color: #007bff;
        color: white;
        text-align: center;
        padding: 15px;
        margin-top: 20px;
    }
</style>

<header>
    <h1>Índice de Poluição</h1>
    <p>Sistema de Monitoramento Ambiental</p>
</header>

<nav>
    <a href="#">Início</a>
    <a href="#">Sobre</a>
    <a href="#">Contato</a>
</nav>

<div class="container">

    <aside>
        <h2>Informações</h2>

        <p>
            O índice de poluição mede a qualidade do ar.
        </p>

        <h3>Dica</h3>

        <p>
            Evite sair em horários com muita fumaça.
        </p>

        <img 
            src="https://cdn-icons-png.flaticon.com/512/2936/2936886.png"
            alt="Poluição"
        >
    </aside>

    <main>

        <h2>Conteúdo Principal</h2>

        <article>
            <h3>Poluição Baixa</h3>

            <p>
                Quando o índice está abaixo de 35, o ar é considerado agradável.
            </p>

            <img 
                src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
                alt="Ar agradável"
            >
        </article>

        <article>
            <h3>Poluição Média</h3>

            <p>
                Entre 35 e 60, a qualidade do ar pode causar desconforto.
            </p>

            <img 
                src="https://cdn-icons-png.flaticon.com/512/414/414974.png"
                alt="Poluição média"
            >
        </article>

        <article>
            <h3>Poluição Alta</h3>

            <p>
                Acima de 60, a poluição é perigosa para a saúde.
            </p>

            <img 
                src="https://cdn-icons-png.flaticon.com/512/564/564619.png"
                alt="Poluição alta"
            >
        </article>

    </main>

</div>

<footer>
    <p>
        © 2025 Sistema de Monitoramento Ambiental
    </p>

    <p>
        Desenvolvido para estudo de HTML e CSS
    </p>
</footer>