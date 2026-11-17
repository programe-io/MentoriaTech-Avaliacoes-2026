
const form = document.getElementById('pet-form');
const photoInput = document.getElementById('pet-photo');
const photoPreview = document.getElementById('photo-preview');
const petsContainer = document.getElementById('pets-container');
const emptyMessage = document.getElementById('empty-message');
const petCount = document.getElementById('pet-count');
const submitButton = document.getElementById('submit-button');
const cancelButton = document.getElementById('cancel-edit');

const defaultPhoto =
    'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300';

let pets = [];
let selectedPhoto = '';
let editingId = null;

// Carregar cadastros salvos
try {
    pets = JSON.parse(localStorage.getItem('meusPets')) || [];
} catch (error) {
    pets = [];
}

// Proteger textos exibidos nos cards
function escapeHTML(text) {
    return String(text ?? '').replace(/[&<>"']/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    })[char]);
}

// Selecionar foto
photoInput.addEventListener('change', function () {
    const file = this.files[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
        alert('Selecione um arquivo de imagem válido!');
        this.value = '';
        return;
    }

    if (file.size > 3 * 1024 * 1024) {
        alert('A foto deve ter no máximo 3 MB.');
        this.value = '';
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
        selectedPhoto = event.target.result;
        photoPreview.src = selectedPhoto;
    };

    reader.readAsDataURL(file);
});

// Salvar dados no navegador
function savePets() {
    try {
        localStorage.setItem('meusPets', JSON.stringify(pets));
        return true;
    } catch (error) {
        alert('Não foi possível salvar. Tente usar uma foto menor ou liberar espaço no navegador.');
        return false;
    }
}

// Cadastrar ou atualizar pet
form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('pet-name').value.trim();
    const species = document.getElementById('pet-species').value;
    const age = document.getElementById('pet-age').value;
    const breed = document.getElementById('pet-breed').value.trim();
    const sex = document.getElementById('pet-sex').value;
    const color = document.getElementById('pet-color').value.trim();
    const food = document.getElementById('pet-food').value.trim();
    const personality = document.getElementById('pet-personality').value.trim();

    if (!name || !species) {
        alert('Preencha o nome e a espécie do seu pet!');
        return;
    }

    const existingPet = editingId !== null
        ? pets.find(pet => pet.id === editingId)
        : null;

    const pet = {
        id: editingId ?? (
            window.crypto?.randomUUID?.() ||
            Date.now().toString()
        ),
        name,
        species,
        age,
        breed,
        sex,
        color,
        food,
        personality,
        photo: selectedPhoto || existingPet?.photo || ''
    };

    const previousPets = [...pets];

    if (editingId !== null) {
        pets = pets.map(item =>
            item.id === editingId ? pet : item
        );
    } else {
        pets.push(pet);
    }

    if (!savePets()) {
        pets = previousPets;
        return;
    }

    alert(
        editingId !== null
            ? 'Pet atualizado com sucesso! 💗'
            : 'Pet cadastrado com sucesso! 🐾'
    );

    resetForm();
    renderPets();

    document.getElementById('galeria').scrollIntoView({
        behavior: 'smooth'
    });
});

// Mostrar todos os pets
function renderPets() {
    petsContainer.innerHTML = '';

    petCount.textContent = pets.length;

    emptyMessage.style.display =
        pets.length === 0 ? 'block' : 'none';

    pets.forEach(pet => {
        const card = document.createElement('article');

        card.className = 'pet-card';

        const ageText = pet.age
            ? `${escapeHTML(pet.age)} ano(s)`
            : 'Não informada';

        const photo = pet.photo || defaultPhoto;

        card.innerHTML = `
            <img
                src="${escapeHTML(photo)}"
                alt="Foto de ${escapeHTML(pet.name)}"
            >

            <div class="pet-info">

                <h3>${escapeHTML(pet.name)} ♡</h3>

                <span class="pet-type">
                    ${escapeHTML(pet.species)}
                </span>

                <p>🎂 Idade: ${ageText}</p>

                <p>🐾 Raça: ${escapeHTML(pet.breed || 'Não informada')}</p>

                <p>💗 Sexo: ${escapeHTML(pet.sex || 'Não informado')}</p>

                <p>🎨 Cor: ${escapeHTML(pet.color || 'Não informada')}</p>

                <p>🍓 Alimentação: ${escapeHTML(pet.food || 'Não informada')}</p>

                <p class="pet-description">
                    <strong>Sobre:</strong>
                    ${escapeHTML(pet.personality || 'Ainda não informado.')}
                </p>

                <div class="pet-actions">
                    <button
                        class="edit-button"
                        data-action="edit"
                        data-id="${escapeHTML(pet.id)}"
                    >
                        ✏️ Editar
                    </button>

                    <button
                        class="delete-button"
                        data-action="delete"
                        data-id="${escapeHTML(pet.id)}"
                    >
                        🗑️ Excluir
                    </button>
                </div>

            </div>
        `;

        const image = card.querySelector('img');

        image.addEventListener('error', () => {
            image.src = defaultPhoto;
        }, { once: true });

        petsContainer.appendChild(card);
    });
}

// Identificar os botões dos cards
petsContainer.addEventListener('click', function (event) {
    const button = event.target.closest('button[data-action]');

    if (!button) return;

    const id = button.dataset.id;
    const action = button.dataset.action;

    if (action === 'edit') {
        editPet(id);
    }

    if (action === 'delete') {
        deletePet(id);
    }
});

// Editar cadastro
function editPet(id) {
    const pet = pets.find(item => item.id === id);

    if (!pet) return;

    editingId = id;

    document.getElementById('pet-name').value = pet.name;
    document.getElementById('pet-species').value = pet.species;
    document.getElementById('pet-age').value = pet.age;
    document.getElementById('pet-breed').value = pet.breed;
    document.getElementById('pet-sex').value = pet.sex;
    document.getElementById('pet-color').value = pet.color;
    document.getElementById('pet-food').value = pet.food;
    document.getElementById('pet-personality').value =
        pet.personality;

    selectedPhoto = pet.photo || '';
    photoPreview.src = selectedPhoto || defaultPhoto;

    submitButton.textContent = 'Salvar alterações ♡';
    cancelButton.hidden = false;

    document.getElementById('cadastro').scrollIntoView({
        behavior: 'smooth'
    });
}

// Excluir cadastro
function deletePet(id) {
    const pet = pets.find(item => item.id === id);

    if (!pet) return;

    const confirmed = confirm(
        `Tem certeza que deseja excluir o cadastro de ${pet.name}?`
    );

    if (!confirmed) return;

    const previousPets = [...pets];

    pets = pets.filter(item => item.id !== id);

    if (!savePets()) {
        pets = previousPets;
        return;
    }

    if (editingId === id) {
        resetForm();
    }

    renderPets();
}

// Limpar formulário
function resetForm() {
    form.reset();

    editingId = null;
    selectedPhoto = '';

    photoPreview.src = defaultPhoto;

    submitButton.textContent = 'Cadastrar meu pet ♡';
    cancelButton.hidden = true;
}

// Cancelar edição
cancelButton.addEventListener('click', resetForm);

// Mostrar cadastros ao abrir o site
renderPets();
