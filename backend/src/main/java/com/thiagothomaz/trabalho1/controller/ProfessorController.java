package com.thiagothomaz.trabalho1.controller;

import com.thiagothomaz.trabalho1.dto.professor.ProfessorRequest;
import com.thiagothomaz.trabalho1.dto.professor.ProfessorResponse;
import com.thiagothomaz.trabalho1.model.Professor;
import com.thiagothomaz.trabalho1.service.ProfessorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/professores")
public class ProfessorController {

    private final ProfessorService ProfessorService;

    public ProfessorController(ProfessorService ProfessorService) {
        this.ProfessorService = ProfessorService;
    }

    @GetMapping
    public List<ProfessorResponse> listAll(){
        return ProfessorService.listAll();
    }

    @GetMapping("/{id}")
    public ProfessorResponse findById(@PathVariable Long id){
        return ProfessorService.findById(id);
    }

    @PostMapping
    public ResponseEntity<ProfessorResponse> save(@RequestBody ProfessorRequest request){
        ProfessorResponse response = ProfessorService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ProfessorResponse update(@PathVariable Long id, @RequestBody Professor Professor) {
        return ProfessorService.update(id, Professor);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        ProfessorService.delete(id);
    }
}
