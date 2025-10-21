package com.thiagothomaz.trabalho1.service;

import com.thiagothomaz.trabalho1.dto.turma.TurmaDetalheResponse;
import com.thiagothomaz.trabalho1.dto.turma.TurmaRequest;
import com.thiagothomaz.trabalho1.dto.turma.TurmaResponse;
import com.thiagothomaz.trabalho1.exception.EntidadeNaoEncontradaException;
import com.thiagothomaz.trabalho1.model.Inscricao;
import com.thiagothomaz.trabalho1.model.Turma;
import com.thiagothomaz.trabalho1.repository.DisciplinaRepository;
import com.thiagothomaz.trabalho1.repository.ProfessorRepository;
import com.thiagothomaz.trabalho1.repository.TurmaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TurmaService {
    private final TurmaRepository turmaRepository;
    private final ProfessorRepository professorRepository;
    private final DisciplinaRepository disciplinaRepository;

    public TurmaService(TurmaRepository turmaRepository,
            ProfessorRepository professorRepository,
            DisciplinaRepository disciplinaRepository) {
    this.turmaRepository = turmaRepository;
    this.professorRepository = professorRepository;
    this.disciplinaRepository = disciplinaRepository;
    }

    public TurmaResponse save(TurmaRequest resquest) {
    Turma turma = new Turma();
    turma.setAno(resquest.getAno());
    turma.setPeriodo(resquest.getPeriodo());
    turma.setCodigo(resquest.getCodigo());
    turma.setProfessor(professorRepository.findById(resquest.getProfessorId())
        .orElseThrow(() -> new EntidadeNaoEncontradaException("Professor não encontrado")));
    turma.setDisciplina(disciplinaRepository.findById(resquest.getDisciplinaId())
        .orElseThrow(() -> new EntidadeNaoEncontradaException("Disciplina não encontrada")));

    turma = turmaRepository.save(turma);

    return new TurmaResponse(
        turma.getId(), turma.getAno(), turma.getPeriodo(), turma.getCodigo(),
        turma.getDisciplina() != null ? turma.getDisciplina().getNome() : null,
        turma.getProfessor() != null ? turma.getProfessor().getNome() : null
    );
    }

    public List<TurmaResponse> listAll() {
    return turmaRepository.findAll().stream()
        .map(t -> new TurmaResponse(
            t.getId(), t.getAno(), t.getPeriodo(), t.getCodigo(),
            t.getDisciplina() != null ? t.getDisciplina().getNome() : null,
            t.getProfessor() != null ? t.getProfessor().getNome() : null
        ))
        .toList();
    }

    @Transactional(readOnly = true)
    public TurmaDetalheResponse findById(Long id) {
    Turma t = turmaRepository.findById(id)
        .orElseThrow(() -> new EntidadeNaoEncontradaException("Turma não encontrada"));

    List<TurmaDetalheResponse.AlunoResumo> alunos = t.getInscricoes().stream()
        .map(Inscricao::getAluno)
        .map(a -> new TurmaDetalheResponse.AlunoResumo(a.getId(), a.getNome()))
        .toList();

    return new TurmaDetalheResponse(
        t.getId(), t.getAno(), t.getPeriodo(), t.getCodigo(),
        t.getDisciplina() != null ? t.getDisciplina().getNome() : null,
        t.getProfessor() != null ? t.getProfessor().getNome() : null,
        alunos
    );
    }

    public void delete(Long id) {
    turmaRepository.deleteById(id);
    }
}
