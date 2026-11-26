// Identificação local do projeto; não envia dados.
const aluno = "Gabriela de Carvalho Coelho";
let quantidade = 0;
const botao = document.querySelector('#objetivo-btn');
botao.addEventListener('click', () => {const aberto = botao.getAttribute('aria-expanded') === 'true';botao.setAttribute('aria-expanded', String(!aberto));document.querySelector('#plano').hidden = aberto;botao.textContent = aberto ? 'Ver plano de estudos' : 'Ocultar plano de estudos';});
document.querySelector('#adicionar-habilidade').addEventListener('click', () => {const input = document.querySelector('#habilidade');if (!input.value.trim()) {input.focus();return;}const item = document.createElement('li');item.textContent = input.value.trim();document.querySelector('#habilidades').append(item);quantidade++;document.querySelector('#contagem').textContent = quantidade + ' habilidade(s) adicionada(s).';input.value = '';input.focus();});