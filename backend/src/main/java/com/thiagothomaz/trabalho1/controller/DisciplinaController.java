package com.thiagothomaz.trabalho1.controller;

import com.thiagothomaz.trabalho1.dto.disciplina.DisciplinaRequest;
import com.thiagothomaz.trabalho1.dto.disciplina.DisciplinaResponse;
import com.thiagothomaz.trabalho1.service.DisciplinaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/disciplinas")
public class DisciplinaController {
    private final DisciplinaService disciplinaService;

    public DisciplinaController(DisciplinaService disciplinaService) {
        this.disciplinaService = disciplinaService;
    }

    @PostMapping
    public ResponseEntity<DisciplinaResponse> save(@RequestBody DisciplinaRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(disciplinaService.save(request));
    }

    @GetMapping
    public List<DisciplinaResponse> listAll() {
        return disciplinaService.listAll();
    }

    @GetMapping("/{id}")
    public DisciplinaResponse findById(@PathVariable Long id) {
        return disciplinaService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        disciplinaService.delete(id);
    }
}
