
let produtos = [];

const formulario = document.getElementById("formulario");

// Cadastrar produto
formulario.addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const codigo = document.getElementById("codigo").value.trim();
    const qtd = Number(document.getElementById("qtd").value);
    const preco = Number(document.getElementById("preco").value);

    if (produtos.some(p => p.codigo === codigo)) {
        alert("Este código já está cadastrado!");
        return;
    }

    produtos.push({
        nome,
        codigo,
        qtd,
        preco
    });

    formulario.reset();
    atualizar();
});

// Atualizar tabela e indicadores
function atualizar() {
    const lista = document.getElementById("lista");

    lista.innerHTML = "";

    produtos.forEach((p, i) => {
        const status = p.qtd <= 5
            ? "Estoque baixo"
            : "Disponível";

        lista.innerHTML += `
            <tr>
                <td>${p.nome}</td>
                <td>${p.codigo}</td>
                <td>${p.qtd}</td>
                <td>R$ ${p.preco.toFixed(2)}</td>
                <td>
                    <span class="status ${p.qtd <= 5 ? 'baixo' : ''}">
                        ${status}
                    </span>
                </td>
                <td>
                    <button onclick="remover(${i})">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });

    // Atualizar indicadores
    document.getElementById("total").textContent =
        produtos.length;

    document.getElementById("quantidade").textContent =
        produtos.reduce((s, p) => s + p.qtd, 0);

    document.getElementById("baixo").textContent =
        produtos.filter(p => p.qtd <= 5).length;
}

// Excluir produto
function remover(i) {
    if (confirm("Deseja excluir este produto?")) {
        produtos.splice(i, 1);
        atualizar();
    }
}

// Pesquisar produtos
document.getElementById("pesquisa")
.addEventListener("input", function() {
    const termo = this.value.toLowerCase();

    document.querySelectorAll("#lista tr")
    .forEach((linha, i) => {
        const p = produtos[i];

        linha.style.display =
            p.nome.toLowerCase().includes(termo) ||
            p.codigo.toLowerCase().includes(termo)
            ? ""
            : "none";
    });
});
