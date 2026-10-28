:root {
  /* Paleta base (sua) */
  --fundo: hsl(210, 45%, 48%);
  --superficie: #ffffff;
  --tinta: #16181b;
  --tinta-suave: #d8dde2;
  --linha: #435569;
  --alta: #d64933;
  --media: #d99a1c;
  --baixa: #2a9d8f;
  --foco: #1b5fd1;
  --erro-fundo: #fbe9e6;
  --erro-texto: #9c2a19;
  --ok-fundo: #e3f4f1;
  --ok-texto: #17655b;

  /* Apoio: texto secundário sobre superfícies brancas e sombras */
  --tinta-media: #4a5868;
  --borda-clara: #d5dce4;
  --sombra-painel: 0 1px 0 hsl(0 0% 100% / 0.6) inset, 0 18px 40px -12px hsl(215 60% 12% / 0.55);
  --sombra-cartao: 0 8px 20px -10px hsl(215 60% 12% / 0.6);
}

* { box-sizing: border-box; }

html { min-height: 100%; }

/* Fundo em camadas: brilho no topo, vinheta nos cantos,
   grade de caderno e escurecimento progressivo para baixo */
body {
  margin: 0;
  min-height: 100vh;
  color: var(--tinta);
  font-family: "Bricolage Grotesque", system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  background-color: var(--fundo);
  background-image:
    radial-gradient(48rem 30rem at 12% -8%, hsl(195 85% 72% / 0.55), transparent 65%),
    radial-gradient(44rem 34rem at 108% 6%, hsl(228 60% 28% / 0.65), transparent 62%),
    radial-gradient(40rem 28rem at 50% 115%, hsl(220 70% 14% / 0.7), transparent 70%),
    linear-gradient(hsl(0 0% 100% / 0.07) 1px, transparent 1px),
    linear-gradient(90deg, hsl(0 0% 100% / 0.07) 1px, transparent 1px),
    linear-gradient(hsl(0 0% 100% / 0.05) 1px, transparent 1px),
    linear-gradient(90deg, hsl(0 0% 100% / 0.05) 1px, transparent 1px),
    linear-gradient(180deg, transparent 40%, hsl(218 55% 20% / 0.5));
  background-size:
    auto, auto, auto,
    128px 128px, 128px 128px,
    32px 32px, 32px 32px,
    auto;
  background-attachment: fixed;
}

.app {
  max-width: 62rem;
  margin: 0 auto;
  padding: 3rem 1.25rem 4rem;
}

/* Cabeçalho */
.topo {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.75rem 2rem;
  margin-bottom: 2.25rem;
  padding-bottom: 1.25rem;
  border-bottom: 2px solid hsl(0 0% 100% / 0.35);
}

h1 {
  margin: 0;
  color: #fff;
  font-size: clamp(2.25rem, 6vw, 3.75rem);
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1;
  text-shadow: 0 2px 18px hsl(215 60% 12% / 0.35);
}

h2 {
  margin: 0 0 1rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.resumo {
  margin: 0;
  padding: 0.35rem 0.9rem;
  color: #fff;
  font-weight: 600;
  background: hsl(215 55% 18% / 0.35);
  border: 1px solid hsl(0 0% 100% / 0.25);
  border-radius: 999px;
  backdrop-filter: blur(6px);
}

.colunas {
  display: grid;
  grid-template-columns: 20rem 1fr;
  gap: 2rem;
  align-items: start;
}

/* Formulário */
.painel {
  position: sticky;
  top: 1.5rem;
  background: var(--superficie);
  border: 1px solid var(--linha);
  border-top: 6px solid var(--tinta);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: var(--sombra-painel);
}

label {
  display: block;
  margin: 1rem 0 0.35rem;
  font-weight: 600;
  font-size: 0.95rem;
}

input,
select,
button {
  font: inherit;
  color: inherit;
}

input[type="text"],
select {
  width: 100%;
  padding: 0.65rem 0.75rem;
  background: var(--superficie);
  border: 1px solid #8e9cac;
  border-radius: 0.4rem;
}

.dica {
  display: block;
  margin-top: 0.3rem;
  font-size: 0.85rem;
  color: var(--tinta-media);
}

:focus-visible {
  outline: 3px solid var(--foco);
  outline-offset: 2px;
}

.botao-principal {
  width: 100%;
  margin-top: 1.5rem;
  padding: 0.75rem 1rem;
  background: var(--tinta);
  color: #fff;
  font-weight: 600;
  border: 0;
  border-radius: 0.4rem;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
}

.botao-principal:hover { background: #263b5c; }
.botao-principal:active { transform: translateY(1px); }

.mensagem {
  margin: 1rem 0 0;
  padding: 0;
  font-size: 0.95rem;
  border-radius: 0.4rem;
}

.mensagem.erro,
.mensagem.sucesso {
  padding: 0.65rem 0.75rem;
}

.mensagem.erro { background: var(--erro-fundo); color: var(--erro-texto); }
.mensagem.sucesso { background: var(--ok-fundo); color: var(--ok-texto); }

/* Lista */
.lista {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.85rem;
}

.tarefa {
  --cor: var(--media);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.5rem 1rem;
  padding: 1rem 1.25rem 1rem 1rem;
  background: var(--superficie);
  border: 1px solid var(--linha);
  border-left: 0.6rem solid var(--cor);
  border-radius: 0.5rem;
  box-shadow: var(--sombra-cartao);
}

.tarefa[data-prioridade="1"] { --cor: var(--alta); }
.tarefa[data-prioridade="2"] { --cor: var(--media); }
.tarefa[data-prioridade="3"] { --cor: var(--baixa); }

.codigo {
  min-width: 2.5rem;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--tinta-media);
}

.titulo-tarefa {
  margin: 0;
  font-weight: 600;
  font-size: 1.1rem;
  overflow-wrap: anywhere;
}

.acoes {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.acoes select {
  width: auto;
  padding: 0.45rem 0.5rem;
  font-size: 0.9rem;
}

.botao-concluir {
  padding: 0.45rem 0.85rem;
  background: transparent;
  border: 1px solid var(--tinta);
  border-radius: 0.4rem;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.botao-concluir:hover { background: var(--tinta); color: #fff; }

.selo-concluida {
  padding: 0.25rem 0.65rem;
  background: var(--ok-fundo);
  color: var(--ok-texto);
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
}

.tarefa.concluida {
  --cor: #9fb0c0;
  background: #eef2f5;
  box-shadow: none;
}

.tarefa.concluida .titulo-tarefa {
  color: var(--tinta-media);
  text-decoration: line-through;
}

.vazio {
  padding: 2rem 1.5rem;
  color: #fff;
  background: hsl(215 55% 18% / 0.3);
  border: 2px dashed hsl(0 0% 100% / 0.45);
  border-radius: 0.5rem;
  backdrop-filter: blur(4px);
}

.visualmente-oculto {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

@media (max-width: 52rem) {
  .colunas { grid-template-columns: 1fr; }
  .painel { position: static; }
}

@media (max-width: 34rem) {
  .tarefa { grid-template-columns: auto 1fr; }
  .acoes { grid-column: 1 / -1; }
}

@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; }
}