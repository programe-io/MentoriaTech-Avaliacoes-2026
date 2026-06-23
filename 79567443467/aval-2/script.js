    // Número do WhatsApp (coloque o seu)
let numero = "5599999999999";

// Mensagem automática
let mensagem = "Olá! Tenho interesse na bicicleta à venda.";

// Criando o link
let link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

// Exibindo o link no console
console.log(link);

// Abrir o link automaticamente (opcional)
// window.location.href = link;