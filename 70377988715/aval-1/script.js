
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

:root {
  --fundo: #f7f7fb;
  --texto: #202033;
  --suave: #77778b;
  --roxo: #6546d7;
  --roxo-escuro: #5034bd;
  --branco: #ffffff;
  --borda: #e9e8f0;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'DM Sans', Arial, sans-serif;
  background: var(--fundo);
  color: var(--texto);
}

button, input {
  font: inherit;
}

a {
  color: inherit;
  text-decoration: none;
}

.topo {
  height: 76px;
  padding: 0 7%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--branco);
  border-bottom: 1px solid var(--borda);
}

.logo {
  font-size: 1.35rem;
  font-weight: 800;
}

.logo span {
  color: var(--roxo);
}

nav {
  display: flex;
  gap: 30px;
  color: #5d5d70;
  font-size: .94rem;
}

nav a:hover {
  color: var(--roxo);
}

.botao-carrinho {
  border: 0;
  border-radius: 10px;
  background: #f0edff;
  color: var(--roxo);
  padding: 11px 15px;
  font-weight: 700;
  cursor: pointer;
}

.botao-carrinho span {
  display: inline-grid;
  place-items: center;
  min-width: 21px;
  height: 21px;
  margin-left: 5px;
  border-radius: 50%;
  background: var(--roxo);
  color: white;
}

.banner {
  min-height: 390px;
  margin: 34px 7% 0;
  padding: 55px 7%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  border-radius: 22px;
  background: linear-gradient(115deg, #211b43, #5137a7 70%, #8068e4);
  color: white;
}

.banner-conteudo {
  position: relative;
  z-index: 1;
}

.etiqueta {
  color: #a99af3;
  font-size: .72rem;
  font-weight: 800;
  letter-spacing: 2px;
  margin-bottom: 13px;
}

.banner h1 {
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  line-height: 1.08;
  margin-bottom: 15px;
}

.banner-conteudo > p:not(.etiqueta) {
  color: #e0dcf7;
  margin-bottom: 27px;
}

.botao-principal {
  display: inline-block;
  border: 0;
  border-radius: 10px;
  padding: 13px 20px;
  background: var(--roxo);
  color: white;
  font-weight: 700;
  cursor: pointer;
  text-align: center;
  transition: background .2s, transform .2s;
}

.botao-principal:hover {
  background: var(--roxo-escuro);
  transform: translateY(-1px);
}

.banner .botao-principal {
  background: white;
  color: #382579;
}

.banner-destaque {
  width: 245px;
  height: 245px;
  margin-right: 5%;
  display: grid;
  place-items: center;
  border: 1px solid #ffffff55;
  border-radius: 50%;
  background: #ffffff12;
  box-shadow: 0 0 0 25px #ffffff0b, 0 0 0 50px #ffffff08;
}

.banner-destaque span {
  font-size: 9rem;
  font-weight: 800;
  color: #ffffffaa;
}

.secao-produtos {
  padding: 75px 7%;
}

.titulo-secao {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 20px;
}

.titulo-secao .etiqueta,
.sobre .etiqueta {
  color: var(--roxo);
}

h2 {
  font-size: 2rem;
}

.campo-busca input {
  width: 250px;
  padding: 12px 15px;
  border: 1px solid var(--borda);
  border-radius: 10px;
  outline: none;
  background: white;
}

.campo-busca input:focus {
  border-color: var(--roxo);
}

.filtros {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin: 27px 0;
}

.filtro {
  border: 1px solid var(--borda);
  border-radius: 30px;
  padding: 9px 16px;
  color: #666579;
  background: white;
  cursor: pointer;
}

.filtro.ativo,
.filtro:hover {
  border-color: var(--roxo);
  background: var(--roxo);
  color: white;
}

.grade-produtos {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
}

.cartao-produto {
  overflow: hidden;
  border: 1px solid var(--borda);
  border-radius: 15px;
  background: white;
  transition: transform .2s, box-shadow .2s;
}

.cartao-produto:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px #27204412;
}

.imagem-produto {
  height: 175px;
  display: grid;
  place-items: center;
  background: #f0edff;
  font-size: 4.5rem;
}

.info-produto {
  padding: 17px;
}

.categoria-produto {
  color: var(--suave);
  font-size: .75rem;
}

.info-produto h3 {
  margin: 6px 0 12px;
  font-size: 1rem;
}

.preco-produto {
  color: var(--roxo);
  font-size: 1.1rem;
  font-weight: 800;
  margin-bottom: 14px;
}

