const player = document.getElementById("player");
const moneyText = document.getElementById("money");
const wantedText = document.getElementById("wanted");
const healthText = document.getElementById("health");
const message = document.getElementById("message");
const coin = document.getElementById("coin");
const mission = document.getElementById("mission");

let x = window.innerWidth / 2;
let y = window.innerHeight / 2;

let money = 0;
let wanted = 0;
let health = 100;

const speed = 5;

function updatePlayer() {
    player.style.left = x + "px";
        player.style.top = y + "px";

            // Coletar moeda
                const coinX = window.innerWidth * 0.25;
                    const coinY = window.innerHeight * 0.65;

                        const distance = Math.hypot(x - coinX, y - coinY);

                            if (distance < 50 && coin.style.display !== "none") {
                                    money += 100;
                                            moneyText.textContent = money;
                                                    coin.style.display = "none";
                                                            message.textContent = "Você encontrou $100!";
                                                                    
                                                                            setTimeout(() => {
                                                                                        message.textContent = "Encontre a missão!";
                                                                                                }, 2000);
                                                                                                    }

                                                                                                        // Missão
                                                                                                            const missionX = window.innerWidth * 0.70;
                                                                                                                const missionY = window.innerHeight * 0.60;

                                                                                                                    const missionDistance = Math.hypot(
                                                                                                                            x - missionX,
                                                                                                                                    y - missionY
                                                                                                                                        );

                                                                                                                                            if (missionDistance < 60) {
                                                                                                                                                    message.textContent = "Missão concluída! +$500";

                                                                                                                                                            money += 500;
                                                                                                                                                                    wanted++;

                                                                                                                                                                            moneyText.textContent = money;
                                                                                                                                                                                    wantedText.textContent = wanted;

                                                                                                                                                                                            mission.style.display = "none";

                                                                                                                                                                                                    setTimeout(() => {
                                                                                                                                                                                                                mission.style.display = "block";
                                                                                                                                                                                                                            message.textContent = "Nova missão disponível!";
                                                                                                                                                                                                                                    }, 3000);
                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                        function move(direction) {
                                                                                                                                                                                                                                            if (direction === "ArrowUp") y -= speed;
                                                                                                                                                                                                                                                if (direction === "ArrowDown") y += speed;
                                                                                                                                                                                                                                                    if (direction === "ArrowLeft") x -= speed;
                                                                                                                                                                                                                                                        if (direction === "ArrowRight") x += speed;

                                                                                                                                                                                                                                                            // Limites da cidade
                                                                                                                                                                                                                                                                x = Math.max(25, Math.min(window.innerWidth - 25, x));
                                                                                                                                                                                                                                                                    y = Math.max(25, Math.min(window.innerHeight - 25, y));

                                                                                                                                                                                                                                                                        updatePlayer();
                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                        document.addEventListener("keydown", (event) => {
                                                                                                                                                                                                                                                                            move(event.key);
                                                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                                            document.querySelectorAll("button").forEach(button => {
                                                                                                                                                                                                                                                                                button.addEventListener("touchstart", (event) => {
                                                                                                                                                                                                                                                                                        event.preventDefault();
                                                                                                                                                                                                                                                                                                move(button.dataset.key);
                                                                                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                                                                                        button.addEventListener("click", () => {
                                                                                                                                                                                                                                                                                                                move(button.dataset.key);
                                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                                                                                                    updatePlayer();