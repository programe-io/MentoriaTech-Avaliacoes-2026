// Configuração do número de destino do WhatsApp
const NUMERO_PROPRIETARIO = "5589994616348"; 

let cacheAgendamento = {};

// Bloqueia datas passadas no calendário assim que o site carrega
document.addEventListener("DOMContentLoaded", () => {
    const campoData = document.getElementById('data');
    const hoje = new Date().toISOString().split('T')[0];
    campoData.min = hoje;
});

// Vincula o botão "Escolher" do card ao seletor do formulário
function selecionarProcedimento(id) {
    const select = document.getElementById('procedimento');
    select.value = id;
    
    document.getElementById('painel-ancora').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Captura as informações digitadas e abre o Modal de revisão
function processarFormulario(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const tel = document.getElementById('telefone').value;
    const selectElement = document.getElementById('procedimento');
    const estiloTexto = selectElement.options[selectElement.selectedIndex].text;
    const dataBruta = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;

    // Formata a data de AAAA-MM-DD para DD/MM/AAAA
    const dataInvertida = dataBruta.split('-').reverse().join('/');

    // Salva temporariamente no objeto cache
    cacheAgendamento = { nome, tel, estiloTexto, dataInvertida, hora };

    // Insere os dados nos campos de texto dentro do Modal
    document.getElementById('recibo-nome').innerText = nome;
    document.getElementById('recibo-tel').innerText = tel;
    document.getElementById('recibo-estilo').innerText = estiloTexto;
    document.getElementById('recibo-data').innerText = dataInvertida;
    document.getElementById('recibo-hora').innerText = hora;

    // Exibe o modal na tela
    document.getElementById('modalCheckout').classList.add('active');
}

// Fecha a janela de confirmação
function fecharModal() {
    document.getElementById('modalCheckout').classList.remove('active');
}

// Dispara os dados estruturados diretamente para o WhatsApp do estúdio
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
