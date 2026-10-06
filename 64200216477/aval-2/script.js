const bebida = document.getElementById("bebida");
const tamanho = document.getElementById("tamanho");
const pedidoBtn = document.getElementById("pedidoBtn");
const resultado = document.getElementById("resultado");

pedidoBtn.addEventListener("click", function () {
    const bebidaSelecionada = bebida.options[bebida.selectedIndex];
    const tamanhoSelecionado = tamanho.options[tamanho.selectedIndex];

    let nomeBebida = bebidaSelecionada.value;
    let preco = Number(bebidaSelecionada.dataset.preco);
    let nomeTamanho = tamanhoSelecionado.value;

    preco += Number(tamanhoSelecionado.dataset.adicional);

    let adicionais = [];

    const checkboxes = document.querySelectorAll(
        '.adicionais input[type="checkbox"]:checked'
    );

    checkboxes.forEach(function (item) {
        adicionais.push(item.value);
        preco += Number(item.dataset.preco);
    });

    let listaAdicionais = adicionais.length > 0
        ? adicionais.join(", ")
        : "Nenhum";

    resultado.innerHTML = `
        <strong>☕ Pedido realizado com sucesso!</strong><br><br>
        <strong>Bebida:</strong> ${nomeBebida}<br>
        <strong>Tamanho:</strong> ${nomeTamanho}<br>
        <strong>Adicionais:</strong> ${listaAdicionais}<br>
        <strong>Total:</strong> R$ ${preco.toFixed(2).replace(".", ",")}
    `;

    resultado.style.display = "block";
});
