
document.addEventListener("DOMContentLoaded", () => {

    // Inicializa os ícones Lucide.
    lucide.createIcons();

    // ELEMENTOS DO HTML
    const pesquisa = document.getElementById("pesquisa");
    const listaPedidos = document.getElementById("listaPedidos");
    const semResultados = document.getElementById("semResultados");

    const modalProduto = document.getElementById("modalProduto");
    const formProduto = document.getElementById("formProduto");

    const nomeProduto = document.getElementById("nomeProduto");
    const precoProduto = document.getElementById("precoProduto");
    const totalProdutos = document.getElementById("totalProdutos");

    const botaoNovoProduto = document.getElementById("novoProduto");
    const botaoCancelar = document.getElementById("cancelarProduto");

    // PESQUISA DE PEDIDOS
    pesquisa.addEventListener("input", () => {
        const termo = pesquisa.value
            .trim()
            .toLocaleLowerCase("pt-BR");

        const linhas = listaPedidos.querySelectorAll("tr");
        let encontrados = 0;

        linhas.forEach((linha) => {
            const conteudo = linha.textContent
                .toLocaleLowerCase("pt-BR");

            const corresponde = conteudo.includes(termo);

            linha.hidden = !corresponde;

            if (corresponde) {
                encontrados++;
            }
        });

        semResultados.hidden = encontrados !== 0;
    });

    // ABRIR MODAL
    botaoNovoProduto.addEventListener("click", () => {
        modalProduto.showModal();
        nomeProduto.focus();
    });

    // FECHAR MODAL
    botaoCancelar.addEventListener("click", () => {
        modalProduto.close();
        formProduto.reset();
    });

    // CADASTRO DEMONSTRATIVO
    formProduto.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const nome = nomeProduto.value.trim();
        const preco = Number(precoProduto.value);

        if (!nome || !Number.isFinite(preco) || preco <= 0) {
            alert("Informe um nome e um preço válido.");
            return;
        }

        // Cria elementos usando textContent para exibir
        // o nome como texto, sem interpretar HTML.
        const linha = document.createElement("tr");

        const colunaNome = document.createElement("td");
        colunaNome.textContent = nome;

        const colunaPreco = document.createElement("td");
        colunaPreco.textContent = preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        const colunaStatus = document.createElement("td");
        const status = document.createElement("span");

        status.className = "status entregue";
        status.textContent = "Cadastrado";

        colunaStatus.appendChild(status);

        const colunaCodigo = document.createElement("td");
        colunaCodigo.textContent = "#NOVO";

        // A tabela de pedidos recebe o novo registro
        // apenas para demonstrar a manipulação do DOM.
        linha.append(
            colunaCodigo,
            colunaNome,
            colunaPreco,
            colunaStatus
        );

        listaPedidos.prepend(linha);

        totalProdutos.textContent =
            Number(totalProdutos.textContent) + 1;

        modalProduto.close();
        formProduto.reset();

        alert(
            `Produto "${nome}" adicionado à demonstração.`
        );
    });

    // NAVEGAÇÃO DO MENU
    const linksMenu = document.querySelectorAll(".menu-item");

    linksMenu.forEach((link) => {
        link.addEventListener("click", () => {
            linksMenu.forEach((item) => {
                item.classList.remove("ativo");
            });

            link.classList.add("ativo");
        });
    });

});
