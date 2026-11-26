
// Selecionar formulário
const formulario = document.getElementById("formAnamnese");

// Definir data atual
const hoje = new Date();

const dataAtual = [
    hoje.getFullYear(),
    String(hoje.getMonth() + 1).padStart(2, "0"),
    String(hoje.getDate()).padStart(2, "0")
].join("-");

document.getElementById("dataFicha").value = dataAtual;

// Finalizar ficha
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();

    const telefone = document.getElementById("telefone").value.trim();

    const nascimento = document.getElementById("nascimento").value;

    const assinatura = document.getElementById("assinatura").value.trim();

    const consentimento = document.getElementById("consentimento");

    if (!nome || !telefone || !nascimento || !assinatura) {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }

    if (!consentimento.checked) {
        alert("É necessário confirmar a declaração.");
        return;
    }

    alert(
        "Ficha de anamnese preenchida com sucesso!\n\n" +
        "Paciente: " + nome +
        "\nTelefone: " + telefone
    );

});

// Imprimir ficha
document.getElementById("imprimir").addEventListener("click", function() {

    window.print();

});

// Limpar formulário
formulario.addEventListener("reset", function() {

    setTimeout(() => {
        document.getElementById("dataFicha").value = dataAtual;
    }, 0);

});

// Formatar CPF
document.getElementById("cpf").addEventListener("input", function() {

    let valor = this.value.replace(/\D/g, "").slice(0, 11);

    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    this.value = valor;

});

// Formatar telefone
document.getElementById("telefone").addEventListener("input", function() {

    let valor = this.value.replace(/\D/g, "").slice(0, 11);

    if (valor.length > 10) {
        valor = valor.replace(
            /^(\d{2})(\d{5})(\d{4})$/,
            "($1) $2-$3"
        );
    } else if (valor.length > 6) {
        valor = valor.replace(
            /^(\d{2})(\d{4})(\d{0,4})$/,
            "($1) $2-$3"
        );
    } else if (valor.length > 2) {
        valor = valor.replace(
            /^(\d{2})(\d+)/,
            "($1) $2"
        );
    }

    this.value = valor;

});
