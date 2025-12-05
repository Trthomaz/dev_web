package com.thiagothomaz.trabalho1.repository;

import com.thiagothomaz.trabalho1.model.Inscricao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InscricaoRepository extends JpaRepository<Inscricao, Long>{
	java.util.Optional<Inscricao> findByTurma_IdAndAluno_Id(Long turmaId, Long alunoId);
}
