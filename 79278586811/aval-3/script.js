
let saldo = 500;

function consultarSaldo() {
    alert("Seu saldo atual é: R$ " + saldo.toFixed(2));
}

function depositar(valor) {
    if (valor > 0) {
        saldo += valor;

        alert("Depósito realizado com sucesso!");
        consultarSaldo();
    } else {
        alert("Digite um valor válido!");
    }
}

function sacar(valor) {
    if (valor <= 0) {
        alert("Digite um valor válido!");
    } else if (valor > saldo) {
        alert("Saldo insuficiente!");
    } else {
        saldo -= valor;

        alert("Saque realizado com sucesso!");
        consultarSaldo();
    }
}

// MENU PRINCIPAL
let opcao;

do {
    opcao = prompt(
        "BANCO DIGITAL\n\n" +
        "1 - Consultar saldo\n" +
        "2 - Depositar\n" +
        "3 - Sacar\n" +
        "4 - Sair\n\n" +
        "Escolha uma opção:"
    );

    switch (opcao) {

        case "1":
            consultarSaldo();
            break;

        case "2":
            let deposito = Number(
                prompt("Digite o valor do depósito:")
            );

            depositar(deposito);
            break;

        case "3":
            let saque = Number(
                prompt("Digite o valor do saque:")
            );

            sacar(saque);
            break;

        case "4":
            alert("Obrigado por utilizar nosso banco!");
            break;

        default:
            alert("Opção inválida!");
    }

} while (opcao !== "4");
