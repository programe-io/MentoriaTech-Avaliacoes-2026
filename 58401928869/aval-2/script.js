
package com.exemplo.tarefas;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@RestController
@RequestMapping("/api/tarefas")
public class TarefaController {

    public static class Tarefa {
        public int codigo;
        public String titulo;
        public int prioridade;
        public boolean concluida;

        public Tarefa(int codigo, String titulo, int prioridade) {
            this.codigo = codigo;
            this.titulo = titulo;
            this.prioridade = prioridade;
            this.concluida = false;
        }
    }

    private final List<Tarefa> tarefas = new ArrayList<>();
    private final AtomicInteger contador = new AtomicInteger(1);

    private Tarefa buscar(int codigo) {
        return tarefas.stream()
            .filter(t -> t.codigo == codigo)
            .findFirst()
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Tarefa não encontrada"));
    }

    @GetMapping
    public List<Tarefa> listar() {
        return tarefas;
    }

    @PostMapping
    public Tarefa cadastrar(@RequestBody Tarefa entrada) {
        if (entrada.titulo == null ||
            entrada.titulo.trim().length() < 5) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "O título deve ter no mínimo 5 caracteres");
        }

        validarPrioridade(entrada.prioridade);

        Tarefa nova = new Tarefa(
            contador.getAndIncrement(),
            entrada.titulo.trim(),
            entrada.prioridade
        );

        tarefas.add(nova);
        return nova;
    }

    @PatchMapping("/{codigo}/concluir")
    public Tarefa concluir(@PathVariable int codigo) {
        Tarefa tarefa = buscar(codigo);
        tarefa.concluida = true;
        return tarefa;
    }

    public static class PrioridadeRequest {
        public int prioridade;
    }

    @PatchMapping("/{codigo}/prioridade")
    public Tarefa alterarPrioridade(
        @PathVariable int codigo,
        @RequestBody PrioridadeRequest entrada
    ) {
        validarPrioridade(entrada.prioridade);

        Tarefa tarefa = buscar(codigo);
        tarefa.prioridade = entrada.prioridade;
        return tarefa;
    }

    private void validarPrioridade(int prioridade) {
        if (prioridade < 1 || prioridade > 3) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "A prioridade deve ser 1, 2 ou 3");
        }
    }
}
