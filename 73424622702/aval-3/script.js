/* ==========================================================
   MENTORIA TECH – interatividade
   1. Navegação entre páginas e menu
   2. Mensagem de boas-vindas
   3. Abas de conteúdo
   4. Pontuação, atividades e quiz
   5. Validação do formulário de inscrição
   ========================================================== */

/* ---------- Utilitários ---------- */
const $ = (seletor) => document.querySelector(seletor);

// Mostra uma mensagem rápida na parte de baixo da tela
let timerToast;
function aviso(texto, tipo) {
  const t = $("#toast");
  t.textContent = texto;
  t.className = "toast mostrar " + (tipo || "");
  clearTimeout(timerToast);
  timerToast = setTimeout(() => t.classList.remove("mostrar"), 2800);
}

// Guardar o nome do aluno no navegador (try/catch: pode estar bloqueado)
function lerNome() { try { return localStorage.getItem("mt-nome") || ""; } catch (e) { return ""; } }
function guardarNome(n) { try { localStorage.setItem("mt-nome", n); } catch (e) {} }

/* ---------- 1. Navegação e menu ---------- */
const PAGINAS = ["inicio", "conteudos", "desafios", "mentoria"];
const btnMenu = $("#btnMenu");
const menu = $("#menu");

function mostrarPagina(id) {
  if (!PAGINAS.includes(id)) id = "inicio";
  document.querySelectorAll(".pagina").forEach(p => p.classList.toggle("ativa", p.id === id));
  document.querySelectorAll(".menu a").forEach(a => a.classList.toggle("atual", a.dataset.pagina === id));
  window.scrollTo({ top: 0 });
  fecharMenu();
}

function fecharMenu() {
  menu.classList.remove("aberto");
  btnMenu.setAttribute("aria-expanded", "false");
  btnMenu.textContent = "☰";
}

btnMenu.addEventListener("click", () => {
  const aberto = menu.classList.toggle("aberto");
  btnMenu.setAttribute("aria-expanded", aberto);
  btnMenu.textContent = aberto ? "✕" : "☰";
});

// A página muda conforme o endereço (#conteudos, #desafios...)
window.addEventListener("hashchange", () => mostrarPagina(location.hash.slice(1)));

/* ---------- 2. Mensagem de boas-vindas ---------- */
function mostrarSaudacao() {
  const hora = new Date().getHours();
  const periodo = hora < 12 ? "Bom dia" : hora < 18 ? "Boa tarde" : "Boa noite";
  const nome = lerNome().split(" ")[0];
  $("#saudacao").textContent = nome
    ? `${periodo}, ${nome}! Que bom te ver de volta 👋`
    : `${periodo}! Bem-vindo(a) à Mentoria Tech 👋`;
}

/* ---------- 3. Abas de conteúdo ---------- */
document.querySelectorAll(".aba").forEach(botao => {
  botao.addEventListener("click", () => {
    document.querySelectorAll(".aba").forEach(b => {
      b.classList.toggle("ativa", b === botao);
      b.setAttribute("aria-selected", b === botao);
    });
    document.querySelectorAll(".painel").forEach(p =>
      p.classList.toggle("ativo", p.id === "aba-" + botao.dataset.aba));
  });
});

/* ---------- 4. Pontuação ---------- */
const PONTOS_POR_ACERTO = 10;
let pontosAtividades = 0;
let pontosQuiz = 0;

function atualizarPontos() {
  $("#pontosTotal").textContent = pontosAtividades + pontosQuiz;
}

/* ----- Atividades práticas (completar o código) ----- */
const ATIVIDADES = [
  { titulo: "HTML", dica: "Qual tag cria o título principal?", codigo: "<___>Olá, mundo!</___>", respostas: ["h1"] },
  { titulo: "CSS", dica: "Qual propriedade muda a cor do texto?", codigo: "p { ___: blue; }", respostas: ["color"] },
  { titulo: "JavaScript", dica: "Qual método mostra algo no console?", codigo: "console.___('Olá!');", respostas: ["log"] }
];

