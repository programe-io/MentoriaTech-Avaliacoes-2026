<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Só JavaScript</title>
</head>
<body>
<script>
// === TUDO AQUI É FEITO COM JAVASCRIPT ===

// Estilo da página
document.body.style.margin = '0';
document.body.style.padding = '2rem';
document.body.style.minHeight = '100vh';
document.body.style.background = 'linear-gradient(135deg, #fc5c5c, #f79d1e)';
document.body.style.fontFamily = 'Arial, sans-serif';
document.body.style.display = 'flex';
document.body.style.flexDirection = 'column';
document.body.style.alignItems = 'center';
document.body.style.justifyContent = 'center';

// Caixa principal
const caixa = document.createElement('div');
caixa.style.background = 'white';
caixa.style.padding = '3rem';
caixa.style.borderRadius = '20px';
caixa.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)';
caixa.style.textAlign = 'center';
caixa.style.maxWidth = '500px';
caixa.style.width = '100%';

// Título
const titulo = document.createElement('h1');
titulo.textContent = '🔥 Só JavaScript!';
titulo.style.color = '#fc5c5c';
titulo.style.marginBottom = '1rem';

// Texto
const texto = document.createElement('p');
texto.textContent = 'Tudo aqui — conteúdo, cores, estilos e interação — foi criado apenas com código JavaScript!';
texto.style.color = '#555';
texto.style.fontSize = '1.1rem';
texto.style.marginBottom = '2rem';

// Área de exibição
const display = document.createElement('div');
display.style.fontSize = '3rem';
display.style.fontWeight = 'bold';
display.style.color = '#fc5c5c';
display.style.marginBottom = '1.5rem';
display.style.padding = '1rem';
display.style.background = '#fff3e0';
display.style.borderRadius = '10px';
display.textContent = '0';

let numero = 0;

// Animação no display
function animar() {
    display.style.transform = 'scale(1.3)';
    setTimeout(() => display.style.transform = 'scale(1)', 200);
\}

// Botões
const btnMais = document.createElement('button');
btnMais.textContent = '➕ Adicionar';
btnMais.style.background = '#fc5c5c';
btnMais.style.color = 'white';
btnMais.style.border = 'none';
btnMais.style.padding = '1rem 1.5rem';
btnMais.style.margin = '0.5rem';
btnMais.style.borderRadius = '10px';
btnMais.style.fontSize = '1rem';
btnMais.style.cursor = 'pointer';
btnMais.style.transition = 'transform 0.2s';
btnMais.onclick = () => {
    numero++;
    display.textContent = numero;
    animar();
\};

const btnMenos = document.createElement('button');
btnMenos.textContent = '➖ Diminuir';
btnMenos.style.background = '#f79d1e';
btnMenos.style.color = 'white';
btnMenos.style.border = 'none';
btnMenos.style.padding = '1rem 1.5rem';
btnMenos.style.margin = '0.5rem';
btnMenos.style.borderRadius = '10px';
btnMenos.style.fontSize = '1rem';
btnMenos.style.cursor = 'pointer';
btnMenos.style.transition = 'transform 0.2s';
btnMenos.onclick = () => {
    numero--;
    display.textContent = numero;
    animar();
\};

const btnReset = document.createElement('button');
btnReset.textContent = '🔄 Zerar';
btnReset.style.background = '#333';
btnReset.style.color = 'white';
btnReset.style.border = 'none';
btnReset.style.padding = '1rem 1.5rem';
btnReset.style.margin = '0.5rem';
btnReset.style.borderRadius = '10px';
btnReset.style.fontSize = '1rem';
btnReset.style.cursor = 'pointer';
btnReset.style.transition = 'transform 0.2s';
btnReset.onclick = () => {
    numero = 0;
    display.textContent = numero;
    animar();
\};

// Efeito de passar o mouse
[btnMais, btnMenos, btnReset].forEach(b => {
    b.onmouseover = () => b.style.transform = 'translateY(-3px)';
    b.onmouseout = () => b.style.transform = 'translateY(0)';
\});

// Montar tudo na página
caixa.appendChild(titulo);
caixa.appendChild(texto);
caixa.appendChild(display);
caixa.appendChild(btnMais);
caixa.appendChild(btnMenos);
caixa.appendChild(btnReset);
document.body.appendChild(caixa);
</script>
</body>
</html>$0