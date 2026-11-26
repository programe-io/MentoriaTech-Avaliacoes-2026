
const botao = document.querySelector(".usuario button");

botao.addEventListener("click", function() {
    const nome = prompt("Digite seu nome:");
    const bio = prompt("Digite sua biografia:");

    if (nome && bio) {
        document.querySelector(".bio strong").textContent = nome;
        document.querySelectorAll(".bio p")[0].textContent = bio;
    }
});
