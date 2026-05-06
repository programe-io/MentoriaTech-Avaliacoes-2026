function mudarConteudo(pagina) {
    const titulo = document.getElementById("titulo");
    const texto = document.getElementById("texto");
    const imagem = document.getElementById("imagem");
    const aside = document.getElementById("infoExtra");

    if (pagina === "home") {
        titulo.innerText = "Página Inicial";
        texto.innerText = "Bem-vindo ao site!";
        imagem.src = "https://via.placeholder.com/300/00aaff";
        aside.innerHTML = "<h3>Home</h3><p>Você está na página inicial.</p>";
    }

    if (pagina === "sobre") {
        titulo.innerText = "Sobre Nós";
        texto.innerText = "Somos uma empresa fictícia.";
        imagem.src = "https://via.placeholder.com/300/ffaa00";
        aside.innerHTML = "<h3>Sobre</h3><p>Mais informações sobre nós.</p>";
    }

    if (pagina === "contato") {
        titulo.innerText = "Contato";
        texto.innerText = "Entre em contato conosco.";
        imagem.src = "https://via.placeholder.com/300/00cc66";
        aside.innerHTML = "<h3>Contato</h3><p>Email: exemplo@email.com</p>";
    }
}