
function mostrarMensagem(tipo) {
    let mensagem = "";

    if (tipo === "alimentacao") {
        mensagem = "Procure manter uma alimentação variada e equilibrada. Um profissional de saúde pode orientar suas necessidades.";
    } 
    else if (tipo === "exercicios") {
        mensagem = "Praticar atividades físicas adequadas à sua idade e condição pode trazer benefícios para a saúde.";
    } 
    else if (tipo === "bem-estar") {
        mensagem = "Cuidar da saúde mental é importante. Converse com pessoas de confiança quando precisar.";
    }

    alert(mensagem);
}
