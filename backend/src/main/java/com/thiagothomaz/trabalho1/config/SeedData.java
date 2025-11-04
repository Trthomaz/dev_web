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
            inscricaoRepository.deleteAllInBatch();
            turmaRepository.deleteAllInBatch();
            alunoRepository.deleteAllInBatch();
            professorRepository.deleteAllInBatch();
            disciplinaRepository.deleteAllInBatch();

            Disciplina poa = new Disciplina("POA", 60);
            Disciplina poo = new Disciplina("POO", 60);
            Disciplina bd = new Disciplina("Banco de Dados", 60);
            Disciplina compSoc = new Disciplina("Computação e Sociedade", 60);
            disciplinaRepository.saveAll(List.of(poa, poo, bd, compSoc));

            Professor luis = new Professor("Luis", "luis@example.com");
            Professor ana = new Professor("Ana", "ana@example.com");
            professorRepository.saveAll(List.of(luis, ana));

            Aluno a1 = new Aluno("Alice", "alice@example.com");
            Aluno a2 = new Aluno("Bruno", "bruno@example.com");
            Aluno a3 = new Aluno("Carla", "carla@example.com");
            Aluno a4 = new Aluno("Diego", "diego@example.com");
            Aluno a5 = new Aluno("Eva", "eva@example.com");
            Aluno a6 = new Aluno("Felipe", "felipe@example.com");
            alunoRepository.saveAll(List.of(a1, a2, a3, a4, a5, a6));

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

            Turma tC001 = new Turma();
            tC001.setAno(2025);
            tC001.setPeriodo(1);
            tC001.setCodigo("C001");
            tC001.setDisciplina(compSoc);
            tC001.setProfessor(luis);

            turmaRepository.saveAll(List.of(tA001, tA002, tA003, tB001, tB002, tB003, tC001));

        inscricaoRepository.saveAll(List.of(
            new Inscricao(LocalDateTime.now().minusDays(20), a1, tA001),
            new Inscricao(LocalDateTime.now().minusDays(19), a2, tA001),
            new Inscricao(LocalDateTime.now().minusDays(18), a3, tA001),
            new Inscricao(LocalDateTime.now().minusDays(17), a1, tA002),
            new Inscricao(LocalDateTime.now().minusDays(16), a2, tA002),
            new Inscricao(LocalDateTime.now().minusDays(15), a3, tA002),
            new Inscricao(LocalDateTime.now().minusDays(14), a4, tA002),
            new Inscricao(LocalDateTime.now().minusDays(13), a5, tA002),
            new Inscricao(LocalDateTime.now().minusDays(12), a6, tA002),
            new Inscricao(LocalDateTime.now().minusDays(11), a2, tA003),
            new Inscricao(LocalDateTime.now().minusDays(10), a4, tA003),
            new Inscricao(LocalDateTime.now().minusDays(9), a6, tA003),
            new Inscricao(LocalDateTime.now().minusDays(8), a3, tB001),
            new Inscricao(LocalDateTime.now().minusDays(7), a5, tB001),
            new Inscricao(LocalDateTime.now().minusDays(6), a1, tB002),
            new Inscricao(LocalDateTime.now().minusDays(5), a4, tB002),
            new Inscricao(LocalDateTime.now().minusDays(4), a5, tB002),
            new Inscricao(LocalDateTime.now().minusDays(3), a2, tB003),
            new Inscricao(LocalDateTime.now().minusDays(2), a3, tB003),
            new Inscricao(LocalDateTime.now().minusDays(1), a6, tB003),
            new Inscricao(LocalDateTime.now().minusHours(12), a1, tC001),
            new Inscricao(LocalDateTime.now().minusHours(6), a3, tC001),
            new Inscricao(LocalDateTime.now().minusHours(3), a5, tC001),
            new Inscricao(LocalDateTime.now(), a6, tC001)
        ));
        };
    }
}
