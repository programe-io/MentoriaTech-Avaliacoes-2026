const FAIXAS = [
  {max:18.5, nome:"Abaixo do peso",   cor:"var(--c1)", info:"O IMC está abaixo do ideal. Vale buscar orientação profissional para avaliar a alimentação e a saúde geral."},
  {max:25,   nome:"Peso normal",      cor:"var(--c2)", info:"Parabéns! O IMC está na faixa considerada saudável. Mantenha alimentação equilibrada e atividade física."},
  {max:30,   nome:"Sobrepeso",        cor:"var(--c3)", info:"O IMC indica sobrepeso. Ajustes na alimentação e mais movimento ajudam a reduzir riscos à saúde."},
  {max:35,   nome:"Obesidade grau I", cor:"var(--c4)", info:"Há aumento do risco de doenças como diabetes e hipertensão. Recomenda-se acompanhamento profissional."},
  {max:40,   nome:"Obesidade grau II",cor:"var(--c5)", info:"Risco elevado para a saúde. É importante procurar acompanhamento médico e nutricional."},
  {max:Infinity, nome:"Obesidade grau III", cor:"var(--c6)", info:"Risco muito elevado para a saúde. Procure acompanhamento médico o quanto antes."}
];
const CHAVE = "controle-imc-pessoas";
let pessoas = [];

const $ = id => document.getElementById(id);

function carregar(){
  try{ pessoas = JSON.parse(localStorage.getItem(CHAVE)) || []; }catch(e){ pessoas = []; }
  if(!Array.isArray(pessoas)) pessoas = [];
}
function salvar(){
  try{ localStorage.setItem(CHAVE, JSON.stringify(pessoas)); }catch(e){}
}
function num(txt){
  return parseFloat(String(txt).trim().replace(",", "."));
}
function classificar(imc){
  return FAIXAS.find(f => imc < f.max);
}
function fmt(n,d=2){ return n.toFixed(d).replace(".", ","); }
function esc(s){
  return s.replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}

function validar(){
  const nome = $("nome").value.trim();
  let peso = num($("peso").value);
  let altura = num($("altura").value);
  if(!nome) return {erro:"Informe o nome do paciente."};
  if(!(peso > 0) || peso > 500) return {erro:"Informe um peso válido em kg (ex.: 70,5)."};
  if(!(altura > 0)) return {erro:"Informe uma altura válida (ex.: 1,75 ou 175)."};
  if(altura > 3) altura = altura / 100; // aceita centímetros
  if(altura < 0.5 || altura > 2.8) return {erro:"A altura deve estar entre 0,50 m e 2,80 m."};
  return {nome, peso, altura};
}

function mostrarResultado(p){
  const f = classificar(p.imc);
  const box = $("resultado");
  box.style.display = "block";
  box.style.borderLeftColor = f.cor;
  $("resNome").textContent = "Paciente: " + p.nome;
  $("resValor").textContent = "IMC " + fmt(p.imc);
  $("resValor").style.color = f.cor;
  $("resClasse").textContent = f.nome;
  $("resClasse").style.color = f.cor;
  $("resInfo").textContent = f.info;
  // faixa de peso saudável para a altura
  const min = 18.5 * p.altura * p.altura, max = 24.9 * p.altura * p.altura;
  $("resPeso").textContent = "Para " + fmt(p.altura) + " m, o peso considerado normal fica entre " + fmt(min,1) + " kg e " + fmt(max,1) + " kg.";
  $("escala").innerHTML = FAIXAS.map(x =>
    '<div style="background:'+x.cor+'" class="'+(x===f?"on":"")+'">'+x.nome.replace("Obesidade ","Ob. ")+'</div>').join("");
  box.scrollIntoView({behavior:"smooth", block:"nearest"});
}

function renderTabela(){
  const corpo = $("corpo");
  if(!pessoas.length){
    corpo.innerHTML = '<tr><td colspan="6" class="vazio">Nenhuma pessoa cadastrada ainda.</td></tr>';
    return;
  }
  corpo.innerHTML = pessoas.map((p,i) => {
    const f = classificar(p.imc);
    return '<tr><td>'+esc(p.nome)+'</td><td>'+fmt(p.peso,1)+' kg</td><td>'+fmt(p.altura)+' m</td>'+
      '<td><strong>'+fmt(p.imc)+'</strong></td>'+
      '<td><span class="tag" style="color:'+f.cor+'">'+f.nome+'</span></td>'+
      '<td><button class="del" data-i="'+i+'">Excluir</button> <button class="ghost del" style="color:var(--text);border-color:var(--line)" data-ver="'+i+'">Ver</button></td></tr>';
  }).join("");
}

function calcular(){
  const v = validar();
  $("erro").textContent = v.erro || "";
  if(v.erro) return;
  const imc = v.peso / (v.altura * v.altura);
  const pessoa = {nome:v.nome, peso:v.peso, altura:v.altura, imc};
  pessoas.push(pessoa);
  salvar(); renderTabela(); mostrarResultado(pessoa);
  limparCampos();
}
function limparCampos(){
  $("nome").value = ""; $("peso").value = ""; $("altura").value = "";
  $("erro").textContent = ""; $("nome").focus();
}

$("btnCalcular").addEventListener("click", calcular);
$("btnLimpar").addEventListener("click", limparCampos);
["nome","peso","altura"].forEach(id => $(id).addEventListener("keydown", e => { if(e.key === "Enter") calcular(); }));
$("btnTudo").addEventListener("click", () => {
  if(pessoas.length && confirm("Apagar todas as pessoas cadastradas?")){
    pessoas = []; salvar(); renderTabela(); $("resultado").style.display = "none";
  }
});
$("corpo").addEventListener("click", e => {
  const b = e.target.closest("button"); if(!b) return;
  if(b.dataset.i !== undefined){
    pessoas.splice(+b.dataset.i, 1); salvar(); renderTabela();
  } else if(b.dataset.ver !== undefined){
    mostrarResultado(pessoas[+b.dataset.ver]);
  }
});

carregar(); renderTabela();