function criarAtividades() {
  const area = $("#atividades");
  ATIVIDADES.forEach(at => {
    let acertou = false;
    const card = document.createElement("article");
    card.className = "card atividade";
    card.innerHTML = `<h3></h3><p></p><code class="linha"></code>
      <div class="linha-resposta">
        <input type="text" placeholder="Sua resposta" aria-label="Resposta da atividade de ${at.titulo}">
        <button class="btn btn-principal">Verificar</button>
      </div>
      <p class="feedback" role="status"></p>`;
    card.querySelector("h3").textContent = at.titulo;
    card.querySelector("p").textContent = at.dica;
    card.querySelector(".linha").textContent = at.codigo;

    const campo = card.querySelector("input");
    const feedback = card.querySelector(".feedback");

    function verificar() {
      if (acertou) return;
      const resposta = campo.value.trim().toLowerCase();
      if (at.respostas.includes(resposta)) {
        acertou = true;                       // cada atividade pontua uma vez
        pontosAtividades += PONTOS_POR_ACERTO;
        atualizarPontos();
        campo.disabled = true;
        feedback.textContent = `✅ Correto! +${PONTOS_POR_ACERTO} pontos`;
        feedback.className = "feedback ok";
        aviso("Muito bem! Resposta certa 🎉", "ok");
      } else {
        feedback.textContent = resposta ? "❌ Ainda não. Tente de novo!" : "Digite uma resposta primeiro.";
        feedback.className = "feedback nao";
        if (resposta) aviso("Resposta incorreta. Você consegue! 💪", "nao");
      }
    }

    card.querySelector("button").addEventListener("click", verificar);
    campo.addEventListener("keydown", e => { if (e.key === "Enter") verificar(); });
    area.appendChild(card);
  });
}

/* ----- Quiz de múltipla escolha ----- */
const PERGUNTAS = [
  { p: "Qual linguagem define a estrutura de uma página web?", o: ["HTML", "CSS", "JavaScript", "Python"], c: 0, e: "HTML cria a estrutura: títulos, textos, links e imagens." },
  { p: "Qual propriedade CSS muda a cor do texto?", o: ["background", "color", "font-size", "border"], c: 1, e: "A propriedade color define a cor do texto." },
  { p: "Qual palavra cria uma variável que pode mudar de valor em JavaScript?", o: ["const", "let", "fixed", "static"], c: 1, e: "let cria variáveis que podem receber novos valores." },
  { p: "Qual tag HTML cria um link?", o: ["<link>", "<href>", "<a>", "<url>"], c: 2, e: "A tag <a> (âncora) cria links, com o atributo href." },
  { p: "O que faz o comando console.log()?", o: ["Apaga a página", "Mostra uma mensagem no console", "Cria um botão", "Muda a cor do fundo"], c: 1, e: "console.log() escreve mensagens no console, ótimo para testar códigos." },
  { p: "O que significa a sigla CSS?", o: ["Computer Style System", "Creative Style Script", "Cascading Style Sheets", "Coded Simple Sheets"], c: 2, e: "CSS = Cascading Style Sheets (folhas de estilo em cascata)." }
];

let indice = 0;

function iniciarQuiz() {
  indice = 0;
  pontosQuiz = 0;
  atualizarPontos();
  mostrarPergunta();
}

function mostrarPergunta() {
  const q = PERGUNTAS[indice];
  const caixa = $("#quiz");
  caixa.innerHTML = `
    <div class="quiz-info"><span>Pergunta ${indice + 1} de ${PERGUNTAS.length}</span><span>Acertos: ${pontosQuiz / PONTOS_POR_ACERTO}</span></div>
    <div class="progresso"><div style="width:${(indice / PERGUNTAS.length) * 100}%"></div></div>
    <h3 id="pergunta"></h3>
    <div class="opcoes"></div>
    <p class="feedback" role="status"></p>
    <button class="btn btn-principal" id="proxima" hidden></button>`;
  $("#pergunta").textContent = q.p;

  const lista = caixa.querySelector(".opcoes");
  q.o.forEach((texto, i) => {
    const b = document.createElement("button");
    b.className = "opcao";
    b.textContent = texto;               // textContent para exibir tags como <a>
    b.addEventListener("click", () => responder(i));
    lista.appendChild(b);
  });
}

