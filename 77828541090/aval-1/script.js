```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Tabela de Animes em JavaScript</title>
<style>
  body {
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f4;
    color: #333;
    margin: 20px;
  }
  h1 {
    color: #0056b3;
    text-align: center;
    margin-bottom: 30px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  th, td {
    border: 1px solid #ddd;
    padding: 12px 15px;
    text-align: left;
  }
  th {
    background-color: #007bff;
    color: white;
    font-weight: bold;
  }
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  tr:hover {
    background-color: #e9ecef;
  }
  .container {
    max-width: 960px;
    margin: auto;
    background-color: #fff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
</style>
</head>
<body>

<div class="container">
  <h1>Lista de Animes Populares</h1>
  <table id="animeTable">
    <thead>
      <tr>
        <th>Nome do Anime</th>
        <th>Gênero</th>
        <th>Ano de Lançamento</th>
        <th>Avaliação (1-10)</th>
      </tr>
    </thead>
    <tbody>
      <!-- Os dados serão inseridos aqui via JavaScript -->
    </tbody>
  </table>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const animes = [
      { nome: "Attack on Titan", genero: "Ação, Fantasia Sombria", ano: 2013, avaliacao: 9.5 },
      { nome: "My Hero Academia", genero: "Super-herói, Ação", ano: 2016, avaliacao: 8.9 },
      { nome: "Death Note", genero: "Suspense, Psicológico", ano: 2006, avaliacao: 9.3 },
      { nome: "Fullmetal Alchemist: Brotherhood", genero: "Aventura, Fantasia", ano: 2009, avaliacao: 9.4 },
      { nome: "One Punch Man", genero: "Ação, Comédia, Super-herói", ano: 2015, avaliacao: 9.1 },
      { nome: "Demon Slayer: Kimetsu no Yaiba", genero: "Ação, Fantasia Sombria", ano: 2019, avaliacao: 9.2 },
      { nome: "Jujutsu Kaisen", genero: "Ação, Sobrenatural", ano: 2020, avaliacao: 9.0 }
    ];

    const tbody = document.querySelector("#animeTable tbody");

    animes.forEach(anime => {
      const row = document.createElement("tr");

      const nomeCell = document.createElement("td");
      nomeCell.textContent = anime.nome;
      row.appendChild(nomeCell);

      const generoCell = document.createElement("td");
      generoCell.textContent = anime.genero;
      row.appendChild(generoCell);

      const anoCell = document.createElement("td");
      anoCell.textContent = anime.ano;
      row.appendChild(anoCell);

      const avaliacaoCell = document.createElement("td");
      avaliacaoCell.textContent = anime.avaliacao;
      row.appendChild(avaliacaoCell);

      tbody.appendChild(row);
    });
  });
</script>

</body>
</html>
```