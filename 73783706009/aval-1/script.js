    // Produtos cadastrados automaticamente
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [
        {
                codigo: 1,
                        descricao: "Teclado",
                                quantidade: 15,
                                        valor: 85.90
                                            },
                                                {
                                                        codigo: 2,
                                                                descricao: "Mouse",
                                                                        quantidade: 20,
                                                                                valor: 45.50
                                                                                    },
                                                                                        {
                                                                                                codigo: 3,
                                                                                                        descricao: "Monitor",
                                                                                                                quantidade: 8,
                                                                                                                        valor: 650.00
                                                                                                                            },
                                                                                                                                {
                                                                                                                                        codigo: 4,
                                                                                                                                                descricao: "Notebook",
                                                                                                                                                        quantidade: 5,
                                                                                                                                                                valor: 2800.00
                                                                                                                                                                    },
                                                                                                                                                                        {
                                                                                                                                                                                codigo: 5,
                                                                                                                                                                                        descricao: "Impressora",
                                                                                                                                                                                                quantidade: 10,
                                                                                                                                                                                                        valor: 750.00
                                                                                                                                                                                                            },
                                                                                                                                                                                                                {
                                                                                                                                                                                                                        codigo: 6,
                                                                                                                                                                                                                                descricao: "Fone de ouvido",
                                                                                                                                                                                                                                        quantidade: 25,
                                                                                                                                                                                                                                                valor: 59.90
                                                                                                                                                                                                                                                    },
                                                                                                                                                                                                                                                        {
                                                                                                                                                                                                                                                                codigo: 7,
                                                                                                                                                                                                                                                                        descricao: "Pendrive",
                                                                                                                                                                                                                                                                                quantidade: 30,
                                                                                                                                                                                                                                                                                        valor: 35.00
                                                                                                                                                                                                                                                                                            },
                                                                                                                                                                                                                                                                                                {
                                                                                                                                                                                                                                                                                                        codigo: 8,
                                                                                                                                                                                                                                                                                                                descricao: "Webcam",
                                                                                                                                                                                                                                                                                                                        quantidade: 12,
                                                                                                                                                                                                                                                                                                                                valor: 120.00
                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                    ];

                                                                                                                                                                                                                                                                                                                                    // Salvar os produtos iniciais caso ainda não existam
                                                                                                                                                                                                                                                                                                                                    localStorage.setItem("produtos", JSON.stringify(produtos));                                                