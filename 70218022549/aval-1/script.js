let saldo = 1000;

// =================================
// IF / ELSE
// =================================

function consultarSaldo() {

    document.getElementById("mensagem").innerHTML =
        "Seu saldo atual é: R$ " + saldo.toFixed(2);
}


// =================================
// IF / ELSE
// =================================

function sacar() {

    let valor = Number(
        prompt("Digite o valor que deseja sacar:")
    );

    if (valor <= 0) {

        document.getElementById("mensagem").innerHTML =
            "❌ Digite um valor válido.";

    } else if (valor > saldo) {

        document.getElementById("mensagem").innerHTML =
            "❌ Saldo insuficiente.";

    } else {

        saldo = saldo - valor;

        document.getElementById("mensagem").innerHTML =
            "✅ Saque realizado com sucesso!<br>" +
            "Valor retirado: R$ " + valor.toFixed(2) +
            "<br>Saldo restante: R$ " + saldo.toFixed(2);

        atualizarSaldo();
    }
}


// =================================
// IF / ELSE
// =================================

function depositar() {

    let valor = Number(
        prompt("Digite o valor que deseja depositar:")
    );

    if (valor <= 0) {

        document.getElementById("mensagem").innerHTML =
            "❌ Digite um valor válido.";

    } else {

        saldo = saldo + valor;

        document.getElementById("mensagem").innerHTML =
            "✅ Depósito realizado com sucesso!<br>" +
            "Valor depositado: R$ " + valor.toFixed(2) +
            "<br>Saldo atual: R$ " + saldo.toFixed(2);

        atualizarSaldo();
    }
}


// =================================
// SWITCH / CASE
// =================================

function menu() {

    let opcao;

    // DO WHILE
    do {

        opcao = prompt(
            "===== CAIXA ELETRÔNICO =====\n\n" +
            "1 - Consultar saldo\n" +
            "2 - Sacar dinheiro\n" +
            "3 - Depositar dinheiro\n" +
            "4 - Sair\n\n" +
            "Escolha uma opção:"
        );

        // SWITCH / CASE
        switch (opcao) {

            case "1":
                consultarSaldo();
                break;

            case "2":
                sacar();
                break;

            case "3":
                depositar();
                break;

            case "4":
                sair();
                break;

            default:
                alert("Opção inválida!");
        }

    } while (opcao !== "4");
}


// =================================
// FOR
// =================================

function sair() {

    let mensagem = "Encerrando sistema...\n";

    for (let i = 3; i >= 1; i--) {
        mensagem += i + "\n";
    }

    mensagem += "Sistema encerrado!";

    alert(mensagem);

    document.getElementById("mensagem").innerHTML =
        "🔒 Sistema encerrado!";
}


// =================================
// WHILE
// =================================

function contar() {

    let numero = 1;

    while (numero <= 3) {

        console.log("Número: " + numero);

        numero++;
    }
}


// =================================
// ATUALIZAR SALDO NA TELA
// =================================

function atualizarSaldo() {

    document.getElementById("saldo").innerHTML =
        "R$ " + saldo.toFixed(2);
}


// =================================
// INICIAR
// =================================

contar();