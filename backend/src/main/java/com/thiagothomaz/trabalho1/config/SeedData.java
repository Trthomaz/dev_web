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
            InscricaoRepository inscricaoRepository,
            UserRepository userRepository,
            org.springframework.security.crypto.password.PasswordEncoder passwordEncoder
    ) {
        return args -> {
            // Sempre garante um usuário ADMIN (username: admin, senha: password)
            if (!userRepository.existsByUsername("admin")) {
                var admin = new AppUser("admin", passwordEncoder.encode("password"), java.util.Set.of(UserRole.ADMIN));
                userRepository.save(admin);
            }

            // Garante que haja ao menos alguns alunos na tabela
            if (alunoRepository.count() == 0) {
                Aluno a1 = new Aluno("Aluno1", "aluno1@example.com");
                a1.setCpf("00000000001");
                Aluno a2 = new Aluno("Aluno2", "aluno2@example.com");
                a2.setCpf("00000000002");
                Aluno a3 = new Aluno("Aluno3", "aluno3@example.com");
                a3.setCpf("00000000003");
                alunoRepository.saveAll(java.util.List.of(a1, a2, a3));
            }

            // Se ainda não há turmas/disciplina/professores/inscrições, popular tudo
            if (turmaRepository.count() > 0) {
                return;
            }

            Disciplina poa = new Disciplina("POA", 60);
            Disciplina poo = new Disciplina("POO", 60);
            Disciplina bd = new Disciplina("Banco de Dados", 60);
            Disciplina compSoc = new Disciplina("Computação e Sociedade", 60);
            disciplinaRepository.saveAll(List.of(poa, poo, bd, compSoc));

            Professor luis = new Professor("Luis", "luis@example.com");
            Professor ana = new Professor("Ana", "ana@example.com");
            professorRepository.saveAll(List.of(luis, ana));

            Aluno a1 = new Aluno("Alice", "alice@example.com");
            a1.setCpf("11111111111");
            Aluno a2 = new Aluno("Bruno", "bruno@example.com");
            a2.setCpf("22222222222");
            Aluno a3 = new Aluno("Carla", "carla@example.com");
            a3.setCpf("33333333333");
            Aluno a4 = new Aluno("Diego", "diego@example.com");
            a4.setCpf("44444444444");
            Aluno a5 = new Aluno("Eva", "eva@example.com");
            a5.setCpf("55555555555");
            Aluno a6 = new Aluno("Felipe", "felipe@example.com");
            a6.setCpf("66666666666");
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
