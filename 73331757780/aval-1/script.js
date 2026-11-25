
function toggleMenu() {
  document.getElementById("menu")
    .classList.toggle("ativo");
}

document.getElementById("formulario")
  .addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem").value;

    const telefone = "5599999999999";

    const texto = `Olá! Meu nome é ${nome}.
E-mail: ${email}.
Mensagem: ${mensagem}`;

    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(texto)}`;

    window.open(url, "_blank");
  });
