function cadastrar(){

        let modelo = document.getElementById("modelo").value;
            let marca = document.getElementById("marca").value;
                let ano = document.getElementById("ano").value;

                    if(modelo == "" || marca == "" || ano == ""){
                            alert("Preencha todos os campos!");
                                }else{
                                        document.getElementById("mensagem").innerHTML =
                                                "✅ Carro cadastrado com sucesso!";
                                                    }
                                                    }
}