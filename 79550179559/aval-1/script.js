unction copiarTexto(texto) {
    navigator.clipboard.writeText(texto)
    .then(() => {
        console.log('Texto copiado com sucesso!');
    })
    .catch(err => {
        console.error('Erro ao copiar o texto: ', err);
    });
}

// 