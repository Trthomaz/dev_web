package com.thiagothomaz.trabalho1.repository;

import com.thiagothomaz.trabalho1.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfessorRepository extends JpaRepository<Professor, Long>{}
