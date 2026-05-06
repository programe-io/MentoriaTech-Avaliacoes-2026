function carregar(pagina) {
    const conteudo = document.getElementById("conteudo");
    const lateral = document.getElementById("lateral");

    if (pagina === "home") {
        conteudo.innerHTML = `
            <h2>Home</h2>
            <img src="https://via.placeholder.com/400/00aaff">
            <p>Bem-vindo ao nosso site!</p>
        `;
        lateral.innerHTML = "<h3>Home</h3><p>Você está na página inicial.</p>";
    }

    if (pagina === "noticias") {
        conteudo.innerHTML = `
            <h2>Notícias</h2>
            <img src="https://via.placeholder.com/400/ffaa00">
            <p>Últimas notícias do dia.</p>
        `;
        lateral.innerHTML = "<h3>Notícias</h3><p>Atualizações recentes.</p>";
    }

    if (pagina === "contato") {
        conteudo.innerHTML = `
            <h2>Contato</h2>
            <img src="https://via.placeholder.com/400/00cc66">
            <p>Email: contato@email.com</p>
        `;
        lateral.innerHTML = "<h3>Contato</h3><p>Fale conosco.</p>";
    }
}