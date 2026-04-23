document.body.innerHTML = `
    <header>
            <h1>Meu Site em JavaScript</h1>
                </header>
                
                    <main>
                            <p>Esta página foi criada usando JavaScript.</p>
                                    <button onclick="mensagem()">Clique aqui</button>
                                        </main>
                                        `;

                                        function mensagem() {
                                            alert("Você clicou no botão!");
                                            }