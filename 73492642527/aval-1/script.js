
"use strict";

const formulario = document.getElementById("formEntrega");
const campoAluno = document.getElementById("aluno");
const campoAtividade = document.getElementById("atividade");
const campoProfessor = document.getElementById("professor");
const campoCodigo = document.getElementById("codigo");

const checkCodigo = document.getElementById("checkCodigo");
const checkAtividade = document.getElementById("checkAtividade");

const contador = document.getElementById("contador");
const mensagem = document.getElementById("mensagem");
const resultado = document.getElementById("resultado");
const resumo = document.getElementById("resumo");

const btnRevisar = document.getElementById("btnRevisar");
const btnBaixar = document.getElementById("btnBaixar");
const btnCopiar = document.getElementById("btnCopiar");

let entregaAtual = null;

function mostrarMensagem(texto, tipo = "success") {
    mensagem.textContent = texto;
    mensagem.className = `message ${tipo}`;
}

function atualizarContador() {
    const quantidade = campoCodigo.value.length;
    contador.textContent =
        `${quantidade.toLocaleString("pt-BR")} caracteres`;
}

function validarDados(exigirChecklist = false) {
    const aluno = campoAluno.value.trim();
    const atividade = campoAtividade.value.trim();
    const codigo = campoCodigo.value.trim();

    if (!aluno || !atividade || !codigo) {
        mostrarMensagem(
            "Preencha o nome, a atividade e o código.",
            "error"
        );

        if (!aluno) campoAluno.focus();
        else if (!atividade) campoAtividade.focus();
        else campoCodigo.focus();

        return false;
    }

    if (exigirChecklist && (!checkCodigo.checked || !checkAtividade.checked)) {
        mostrarMensagem(
            "Marque os dois itens do checklist antes de preparar a entrega.",
            "error"
        );
        return false;
    }

    return true;
}

function obterEntrega() {
    return {
        aluno: campoAluno.value.trim(),
        atividade: campoAtividade.value.trim(),
        professor: campoProfessor.value.trim() || null,
        codigo: campoCodigo.value,
        dataPreparacao: new Date().toISOString(),
        checklist: {
            codigoRevisado: checkCodigo.checked,
            atividadeCompleta: checkAtividade.checked
        }
    };
}

function revisarEntrega() {
    if (!validarDados()) return;

    const codigo = campoCodigo.value.trim();
    const alertas = [];

    if (codigo.length < 15) {
        alertas.push("O código parece muito curto.");
    }

    if (
        codigo.includes("<") &&
        !codigo.includes(">")
    ) {
        alertas.push("Verifique se há uma tag incompleta.");
    }

    if (
        codigo.includes("{") &&
        !codigo.includes("}")
    ) {
        alertas.push("Verifique se há uma chave sem fechamento.");
    }

    if (alertas.length > 0) {
        mostrarMensagem(
            "Sugestões: " + alertas.join(" "),
            "error"
        );
    } else {
        mostrarMensagem(
            "Campos preenchidos! Faça também os testes da sua atividade.",
            "success"
        );
    }
}

function prepararEntrega(event) {
    event.preventDefault();

    if (!validarDados(true)) return;

    entregaAtual = obterEntrega();

    resumo.textContent =
        `Aluno: ${entregaAtual.aluno} | ` +
        `Atividade: ${entregaAtual.atividade} | ` +
        `Código: ${entregaAtual.codigo.length} caracteres.`;

    resultado.classList.remove("hidden");

    mostrarMensagem(
        "A entrega foi preparada neste navegador. Baixe o arquivo para guardá-la.",
        "success"
    );

    resultado.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

function baixarEntrega() {
    if (!entregaAtual) {
        mostrarMensagem("Prepare a entrega antes de baixar.", "error");
        return;
    }

    const conteudo = JSON.stringify(entregaAtual, null, 2);
    const arquivo = new Blob(
        [conteudo],
        { type: "application/json;charset=utf-8" }
    );

    const url = URL.createObjectURL(arquivo);
    const link = document.createElement("a");

    link.href = url;
    link.download = "entrega-avaliacao.json";

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);

    mostrarMensagem(
        "Arquivo baixado. Envie-o ao professor pela plataforma da escola.",
        "success"
    );
}

async function copiarCodigo() {
    if (!entregaAtual) {
        mostrarMensagem("Prepare a entrega antes de copiar.", "error");
        return;
    }

    try {
        await navigator.clipboard.writeText(entregaAtual.codigo);

        mostrarMensagem("Código copiado para a área de transferência.", "success");
    } catch (erro) {
        const area = document.createElement("textarea");
        area.value = entregaAtual.codigo;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.opacity = "0";

        document.body.appendChild(area);
        area.select();

        const copiou = document.execCommand("copy");
        area.remove();

        if (copiou) {
            mostrarMensagem("Código copiado.", "success");
        } else {
            mostrarMensagem(
                "Não foi possível copiar automaticamente. Selecione e copie o código manualmente.",
                "error"
            );
        }
    }
}

campoCodigo.addEventListener("input", atualizarContador);
btnRevisar.addEventListener("click", revisarEntrega);
formulario.addEventListener("submit", prepararEntrega);
btnBaixar.addEventListener("click", baixarEntrega);
btnCopiar.addEventListener("click", copiarCodigo);

formulario.addEventListener("input", () => {
    entregaAtual = null;
    resultado.classList.add("hidden");
});

atualizarContador();
