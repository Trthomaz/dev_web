package com.thiagothomaz.trabalho1.controller;

import com.thiagothomaz.trabalho1.dto.inscricao.InscricaoRequest;
import com.thiagothomaz.trabalho1.dto.inscricao.InscricaoResponse;
import com.thiagothomaz.trabalho1.service.InscricaoService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/inscricoes")
public class InscricaoController {
    private final InscricaoService inscricaoService;

    public InscricaoController(InscricaoService inscricaoService){
        this.inscricaoService = inscricaoService;
    }

    @PostMapping
    public InscricaoResponse save(@RequestBody InscricaoRequest request){
        return inscricaoService.save(request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        inscricaoService.delete(id);
    }
}
