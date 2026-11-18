/* ==========================================================
   Interações do site: tema, copiar código, filtro de trilhas,
   menu ativo ao rolar e validação do formulário.
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  iniciarTema();
  iniciarCopiarCodigo();
  iniciarFiltroTrilhas();
  iniciarMenuAtivo();
  iniciarFormulario();
});

/* ---------- 1. Alternar tema claro e escuro ---------- */
function iniciarTema() {
  const botao = document.querySelector("#botao-tema");
  if (!botao) return;

  const raiz = document.documentElement;
  const escuroDoSistema = window.matchMedia("(prefers-color-scheme: dark)");

  function temaAtual() {
    return raiz.dataset.tema || (escuroDoSistema.matches ? "escuro" : "claro");
  }

  function atualizarBotao() {
    const escuro = temaAtual() === "escuro";
    botao.setAttribute("aria-pressed", String(escuro));
    botao.textContent = escuro ? "Tema claro" : "Tema escuro";
  }

  botao.addEventListener("click", () => {
    const novo = temaAtual() === "escuro" ? "claro" : "escuro";
    raiz.dataset.tema = novo;
    try {
      localStorage.setItem("tema", novo);
    } catch (erro) {
      /* Sem armazenamento disponível: o tema vale só nesta visita. */
    }
    atualizarBotao();
  });

  atualizarBotao();
}

/* ---------- 2. Copiar o código do editor ---------- */
function iniciarCopiarCodigo() {
  const botao = document.querySelector("#botao-copiar");
  const linhas = document.querySelectorAll(".editor .linha");
  if (!botao || linhas.length === 0) return;

  let temporizador;

  botao.addEventListener("click", async () => {
    const texto = Array.from(linhas, (linha) => linha.textContent).join("\n");

    try {
      await navigator.clipboard.writeText(texto);
      botao.textContent = "Copiado";
    } catch (erro) {
      botao.textContent = "Não foi possível copiar";
    }

    clearTimeout(temporizador);
    temporizador = setTimeout(() => {
      botao.textContent = "Copiar código";
    }, 2000);
  });
}

/* ---------- 3. Filtrar trilhas por nível ---------- */
function iniciarFiltroTrilhas() {
  const filtros = document.querySelectorAll(".filtro");
  const trilhas = document.querySelectorAll(".trilha");
  const contador = document.querySelector("#contador-trilhas");
  if (filtros.length === 0) return;

  filtros.forEach((filtro) => {
    filtro.addEventListener("click", () => {
      const nivel = filtro.dataset.nivel;
      let visiveis = 0;

      filtros.forEach((f) => f.setAttribute("aria-pressed", String(f === filtro)));

      trilhas.forEach((trilha) => {
        const mostrar = nivel === "todos" || trilha.dataset.nivel === nivel;
        trilha.hidden = !mostrar;
        if (mostrar) visiveis += 1;
      });

      if (contador) {
        contador.textContent =
          visiveis === 1 ? "1 trilha encontrada" : `${visiveis} trilhas encontradas`;
      }
    });
  });
}

/* ---------- 4. Destacar no menu a seção que está na tela ---------- */
function iniciarMenuAtivo() {
  const links = document.querySelectorAll(".menu a[href^='#']");
  if (links.length === 0 || !("IntersectionObserver" in window)) return;

  const secoes = Array.from(links, (link) =>
    document.querySelector(link.getAttribute("href"))
  ).filter(Boolean);

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        links.forEach((link) => {
          const ativo = link.getAttribute("href") === `#${entrada.target.id}`;
          if (ativo) link.setAttribute("aria-current", "page");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  secoes.forEach((secao) => observador.observe(secao));
}

/* ---------- 5. Validar o formulário de contato ---------- */
function iniciarFormulario() {
  const form = document.querySelector("#formulario");
  if (!form) return;

  const email = form.querySelector("#email");
  const mensagem = form.querySelector("#msg");
  const status = form.querySelector("#status-form");

  function mostrarErro(campo, texto) {
    const erro = document.querySelector(`#erro-${campo.id}`);
    erro.textContent = texto;
    campo.setAttribute("aria-invalid", texto ? "true" : "false");
  }

  function validar() {
    let valido = true;

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    mostrarErro(email, emailOk ? "" : "Digite um e-mail válido, como voce@exemplo.com.");
    if (!emailOk) valido = false;

    const msgOk = mensagem.value.trim().length >= 10;
    mostrarErro(mensagem, msgOk ? "" : "Escreva pelo menos 10 caracteres.");
    if (!msgOk) valido = false;

    return valido;
  }

  [email, mensagem].forEach((campo) =>
    campo.addEventListener("input", () => {
      if (campo.getAttribute("aria-invalid") === "true") validar();
    })
  );

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    status.textContent = "";

    if (!validar()) {
      form.querySelector("[aria-invalid='true']").focus();
      return;
    }

    /* Aqui você enviaria os dados ao seu servidor, por exemplo com fetch(). */
    status.textContent = "Mensagem enviada. Responderemos em até dois dias úteis.";
    form.reset();
  });
}