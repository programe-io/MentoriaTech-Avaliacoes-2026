Li seu resumo da *Aula 3.13 - Projeto Ficha de Anamnese PARTE 1* ✅

É o início do projeto de controle de IMC, só a base: HTML + CSS pronto + início do JS. Ainda não salva de verdade, só prepara tudo.

*O que o sistema faz:*
- Recebe nome, idade, altura e peso
- Calcula IMC = peso / altura²
- Classifica e mostra na tabela

*Arquivos:*
- *index.html:* estrutura, form + tabela
- *style.css:* já vem pronto
- *app.js:* lógica

*HTML:*
- *Form:* `id="form-pessoa"` com nome (text, max 50), idade (number 1-120), altura, peso + botões salvar / cancelar + `id="erro"` pra alerta
- *Tabela:* colunas nome, idade, altura, peso, IMC, classificação e ações
- *tbody:* `id="tabela-pessoas"` começa vazio

*JS - o que mais cai:*
- *ID automático:* `let codigo = 0` + função `gerarCodigo()` com `++codigo` - 1º vira 1, 2º vira 2...
- *Tabela:* `document.getElementById("tabela-pessoas")`
- *criarCelula():* cria um `td`
- *criarLinha(pessoa):* cria `tr`, coloca `dataset.id` e as células
- *render():* limpa com `innerHTML = ""`, se `pessoas.length == 0` mostra linha com `colspan="7"` + "Nenhuma pessoa cadastrada ainda", senão faz `forEach` + `appendChild`
- *Sem chamar render():* nada aparece na tela

*Regras de negócio:*
- *calcularIMC(peso, altura):* `peso / (altura * altura)`
- *classificarIMC(imc):* retorna `{ texto, classe }`
- *Faixas:* < 18,5 abaixo do peso, 18,5 a < 25 normal, 25 a < 30 sobrepeso, depois obesidade grau 1, 2 e 3
- *formatar(valor, casas):* usa `toLocaleString("pt-BR")` pra usar vírgula no lugar de ponto

Quer que eu monte o código completo dessa Parte 1 pronto pra colar no Programiz, ou faço umas perguntinhas pra revisar?