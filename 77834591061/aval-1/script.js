// Pegando os elementos do HTML

const descricao = document.getElementById("descricao");
const valor = document.getElementById("valor");
const tipo = document.getElementById("tipo");

const botaoAdicionar =
    document.getElementById("adicionar");

const lista =
    document.getElementById("lista");

const saldo =
    document.getElementById("saldo");

const receitas =
    document.getElementById("receitas");

const despesas =
    document.getElementById("despesas");


// Valores iniciais

let totalReceitas = 0;
let totalDespesas = 0;


// Função para atualizar os valores

function atualizarResumo() {

    const total =
        totalReceitas - totalDespesas;

    saldo.textContent =
        "R$ " + total.toFixed(2);

    receitas.textContent =
        "R$ " + totalReceitas.toFixed(2);

    despesas.textContent =
        "R$ " + totalDespesas.toFixed(2);
}


// Adicionar movimentação

botaoAdicionar.addEventListener("click", function() {

    const nome =
        descricao.value.trim();

    const numero =
        Number(valor.value);

    const categoria =
        tipo.value;


    // Verificar os campos

    if (nome === "") {

        alert("Digite uma descrição.");

        return;
    }


    if (numero <= 0 || isNaN(numero)) {

        alert("Digite um valor válido.");

        return;
    }


    // Criar o item

    const item =
        document.createElement("li");

    item.classList.add("item");


    // Texto da movimentação

    const texto =
        document.createElement("span");

    if (categoria === "receita") {

        texto.textContent =
            nome + " + R$ " + numero.toFixed(2);

        texto.classList.add("receita");

        totalReceitas += numero;

    } else {

        texto.textContent =
            nome + " - R$ " + numero.toFixed(2);

        texto.classList.add("despesa");

        totalDespesas += numero;

    }


    // Botão excluir

    const botaoExcluir =
        document.createElement("button");

    botaoExcluir.textContent =
        "Excluir";

    botaoExcluir.classList.add("excluir");


    botaoExcluir.addEventListener("click", function() {

        if (categoria === "receita") {

            totalReceitas -= numero;

        } else {

            totalDespesas -= numero;

        }


        item.remove();

        atualizarResumo();

    });


    // Colocar elementos no item

    item.appendChild(texto);

    item.appendChild(botaoExcluir);


    // Colocar item na lista

    lista.appendChild(item);


    // Limpar campos

    descricao.value = "";

    valor.value = "";

    descricao.focus();


    // Atualizar resumo

    atualizarResumo();

});


// Mostrar valores iniciais

atualizarResumo();