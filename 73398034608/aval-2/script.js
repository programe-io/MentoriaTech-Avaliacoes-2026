JavaScript


function bfs(inicio, adj){
  let dist = {\};
  let fila = [inicio];
  dist[inicio] = 0;
  let visitado = new Set([inicio]);

  while(fila.length > 0){
    let atual = fila.shift();
    for(let vizinho of adj[atual]){
      if(!visitado.has(vizinho)){
        visitado.add(vizinho);
        dist[vizinho] = dist[atual] + 1;
        fila.push(vizinho);
      \}
    \}
  \}
  return dist;
\}

function analisarGrafo(){
  let vertices = document.getElementById("nos").value
    .split(",").map(v => v.trim()).filter(v => v !== "");

  let arestas = document.getElementById("ligacoes").value
    .split(",").map(a => a.trim()).filter(a => a !== "");

  let adj = {\};
  vertices.forEach(v => adj[v] = []);

  for(let a of arestas){
    let partes = a.split(/[- ]+/);
    let x = partes[0], y = partes[1];
    if(adj[x] && adj[y]){
      if(!adj[x].includes(y)) adj[x].push(y);
      if(!adj[y].includes(x)) adj[y].push(x);
    \}
  \}

  let excentricidades = {\};
  let maiorDist = 0;
  let parDistante = "";
  let grafoConexo = true;
  let textoDist = "";

  for(let v of vertices){
    let d = bfs(v, adj);
    let maiorDesseVertice = 0;

    for(let outro of vertices){
      if(d[outro] === undefined){
        grafoConexo = false;
      \} else {
        if(d[outro] > maiorDesseVertice) maiorDesseVertice = d[outro];
        if(d[outro] > maiorDist && v < outro){
          // só conta uma vez, evita duplicar
        \}
        if(d[outro] > maiorDist){
          maiorDist = d[outro];
          parDistante = v + " ↔ " + outro;
        \}
      \}
    \}
    excentricidades[v] = maiorDesseVertice;
    textoDist += `<br>Excentricidade de <b>\${v\}</b>: \${maiorDesseVertice\}`;
  \}

  let saida = document.getElementById("saida");
  saida.classList.remove("escondido");

  if(!grafoConexo){
    document.getElementById("tituloDiametro").innerText = "Grafo desconexo!";
    document.getElementById("textoPar").innerText = "Não existe caminho entre todos os vértices, então o diâmetro não pode ser calculado.";
    document.getElementById("textoRaio").innerText = "";
    document.getElementById("textoCentro").innerText = "";
    document.getElementById("listaDistancias").innerHTML = "";
    return;
  \}

  // Raio = menor excentricidade | Centro = vértice(s) com excentricidade = raio
  let raio = Math.min(...Object.values(excentricidades));
  let centro = Object.keys(excentricidades).filter(v => excentricidades[v] === raio);

  document.getElementById("tituloDiametro").innerHTML = "Diâmetro: <b>" + maiorDist + "</b>";
  document.getElementById("textoPar").innerHTML = "Par mais distante: <b>" + parDistante + "</b><br>No pior caso, a informação precisa de <b>" + maiorDist + "</b> passos pelo menor caminho.";
  document.getElementById("textoRaio").innerHTML = "Raio do grafo: <b>" + raio + "</b>";
  document.getElementById("textoCentro").innerHTML = "Centro do grafo: <b>" + centro.join(", ") + "</b>";
  document.getElementById("listaDistancias").innerHTML = "<b>Excentricidades:</b>" + textoDist;
\}$0