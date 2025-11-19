package com.thiagothomaz.trabalho1.repository;

import com.thiagothomaz.trabalho1.model.Turma;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TurmaRepository extends JpaRepository<Turma, Long> {
	@Query("select t from Turma t where t.disciplina.id = :disciplinaId")
	List<Turma> findByDisciplina(@Param("disciplinaId") Long disciplinaId);
}
