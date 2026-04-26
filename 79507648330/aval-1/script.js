const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let birdY = 150;
let gravity = 0.5;
let velocity = 0;

let pipes = [];
let frame = 0;
let score = 0;

document.addEventListener("click", () => {
    velocity = -8;
    });

    function drawBird() {
        ctx.fillStyle = "yellow";
            ctx.fillRect(50, birdY, 20, 20);
            }

            function drawPipes() {
                pipes.forEach(pipe => {
                        ctx.fillStyle = "green";
                                ctx.fillRect(pipe.x, 0, 40, pipe.top);
                                        ctx.fillRect(pipe.x, pipe.bottom, 40, canvas.height);
                                            });
                                            }

                                            function update() {
                                                velocity += gravity;
                                                    birdY += velocity;

                                                        if (frame % 90 === 0) {
                                                                let top = Math.random() * 200 + 50;
                                                                        pipes.push({
                                                                                    x: canvas.width,
                                                                                                top: top,
                                                                                                            bottom: top + 120
                                                                                                                    });
                                                                                                                        }

                                                                                                                            pipes.forEach(pipe => {
                                                                                                                                    pipe.x -= 2;

                                                                                                                                            // colisão
                                                                                                                                                    if (
                                                                                                                                                                50 < pipe.x + 40 &&
                                                                                                                                                                            50 + 20 > pipe.x &&
                                                                                                                                                                                        (birdY < pipe.top || birdY + 20 > pipe.bottom)
                                                                                                                                                                                                ) {
                                                                                                                                                                                                            alert("Game Over! Pontos: " + score);
                                                                                                                                                                                                                        location.reload();
                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                        if (pipe.x === 50) {
                                                                                                                                                                                                                                                    score++;
                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                    frame++;
                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                    function draw() {
                                                                                                                                                                                                                                                                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                                                                                                                                                                                                                                                                            drawBird();
                                                                                                                                                                                                                                                                                drawPipes();

                                                                                                                                                                                                                                                                                    ctx.fillStyle = "black";
                                                                                                                                                                                                                                                                                        ctx.fillText("Score: " + score, 10, 20);
                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                        function loop() {
                                                                                                                                                                                                                                                                                            update();
                                                                                                                                                                                                                                                                                                draw();
                                                                                                                                                                                                                                                                                                    requestAnimationFrame(loop);
                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                    loop();