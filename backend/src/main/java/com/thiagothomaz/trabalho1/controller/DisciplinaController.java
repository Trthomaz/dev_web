package com.thiagothomaz.trabalho1.controller;

import com.thiagothomaz.trabalho1.dto.disciplina.DisciplinaRequest;
import com.thiagothomaz.trabalho1.dto.disciplina.DisciplinaResponse;
import com.thiagothomaz.trabalho1.dto.turma.TurmaResponse;
import com.thiagothomaz.trabalho1.service.DisciplinaService;
import com.thiagothomaz.trabalho1.service.TurmaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/disciplinas")
public class DisciplinaController {
    private final DisciplinaService disciplinaService;
    private final TurmaService turmaService;

    public DisciplinaController(DisciplinaService disciplinaService, TurmaService turmaService) {
        this.disciplinaService = disciplinaService;
        this.turmaService = turmaService;
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

    @GetMapping("/{id}/turmas")
    public List<TurmaResponse> listTurmasByDisciplina(@PathVariable Long id) {
        return turmaService.listByDisciplina(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        disciplinaService.delete(id);
    }
}
