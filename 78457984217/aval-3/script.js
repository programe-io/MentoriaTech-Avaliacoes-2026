let saldo = 1000;

let historico = [];

function formatar(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function atualizar() {
    document.getElementById("saldo").textContent =
        formatar(saldo);

    const lista = document.getElementById("transacoes");

    lista.innerHTML = "";

    historico.forEach(transacao => {
        const item = document.createElement("div");

        item.className = "transacao " + transacao.tipo;

        item.textContent =
            transacao.nome + " — " + formatar(transacao.valor);

        lista.appendChild(item);
    });
}

function obterValor() {
    const campo = document.getElementById("valor");
    const valor = Number(campo.value);

    if (!Number.isFinite(valor) || valor <= 0) {
        alert("Digite um valor válido!");
        return null;
    }

    return valor;
}

function depositar() {
    const valor = obterValor();

    if (valor === null) return;

    saldo += valor;

    historico.unshift({
        nome: "📥 Depósito",
        valor: valor,
        tipo: "entrada"
    });

    document.getElementById("valor").value = "";

    atualizar();
}

function sacar() {
    const valor = obterValor();

    if (valor === null) return;

    if (valor > saldo) {
        alert("Saldo insuficiente!");
        return;
    }

    saldo -= valor;

    historico.unshift({
        nome: "📤 Saque",
        valor: valor,
        tipo: "saida"
    });

    document.getElementById("valor").value = "";

    atualizar();
}

function reiniciar() {
    saldo = 1000;
    historico = [];

    atualizar();
}

atualizar();