function responder(escolha) {
  const q = PERGUNTAS[indice];
  const botoes = document.querySelectorAll(".opcao");
  const fb = $("#quiz .feedback");
  botoes.forEach(b => (b.disabled = true));
  botoes[q.c].classList.add("certa");

  if (escolha === q.c) {
    pontosQuiz += PONTOS_POR_ACERTO;
    atualizarPontos();
    fb.textContent = `✅ Acertou! +${PONTOS_POR_ACERTO} pontos. ${q.e}`;
    fb.className = "feedback ok";
    aviso("Resposta certa! 🎉", "ok");
  } else {
    botoes[escolha].classList.add("errada");
    fb.textContent = `❌ Não foi dessa vez. ${q.e}`;
    fb.className = "feedback nao";
    aviso("Resposta incorreta. Leia a explicação 📖", "nao");
  }

  const prox = $("#proxima");
  prox.hidden = false;
  prox.textContent = indice < PERGUNTAS.length - 1 ? "Próxima pergunta →" : "Ver resultado";
  prox.addEventListener("click", () => {
    indice++;
    indice < PERGUNTAS.length ? mostrarPergunta() : mostrarResultado();
  });
  prox.focus();
}

function mostrarResultado() {
  const acertos = pontosQuiz / PONTOS_POR_ACERTO;
  const msg = acertos >= 5 ? "Excelente! Você já domina o básico 🏆"
            : acertos >= 3 ? "Muito bem! Falta pouco para dominar 🚀"
            : "Bom começo! Revise os conteúdos e tente novamente 📚";
  $("#quiz").innerHTML = `
    <div class="resultado">
      <p>Seu resultado no quiz</p>
      <p class="nota gradiente">${acertos} / ${PERGUNTAS.length}</p>
      <p>Você fez <b>${pontosQuiz}</b> pontos. ${msg}</p>
      <button class="btn btn-principal" id="refazer">🔄 Refazer o quiz</button>
      <a href="#conteudos" class="btn btn-secundario">Revisar conteúdos</a>
    </div>`;
  $("#refazer").addEventListener("click", iniciarQuiz);
}

/* ---------- 5. Validação do formulário ---------- */
const form = $("#formMentoria");
const CAMPOS = ["nome", "email", "nivel", "motivo", "aceite"];

function mostrarErro(campo, mensagem) {
  $("#erro-" + campo).textContent = mensagem;
  const el = $("#" + campo);
  if (campo !== "aceite") el.classList.toggle("invalido", Boolean(mensagem));
  return !mensagem;                      // true = campo válido
}

function validarFormulario() {
  const nome = $("#nome").value.trim();
  const email = $("#email").value.trim();
  const nivel = $("#nivel").value;
  const motivo = $("#motivo").value.trim();

  // Todos os campos são validados de uma vez (cada um mostra o seu erro);
  // o formulário só é aceito se todos retornarem true.
  return [
    mostrarErro("nome", nome.length < 3 ? "Digite seu nome completo (mínimo 3 letras)."
      : !/^[A-Za-zÀ-ÿ' ]+$/.test(nome) ? "O nome deve conter apenas letras." : ""),
    mostrarErro("email", !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? "Digite um e-mail válido, como voce@email.com." : ""),
    mostrarErro("nivel", nivel === "" ? "Selecione seu nível." : ""),
    mostrarErro("motivo", motivo.length < 20 ? `Escreva pelo menos 20 caracteres (agora: ${motivo.length}).` : ""),
    mostrarErro("aceite", $("#aceite").checked ? "" : "É preciso aceitar para se inscrever.")
  ].every(Boolean);
}

// Limpa a mensagem de erro enquanto a pessoa corrige o campo
CAMPOS.forEach(c => $("#" + c).addEventListener("input", () => mostrarErro(c, "")));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  $("#sucesso").textContent = "";

  if (!validarFormulario()) {
    aviso("Revise os campos destacados.", "nao");
    return;
  }

  const nome = $("#nome").value.trim();
  guardarNome(nome);
  mostrarSaudacao();
  $("#sucesso").textContent = `🎉 Inscrição enviada, ${nome.split(" ")[0]}! Entraremos em contato pelo e-mail informado.`;
  aviso("Inscrição realizada com sucesso! 🚀", "ok");
  form.reset();
});

/* ---------- Início ---------- */
mostrarSaudacao();
criarAtividades();
iniciarQuiz();
mostrarPagina(location.hash.slice(1));