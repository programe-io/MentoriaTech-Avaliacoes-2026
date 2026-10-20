const formulario = document.getElementById("formulario");
const mensagem = document.getElementById("mensagem");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const aluno = document.getElementById("aluno").value.trim();
    const atividade = document.getElementById("atividade").value.trim();
    const html = document.getElementById("html").value.trim();
    const css = document.getElementById("css").value.trim();
    const javascript = document.getElementById("javascript").value.trim();

    if (!aluno || !atividade || !html || !css || !javascript) {
        mensagem.style.color = "red";
        mensagem.textContent = "Preencha todos os campos antes de enviar.";
        return;
    }

    mensagem.style.color = "#18733b";
    mensagem.textContent =
        "Avaliação preenchida com sucesso, " + aluno +
        "! Revise seu código e compartilhe a atividade com o professor.";

    console.log("Aluno:", aluno);
    console.log("Atividade:", atividade);
    console.log("HTML:", html);
    console.log("CSS:", css);
    console.log("JavaScript:", javascript);
});