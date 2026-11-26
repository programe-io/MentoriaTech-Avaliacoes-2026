
let produtos = [];

const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value.trim();
    let categoria = document.getElementById("categoria").value.trim();
    let quantidade = Number(document.getElementById("quantidade").value);

    if (nome === "" || categoria === "" ||
        !Number.isInteger(quantidade) || quantidade < 0) {
        alert("Preencha os campos corretamente!");
        return;
    }

    produtos.push({
        nome: nome,
        categoria: categoria,
        quantidade: quantidade
    });

    formulario.reset();
    atualizar();
});

function atualizar() {
    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    let termo = document.getElementById("pesquisa").value.toLowerCase();

    produtos.forEach((produto, indice) => {

        if (!produto.nome.toLowerCase().includes(termo)) {
            return;
        }

        let linha = document.createElement("tr");

        function celula(valor) {
            let td = document.createElement("td");
            td.textContent = valor;
            return td;
        }

        linha.appendChild(celula(produto.nome));
        linha.appendChild(celula(produto.categoria));
        linha.appendChild(celula(produto.quantidade));

        let situacao = celula(
            produto.quantidade <= 5 ? "Estoque Baixo" : "Normal"
        );

        situacao.className =
            produto.quantidade <= 5 ? "baixo" : "normal";

        linha.appendChild(situacao);

        let acoes = document.createElement("td");

        function criarBotao(texto, classe, acao) {
            let botao = document.createElement("button");
            botao.textContent = texto;
            botao.className = classe;
            botao.onclick = acao;
            return botao;
        }

        acoes.appendChild(criarBotao("+", "", () => {
            produtos[indice].quantidade++;
            atualizar();
        }));

        acoes.appendChild(criarBotao("-", "", () => {
            if (produtos[indice].quantidade > 0) {
                produtos[indice].quantidade--;
                atualizar();
            } else {
                alert("Estoque vazio!");
            }
        }));

        acoes.appendChild(criarBotao("Excluir", "excluir", () => {
            produtos.splice(indice, 1);
            atualizar();
        }));

        linha.appendChild(acoes);
        lista.appendChild(linha);
    });

    document.getElementById("total").textContent =
        produtos.length;

    document.getElementById("unidades").textContent =
        produtos.reduce((soma, p) => soma + p.quantidade, 0);

    document.getElementById("baixo").textContent =
        produtos.filter(p => p.quantidade <= 5).length;
}

document.getElementById("pesquisa")
.addEventListener("input", atualizar);

atualizar();
