package com.thiagothomaz.trabalho1.model;

import jakarta.persistence.*;

import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "alunos")
public class Aluno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String email;

    @OneToMany(mappedBy = "aluno", cascade = CascadeType.ALL)
    private List<Inscricao> inscricoes = new ArrayList<>();

    public Aluno() {}

    public Aluno(String nome, String email) {
        this.nome = nome;
        this.email = email;
        this.inscricoes = new ArrayList<>();
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public List<Inscricao> getInscricoes() {
        return inscricoes;
    }
    public void setInscricoes(List<Inscricao> inscricoes) {
        this.inscricoes = inscricoes;
    }
}
