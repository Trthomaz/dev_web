package com.thiagothomaz.trabalho1.dto.inscricao;

import java.time.LocalDateTime;

public class InscricaoResponse {
    private Long id;
    private LocalDateTime dataHora;
    private String alunoNome;
    private Integer turmaAno;
    private Integer turmaPeriodo;

    public InscricaoResponse() {}

    public InscricaoResponse(Long id, LocalDateTime dataHora, String alunoNome, Integer turmaAno, Integer turmaPeriodo) {
        this.id = id;
        this.dataHora = dataHora;
        this.alunoNome = alunoNome;
        this.turmaAno = turmaAno;
        this.turmaPeriodo = turmaPeriodo;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDateTime getDataHora() { return dataHora; }
    public void setDataHora(LocalDateTime dataHora) { this.dataHora = dataHora; }

    public String getAlunoNome() { return alunoNome; }
    public void setAlunoNome(String alunoNome) { this.alunoNome = alunoNome; }

    public Integer getTurmaAno() { return turmaAno; }
    public void setTurmaAno(Integer turmaAno) { this.turmaAno = turmaAno; }

    public Integer getTurmaPeriodo() { return turmaPeriodo; }
    public void setTurmaPeriodo(Integer turmaPeriodo) { this.turmaPeriodo = turmaPeriodo; }
}
