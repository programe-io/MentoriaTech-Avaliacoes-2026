// Número do WhatsApp (coloque o seu)
let numero = "5599999999999";

// Mensagem automática
let mensagem = "Olá! Tenho interesse na cama à venda.";

// Criando o link do WhatsApp
let link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

// Mostrar o link no console
console.log("Link de contato:", link);

// Função para abrir o WhatsApp
function falarComVendedor() {
    window.open(link, "_blank");
}