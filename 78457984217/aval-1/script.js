document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("length-slider");
    const lengthVal = document.getElementById("length-val");
    const generateBtn = document.getElementById("generate-btn");
    const passwordOutput = document.getElementById("password-output");
    const copyBtn = document.getElementById("copy-btn");

    // Sincroniza o slider com o texto numérico
    slider.addEventListener("input", (e) => {
        lengthVal.textContent = e.target.value;
    });

    // Função de geração de strings aleatórias baseada nas seleções
    generateBtn.addEventListener("click", () => {
        const length = parseInt(slider.value);
        const includeUpper = document.getElementById("check-upper").checked;
        const includeNumbers = document.getElementById("check-numbers").checked;
        const includeSymbols = document.getElementById("check-symbols").checked;

        let charPool = "abcdefghijklmnopqrstuvwxyz";
        if (includeUpper) charPool += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (includeNumbers) charPool += "0123456789";
        if (includeSymbols) charPool += "@#$%&*!+?=";

        let generatedPassword = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charPool.length);
            generatedPassword += charPool[randomIndex];
        }

        passwordOutput.value = generatedPassword;
    });

    // Função para copiar para a área de transferência
    copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(passwordOutput.value);
        alert("🔒 Senha copiada com sucesso para a área de transferência!");
    });
});
