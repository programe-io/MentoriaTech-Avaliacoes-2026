const produtos = [
        {
                nome: "Tartare de Atum com Avocado",
                        preco: 78,
                                img: "https://images.unsplash.com/photo-1546039907-7fa05f864c02?w=500"
                                    },
                                        {
                                                nome: "Filé Mignon ao Molho Trufado",
                                                        preco: 145,
                                                                img: "https://images.unsplash.com/photo-1546241072-48010ad2862c?w=500"
                                                                    },
                                                                        {
                                                                                nome: "Risotto de Lagosta e Açafrão",
                                                                                        preco: 189,
                                                                                                img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500"
                                                                                                    },
                                                                                                        // ...continua exatamente igual ao seu código...
                                                                                                        ];
]
function finalizar() {
        alert("Pedido enviado para a alta cozinha. Bom atendimento!");
            cart = [];
                document.getElementById("contagem").innerText = "0";
                    document.getElementById("clienteNome").value = "";
                        voltar();
                        }
}