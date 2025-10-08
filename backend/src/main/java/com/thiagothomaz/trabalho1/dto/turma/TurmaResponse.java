package com.thiagothomaz.trabalho1.dto.turma;

public class TurmaResponse {
    private Long id;
    private Integer ano;
    private Integer periodo;
    private String disciplinaNome; // para exibir o nome da disciplina
    private String professorNome; // para exibir o nome do professor

    public TurmaResponse() {}

    public TurmaResponse(Long id, Integer ano, Integer periodo, String disciplinaNome, String professorNome) {
        this.id = id;
        this.ano = ano;
        this.periodo = periodo;
        this.disciplinaNome = disciplinaNome;
        this.professorNome = professorNome;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Integer getAno() { return ano; }
    public void setAno(Integer ano) { this.ano = ano; }

    public Integer getPeriodo() { return periodo; }
    public void setPeriodo(Integer periodo) { this.periodo = periodo; }

    public String getDisciplinaNome() { return disciplinaNome; }
    public void setDisciplinaNome(String disciplinaNome) { this.disciplinaNome = disciplinaNome; }

    public String getProfessorNome() { return professorNome; }
    public void setProfessorNome(String professorNome) { this.professorNome = professorNome; }
}
