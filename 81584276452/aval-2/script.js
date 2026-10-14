function postar() {
let texto = document.getElementById("texto");
let feed = document.getElementById("feed");

if (texto.value.trim() === "") {
    alert("Escreva algo antes de publicar!");
    return;
}

let post = document.createElement("div");
post.className = "post";

post.innerHTML = `
    <b>Yasmim Costa</b>
    <p></p>
    <button onclick="curtir(this)">♡ 0</button>
`;

post.querySelector("p").textContent = texto.value;
feed.prepend(post);
texto.value = "";

}

function curtir(botao) {
let curtidas = Number(botao.dataset.curtidas || 0);

if (botao.classList.contains("curtido")) {
    curtidas--;
    botao.classList.remove("curtido");
} else {
    curtidas++;
    botao.classList.add("curtido");
}

botao.dataset.curtidas = curtidas;
botao.textContent = "♥ " + curtidas;

}