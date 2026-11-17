html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vida Saudável - Guia de Saúde e Bem-Estar</title>
  <!-- Conecta o arquivo CSS -->
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <header>
    <h1>Portal Vida Saudável</h1>
    <p>Informação e ferramentas simples para cuidar do seu corpo e mente</p>
  </header>

  <nav>
    <a href="#pilares">Pilares da Saúde</a>
    <a href="#calculadora">Calculadora de IMC</a>
    <a href="#dica-extra">Dica Rápida</a>
  </nav>

  <main>
    <!-- Seção 1: Pilares da Saúde -->
    <section id="pilares">
      <h2>4 Pilares Essenciais para a Saúde</h2>
      <div class="grid-dicas">
        <div class="card">
          <h3>Alimentação Equilibrada</h3>
          <p>Priorize alimentos naturais como frutas, verduras, legumes e grãos integrais. Evite o excesso de açúcar e ultraprocessados.</p>
        </div>
        <div class="card">
          <h3>Atividade Física</h3>
          <p>Pratique pelo menos 150 minutos de exercícios moderados por semana para fortalecer o coração e melhorar a disposição.</p>
        </div>
        <div class="card">
          <h3>Hidratação</h3>
          <p>Beba água regularmente ao longo do dia. A hidratação mantém o bom funcionamento dos órgãos e regula a temperatura corporal.</p>
        </div>
        <div class="card">
          <h3>Sono de Qualidade</h3>
          <p>Durma entre 7 e 9 horas por noite. O descanso adequado ajuda na recuperação muscular e na saúde mental.</p>
        </div>
      </div>
    </section>

    <!-- Seção 2: Calculadora de IMC Interativa -->
    <section id="calculadora">
      <h2>Calculadora de IMC</h2>
      <p>Preencha os campos abaixo para calcular o seu Índice de Massa Corporal.</p>
      <br>
      <div class="form-group">
        <label for="peso">Peso (em kg):</label>
        <input type="number" id="peso" placeholder="Ex: 70.5" step="0.1">
      </div>
      <div class="form-group">
        <label for="altura">Altura (em metros):</label>
        <input type="number" id="altura" placeholder="Ex: 1.75" step="0.01">
      </div>
      <button onclick="calcularIMC()">Calcular IMC</button>

      <div id="resultado-imc"></div>
    </section>

    <!-- Seção 3: Gerador de Dicas -->
    <section id="dica-extra">
      <h2>Precisa de motivação hoje?</h2>
      <p id="texto-dica">Clique no botão abaixo para receber uma dica rápida de bem-estar.</p>
      <br>
      <button onclick="novaDica()">Gerar Dica de Saúde</button>
    </section>
  </main>

  <footer>
    <p>Projeto Educacional sobre Saúde &copy; 2026 - Consulte sempre um profissional de saúde.</p>
  </footer>

  <!-- Conecta o arquivo JavaScript -->
  <script src="script.js"></script>

</body>
</html>
Use o código com cuidado.
Assim que você copiar e salvar o index.html, me avise aqui para eu te mandar o próximo código (style.css)!

CSS

Aqui está o segundo arquivo, que deve ser salvo na mesma pasta com o nome style.css:
css
/* Estilos Gerais */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background-color: #f4f9f8;
  color: #333;
  line-height: 1.6;
}

header {
  background-color: #16a085;
  color: white;
  padding: 1.5rem 2rem;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

header h1 {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
}

nav {
  background-color: #117a65;
  padding: 0.8rem;
  text-align: center;
}

nav a {
  color: white;
  text-decoration: none;
  margin: 0 15px;
  font-weight: bold;
  transition: color 0.3s;
}

nav a:hover {
  color: #a3e4d7;
}

main {
  max-width: 960px;
  margin: 2rem auto;
  padding: 0 1rem;
}

section {
  background: white;
  padding: 2rem;
  margin-bottom: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

h2 {
  color: #16a085;
  margin-bottom: 1rem;
  border-bottom: 2px solid #e8f6f3;
  padding-bottom: 0.5rem;
}

/* Cartões de Dicas */
.grid-dicas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.card {
  background-color: #e8f6f3;
  padding: 1.5rem;
  border-radius: 6px;
  border-left: 5px solid #16a085;
}

.card h3 {
  color: #0e6251;
  margin-bottom: 0.5rem;
}

/* Formulário da Calculadora de IMC */
.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.4rem;
}

input {
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  background-color: #16a085;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background-color: #117a65;
}

#resultado-imc {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 4px;
  font-weight: bold;
  display: none;
}

footer {
  text-align: center;
  padding: 1.5rem;
  background-color: #16a085;
  color: white;
  margin-top: 2rem;
}