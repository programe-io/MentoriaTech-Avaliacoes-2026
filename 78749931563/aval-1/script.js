
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background-color: #f1f1f1;
}

/* Cabeçalho */
header {
    background-color: #111;
    color: white;
    text-align: center;
    padding: 30px;
}

header h1 {
    font-size: 35px;
    color: red;
}

/* Menu */
nav {
    background-color: #222;
    padding: 18px;
    text-align: center;
}

nav a {
    color: white;
    text-decoration: none;
    margin: 20px;
    font-weight: bold;
}

/* Banner */
.banner {
    background-color: #444;
    color: white;
    text-align: center;
    padding: 70px;
}

/* Produtos */
#motos {
    text-align: center;
    padding: 40px;
}

.container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 25px;
    margin-top: 30px;
}

.produto {
    background-color: white;
    width: 250px;
    padding: 15px;
    border-radius: 12px;
    box-shadow: 0 3px 10px #ccc;
}

.produto img {
    width: 100%;
    border-radius: 10px;
}

.produto h3 {
    margin: 15px;
}

.produto p {
    color: red;
    font-size: 20px;
    font-weight: bold;
}

/* Botão */
button {
    background-color: red;
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 6px;
    cursor: pointer;
    margin-top: 10px;
}

button:hover {
    background-color: darkred;
}

/* Rodapé */
footer {
    background-color: #111;
    color: white;
    text-align: center;
    padding: 25px;
    margin-top: 30px;
}
