package com.thiagothomaz.trabalho1.dto.turma;

public class TurmaRequest {
    private Integer ano;
    private Integer periodo;
    private Long professorId; // apenas o ID do professor
    private Long disciplinaId; // apenas o ID da disciplina

    public TurmaRequest() {}

    public TurmaRequest(Integer ano, Integer periodo, Long professorId, Long disciplinaId) {
        this.ano = ano;
        this.periodo = periodo;
        this.professorId = professorId;
        this.disciplinaId = disciplinaId;
    }

    public Integer getAno() { return ano; }
    public void setAno(Integer ano) { this.ano = ano; }

    public Integer getPeriodo() { return periodo; }
    public void setPeriodo(Integer periodo) { this.periodo = periodo; }

    public Long getProfessorId() { return professorId; }
    public void setProfessorId(Long professorId) { this.professorId = professorId; }

    public Long getDisciplinaId() { return disciplinaId; }
    public void setDisciplinaId(Long disciplinaId) { this.disciplinaId = disciplinaId; }
}
