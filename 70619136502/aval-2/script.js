
/* Estilo do jogo de corrida */
html, body {
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #101820, #263746);
  font-family: Arial, sans-serif;
  color: white;
  text-align: center;
}

body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

canvas {
  display: block;
  margin: 20px auto;
  border: 4px solid #00e676;
  border-radius: 12px;
  box-shadow: 0 0 25px rgba(0, 230, 118, 0.4);
}

h1 {
  color: #00e676;
  text-transform: uppercase;
  letter-spacing: 3px;
}

button {
  background-color: #00e676;
  color: #101820;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background-color: #69f0ae;
  transform: scale(1.05);
}
