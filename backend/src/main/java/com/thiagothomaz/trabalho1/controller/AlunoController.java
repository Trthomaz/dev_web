package com.thiagothomaz.trabalho1.controller;

import com.thiagothomaz.trabalho1.dto.aluno.*;
import com.thiagothomaz.trabalho1.service.AlunoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alunos")
public class AlunoController {

    private final AlunoService alunoService;

    public AlunoController(AlunoService alunoService) {
        this.alunoService = alunoService;
    }

    // Criar aluno
    @PostMapping
    public ResponseEntity<AlunoResponse> save(@RequestBody AlunoRequest request) {
        AlunoResponse response = alunoService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Listar todos alunos
    @GetMapping
    public List<AlunoResponse> listAll() {
        return alunoService.listAll();
    }

    // Buscar aluno por id
    @GetMapping("/{id}")
    public AlunoResponse findById(@PathVariable Long id) {
        return alunoService.findById(id);
    }

    // Atualizar aluno
    @PutMapping("/{id}")
    public AlunoResponse update(@PathVariable Long id, @RequestBody AlunoRequest request) {
        return alunoService.update(id, request);
    }

    // Remover aluno
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        alunoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}