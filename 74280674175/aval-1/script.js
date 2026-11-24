const dicas = [
  "🍎 Consuma frutas variadas todos os dias!",
  "💧 Beba água regularmente ao longo do dia!",
  "🥦 Inclua verduras e legumes nas refeições!",
  "🥗 Experimente preparar uma salada colorida!",
  "🌾 Prefira alimentos ricos em fibras!",
  "🍌 Inclua frutas no café da manhã!",
  "🫘 Consuma feijão e outros alimentos naturais!",
  "🥕 Varie as cores dos alimentos no seu prato!",
  "🚶 Pratique atividades físicas regularmente!",
  "😴 Tenha uma boa rotina de sono!"
];

function gerarDica() {
  const indice = Math.floor(Math.random() * dicas.length);
  const elemento = document.getElementById("dica");
  if (elemento) {
    elemento.textContent = dicas[indice];
  \}
\}

const receitas = [
  { nome: "Salada Colorida 🥗", ingredientes: ["Alface", "Tomate", "Cenoura ralada", "Azeite", "Limão"], preparo: "Lave os ingredientes, corte os vegetais e misture tudo. Tempere a gosto." \},
  { nome: "Vitamina de Banana 🍌", ingredientes: ["1 banana", "1 copo de leite", "Aveia a gosto"], preparo: "Coloque todos os ingredientes no liquidificador e bata até ficar homogêneo." \},
  { nome: "Mingau de Aveia 🥣", ingredientes: ["1 copo de leite", "3 colheres de aveia", "1 banana"], preparo: "Misture o leite e a aveia em uma panela, mexa até engrossar e acrescente a banana." \},
  { nome: "Sanduíche Natural 🥪", ingredientes: ["Pão integral", "Frango desfiado", "Alface", "Tomate", "Cenoura"], preparo: "Monte o sanduíche com os ingredientes e sirva." \}
];

function mostrarReceita(tipo) {
  const resultado = document.getElementById("resultado");
  const receitasProntas = {
    salada: `<h3>🥗 Salada colorida</h3><p>1. Lave bem as folhas e os vegetais.</p><p>2. Corte o tomate e a cenoura.</p><p>3. Misture todos os ingredientes.</p><p>4. Tempere com azeite e limão.</p><strong>Pronto! Aproveite sua salada!</strong>`,
    vitamina: `<h3>🍌 Vitamina de banana</h3><p>1. Descasque uma banana.</p><p>2. Coloque no liquidificador.</p><p>3. Acrescente leite e aveia.</p><p>4. Bata até ficar cremoso.</p><strong>Sua vitamina está pronta!</strong>`,
    mingau: `<h3>🥣 Mingau de aveia</h3><p>1. Coloque leite e aveia em uma panela.</p><p>2. Mexa em fogo baixo.</p><p>3. Cozinhe até engrossar.</p><p>4. Acrescente frutas a gosto.</p><strong>Bom apetite!</strong>`
  \};
  if (resultado && receitasProntas[tipo]) {
    resultado.innerHTML = receitasProntas[tipo];
  \}
\}

const form = document.getElementById("formulario");
if (form) {
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    document.getElementById("resposta").textContent = "Obrigado, " + nome + "! Sua mensagem foi recebida.";
    this.reset();
  \});
\}$0