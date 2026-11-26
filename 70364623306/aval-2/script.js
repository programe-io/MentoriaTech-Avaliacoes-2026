if (codigo.trim() === "") {
            throw new Error("Digite um código!");
        }

        const tarefa = buscarTarefa(codigo);

        resultado.textContent =
            "Código: " + tarefa.codigo +
            " | Título: " + tarefa.titulo +
            " | Prioridade: " + tarefa.prioridade +
            " | Status: " +
            (tarefa.status ? "Em execução" : "Concluída");

    } catch (erro) {

        resultado.textContent = erro.message;
    }
}

// Exibir lista inicialmente
mostrarTarefas();   