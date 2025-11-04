package com.thiagothomaz.trabalho1.dto.turma;

public class TurmaRequest {
    private Integer ano;
    private Integer periodo;
    private String codigo;
    private Long professorId;
    private Long disciplinaId;

    public TurmaRequest() {}

    public TurmaRequest(Integer ano, Integer periodo, String codigo, Long professorId, Long disciplinaId) {
        this.ano = ano;
        this.periodo = periodo;
        this.codigo = codigo;
        this.professorId = professorId;
        this.disciplinaId = disciplinaId;
    }

    public Integer getAno() { return ano; }
    public void setAno(Integer ano) { this.ano = ano; }

    public Integer getPeriodo() { return periodo; }
    public void setPeriodo(Integer periodo) { this.periodo = periodo; }

    public String getCodigo() { return codigo; }
    public void setCodigo(String codigo) { this.codigo = codigo; }

    public Long getProfessorId() { return professorId; }
    public void setProfessorId(Long professorId) { this.professorId = professorId; }

    public Long getDisciplinaId() { return disciplinaId; }
    public void setDisciplinaId(Long disciplinaId) { this.disciplinaId = disciplinaId; }
}
