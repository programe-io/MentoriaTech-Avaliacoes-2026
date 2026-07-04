/* Reset básico de elementos */
* {
    margin: 0;
        padding: 0;
            box-sizing: border-box;
            }

            body {
                font-family: 'Segoe UI', Arial, sans-serif;
                    background-color: #f4f6f9;
                        color: #333;
                            line-height: 1.6;
                            }

                            /* Cabeçalho */
                            header {
                                background-color: #1e293b;
                                    color: white;
                                        padding: 20px 5%;
                                            display: flex;
                                                justify-content: space-between;
                                                    align-items: center;
                                                        position: sticky;
                                                            top: 0;
                                                                z-index: 1000;
                                                                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                                                                    }

                                                                    .logo {
                                                                        font-size: 1.4rem;
                                                                            font-weight: bold;
                                                                                color: #38bdf8;
                                                                                }

                                                                                nav a {
                                                                                    color: #cbd5e1;
                                                                                        text-decoration: none;
                                                                                            margin-left: 20px;
                                                                                                font-size: 1rem;
                                                                                                    transition: color 0.3s;
                                                                                                    }

                                                                                                    nav a:hover {
                                                                                                        color: white;
                                                                                                        }

                                                                                                        /* Banner Principal */
                                                                                                        .hero-banner {
                                                                                                            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
                                                                                                                color: white;
                                                                                                                    text-align: center;
                                                                                                                        padding: 60px 20px;
                                                                                                                        }

                                                                                                                        .hero-banner h1 {
                                                                                                                            font-size: 2.2rem;
                                                                                                                                font-weight: 700;
                                                                                                                                }

                                                                                                                                .hero-banner h2 {
                                                                                                                                    color: #38bdf8;
                                                                                                                                        font-weight: 400;
                                                                                                                                            font-size: 1.8rem;
                                                                                                                                                margin-top: 10px;
                                                                                                                                                }

                                                                                                                                                /* Configuração da Imagem do Banner */
                                                                                                                                                .banner-img {
                                                                                                                                                    max-width: 100%;
                                                                                                                                                        width: 400px;
                                                                                                                                                            height: auto;
                                                                                                                                                                border-radius: 8px;
                                                                                                                                                                    margin-top: 20px;
                                                                                                                                                                        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                                                                                                                                                                        }

                                                                                                                                                                        /* Container do Grid */
                                                                                                                                                                        .grid-container {
                                                                                                                                                                            max-width: 1200px;
                                                                                                                                                                                margin: 40px auto;
                                                                                                                                                                                    padding: 0 20px;
                                                                                                                                                                                        display: grid;
                                                                                                                                                                                            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                                                                                                                                                                                                gap: 25px;
                                                                                                                                                                                                }

                                                                                                                                                                                                /* Cards de Conteúdo (Usa a tag article) */
                                                                                                                                                                                                .card {
                                                                                                                                                                                                    background-color: white;
                                                                                                                                                                                                        border-radius: 12px;
                                                                                                                                                                                                            padding: 30px;
                                                                                                                                                                                                                box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                                                                                                                                                                                                                    border-top: 5px solid #3498db;
                                                                                                                                                                                                                        transition: transform 0.3s, box-shadow 0.3s;
                                                                                                                                                                                                                        }

                                                                                                                                                                                                                        .card:hover {
                                                                                                                                                                                                                            transform: translateY(-5px);
                                                                                                                                                                                                                                box-shadow: 0 8px 15px rgba(0,0,0,0.1);
                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                .card-icon {
                                                                                                                                                                                                                                    font-size: 2rem;
                                                                                                                                                                                                                                        margin-bottom: 15px;
                                                                                                                                                                                                                                            display: inline-block;
                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                            /* Título interno do card (Corrigido para h3) */
                                                                                                                                                                                                                                            .card h3 {
                                                                                                                                                                                                                                                font-size: 1.25rem;
                                                                                                                                                                                                                                                    color: #1e293b;
                                                                                                                                                                                                                                                        margin-bottom: 15px;
                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                        .card p, .card ul {
                                                                                                                                                                                                                                                            color: #64748b;
                                                                                                                                                                                                                                                                font-size: 0.95rem;
                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                .card ul {
                                                                                                                                                                                                                                                                    margin-left: 20px;
                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                    .card li {
                                                                                                                                                                                                                                                                        margin-bottom: 8px;
                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                        /* Card de Alerta Personalizado (Plágio) */
                                                                                                                                                                                                                                                                        .card.alerta {
                                                                                                                                                                                                                                                                            border-top-color: #ef4444;
                                                                                                                                                                                                                                                                                background-color: #fff5f5;
                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                .card.alerta h3 {
                                                                                                                                                                                                                                                                                    color: #991b1b;
                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                    /* Container de Conclusão (Usa a tag aside) */
                                                                                                                                                                                                                                                                                    .conclusao-container {
                                                                                                                                                                                                                                                                                        max-width: 1200px;
                                                                                                                                                                                                                                                                                            margin: 40px auto;
                                                                                                                                                                                                                                                                                                padding: 0 20px;
                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                .conclusao-box {
                                                                                                                                                                                                                                                                                                    background: linear-gradient(135deg, #38bdf8 0%, #0284c7 100%);
                                                                                                                                                                                                                                                                                                        color: white;
                                                                                                                                                                                                                                                                                                            padding: 30px;
                                                                                                                                                                                                                                                                                                                border-radius: 12px;
                                                                                                                                                                                                                                                                                                                    text-align: center;
                                                                                                                                                                                                                                                                                                                        font-size: 1.3rem;
                                                                                                                                                                                                                                                                                                                            font-style: italic;
                                                                                                                                                                                                                                                                                                                                box-shadow: 0 4px 10px rgba(2, 132, 199, 0.3);
                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                /* Rodapé */
                                                                                                                                                                                                                                                                                                                                footer {
                                                                                                                                                                                                                                                                                                                                    background-color: #0f172a;
                                                                                                                                                                                                                                                                                                                                        color: #94a3b8;
                                                                                                                                                                                                                                                                                                                                            text-align: center;
                                                                                                                                                                                                                                                                                                                                                padding: 20px;
                                                                                                                                                                                                                                                                                                                                                    font-size: 0.9rem;
                                                                                                                                                                                                                                                                                                                                                        margin-top: 60px;
                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                        /* Ajustes Responsivos para celular */
                                                                                                                                                                                                                                                                                                                                                        @media (max-width: 768px) {
                                                                                                                                                                                                                                                                                                                                                            header {
                                                                                                                                                                                                                                                                                                                                                                    flex-direction: column;
                                                                                                                                                                                                                                                                                                                                                                            gap: 15px;
                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                    nav a {
                                                                                                                                                                                                                                                                                                                                                                                            margin: 0 10px;
                                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                                    .hero-banner h1 {
                                                                                                                                                                                                                                                                                                                                                                                                            font-size: 1.8rem;
                                                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                                                    .hero-banner h2 {
                                                                                                                                                                                                                                                                                                                                                                                                                            font-size: 1.4rem;
                                                                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                                                                }