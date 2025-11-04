package com.thiagothomaz.trabalho1.service;

import com.thiagothomaz.trabalho1.dto.professor.ProfessorRequest;
import com.thiagothomaz.trabalho1.dto.professor.ProfessorResponse;
import com.thiagothomaz.trabalho1.exception.EntidadeNaoEncontradaException;
import com.thiagothomaz.trabalho1.model.Professor;
import com.thiagothomaz.trabalho1.repository.ProfessorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfessorService {

    private final ProfessorRepository ProfessorRepository;

    public ProfessorService(ProfessorRepository ProfessorRepository) {
        this.ProfessorRepository = ProfessorRepository;
    }

    public List<ProfessorResponse> listAll(){
        return ProfessorRepository.findAll()
                .stream()
                .map(a -> new ProfessorResponse(a.getId(), a.getNome(), a.getEmail()))
                .toList();
    }

    public ProfessorResponse findById(Long id){
        Professor professor =  ProfessorRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Professor não encontrado"));
        return new ProfessorResponse(professor.getId(), professor.getNome(), professor.getEmail());
    }

    public ProfessorResponse save(ProfessorRequest request){
        Professor professor = new Professor();
        professor.setNome(request.getNome());
        professor.setEmail(request.getEmail());

        professor =  ProfessorRepository.save(professor);

        return new ProfessorResponse(professor.getId(), professor.getNome(), professor.getEmail());
    }

    public ProfessorResponse update(Long id, Professor request) {
        Professor professor = ProfessorRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Professor não encontrado"));
        professor.setNome(request.getNome());
        professor.setEmail(request.getEmail());

        professor =  ProfessorRepository.save(professor);

        return new ProfessorResponse(professor.getId(), professor.getNome(), professor.getEmail());
    }

    public void delete(Long id){
        ProfessorRepository.deleteById(id);
    }
}
