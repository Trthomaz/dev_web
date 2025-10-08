package com.thiagothomaz.trabalho1.dto.disciplina;

public class DisciplinaRequest {
    private String nome;
    private Integer cargaHoraria;

    public DisciplinaRequest() {}

    public DisciplinaRequest(String nome) { this.nome = nome; }

    public DisciplinaRequest(String nome, Integer cargaHoraria) {
        this.nome = nome;
        this.cargaHoraria = cargaHoraria;
    }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public Integer getCargaHoraria() { return cargaHoraria; }
    public void setCargaHoraria(Integer cargaHoraria) { this.cargaHoraria = cargaHoraria; }
}
