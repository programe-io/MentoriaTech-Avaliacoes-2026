
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

// ABRIR E FECHAR MENU NO CELULAR

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
    });
});


// BLOQUEAR DATAS PASSADAS

const dateInput = document.getElementById('date');

const today = new Date();

const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split('T')[0];

dateInput.min = localToday;


// FORMULÁRIO DE AGENDAMENTO

const bookingForm = document.getElementById('bookingForm');
const bookingResult = document.getElementById('bookingResult');

bookingForm.addEventListener('submit', (event) => {

    event.preventDefault();

    const name = document.getElementById('clientName').value.trim();

    const service = document.getElementById('service').value;

    const date = document.getElementById('date').value;

    const time = document.getElementById('time').value;

    const notes = document.getElementById('notes').value.trim();

    if (!name || !service || !date || !time) {
        alert('Preencha os campos obrigatórios.');
        return;
    }

    const [year, month, day] = date.split('-');

    const formattedDate = `${day}/${month}/${year}`;

    bookingResult.innerHTML = `
        <strong>Solicitação preparada!</strong><br>

        Nome: ${escapeHTML(name)}<br>

        Serviço: ${escapeHTML(service)}<br>

        Data desejada: ${formattedDate}<br>

        Horário preferido: ${escapeHTML(time)}<br>

        ${notes ? `Observações: ${escapeHTML(notes)}` : ''}

        <br>

        <em>
        Este resumo não confirma o horário.
        Entre em contato com o estúdio para confirmar.
        </em>
    `;

    bookingResult.classList.add('show');

});


// PROTEÇÃO DOS TEXTOS DIGITADOS

function escapeHTML(value) {

    return value.replace(/[&<>"']/g, character => ({

        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'

    })[character]);

}
