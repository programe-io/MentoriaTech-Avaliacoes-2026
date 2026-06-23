<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Educação Integral no Brasil</title>

<style>
body{
    margin:0;
    font-family:Arial, sans-serif;
    background:#f4f6f8;
    color:#333;
}

header{
    background:linear-gradient(90deg,#1565c0,#1e88e5);
    color:white;
    text-align:center;
    padding:30px;
}

nav{
    background:#0d47a1;
    text-align:center;
    padding:10px;
}

nav a{
    color:white;
    text-decoration:none;
    margin:0 15px;
    font-weight:bold;
}

main{
    display:flex;
    gap:20px;
    padding:20px;
}

section{
    flex:3;
}

article{
    background:white;
    padding:20px;
    margin-bottom:20px;
    border-radius:10px;
    box-shadow:0 2px 8px rgba(0,0,0,0.1);
}

aside{
    flex:1;
    background:#e3f2fd;
    padding:20px;
    border-radius:10px;
}

img{
    width:100%;
    border-radius:10px;
    margin-top:10px;
}

button{
    background:#1565c0;
    color:white;
    border:none;
    padding:12px 15px;
    border-radius:8px;
    cursor:pointer;
    margin-top:10px;
}

button:hover{
    background:#0d47a1;
}

#info{
    margin-top:15px;
    font-weight:bold;
}
</style>
</head>

<body>

<header>
    <h1>📚 Educação Integral no Brasil</h1>
    <p>Aprendizado completo para o desenvolvimento dos estudantes</p>
</header>

<nav>
    <a href="#">Início</a>
    <a href="#">Benefícios</a>
    <a href="#">Projetos</a>
</nav>

<main>

    <section>

        <article>
            <h2>O que é Educação Integral?</h2>
            <p>
                A educação integral busca desenvolver o aluno de forma completa,
                incluindo aspectos acadêmicos, sociais, culturais e emocionais.
            </p>

            <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
                 alt="Sala de aula com estudantes">
        </article>

        <article>
            <h2>Benefícios da Educação Integral</h2>
            <ul>
                <li>Melhora no desempenho escolar</li>
                <li>Mais atividades culturais e esportivas</li>
                <li>Desenvolvimento de habilidades sociais</li>
                <li>Maior preparação para o futuro</li>
            </ul>

            <button onclick="mostrarInfo()">Ver mais informações</button>

            <div id="info"></div>
        </article>

    </section>

    <aside>
        <h3>💡 Curiosidades</h3>
        <ul>
            <li>Presente em escolas públicas do Brasil</li>
            <li>Amplia o tempo de permanência do aluno na escola</li>
            <li>Inclui esportes, artes e tecnologia</li>
        </ul>

        <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
             alt="Estudantes estudando juntos">
    </aside>

</main>

<footer style="background:#0d47a1;color:white;text-align:center;padding:15px;">
    © 2026 - Educação Integral no Brasil
</footer>

<script>
function mostrarInfo(){
    const mensagens = [
        "📖 A educação integral melhora a concentração dos alunos.",
        "🎨 Inclui atividades artísticas e culturais no aprendizado.",
        "⚽ Incentiva esportes e hábitos saudáveis.",
        "💻 Desenvolve habilidades tecnológicas importantes.",
        "🤝 Ajuda na convivência social e trabalho em equipe."
    ];

    const aleatorio = Math.floor(Math.random() * mensagens.length);

    document.getElementById("info").textContent = mensagens[aleatorio];
}
</script>

</body>
</html>