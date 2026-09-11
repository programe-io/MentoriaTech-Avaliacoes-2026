const notas = document.querySelectorAll(".nota");
const media = document.getElementById("media");
const mensagem = document.getElementById("mensagem");
const publicar = document.getElementById("publicar");
const status = document.getElementById("status");

function calcularMedia() {
    let total = 0;
    let quantidade = 0;

    notas.forEach((nota) => {
        const valor = Number(nota.value);

        if (valor > 0) {
            total += valor;
            quantidade++;
        \}
    \});

    if (quantidade === 0) {
        media.textContent = "0,0";
        mensagem.textContent = "Selecione as notas para calcular.";
        return;
    \}

    const resultado = total / quantidade;

    media.textContent = resultado.toFixed(1).replace(".", ",");

    if (resultado >= 9) {
        mensagem.textContent = "Excelente trabalho! ⭐";
    \} else if (resultado >= 7) {
        mensagem.textContent = "Muito bom! Continue assim. 👏";
    \} else if (resultado >= 5) {
        mensagem.textContent = "Bom trabalho, mas pode melhorar. 💪";
    \} else {
        mensagem.textContent = "Revise seu projeto antes de enviar. 📚";
    \}
\}

notas.forEach((nota) => {
    nota.addEventListener("change", calcularMedia);
\});

publicar.addEventListener("click", () => {
    const nome = document.getElementById("nome").value.trim();
    const projeto = document.getElementById("projeto").value.trim();
    const comentario = document.getElementById("comentario").value.trim();

    if (!nome || !projeto) {
        status.style.color = "#dc2626";
        status.textContent = "⚠️ Preencha seu nome e o nome do projeto.";
        return;
    \}

    const notasSelecionadas = [...notas].every(
        (nota) => Number(nota.value) > 0
    );

    if (!notasSelecionadas) {
        status.style.color = "#dc2626";
        status.textContent = "⚠️ Selecione uma nota para todos os critérios.";
        return;
    \}

    if (!comentario) {
        status.style.color = "#dc2626";
        status.textContent = "⚠️ Escreva um comentário sobre o trabalho.";
        return;
    \}

    status.style.color = "#16a34a";
    status.textContent =
        `✅ Avaliação de \${nome\} publicada com sucesso! Projeto: \${projeto\}`;

    publicar.textContent = "Avaliação publicada ✓";
    publicar.disabled = true;
\});

Como organizar no GitHub
Crie uma pasta com estes 3 arquivos:

meu-projeto/
│
├── index.html
├── style.css
└── script.js$0