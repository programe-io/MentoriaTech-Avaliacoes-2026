document.addEventListener("DOMContentLoaded", () => {

    // Selecionar os carros da loja
    const carros = [...document.querySelectorAll("#carros div")];

    const secaoCarros = document.querySelector("#carros");

    // Carrinho e favoritos
    let carrinho = [];
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    // Criar área de pesquisa
    const pesquisa = document.createElement("input");
    pesquisa.type = "text";
    pesquisa.placeholder = "Pesquisar carro...";
    pesquisa.id = "pesquisaCarro";

    // Criar filtro de marca
    const filtro = document.createElement("select");
    filtro.innerHTML = `
        <option value="">Todas as marcas</option>
    `;

    // Criar ordenação
    const ordenacao = document.createElement("select");
    ordenacao.innerHTML = `
        <option value="">Ordenar por preço</option>
        <option value="menor">Menor preço</option>
        <option value="maior">Maior preço</option>
    `;

    // Criar botão de favoritos
    const botaoFavoritos = document.createElement("button");
    botaoFavoritos.textContent = "❤️ Favoritos";

    // Criar botão do carrinho
    const botaoCarrinho = document.createElement("button");
    botaoCarrinho.textContent = "🛒 Carrinho (0)";

    // Criar área de controles
    const controles = document.createElement("div");

    controles.append(
        pesquisa,
        filtro,
        ordenacao,
        botaoFavoritos,
        botaoCarrinho
    );

    secaoCarros.insertBefore(
        controles,
        secaoCarros.querySelector("div")
    );

    // Preparar informações dos carros
    carros.forEach((carro, indice) => {

        const titulo = carro.querySelector("h3");
        const nome = titulo ? titulo.textContent.trim() : "Carro";

        const precoTexto = carro.textContent;
        const precoEncontrado = precoTexto.match(
            /R\$\s*([\d.]+)(?:,\d{2})?/
        );

        let preco = 0;

        if (precoEncontrado) {
            preco = Number(
                precoEncontrado[1].replace(/\./g, "")
            );
        }

        carro.dataset.nome = nome;
        carro.dataset.preco = preco;
        carro.dataset.id = indice;

        // Adicionar marca ao filtro
        const marca = nome.split(" ")[0];

        if (
            ![...filtro.options].some(
                opcao => opcao.value === marca
            )
        ) {
            const opcao = document.createElement("option");
            opcao.value = marca;
            opcao.textContent = marca;
            filtro.appendChild(opcao);
        }

        // Botão de favorito
        const favorito = document.createElement("button");

        favorito.className = "favorito";
        favorito.textContent = favoritos.includes(nome)
            ? "❤️ Favoritado"
            : "🤍 Favoritar";

        carro.appendChild(favorito);

        // Botão de detalhes
        const detalhes = document.createElement("button");

        detalhes.textContent = "Ver detalhes";
        detalhes.className = "detalhes";

        carro.appendChild(detalhes);

    });

    // Pesquisa e filtros
    function filtrarCarros() {

        const texto = pesquisa.value.toLowerCase();
        const marcaSelecionada = filtro.value;

        carros.forEach(carro => {

            const nome = carro.dataset.nome.toLowerCase();
            const marca = carro.dataset.nome.split(" ")[0];

            const combinaTexto = nome.includes(texto);

            const combinaMarca =
                !marcaSelecionada ||
                marca === marcaSelecionada;

            const mostrar =
                combinaTexto && combinaMarca;

            carro.style.display = mostrar
                ? "inline-block"
                : "none";
        });

    }

    pesquisa.addEventListener("input", filtrarCarros);
    filtro.addEventListener("change", filtrarCarros);

    // Ordenar carros por preço
    ordenacao.addEventListener("change", () => {

        const ordem = ordenacao.value;

        const carrosOrdenados = [...carros];

        carrosOrdenados.sort((a, b) => {

            const precoA = Number(a.dataset.preco);
            const precoB = Number(b.dataset.preco);

            if (ordem === "menor") {
                return precoA - precoB;
            }

            if (ordem === "maior") {
                return precoB - precoA;
            }

            return 0;
        });

        carrosOrdenados.forEach(carro => {
            secaoCarros.appendChild(carro);
        });

    });

    // Favoritar carros
    carros.forEach(carro => {

        const botao = carro.querySelector(".favorito");
        const nome = carro.dataset.nome;

        botao.addEventListener("click", () => {

            if (favoritos.includes(nome)) {

                favoritos = favoritos.filter(
                    item => item !== nome
                );

                botao.textContent = "🤍 Favoritar";

            } else {

                favoritos.push(nome);
                botao.textContent = "❤️ Favoritado";

            }

            localStorage.setItem(
                "favoritos",
                JSON.stringify(favoritos)
            );

        });

    });

    // Mostrar somente favoritos
    let mostrandoFavoritos = false;

    botaoFavoritos.addEventListener("click", () => {

        mostrandoFavoritos = !mostrandoFavoritos;

        carros.forEach(carro => {

            const nome = carro.dataset.nome;

            if (mostrandoFavoritos) {

                carro.style.display = favoritos.includes(nome)
                    ? "inline-block"
                    : "none";

            } else {

                carro.style.display = "inline-block";

            }

        });

        if (!mostrandoFavoritos) {
            filtrarCarros();
        }

    });

    // Carrinho de compras
    carros.forEach(carro => {

        const botaoComprar = carro.querySelector("button");

        botaoComprar.addEventListener("click", () => {

            const nome = carro.dataset.nome;
            const preco = Number(carro.dataset.preco);

            const itemExistente = carrinho.find(
                item => item.nome === nome
            );

            if (itemExistente) {

                itemExistente.quantidade++;

            } else {

                carrinho.push({
                    nome: nome,
                    preco: preco,
                    quantidade: 1
                });

            }

            atualizarCarrinho();

            alert(nome + " foi adicionado ao carrinho!");

        });

    });

    // Atualizar quantidade e total
    function atualizarCarrinho() {

        const quantidade = carrinho.reduce(
            (total, item) => total + item.quantidade,
            0
        );

        botaoCarrinho.textContent =
            `🛒 Carrinho (${quantidade})`;

    }

    // Mostrar carrinho
    botaoCarrinho.addEventListener("click", () => {

        if (carrinho.length === 0) {

            alert("Seu carrinho está vazio!");

            return;
        }

        let mensagem = "🛒 SEU CARRINHO\n\n";

        carrinho.forEach(item => {

            mensagem +=
                `${item.nome}\n` +
                `Quantidade: ${item.quantidade}\n` +
                `Preço: R$ ${item.preco.toLocaleString("pt-BR")}\n\n`;

        });

        const total = carrinho.reduce(
            (soma, item) =>
                soma + item.preco * item.quantidade,
            0
        );

        mensagem +=
            "TOTAL: R$ " +
            total.toLocaleString("pt-BR");

        alert(mensagem);

    });

    // Detalhes do veículo
    carros.forEach(carro => {

        const botao = carro.querySelector(".detalhes");

        botao.addEventListener("click", () => {

            const nome = carro.dataset.nome;
            const preco = Number(carro.dataset.preco);

            alert(
                "🚘 " + nome + "\n\n" +
                "Preço: R$ " +
                preco.toLocaleString("pt-BR") +
                "\n\nEntre em contato para mais informações!"
            );

        });

    });

});
