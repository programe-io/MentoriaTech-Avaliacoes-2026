
let jogador = {
    nome: "Guerreiro",
        vida: 100,
            ataque: 20
            };

            let monstro = {
                nome: "Dragão",
                    vida: 100,
                        ataque: 15
                        };

                        console.log("🐉 UM DRAGÃO APARECEU!");
                        console.log("Sua vida: " + jogador.vida);
                        console.log("Vida do dragão: " + monstro.vida);

                        while (jogador.vida > 0 && monstro.vida > 0) {

                            // O jogador ataca
                                monstro.vida -= jogador.ataque;

                                    if (monstro.vida < 0) {
                                            monstro.vida = 0;
                                                }

                                                    console.log("⚔️ Você atacou o dragão!");
                                                        console.log("Vida do dragão: " + monstro.vida);

                                                            if (monstro.vida === 0) {
                                                                    console.log("🏆 VOCÊ VENCEU!");
                                                                            break;
                                                                                }

                                                                                    // O dragão contra-ataca
                                                                                        jogador.vida -= monstro.ataque;

                                                                                            if (jogador.vida < 0) {
                                                                                                    jogador.vida = 0;
                                                                                                        }

                                                                                                            console.log("🔥 O dragão contra-atacou!");
                                                                                                                console.log("Sua vida: " + jogador.vida);

                                                                                                                    if (jogador.vida === 0) {
                                                                                                                            console.log("💀 VOCÊ PERDEU!");
                                                                                                                                }
                                                                                                                                }
                                                                                                                                