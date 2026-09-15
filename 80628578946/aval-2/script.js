// ===============================
// CARRINHO
// ===============================

const botoesComprar = document.querySelectorAll(".comprar");
const contador = document.getElementById("contador");
const listaCarrinho = document.getElementById("listaCarrinho");
const totalElemento = document.getElementById("total");

const btnCarrinho = document.getElementById("btnCarrinho");
const modal = document.getElementById("modal");
const fecharModal = document.getElementById("fecharModal");
const finalizar = document.getElementById("finalizar");

let carrinho = [];
let total = 0;

// Preços dos produtos
const precos = {
    "Kit Batons Glamour": 59.90,
    "Perfume Floral": 89.90,
    "Bolsa Elegance": 129.90,
    "Kit Skin Care": 99.90,
    "Conjunto de Joias": 74.90,
    "Kit Hair Care": 69.90
};

// Adicionar produto
botoesComprar.forEach(function(botao) {

    botao.addEventListener("click", function() {

        const produto = botao.dataset.produto;

        carrinho.push(produto);

        total += precos[produto];

        atualizarCarrinho();

        alert(produto + " foi adicionado ao carrinho! 🛍️");
    });

});

// Atualizar carrinho
function atualizarCarrinho() {

    contador.textContent = carrinho.length;

    listaCarrinho.innerHTML = "";

    carrinho.forEach(function(produto) {

        const item = document.createElement("li");

        item.textContent =
            produto + " - R$ " +
            precos[produto].toFixed(2).replace(".", ",");

        listaCarrinho.appendChild(item);
    });

    totalElemento.textContent =
        total.toFixed(2).replace(".", ",");
}

// Abrir carrinho
btnCarrinho.addEventListener("click", function() {

    modal.classList.add("ativo");

});

// Fechar carrinho
fecharModal.addEventListener("click", function() {

    modal.classList.remove("ativo");

});

// Fechar clicando fora
modal.addEventListener("click", function(event) {

    if (event.target === modal) {
        modal.classList.remove("ativo");
    }

});

// Finalizar compra
finalizar.addEventListener("click", function() {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio! 🛍️");

        return;
    }

    alert(
        "Compra simulada realizada com sucesso! 💕\n" +
        "Total: R$ " +
        total.toFixed(2).replace(".", ",")
    );

    carrinho = [];
    total = 0;

    atualizarCarrinho();

    modal.classList.remove("ativo");
});

// ===============================
// BOTÃO DE AUTOCUIDADO
// ===============================

const btnMensagem = document.getElementById("btnMensagem");

btnMensagem.addEventListener("click", function() {

    alert(
        "💕 Você merece reservar um momento para cuidar de si!"
    );

});

// ===============================
// CUPOM
// ===============================

const btnCupom = document.getElementById("btnCupom");

btnCupom.addEventListener("click", async function() {

    const cupom = "DIVINA10";

    try {

        await navigator.clipboard.writeText(cupom);

        alert("Cupom DIVINA10 copiado! 🎉");

    } catch (erro) {

        alert("Seu cupom é: DIVINA10");

    }

});

// ===============================
// FORMULÁRIO
// ===============================

const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value;

    alert(
        "Obrigada pela mensagem, " +
        nome +
        "! 💕 Entraremos em contato."
    );

    formulario.reset();

});

// ===============================
// ANIMAÇÃO DOS PRODUTOS
// ===============================

const produtos = document.querySelectorAll(".produto");

const observador = new IntersectionObserver(
    function(entradas) {

        entradas.forEach(function(entrada) {

            if (entrada.isIntersecting) {

                entrada.target.style.opacity = "1";
                entrada.target.style.transform = "translateY(0)";

            }

        });

    },
    {
        threshold: 0.15
    }
);

produtos.forEach(function(produto) {

    produto.style.opacity = "0";
    produto.style.transform = "translateY(30px)";
    produto.style.transition = "0.6s";

    observador.observe(produto);

});