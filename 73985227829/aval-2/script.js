const carros = [
    {
        nome: "Nissan Skyline GT-R R34",
            imagem: "8e7166d59435adf94d1aedce89a07f90.webp.jpg",
                descricao:"Pilotado por Brian O'Conner, o Skyline GT-R R34 é considerado um dos carros mais icônicos da franquia. Seu desempenho impressionante e visual marcante conquistaram fãs em todo o mundo."
                },
                {
                    nome: "Toyota Supra MK4",
                        imagem: "08956bd653357863945abeb9e91f1fd3.webp.jpg",
                            descricao: "O lendário Toyota Supra laranja do primeiro filme tornou-se um símbolo da cultura automotiva. Sua preparação e velocidade fizeram dele um dos carros mais memoráveis do cinema."
                            },
                            {
                                nome: "Dodge Charger R/T 1970",
                                    imagem: "abdb2d544635655bdb8c82222641e0f3.webp.jpg",
                                        descricao: "O Dodge Charger de Dominic Toretto representa força, potência e tradição. Equipado com um motor extremamente potente, tornou-se a marca registrada do personagem."
                                        },
                                        {
                                            nome: "Mazda RX-7 VeilSide",
                                                imagem: "ed45dbac30910420ec2a3018ed48bcec.webp.jpg",
                                                    descricao: "Com seu kit aerodinâmico VeilSide e design agressivo, o Mazda RX-7 dirigido por Han é um dos carros visualmente mais impressionantes de toda a saga."
                                                    },
                                                    {
                                                        nome: "Nissan 350Z",
                                                            imagem: "1b5883eb66c35619d1d9832d790b915e.webp.jpg",
                                                                descricao: "O Nissan 350Z se destacou por seu visual esportivo e excelente desempenho nas cenas de ação, tornando-se um dos modelos japoneses mais lembrados da franquia."
                                                                }
                                                                ];

                                                                document.getElementById("btnCarro").addEventListener("click", function(){

                                                                    const carro = carros[Math.floor(Math.random() * carros.length)];

                                                                        document.getElementById("nome-carro").textContent = carro.nome;

                                                                            const img = document.getElementById("imagem-carro");
                                                                                img.src = carro.imagem;
                                                                                    img.style.display = "block";

                                                                                        document.getElementById("descricao-carro").textContent = carro.descricao;

                                                                                        });
]