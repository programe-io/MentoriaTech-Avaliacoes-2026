const NUMERO_PROPRIETARIO = "5589994616348"; 

let cacheAgendamento = {};

document.addEventListener("DOMContentLoaded", () => {
    const campoData = document.getElementById('data');
    const hoje = new Date().toISOString().split('T')[0];
    campoData.min = hoje;
});

function selecionarProcedimento(id) {
    const select = document.getElementById('procedimento');
    select.value = id;
    
    document.getElementById('painel-ancora').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

function processarFormulario(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const tel = document.getElementById('telefone').value;
    const selectElement = document.getElementById('procedimento');
    const estiloTexto = selectElement.options[selectElement.selectedIndex].text;
    const dataBruta = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;

    const dataInvertida = dataBruta.split('-').reverse().join('/');

    cacheAgendamento = { nome, tel, estiloTexto, dataInvertida, hora };

    document.getElementById('recibo-nome').innerText = nome;
    document.getElementById('recibo-tel').innerText = tel;
    document.getElementById('recibo-estilo').innerText = estiloTexto;
    document.getElementById('recibo-data').innerText = dataInvertida;
    document.getElementById('recibo-hora').innerText = hora;

    document.getElementById('modalCheckout').classList.add('active');
}

function fecharModal() {
    document.getElementById('modalCheckout').classList.remove('active');
}

function enviarParaWhatsApp() {
    const mensagemFinal = 
        `Olá, Lara Hair! Quero confirmar meu agendamento:%0A%0A` +
        `• *Cliente:* ${encodeURIComponent(cacheAgendamento.nome)}%0A` +
        `• *Contato:* ${encodeURIComponent(cacheAgendamento.tel)}%0A` +
        `• *Serviço:* ${encodeURIComponent(cacheAgendamento.estiloTexto)}%0A` +
        `• *Data:* ${encodeURIComponent(cacheAgendamento.dataInvertida)}%0A` +
        `• *Horário:* ${encodeURIComponent(cacheAgendamento.hora)}`;

    const linkWhatsApp = `https://api.whatsapp.com/send?phone=${NUMERO_PROPRIETARIO}&text=${mensagemFinal}`;
    
    window.open(linkWhatsApp, '_blank');
    fecharModal();
}