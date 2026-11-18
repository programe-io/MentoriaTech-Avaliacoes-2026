JavaScript


let posicoes = {\};

function desenharGrafo(vertices, arestas, parDiametro){
  let canvas = document.getElementById("tela");
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let centroX = 260, centroY = 150, raioCirculo = 110;
  posicoes = {\};

  vertices.forEach((v, i) => {
    let angulo = (i / vertices.length) * Math.PI * 2 - Math.PI / 2;
    posicoes[v] = {
      x: centroX + Math.cos(angulo) * raioCirculo,
      y: centroY + Math.sin(angulo) * raioCirculo
    \};
  \});

  // Desenha arestas
  for(let [a, b] of arestas){
    let p1 = posicoes[a], p2 = posicoes[b];
    if(!p1 || !p2) continue;
    let ehDestaque = parDiametro && ((parDiametro[0] === a && parDiametro[1] === b) || (parDiametro[0] === b && parDiametro[1] === a));
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = ehDestaque ? "#dc2626" : "#94a3b8";
    ctx.lineWidth = ehDestaque ? 4 : 2;
    ctx.stroke();
  \}

  // Desenha vértices
  for(let v of vertices){
    let p = posicoes[v];
    ctx.beginPath();
    ctx.arc(p.x, p.y, 20, 0, Math.PI * 2);
    ctx.fillStyle = "#1e40af";
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.font = "bold 14px Verdana";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(v, p.x, p.y);
  \}
\}

function menorCaminho(inicio, fim, listaAdj){
  let fila = [[inicio]];
  let vistos = new Set([inicio]);
  while(fila.length > 0){
    let caminho = fila.shift();
    let ultimo = caminho[caminho.length - 1];
    if(ultimo === fim) return caminho;
    for(let viz of listaAdj[ultimo]){
      if(!vistos.has(viz)){
        vistos.add(viz);
        fila.push([...caminho, viz]);
      \}
    \}
  \}
  return null;
\}

function executar(){
  let vertices = document.getElementById("campoVertices").value
    .split(",").map(s => s.trim()).filter(s => s !== "");
  let textoArestas = document.getElementById("campoArestas").value
    .split(",").map(s => s.trim()).filter(s => s !== "");

  let arestas = [];
  let listaAdj = {\};
  vertices.forEach(v => listaAdj[v] = []);

  for(let t of textoArestas){
    let p = t.split("-");
    if(p.length !== 2) continue;
    let a = p[0].trim(), b = p[1].trim();
    if(listaAdj[a] && listaAdj[b]){
      arestas.push([a,b]);
      listaAdj[a].push(b);
      listaAdj[b].push(a);
    \}
  \}

  let diametro = 0;
  let melhorPar = null;
  let melhorCaminho = null;
  let linhasTabela = "";
  let desconexo = false;

  for(let i = 0; i < vertices.length; i++){
    for(let j = i + 1; j < vertices.length; j++){
      let caminho = menorCaminho(vertices[i], vertices[j], listaAdj);
      if(!caminho){
        desconexo = true;
        linhasTabela += `<tr><td>\${vertices[i]\} - \${vertices[j]\}</td><td>sem caminho</td><td>-</td></tr>`;
      \} else {
        let dist = caminho.length - 1;
        linhasTabela += `<tr><td>\${vertices[i]\} - \${vertices[j]\}</td><td>\${dist\}</td><td>\${caminho.join(" → ")\}</td></tr>`;
        if(dist > diametro){
          diametro = dist;
          melhorPar = [vertices[i], vertices[j]];
          melhorCaminho = caminho;
        \}
      \}
    \}
  \}

  desenharGrafo(vertices, arestas, melhorPar);

  let bloco = document.getElementById("resposta");
  bloco.classList.remove("oculto");

  if(desconexo){
    document.getElementById("valorDiametro").innerText = "Grafo desconexo";
    document.getElementById("valorPar").innerText = "Não dá para calcular o diâmetro porque nem todos os vértices se conectam.";
    document.getElementById("valorExplicacao").innerText = "";
    document.getElementById("tabela").innerHTML = `<table><tr><th>Par</th><th>Distância</th><th>Menor caminho</th></tr>\${linhasTabela\}</table>`;
    return;
  \}

  document.getElementById("valorDiametro").innerText = "Diâmetro = " + diametro;
  document.getElementById("valorPar").innerText = "Par mais distante: " + melhorPar[0] + " até " + melhorPar[1];
  document.getElementById("valorExplicacao").innerText = "Menor caminho entre eles: " + melhorCaminho.join(" → ") + ". Ou seja, no pior caso a informação atravessa " + diametro + " arestas.";
  document.getElementById("tabela").innerHTML = `<table><tr><th>Par</th><th>Distância</th><th>Menor caminho</th></tr>\${linhasTabela\}</table>`;
\}$0