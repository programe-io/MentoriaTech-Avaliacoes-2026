
let fichas = [];

document.getElementById("formAnamnese")
.addEventListener("submit", function(event) {

    event.preventDefault();

    let ficha = {
        nome: document.getElementById("nome").value,
        nascimento: document.getElementById("nascimento").value,
        telefone: document.getElementById("telefone").value,
        profissao: document.getElementById("profissao").value,
        doenca: document.getElementById("doenca").value,
        alergias: document.getElementById("alergias").value,
        medicamentos: document.getElementById("medicamentos").value,
        cirurgia: document.getElementById("cirurgia").value,
        queixa: document.getElementById("queixa").value,
        historico: document.getElementById("historico").value,
        observacoes: document.getElementById("observacoes").value
    };

    fichas.push(ficha);

    mostrarFichas();

    this.reset();

    alert("Ficha cadastrada com sucesso!");

});

function mostrarFichas() {

    let resultado = document.getElementById("resultado");

    resultado.innerHTML = "";

    fichas.forEach((ficha, indice) => {

        let div = document.createElement("div");
        div.className = "ficha";

        let titulo = document.createElement("h3");
        titulo.textContent = ficha.nome;

        div.appendChild(titulo);

        let campos = [
            ["Nascimento", ficha.nascimento],
            ["Telefone", ficha.telefone],
            ["Profissão", ficha.profissao],
            ["Doenças", ficha.doenca],
            ["Alergias", ficha.alergias],
            ["Medicamentos", ficha.medicamentos],
            ["Cirurgias", ficha.cirurgia],
            ["Queixa", ficha.queixa],
            ["Histórico familiar", ficha.historico],
            ["Observações", ficha.observacoes]
        ];

        campos.forEach(([nome, valor]) => {
            let p = document.createElement("p");
            p.textContent = nome + ": " + (valor || "Não informado");
            div.appendChild(p);
        });

        let botao = document.createElement("button");
        botao.textContent = "Excluir Ficha";
        botao.className = "excluir";

        botao.onclick = function() {
            fichas.splice(indice, 1);
            mostrarFichas();
        };

        div.appendChild(botao);

        resultado.appendChild(div);

    });
}
