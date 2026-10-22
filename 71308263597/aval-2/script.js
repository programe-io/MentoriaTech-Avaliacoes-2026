const botoesAdicionar = document.querySelectorAll(".adicionar");
const quantidade = document.querySelector("#quantidade");
const aviso = document.querySelector("#aviso");
const menuMobile = document.querySelector(".menu-mobile");
const menu = document.querySelector(".menu");
const formulario = document.querySelector("#form-newsletter");
const email = document.querySelector("#email");
const mensagem = document.querySelector("#mensagem");

let itensNaSacola = 0;
let temporizador;

botoesAdicionar.forEach((botao) => {
  botao.addEventListener("click", () => {
    itensNaSacola++;
    quantidade.textContent = itensNaSacola;

    aviso.classList.add("ativo");
    clearTimeout(temporizador);

    temporizador = setTimeout(() => {
      aviso.classList.remove("ativo");
    }, 2200);

    botao.textContent = "Adicionado";
    botao.disabled = true;

    setTimeout(() => {
      botao.textContent = "Adicionar à sacola";
      botao.disabled = false;
    }, 1200);
  });
});

menuMobile.addEventListener("click", () => {
  menu.classList.toggle("aberto");

  const menuEstaAberto = menu.classList.contains("aberto");
  menuMobile.textContent = menuEstaAberto ? "✕" : "☰";
  menuMobile.setAttribute(
    "aria-label",
    menuEstaAberto ? "Fechar menu" : "Abrir menu"
  );
});

document.querySelectorAll(".menu a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("aberto");
    menuMobile.textContent = "☰";
  });
});

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  mensagem.textContent = `Cadastro realizado para ${email.value}.`;
  formulario.reset();

  setTimeout(() => {
    mensagem.textContent = "";
  }, 4000);
});
