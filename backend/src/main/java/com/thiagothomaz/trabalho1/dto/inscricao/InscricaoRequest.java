package com.thiagothomaz.trabalho1.dto.inscricao;

public class InscricaoRequest {
    private Long alunoId;
    private Long turmaId;

    public InscricaoRequest() {}

    public InscricaoRequest(Long alunoId, Long turmaId) {
        this.alunoId = alunoId;
        this.turmaId = turmaId;
    }

    public Long getAlunoId() { return alunoId; }
    public void setAlunoId(Long alunoId) { this.alunoId = alunoId; }

    public Long getTurmaId() { return turmaId; }
    public void setTurmaId(Long turmaId) { this.turmaId = turmaId; }
}
