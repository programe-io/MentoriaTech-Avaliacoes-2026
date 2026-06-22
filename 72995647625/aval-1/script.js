* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background: #f5f5f5;
}

header {
    background: #111;
    color: white;
    text-align: center;
    padding: 20px;
}

.produtos {
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 40px;
    flex-wrap: wrap;
}

.card {
    background: white;
    width: 250px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    text-align: center;
    overflow: hidden;
    transition: 0.3s;
}

.card:hover {
    transform: scale(1.05);
}

.card img {
    width: 100%;
}

.card h2 {
    margin: 10px 0;
}

.card p {
    color: green;
    font-size: 20px;
    margin-bottom: 10px;
}

button {
    background: #000;
    color: white;
    border: none;
    padding: 10px 20px;
    margin-bottom: 15px;
    cursor: pointer;
    border-radius: 5px;
}

button:hover {
    background: #444;
}

footer {
    background: #111;
    color: white;
    text-align: center;
    padding: 15px;
}