package com.thiagothomaz.trabalho1.dto.turma;

import java.util.List;

public class TurmaDetalheResponse {
    private Long id;
    private Integer ano;
    private Integer periodo;
    private String codigo;
    private String disciplinaNome;
    private String professorNome;
    private List<AlunoResumo> alunos;

    public TurmaDetalheResponse() {}

    public TurmaDetalheResponse(Long id, Integer ano, Integer periodo, String codigo, String disciplinaNome,
                                String professorNome, List<AlunoResumo> alunos) {
        this.id = id;
        this.ano = ano;
        this.periodo = periodo;
        this.codigo = codigo;
        this.disciplinaNome = disciplinaNome;
        this.professorNome = professorNome;
        this.alunos = alunos;
    }

    public static class AlunoResumo {
        private Long id;
        private String nome;

        public AlunoResumo() {}
        public AlunoResumo(Long id, String nome) {
            this.id = id;
            this.nome = nome;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getNome() { return nome; }
        public void setNome(String nome) { this.nome = nome; }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Integer getAno() { return ano; }
    public void setAno(Integer ano) { this.ano = ano; }
    public Integer getPeriodo() { return periodo; }
    public void setPeriodo(Integer periodo) { this.periodo = periodo; }
    public String getCodigo() { return codigo; }
    public void setCodigo(String codigo) { this.codigo = codigo; }
    public String getDisciplinaNome() { return disciplinaNome; }
    public void setDisciplinaNome(String disciplinaNome) { this.disciplinaNome = disciplinaNome; }
    public String getProfessorNome() { return professorNome; }
    public void setProfessorNome(String professorNome) { this.professorNome = professorNome; }
    public List<AlunoResumo> getAlunos() { return alunos; }
    public void setAlunos(List<AlunoResumo> alunos) { this.alunos = alunos; }
}
