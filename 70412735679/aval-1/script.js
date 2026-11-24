const formulario = document.getElementById("formulario");
const lista = document.getElementById("lista");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const descricao = document.getElementById("descricao").value.trim();
    const valor = Number(document.getElementById("valor").value);
    const tipo = document.getElementById("tipo").value;

    if (!descricao || !Number.isFinite(valor) || valor <= 0) {
        alert("Informe uma descrição e um valor válido.");
        return;
    }

    const item = document.createElement("li");

    item.textContent =
        `${descricao} - ${tipo}: R$ ${valor.toFixed(2).replace(".", ",")}`;

    lista.appendChild(item);

    formulario.reset();
});