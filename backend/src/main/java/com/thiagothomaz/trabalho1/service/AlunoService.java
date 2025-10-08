package com.thiagothomaz.trabalho1.service;

import com.thiagothomaz.trabalho1.exception.EntidadeNaoEncontradaException;
import com.thiagothomaz.trabalho1.model.Aluno;
import com.thiagothomaz.trabalho1.dto.aluno.*;
import com.thiagothomaz.trabalho1.repository.AlunoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlunoService {

    private final AlunoRepository alunoRepository;

    public AlunoService(AlunoRepository alunoRepository) {
        this.alunoRepository = alunoRepository;
    }

    // Criar aluno
    public AlunoResponse save(AlunoRequest request) {
        Aluno aluno = new Aluno();
        aluno.setNome(request.getNome());
        aluno.setEmail(request.getEmail());

        aluno = alunoRepository.save(aluno);

        return new AlunoResponse(aluno.getId(), aluno.getNome(), aluno.getEmail());
    }

    // Listar todos
    public List<AlunoResponse> listAll() {
        return alunoRepository.findAll()
                .stream()
                .map(a -> new AlunoResponse(a.getId(), a.getNome(), a.getEmail()))
                .toList();
    }

    // Buscar por id
    public AlunoResponse findById(Long id) {
        Aluno aluno = alunoRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Aluno não encontrado"));
        return new AlunoResponse(aluno.getId(), aluno.getNome(), aluno.getEmail());
    }

    // Atualizar
    public AlunoResponse update(Long id, AlunoRequest request) {
        Aluno aluno = alunoRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Aluno não encontrado"));
        aluno.setNome(request.getNome());
        aluno.setEmail(request.getEmail());

        aluno = alunoRepository.save(aluno);
        return new AlunoResponse(aluno.getId(), aluno.getNome(), aluno.getEmail());
    }

    // Deletar
    public void delete(Long id) {
        alunoRepository.deleteById(id);
    }
}
