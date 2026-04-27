<!DOCTYPE html><html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Jogo Snake</title>
<style>
  body {
      display: flex;
          justify-content: center;
              align-items: center;
                  height: 100vh;
                      background: #111;
                          color: white;
                              font-family: Arial;
                                  flex-direction: column;
                                    }
                                      canvas {
                                          background: #000;
                                              border: 2px solid white;
                                                }
                                                </style>
                                                </head>
                                                <body><h1>Jogo Snake 🐍</h1>
                                                <canvas id="game" width="300" height="300"></canvas>
                                                <p>Use as setas do teclado</p><script>
                                                const canvas = document.getElementById("game");
                                                const ctx = canvas.getContext("2d");

                                                const size = 15;
                                                let snake = [{x:150, y:150}];
                                                let direction = "RIGHT";
                                                let food = {x: 90, y: 90};
                                                let score = 0;

                                                function draw() {
                                                  ctx.fillStyle = "black";
                                                    ctx.fillRect(0, 0, 300, 300);

                                                      // cobra
                                                        ctx.fillStyle = "lime";
                                                          snake.forEach(part => {
                                                              ctx.fillRect(part.x, part.y, size, size);
                                                                });

                                                                  // comida
                                                                    ctx.fillStyle = "red";
                                                                      ctx.fillRect(food.x, food.y, size, size);
                                                                      }

                                                                      function update() {
                                                                        let head = { ...snake[0] };

                                                                          if (direction === "RIGHT") head.x += size;
                                                                            if (direction === "LEFT") head.x -= size;
                                                                              if (direction === "UP") head.y -= size;
                                                                                if (direction === "DOWN") head.y += size;

                                                                                  snake.unshift(head);

                                                                                    // comer comida
                                                                                      if (head.x === food.x && head.y === food.y) {
                                                                                          score++;
                                                                                              food = {
                                                                                                    x: Math.floor(Math.random() * 20