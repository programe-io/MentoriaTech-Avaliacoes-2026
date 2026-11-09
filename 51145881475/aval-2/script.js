
let restaurantes = JSON.parse(
    localStorage.getItem("restaurantes")
) || [];

let favoritos = JSON.parse(
    localStorage.getItem("favoritosFood")
) || [];

let restauranteAtual = null;

function salvarDados() {
    localStorage.setItem(
        "restaurantes",
        JSON.stringify(restaurantes)
    );

    localStorage.setItem(
        "favoritosFood",
        JSON.stringify(favoritos)
    );
}

function mostrarSecao(id) {
    document.querySelectorAll("main section").forEach(secao => {
        secao.classList.add("escondido");
    });

    document.getElementById(id).classList.remove("escondido");
}

function mostrarInicio() {
    mostrarSecao("inicio");
    exibirRestaurantes();
}

function mostrarCadastro() {
    mostrarSecao("cadastro");
}

function cadastrarRestaurante() {
    const nome = document.getElementById("nome").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const descricao = document.getElementById("descricao").value.trim();

    if (!nome || !categoria || !endereco || !descricao) {
        alert("Preencha todos os campos!");
        return;
    }

    restaurantes.push({
        id: Date.now(),
        nome,
        categoria,
        endereco,
        descricao,
        avaliacoes: []
    });

    salvarDados();

    document.getElementById("nome").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("endereco").value = "";
    document.getElementById("descricao").value = "";

    alert("Restaurante cadastrado com sucesso!");

    mostrarInicio();
}

function calcularMedia(restaurante) {
    const avaliacoes = restaurante.avaliacoes;

    if (avaliacoes.length === 0) return "Sem avaliações";

    const soma = avaliacoes.reduce(
        (total, item) => total + Number(item.nota), 0
    );

    return (soma / avaliacoes.length).toFixed(1);
}

function exibirRestaurantes(lista = restaurantes, elemento = "listaRestaurantes") {
    const container = document.getElementById(elemento);
    container.innerHTML = "";

    if (lista.length === 0) {
        container.textContent = "Nenhum restaurante encontrado.";
        return;
    }

    lista.forEach(restaurante => {
        const card = document.createElement("div");
        card.className = "restaurante";

        const titulo = document.createElement("h3");
        titulo.textContent = "🍽️ " + restaurante.nome;

        const categoria = document.createElement("p");
        categoria.textContent = "Categoria: " + restaurante.categoria;

        const endereco = document.createElement("p");
        endereco.textContent = "📍 " + restaurante.endereco;

        const media = document.createElement("p");
        media.textContent = "⭐ " + calcularMedia(restaurante);

        const botao = document.createElement("button");
        botao.textContent = "Ver avaliações";
        botao.onclick = () => abrirRestaurante(restaurante.id);

        const favorito = document.createElement("button");
        favorito.textContent = favoritos.includes(restaurante.id)
            ? "❤️ Favorito"
            : "🤍 Favoritar";

        favorito.onclick = () => alternarFavorito(restaurante.id);

        card.append(titulo, categoria, endereco, media, botao, favorito);
        container.appendChild(card);
    });
}

function abrirRestaurante(id) {
    restauranteAtual = restaurantes.find(r => r.id === id);

    if (!restauranteAtual) return;

    const informacoes = document.getElementById("informacoes");
    informacoes.innerHTML = "";

    const titulo = document.createElement("h2");
    titulo.textContent = restauranteAtual.nome;

    const descricao = document.createElement("p");
    descricao.textContent = restauranteAtual.descricao;

    const endereco = document.createElement("p");
    endereco.textContent = "📍 " + restauranteAtual.endereco;

    const media = document.createElement("p");
    media.textContent = "⭐ Média: " + calcularMedia(restauranteAtual);

    informacoes.append(titulo, descricao, endereco, media);

    mostrarSecao("detalhes");
    exibirComentarios();
}

function enviarAvaliacao() {
    if (!restauranteAtual) return;

    const nome = document.getElementById("nomeCliente").value.trim();
    const nota = Number(document.getElementById("nota").value);
    const comentario = document.getElementById("comentario").value.trim();

    if (!nome || !comentario) {
        alert("Informe seu nome e escreva um comentário!");
        return;
    }

    restauranteAtual.avaliacoes.push({
        nome,
        nota,
        comentario,
        data: new Date().toLocaleDateString("pt-BR")
    });

    salvarDados();

    document.getElementById("nomeCliente").value = "";
    document.getElementById("comentario").value = "";

    alert("Avaliação enviada com sucesso!");

    abrirRestaurante(restauranteAtual.id);
}

function exibirComentarios() {
    const container = document.getElementById("listaComentarios");
    container.innerHTML = "";

    if (restauranteAtual.avaliacoes.length === 0) {
        container.textContent = "Ainda não existem avaliações.";
        return;
    }

    restauranteAtual.avaliacoes.forEach(avaliacao => {
        const card = document.createElement("div");
        card.className = "comentario-card";

        const nome = document.createElement("strong");
        nome.textContent = avaliacao.nome;

        const nota = document.createElement("p");
        nota.textContent = "⭐".repeat(avaliacao.nota);

        const comentario = document.createElement("p");
        comentario.textContent = avaliacao.comentario;

        const data = document.createElement("small");
        data.textContent = "Publicado em: " + avaliacao.data;

        card.append(nome, nota, comentario, data);
        container.appendChild(card);
    });
}

function pesquisarRestaurantes() {
    const termo = document.getElementById("pesquisa")
        .value.toLowerCase();

    const encontrados = restaurantes.filter(restaurante =>
        restaurante.nome.toLowerCase().includes(termo) ||
        restaurante.categoria.toLowerCase().includes(termo)
    );

    exibirRestaurantes(encontrados);
}

function alternarFavorito(id) {
    if (favoritos.includes(id)) {
        favoritos = favoritos.filter(item => item !== id);
    } else {
        favoritos.push(id);
    }

    salvarDados();
    exibirRestaurantes();
}

function mostrarFavoritos() {
    mostrarSecao("favoritos");

    const lista = restaurantes.filter(restaurante =>
        favoritos.includes(restaurante.id)
    );

    exibirRestaurantes(lista, "listaFavoritos");
}

exibirRestaurantes();
