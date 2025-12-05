package com.thiagothomaz.trabalho1.service;

import com.thiagothomaz.trabalho1.dto.inscricao.InscricaoRequest;
import com.thiagothomaz.trabalho1.dto.inscricao.InscricaoResponse;
import com.thiagothomaz.trabalho1.exception.EntidadeNaoEncontradaException;
import com.thiagothomaz.trabalho1.model.Inscricao;
import com.thiagothomaz.trabalho1.repository.AlunoRepository;
import com.thiagothomaz.trabalho1.repository.InscricaoRepository;
import com.thiagothomaz.trabalho1.repository.TurmaRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class InscricaoService {
    private final InscricaoRepository inscricaoRepository;
    private final AlunoRepository alunoRepository;
    private final TurmaRepository turmaRepository;

    public InscricaoService(InscricaoRepository inscricaoRepository,
        AlunoRepository alunoRepository, TurmaRepository turmaRepository) {
        this.inscricaoRepository = inscricaoRepository;
        this.alunoRepository = alunoRepository;
        this.turmaRepository = turmaRepository;
    }

    public InscricaoResponse save(InscricaoRequest request) {
        Inscricao inscricao = new Inscricao();
        inscricao.setAluno(alunoRepository.findById(request.getAlunoId())
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Aluno não encontrado")));
        inscricao.setTurma(turmaRepository.findById(request.getTurmaId())
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Turma não encontrada")));
        inscricao.setDataHora(LocalDateTime.now());
        inscricaoRepository.save(inscricao);
        return new InscricaoResponse(inscricao.getId(), inscricao.getDataHora(),
                inscricao.getAluno().getNome(), inscricao.getTurma().getAno(),
                inscricao.getTurma().getPeriodo());
    }

    public void delete(Long id) {
        inscricaoRepository.deleteById(id);
    }

    public void deleteByTurmaAndAluno(Long turmaId, Long alunoId) {
        Inscricao i = inscricaoRepository.findByTurma_IdAndAluno_Id(turmaId, alunoId)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Inscrição não encontrada"));
        inscricaoRepository.delete(i);
    }
}
