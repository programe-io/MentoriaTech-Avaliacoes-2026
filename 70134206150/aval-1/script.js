
const checkboxes = document.querySelectorAll(
    '#routine-list input[type="checkbox"]'
);

const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const progressPercent = document.getElementById('progress-percent');

// Atualizar progresso
function updateProgress() {
    const total = checkboxes.length;

    const completed = [...checkboxes].filter(
        checkbox => checkbox.checked
    ).length;

    const percent = Math.round((completed / total) * 100);

    progressFill.style.width = percent + '%';
    progressText.textContent =
        `${completed} de ${total} atividades concluídas`;

    progressPercent.textContent = percent + '%';

    if (percent === 100) {
        progressText.textContent = 'Parabéns! Você completou sua rotina! ♡';
    }

    localStorage.setItem(
        'rotinaAutocuidado',
        JSON.stringify(
            [...checkboxes].map(checkbox => checkbox.checked)
        )
    );
}

// Carregar rotina salva
const savedRoutine = JSON.parse(
    localStorage.getItem('rotinaAutocuidado') || 'null'
);

if (savedRoutine) {
    checkboxes.forEach((checkbox, index) => {
        checkbox.checked = savedRoutine[index] || false;
    });
}

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        checkbox.closest('.routine-item').classList.toggle(
            'completed',
            checkbox.checked
        );

        updateProgress();
    });
});

// Aplicar estilo aos itens já concluídos
checkboxes.forEach(checkbox => {
    checkbox.closest('.routine-item').classList.toggle(
        'completed',
        checkbox.checked
    );
});

updateProgress();

// Diário pessoal
const diaryText = document.getElementById('diary-text');
const saveButton = document.getElementById('save-diary');
const saveMessage = document.getElementById('save-message');

// Recuperar diário salvo
diaryText.value = localStorage.getItem('meuDiario') || '';

saveButton.addEventListener('click', () => {
    localStorage.setItem('meuDiario', diaryText.value);

    saveMessage.textContent = 'Seu diário foi salvo com carinho! ♡';
});

// Frases motivacionais
const phrases = [
    'Você merece todo o amor que oferece aos outros.',
    'Respeite seu tempo e celebre suas pequenas conquistas.',
    'Você não precisa ser perfeita para ser incrível.',
    'Cada dia é uma nova oportunidade de florescer.',
    'Seu bem-estar também deve ser prioridade.',
    'Nunca se esqueça do quanto você é especial.',
    'Cuide da sua mente, do seu corpo e do seu coração.',
    'Você merece momentos de paz e felicidade.'
];

const phraseElement = document.getElementById('phrase');
const phraseButton = document.getElementById('new-phrase');

phraseButton.addEventListener('click', () => {
    const currentPhrase = phraseElement.textContent;

    let newPhrase;

    do {
        newPhrase = phrases[
            Math.floor(Math.random() * phrases.length)
        ];
    } while (newPhrase === currentPhrase);

    phraseElement.textContent = newPhrase;
});
