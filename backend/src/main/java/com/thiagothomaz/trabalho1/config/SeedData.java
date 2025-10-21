package com.thiagothomaz.trabalho1.config;

import com.thiagothomaz.trabalho1.model.*;
import com.thiagothomaz.trabalho1.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class SeedData {

    @Bean
    CommandLineRunner initDatabase(
            DisciplinaRepository disciplinaRepository,
            ProfessorRepository professorRepository,
            AlunoRepository alunoRepository,
            TurmaRepository turmaRepository,
            InscricaoRepository inscricaoRepository
    ) {
        return args -> {
            // Evita duplicar seed caso já existam turmas
            if (turmaRepository.count() > 0) {
                return;
            }

            // Disciplinas
            Disciplina poa = new Disciplina("POA", 60);
            Disciplina poo = new Disciplina("POO", 60);
            Disciplina bd = new Disciplina("Banco de Dados", 60);
            disciplinaRepository.saveAll(List.of(poa, poo, bd));

            // Professores
            Professor luis = new Professor("Luis", "luis@example.com");
            Professor ana = new Professor("Ana", "ana@example.com");
            professorRepository.saveAll(List.of(luis, ana));

            // Alunos
            Aluno a1 = new Aluno("Alice", "alice@example.com");
            Aluno a2 = new Aluno("Bruno", "bruno@example.com");
            Aluno a3 = new Aluno("Carla", "carla@example.com");
            Aluno a4 = new Aluno("Diego", "diego@example.com");
            Aluno a5 = new Aluno("Eva", "eva@example.com");
            Aluno a6 = new Aluno("Felipe", "felipe@example.com");
            alunoRepository.saveAll(List.of(a1, a2, a3, a4, a5, a6));

            // Turmas (ex.: A001, A002, A003, B001, B002, B003)
            Turma tA001 = new Turma();
            tA001.setAno(2025);
            tA001.setPeriodo(1);
            tA001.setCodigo("A001");
            tA001.setDisciplina(poa);
            tA001.setProfessor(luis);

            Turma tA002 = new Turma();
            tA002.setAno(2025);
            tA002.setPeriodo(2);
            tA002.setCodigo("A002");
            tA002.setDisciplina(poa);
            tA002.setProfessor(luis);

            Turma tA003 = new Turma();
            tA003.setAno(2025);
            tA003.setPeriodo(2);
            tA003.setCodigo("A003");
            tA003.setDisciplina(poo);
            tA003.setProfessor(ana);

            Turma tB001 = new Turma();
            tB001.setAno(2025);
            tB001.setPeriodo(1);
            tB001.setCodigo("B001");
            tB001.setDisciplina(bd);
            tB001.setProfessor(ana);

            Turma tB002 = new Turma();
            tB002.setAno(2025);
            tB002.setPeriodo(2);
            tB002.setCodigo("B002");
            tB002.setDisciplina(bd);
            tB002.setProfessor(ana);

            Turma tB003 = new Turma();
            tB003.setAno(2025);
            tB003.setPeriodo(2);
            tB003.setCodigo("B003");
            tB003.setDisciplina(poo);
            tB003.setProfessor(luis);

            turmaRepository.saveAll(List.of(tA001, tA002, tA003, tB001, tB002, tB003));

            // Inscrições (ex.: alunos em A002)
            inscricaoRepository.saveAll(List.of(
                    new Inscricao(LocalDateTime.now().minusDays(5), a1, tA002),
                    new Inscricao(LocalDateTime.now().minusDays(4), a2, tA002),
                    new Inscricao(LocalDateTime.now().minusDays(3), a3, tA002),
                    new Inscricao(LocalDateTime.now().minusDays(2), a4, tA002),
                    new Inscricao(LocalDateTime.now().minusDays(1), a5, tA002),
                    new Inscricao(LocalDateTime.now(), a6, tA002)
            ));
        };
    }
}