.botao-adicionar {
  width: 100%;
  border: 0;
  border-radius: 8px;
  padding: 10px;
  color: white;
  background: var(--texto);
  font-weight: 700;
  cursor: pointer;
}

.botao-adicionar:hover {
  background: var(--roxo);
}

.sem-produtos {
  grid-column: 1 / -1;
  padding: 35px;
  text-align: center;
  color: var(--suave);
  background: white;
  border-radius: 12px;
}

.sobre {
  margin: 0 7% 70px;
  padding: 45px;
  text-align: center;
  border-radius: 18px;
  background: white;
}

.sobre h2 {
  margin-bottom: 12px;
}

.sobre > p:last-child {
  max-width: 620px;
  margin: auto;
  color: var(--suave);
  line-height: 1.7;
}

footer {
  padding: 25px;
  text-align: center;
  color: var(--suave);
  font-size: .85rem;
  background: white;
  border-top: 1px solid var(--borda);
}

.fundo-modal {
  position: fixed;
  inset: 0;
  z-index: 10;
  display: flex;
  justify-content: end;
  background: #17142788;
}

.fundo-modal[hidden] {
  display: none;
}

.painel-carrinho {
  width: min(440px, 100%);
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 25px;
  background: white;
  box-shadow: -10px 0 40px #0002;
}

.cabecalho-carrinho {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--borda);
}

.fechar {
  border: 0;
  background: none;
  font-size: 2rem;
  cursor: pointer;
}

.itens-carrinho {
  flex: 1;
  overflow-y: auto;
  padding: 12px 0;
}

.carrinho-vazio {
  padding: 35px 5px;
  color: var(--suave);
  text-align: center;
}

.item-carrinho {
  display: grid;
  grid-template-columns: 48px 1fr auto;
  gap: 12px;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid var(--borda);
}

.icone-item {
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: #f0edff;
  font-size: 1.6rem;
}

.detalhes-item strong {
  display: block;
  font-size: .9rem;
}

.detalhes-item small {
  color: var(--suave);
}

.controles-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 7px;
}

.controles-item button {
  width: 24px;
  height: 24px;
  border: 1px solid var(--borda);
  border-radius: 6px;
  background: white;
  cursor: pointer;
}

.remover-item {
  border: 0;
  background: none;
  color: #c34c61;
  cursor: pointer;
  font-size: .8rem;
}

.resumo-carrinho {
  padding-top: 18px;
  border-top: 1px solid var(--borda);
}

.linha-total {
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
  font-size: 1.1rem;
}

.botao-finalizar {
  width: 100%;
}

.aviso {
  margin-top: 10px;
  text-align: center;
  color: var(--suave);
  font-size: .75rem;
}

.mensagem {
  position: fixed;
  z-index: 20;
  bottom: 22px;
  left: 50%;
  transform: translate(-50%, 20px);
  padding: 12px 18px;
  border-radius: 9px;
  background: #24213a;
  color: white;
  opacity: 0;
  pointer-events: none;
  transition: .2s;
}

.mensagem.visivel {
  opacity: 1;
  transform: translate(-50%, 0);
}

.somente-leitor {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 900px) {
  .grade-produtos {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .banner-destaque {
    width: 180px;
    height: 180px;
    margin-right: 2%;
  }

  .banner-destaque span {
    font-size: 7rem;
  }
}

@media (max-width: 600px) {
  .topo {
    height: auto;
    min-height: 68px;
    padding: 14px 5%;
    flex-wrap: wrap;
    gap: 12px;
  }

  nav {
    order: 3;
    width: 100%;
    justify-content: center;
    gap: 22px;
  }

  .banner {
    min-height: 340px;
    margin: 20px 5% 0;
    padding: 35px 25px;
  }

  .banner-destaque {
    display: none;
  }

  .secao-produtos {
    padding: 55px 5%;
  }

  .titulo-secao {
    align-items: stretch;
    flex-direction: column;
  }

  .campo-busca input {
    width: 100%;
  }

  .grade-produtos {
    gap: 12px;
  }

  .imagem-produto {
    height: 135px;
    font-size: 3.5rem;
  }

  .info-produto {
    padding: 12px;
  }

  .sobre {
    margin: 0 5% 50px;
    padding: 30px 20px;
  }

  h2 {
    font-size: 1.7rem;
  }
}

@media (max-width: 360px) {
  .grade-produtos {
    grid-template-columns: 1fr;
  }
}
