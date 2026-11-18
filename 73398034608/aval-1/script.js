JavaScript


function calcular(){
  const vertices = document.getElementById("vertices").value
    .split(",").map(v => v.trim()).filter(v => v !== "");
  const arestasTexto = document.getElementById("arestas").value
    .split(",").map(a => a.trim()).filter(a => a !== "");

  const n = vertices.length;
  const indice = {\};
  vertices.forEach((v,i) => indice[v] = i);

  // Matriz de distâncias, começa com infinito
  let dist = Array.from({length: n\}, () => Array(n).fill(Infinity));
  for(let i=0;i<n;i++) dist[i][i] = 0;

  // Arestas têm peso 1
  for(let a of arestasTexto){
    const [origem, destino] = a.split("-").map(s => s.trim());
    if(indice[origem] === undefined || indice[destino] === undefined) continue;
    const i = indice[origem];
    const j = indice[destino];
    dist[i][j] = 1;
    dist[j][i] = 1;
  \}

  // Floyd-Warshall: encontra todos os menores caminhos
  for(let k=0;k<n;k++)
    for(let i=0;i<n;i++)
      for(let j=0;j<n;j++)
        if(dist[i][k] + dist[k][j] < dist[i][j])
          dist[i][j] = dist[i][k] + dist[k][j];

  // Diâmetro = maior menor distância
  let diametro = 0;
  let par = "";
  let conexo = true;

  for(let i=0;i<n;i++){
    for(let j=i+1;j<n;j++){
      if(dist[i][j] === Infinity){
        conexo = false;
      \} else if(dist[i][j] > diametro){
        diametro = dist[i][j];
        par = vertices[i] + " até " + vertices[j];
      \}
    \}
  \}

  if(!conexo){
    document.getElementById("resultado").innerHTML = "Grafo desconexo: o diâmetro não é definido.";
    document.getElementById("detalhes").innerHTML = "Existe pelo menos um par de vértices sem caminho entre eles.";
    return;
  \}

  document.getElementById("resultado").innerHTML =
    "Diâmetro do grafo: " + diametro;

  document.getElementById("detalhes").innerHTML =
    "Par mais distante: <b>" + par + "</b><br>" +
    "Isso significa que, no pior caso, uma informação leva " + diametro +
    " passos para ir de um extremo ao outro pelo menor caminho.";
\}

$0