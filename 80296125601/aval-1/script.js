<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Futebol 3D MAX</title>

<style>
body { margin:0; overflow:hidden; background:#000; font-family:Arial; }

/* HUD */
#hud {
    position:absolute;
        width:100%;
            top:0;
                color:white;
                    text-align:center;
                    }

                    #score {
                        font-size:30px;
                            margin-top:10px;
                            }

                            /* CONTROLES */
                            #info {
                                position:absolute;
                                    bottom:10px;
                                        left:10px;
                                            background:rgba(0,0,0,0.5);
                                                padding:10px;
                                                }

                                                /* JOYSTICK MOBILE */
                                                #joystick {
                                                    position:absolute;
                                                        bottom:30px;
                                                            right:30px;
                                                                width:100px;
                                                                    height:100px;
                                                                        border-radius:50%;
                                                                            background:rgba(255,255,255,0.1);
                                                                            }

                                                                            #stick {
                                                                                width:40px;
                                                                                    height:40px;
                                                                                        background:white;
                                                                                            border-radius:50%;
                                                                                                position:absolute;
                                                                                                    top:30px;
                                                                                                        left:30px;
                                                                                                        }
                                                                                                        </style>
                                                                                                        </head>

                                                                                                        <body>

                                                                                                        <div id="hud">
                                                                                                            <div id="score">0 - 0</div>
                                                                                                            </div>

                                                                                                            <div id="info">
                                                                                                            WASD = mover<br>
                                                                                                            Segurar ESPAÇO = força do chute
                                                                                                            </div>

                                                                                                            <div id="joystick">
                                                                                                                <div id="stick"></div>
                                                                                                                </div>

                                                                                                                <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

                                                                                                                <script>
                                                                                                                // ===== CENA =====
                                                                                                                const scene = new THREE.Scene();
                                                                                                                scene.background = new THREE.Color(0x202020);

                                                                                                                // CAMERA
                                                                                                                const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
                                                                                                                camera.position.set(0,5,10);

                                                                                                                // RENDER
                                                                                                                const renderer = new THREE.WebGLRenderer();
                                                                                                                renderer.setSize(innerWidth, innerHeight);
                                                                                                                document.body.appendChild(renderer.domElement);

                                                                                                                // LUZ
                                                                                                                const light = new THREE.DirectionalLight(0xffffff,1);
                                                                                                                light.position.set(5,10,7);
                                                                                                                scene.add(light);

                                                                                                                // CAMPO
                                                                                                                const field = new THREE.Mesh(
                                                                                                                    new THREE.PlaneGeometry(20,30),
                                                                                                                        new THREE.MeshStandardMaterial({color:0x0a7d1c})
                                                                                                                        );
                                                                                                                        field.rotation.x = -Math.PI/2;
                                                                                                                        scene.add(field);

                                                                                                                        // JOGADOR
                                                                                                                        const player = new THREE.Mesh(
                                                                                                                            new THREE.BoxGeometry(1,2,1),
                                                                                                                                new THREE.MeshStandardMaterial({color:0x2196f3})
                                                                                                                                );
                                                                                                                                player.position.y = 1;
                                                                                                                                scene.add(player);

                                                                                                                                // GOLEIRO (IA)
                                                                                                                                const keeper = new THREE.Mesh(
                                                                                                                                    new THREE.BoxGeometry(1,2,1),
                                                                                                                                        new THREE.MeshStandardMaterial({color:0xff0000})
                                                                                                                                        );
                                                                                                                                        keeper.position.set(0,1,-13);
                                                                                                                                        scene.add(keeper);

                                                                                                                                        // BOLA
                                                                                                                                        const ball = new THREE.Mesh(
                                                                                                                                            new THREE.SphereGeometry(0.5,32,32),
                                                                                                                                                new THREE.MeshStandardMaterial({color:0xffffff})
                                                                                                                                                );
                                                                                                                                                scene.add(ball);

                                                                                                                                                // VARIÁVEIS
                                                                                                                                                let ballVelocity = new THREE.Vector3();
                                                                                                                                                let scoreA = 0;
                                                                                                                                                let scoreB = 0;
                                                                                                                                                let shotPower = 0;

                                                                                                                                                // RESET
                                                                                                                                                function resetBall(){
                                                                                                                                                    ball.position.set(0,0.5,0);
                                                                                                                                                        ballVelocity.set(0,0,0);
                                                                                                                                                        }
                                                                                                                                                        resetBall();

                                                                                                                                                        // CONTROLES
                                                                                                                                                        const keys = {};
                                                                                                                                                        document.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
                                                                                                                                                        document.addEventListener("keyup", e => {
                                                                                                                                                            if(e.key === " "){
                                                                                                                                                                    let dir = new THREE.Vector3().subVectors(ball.position, player.position).normalize();
                                                                                                                                                                            ballVelocity.copy(dir.multiplyScalar(shotPower));
                                                                                                                                                                                    shotPower = 0;
                                                                                                                                                                                        }
                                                                                                                                                                                            keys[e.key.toLowerCase()] = false;
                                                                                                                                                                                            });

                                                                                                                                                                                            // JOYSTICK MOBILE
                                                                                                                                                                                            let joyX = 0, joyY = 0;
                                                                                                                                                                                            const stick = document.getElementById("stick");

                                                                                                                                                                                            document.getElementById("joystick").addEventListener("touchmove", e=>{
                                                                                                                                                                                                let rect = e.target.getBoundingClientRect();
                                                                                                                                                                                                    let x = e.touches[0].clientX - rect.left - 50;
                                                                                                                                                                                                        let y = e.touches[0].clientY - rect.top - 50;

                                                                                                                                                                                                            joyX = x/40;
                                                                                                                                                                                                                joyY = y/40;

                                                                                                                                                                                                                    stick.style.left = (30 + x) + "px";
                                                                                                                                                                                                                        stick.style.top = (30 + y) + "px";
                                                                                                                                                                                                                        });

                                                                                                                                                                                                                        document.addEventListener("touchend", ()=>{
                                                                                                                                                                                                                            joyX = joyY = 0;
                                                                                                                                                                                                                                stick.style.left = "30px";
                                                                                                                                                                                                                                    stick.style.top = "30px";
                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                    // LOOP
                                                                                                                                                                                                                                    function animate(){
                                                                                                                                                                                                                                        requestAnimationFrame(animate);

                                                                                                                                                                                                                                            // MOVIMENTO PLAYER
                                                                                                                                                                                                                                                if(keys["w"]) player.position.z -= 0.15;
                                                                                                                                                                                                                                                    if(keys["s"]) player.position.z += 0.15;
                                                                                                                                                                                                                                                        if(keys["a"]) player.position.x -= 0.15;
                                                                                                                                                                                                                                                            if(keys["d"]) player.position.x += 0.15;

                                                                                                                                                                                                                                                                player.position.x += joyX * 0.1;
                                                                                                                                                                                                                                                                    player.position.z += joyY * 0.1;

                                                                                                                                                                                                                                                                        // CARREGAR CHUTE
                                                                                                                                                                                                                                                                            if(keys[" "]){
                                                                                                                                                                                                                                                                                    shotPower += 0.02;
                                                                                                                                                                                                                                                                                            if(shotPower > 1) shotPower = 1;
                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                    // BOLA
                                                                                                                                                                                                                                                                                                        ball.position.add(ballVelocity);
                                                                                                                                                                                                                                                                                                            ballVelocity.multiplyScalar(0.98);

                                                                                                                                                                                                                                                                                                                // IA GOLEIRO (segue bola)
                                                                                                                                                                                                                                                                                                                    keeper.position.x += (ball.position.x - keeper.position.x) * 0.05;

                                                                                                                                                                                                                                                                                                                        // DEFESA
                                                                                                                                                                                                                                                                                                                            if(ball.position.distanceTo(keeper.position) < 1.5){
                                                                                                                                                                                                                                                                                                                                    ballVelocity.z *= -0.7;
                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                            // GOL
                                                                                                                                                                                                                                                                                                                                                if(ball.position.z < -14 && Math.abs(ball.position.x) < 3){
                                                                                                                                                                                                                                                                                                                                                        scoreA++;
                                                                                                                                                                                                                                                                                                                                                                document.getElementById("score").innerText = scoreA + " - " + scoreB;
                                                                                                                                                                                                                                                                                                                                                                        resetBall();
                                                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                                                if(ball.position.z > 14 && Math.abs(ball.position.x) < 3){
                                                                                                                                                                                                                                                                                                                                                                                        scoreB++;
                                                                                                                                                                                                                                                                                                                                                                                                document.getElementById("score").innerText = scoreA + " - " + scoreB;
                                                                                                                                                                                                                                                                                                                                                                                                        resetBall();
                                                                                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                                                                                // LIMITES
                                                                                                                                                                                                                                                                                                                                                                                                                    ball.position.x = Math.max(-9, Math.min(9, ball.position.x));
                                                                                                                                                                                                                                                                                                                                                                                                                        ball.position.z = Math.max(-15, Math.min(15, ball.position.z));

                                                                                                                                                                                                                                                                                                                                                                                                                            // CAMERA
                                                                                                                                                                                                                                                                                                                                                                                                                                camera.position.x = player.position.x;
                                                                                                                                                                                                                                                                                                                                                                                                                                    camera.position.z = player.position.z + 10;
                                                                                                                                                                                                                                                                                                                                                                                                                                        camera.lookAt(player.position);

                                                                                                                                                                                                                                                                                                                                                                                                                                            renderer.render(scene, camera);
                                                                                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                                                                                            animate();

                                                                                                                                                                                                                                                                                                                                                                                                                                            // RESPONSIVO
                                                                                                                                                                                                                                                                                                                                                                                                                                            window.addEventListener("resize", ()=>{
                                                                                                                                                                                                                                                                                                                                                                                                                                                renderer.setSize(innerWidth, innerHeight);
                                                                                                                                                                                                                                                                                                                                                                                                                                                    camera.aspect = innerWidth/innerHeight;
                                                                                                                                                                                                                                                                                                                                                                                                                                                        camera.updateProjectionMatrix();
                                                                                                                                                                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                                                                                                                                                                        </script>

                                                                                                                                                                                                                                                                                                                                                                                                                                                        </body>
                                                                                                                                                                                                                                                                                                                                                                                                                                                        </html>