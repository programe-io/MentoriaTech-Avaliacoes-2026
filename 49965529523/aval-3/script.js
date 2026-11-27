// Identificação local do projeto; não envia dados.
const aluno = "Isabely Eloá Castro de Melo";
const filtro = document.querySelector('#filtro');
filtro.addEventListener('input', () => {const termo = filtro.value.toLocaleLowerCase('pt-BR').trim();let total = 0;document.querySelectorAll('#artigos article').forEach(artigo => {artigo.hidden = !artigo.textContent.toLocaleLowerCase('pt-BR').includes(termo);if (!artigo.hidden) total++;});document.querySelector('#resultado').textContent = total ? total + ' artigo(s) encontrado(s).' : 'Nenhum artigo encontrado. Tente outro tema.';});