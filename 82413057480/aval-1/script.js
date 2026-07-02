// Função para criar um prédio
function criarPredio(x, z, largura, altura, profundidade, cor = 0x888888) {
    const predio = new THREE.Mesh(
        new THREE.BoxGeometry(largura, altura, profundidade),
        new THREE.MeshStandardMaterial({ color: cor })
    );

    // Faz o prédio ficar apoiado no chão
    predio.position.set(x, altura / 2, z);

    scene.add(predio);
}

// Criar vários prédios aleatórios
for (let i = 0; i < 30; i++) {
    const largura = 2 + Math.random() * 3;
    const profundidade = 2 + Math.random() * 3;
    const altura = 4 + Math.random() * 12;

    const x = (Math.random() - 0.5) * 80;
    const z = (Math.random() - 0.5) * 80;

    // Evita nascer perto do jogador
    if (Math.abs(x) < 8 && Math.abs(z) < 8) continue;

    const cores = [
        0x999999,
        0x777777,
        0x6666AA,
        0xAAAAAA,
        0x555555
    ];

    const cor = cores[Math.floor(Math.random() * cores.length)];

    criarPredio(x, z, largura, altura, profundidade, cor);
}