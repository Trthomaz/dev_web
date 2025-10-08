package com.thiagothomaz.trabalho1.service;

import com.thiagothomaz.trabalho1.dto.disciplina.DisciplinaRequest;
import com.thiagothomaz.trabalho1.dto.disciplina.DisciplinaResponse;
import com.thiagothomaz.trabalho1.exception.EntidadeNaoEncontradaException;
import com.thiagothomaz.trabalho1.model.Disciplina;
import com.thiagothomaz.trabalho1.repository.DisciplinaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DisciplinaService {
    private final DisciplinaRepository disciplinaRepository;

    public DisciplinaService(DisciplinaRepository disciplinaRepository) {
        this.disciplinaRepository = disciplinaRepository;
    }

    public DisciplinaResponse save(DisciplinaRequest request) {
        Disciplina d = new Disciplina();
        d.setNome(request.getNome());
        d.setCargaHoraria(request.getCargaHoraria());
        d = disciplinaRepository.save(d);
        return new DisciplinaResponse(d.getId(), d.getNome(), d.getCargaHoraria());
    }

    public List<DisciplinaResponse> listAll() {
        return disciplinaRepository.findAll()
                .stream()
                .map(d -> new DisciplinaResponse(d.getId(), d.getNome(), d.getCargaHoraria()))
                .toList();
    }

    public DisciplinaResponse findById(Long id) {
        Disciplina d = disciplinaRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Disciplina não encontrada"));
        return new DisciplinaResponse(d.getId(), d.getNome(), d.getCargaHoraria());
    }

    public void delete(Long id) {
        disciplinaRepository.deleteById(id);
    }
}
