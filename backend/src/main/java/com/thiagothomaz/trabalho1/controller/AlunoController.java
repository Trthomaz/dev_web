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

    @PostMapping
    public ResponseEntity<AlunoResponse> save(@RequestBody @jakarta.validation.Valid AlunoRequest request) {
        AlunoResponse response = alunoService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public List<AlunoResponse> listAll() {
        return alunoService.listAll();
    }

    @GetMapping("/{id}")
    public AlunoResponse findById(@PathVariable Long id) {
        return alunoService.findById(id);
    }

    @PutMapping("/{id}")
    public AlunoResponse update(@PathVariable Long id, @RequestBody @jakarta.validation.Valid AlunoRequest request) {
        return alunoService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        alunoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}