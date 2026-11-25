  if (editando === id) {
            editando = null;
            formulario.reset();
            document.getElementById("botaoSalvar").textContent =
                "Adicionar Produto";
        }

        salvar();
    }
}

document.getElementById("pesquisa")
    .addEventListener("input", mostrarProdutos);

mostrarProdutos();
