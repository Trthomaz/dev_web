package com.thiagothomaz.trabalho1.controller;

import com.thiagothomaz.trabalho1.dto.turma.TurmaDetalheResponse;
import com.thiagothomaz.trabalho1.dto.turma.TurmaRequest;
import com.thiagothomaz.trabalho1.dto.turma.TurmaResponse;
import com.thiagothomaz.trabalho1.service.TurmaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/turmas")
public class TurmaController {
    private final TurmaService turmaService;

    public TurmaController(TurmaService turmaService){
        this.turmaService = turmaService;
    }

    @GetMapping
    public List<TurmaResponse> listAll(){
        return turmaService.listAll();
    }

    @GetMapping("/{id}")
    public TurmaDetalheResponse findById(@PathVariable Long id){
        return turmaService.findById(id);
    }

    @PostMapping
    public TurmaResponse save(@RequestBody TurmaRequest request){
        return turmaService.save(request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        turmaService.delete(id);
    }
}
