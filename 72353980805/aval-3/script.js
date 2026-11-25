
const form = document.getElementById("formAnamnese");
const resultado = document.getElementById("resultado");

function obterValor(id) {
    return document.getElementById(id).value.trim();
}

function obterRadio(nome) {
    const selecionado = document.querySelector(
        `input[name="${nome}"]:checked`
    );

    return selecionado ? selecionado.value : "Não informado";
}

function adicionarLinha(titulo, valor) {
    return `<p><strong>${titulo}:</strong> ${valor || "Não informado"}</p>`;
}

function gerarFicha() {
    const campos = [
        ["Nome", "nome"],
        ["Nascimento", "nascimento"],
        ["CPF", "cpf"],
        ["Telefone", "telefone"],
        ["E-mail", "email"],
        ["Sexo", "sexo"],
        ["Peso", "peso"],
        ["Altura", "altura"],
        ["Doença ou condição de saúde", "doenca"],
        ["Detalhes de saúde", "detalheDoenca"],
        ["Alergia", "alergia"],
        ["Detalhes de alergias", "detalheAlergia"],
        ["Uso de medicamentos", "medicamento"],
        ["Medicamentos utilizados", "detalheMedicamento"],
        ["Cirurgia anterior", "cirurgia"],
        ["Detalhes da cirurgia", "detalheCirurgia"],
        ["Lesões ou dores", "lesao"],
        ["Detalhes das lesões", "detalheLesao"],
        ["Restrição médica", "restricao"],
        ["Detalhes da restrição", "detalheRestricao"],
        ["Atividade física", "atividade"],
        ["Tipo de atividade", "tipoAtividade"],
        ["Frequência semanal", "frequencia"],
        ["Prática de musculação", "musculacao"],
        ["Objetivo", "objetivo"],
        ["Alimentação", "alimentacao"],
        ["Horas de sono", "sono"],
        ["Consumo de água", "agua"],
        ["Nível de estresse", "estresse"],
        ["Resultados esperados", "resultados"],
        ["Observações", "observacoes"],
        ["Profissional responsável", "profissional"],
        ["Assinatura", "assinatura"],
        ["Data", "dataFicha"]
    ];

    let html = "";

    campos.forEach(([titulo, id]) => {
        html += adicionarLinha(titulo, obterValor(id));
    });

    ["doenca", "alergia", "medicamento",
     "cirurgia", "lesao", "restricao",
     "atividade", "musculacao"].forEach(nome => {
        // Os campos de rádio já são exibidos separadamente.
        // Evita duplicar os campos de seleção.
    });

    return html;
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!document.getElementById("consentimento").checked) {
        alert("É necessário aceitar a declaração.");
        return;
    }

    const respostasRadio = {
        doenca: obterRadio("doenca"),
        alergia: obterRadio("alergia"),
        medicamento: obterRadio("medicamento"),
        cirurgia: obterRadio("cirurgia"),
        lesao: obterRadio("lesao"),
        restricao: obterRadio("restricao"),
        atividade: obterRadio("atividade"),
        musculacao: obterRadio("musculacao")
    };

    const resumo = document.getElementById("resumo");

    // Cria uma ficha independente para impressão.
    let conteudo = `
        <div id="fichaImpressao">
            <h1>ANAMNESE PRO</h1>
            <h2>Ficha de Anamnese</h2>
            ${gerarFicha()}
    `;

    Object.entries(respostasRadio).forEach(([nome, valor]) => {
        conteudo += adicionarLinha(
            nome.charAt(0).toUpperCase() + nome.slice(1),
            valor
        );
    });

    conteudo += `
        <p><strong>Consentimento:</strong> Aceito</p>
        <br><br>
        <p>Assinatura: ______________________________</p>
        </div>
    `;

    resumo.innerHTML = conteudo;

    resultado.hidden = false;

    resultado.scrollIntoView({
        behavior: "smooth"
    });
});

function imprimirFicha() {
    const ficha = document.getElementById("fichaImpressao");

    if (!ficha) return;

    const janela = window.open("", "_blank");

    if (!janela) {
        alert("Permita a abertura de janelas para imprimir.");
        return;
    }

    janela.document.write(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Ficha de Anamnese</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 30px;
                    color: #222;
                }
                h1 {
                    color: #249b55;
                    text-align: center;
                }
                h2 {
                    text-align: center;
                    margin-bottom: 30px;
                }
                p {
                    border-bottom: 1px solid #ddd;
                    padding: 9px 0;
                    line-height: 1.5;
                }
                @media print {
                    body { padding: 10px; }
                }
            </style>
        </head>
        <body>
            ${ficha.innerHTML}
        </body>
        </html>
    `);

    janela.document.close();
    janela.focus();

    janela.onload = function() {
        janela.print();
    };
}

function fecharResultado() {
    resultado.hidden = true;

    form.scrollIntoView({
        behavior: "smooth"
    });
}

// Preenche automaticamente a data atual.
document.getElementById("dataFicha").value =
    new Date().toLocaleDateString("en-CA");
