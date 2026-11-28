
// Preencher automaticamente a data e horário
document.getElementById("data").value =
    new Date().toLocaleDateString("en-CA");

document.getElementById("horario").value =
    new Date().toTimeString().slice(0, 5);

// Gerar número de prontuário
document.getElementById("prontuario").value =
    "HV-" + Date.now().toString().slice(-8);

// Máscara de CPF
document.getElementById("cpf").addEventListener("input", function() {
    let valor = this.value.replace(/\D/g, "").slice(0, 11);

    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    this.value = valor;
});

// Máscara de telefone
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
        valor = valor.replace(/^(\d{2})(\d+)/, "($1) $2");
    }

    this.value = valor;
});

// Salvar ficha no navegador
function salvarFicha() {
    const formulario = document.getElementById("ficha");

    if (!formulario.reportValidity()) {
        return;
    }

    const dados = {};

    formulario.querySelectorAll("input, textarea, select")
        .forEach(campo => {
            if (campo.id) {
                dados[campo.id] = campo.value;
            }
        });

    try {
        localStorage.setItem("fichaHospital", JSON.stringify(dados));
        alert("Ficha salva neste navegador com sucesso!");
    } catch (erro) {
        alert("Não foi possível salvar a ficha.");
    }
}

// Recuperar ficha salva
window.addEventListener("load", function() {
    try {
        const dados = JSON.parse(
            localStorage.getItem("fichaHospital")
        );

        if (!dados) return;

        Object.keys(dados).forEach(id => {
            const campo = document.getElementById(id);

            if (campo) {
                campo.value = dados[id];
            }
        });
    } catch (erro) {
        console.log("Não foi possível recuperar os dados.");
    }
});
