
let quantidade = 0;

function adicionarCarrinho() {
    quantidade++;

    document.getElementById("contador").innerText = quantidade;

    Swal.fire({
        title: "Produto adicionado!",
        text: "Seu produto foi adicionado ao carrinho com sucesso.",
        icon: "success",
        confirmButtonText: "Continuar comprando",
        confirmButtonColor: "#b18b50",
        background: "#f8f7f4",
        color: "#171717"
    });
}
