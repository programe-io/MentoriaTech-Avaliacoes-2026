const display = document.getElementById('password-display');
const slider = document.getElementById('length-slider');
const lengthVal = document.getElementById('length-val');
const btn = document.getElementById('generate-btn');

// Atualiza o número do tamanho na tela
slider.oninput = () => lengthVal.innerText = slider.value;

function generatePassword() {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";
    const length = slider.value;

    for (let i = 0; i < length; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }

    display.innerText = password;
}

btn.addEventListener('click', generatePassword);