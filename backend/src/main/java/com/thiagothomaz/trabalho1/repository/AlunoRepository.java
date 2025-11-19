package com.thiagothomaz.trabalho1.repository;

import com.thiagothomaz.trabalho1.model.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Long> {
	@Query("select a from Aluno a where a.id not in (select i.aluno.id from Inscricao i where i.turma.id = :turmaId)")
	List<Aluno> findNotEnrolledInTurma(@Param("turmaId") Long turmaId);
}
