package com.sistema_contable.sistema.contable.repository;

import com.sistema_contable.sistema.contable.model.Movement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface MovementRepository extends JpaRepository<Movement, Long> {

    @Query("SELECT m FROM Movement m " +
            "INNER JOIN Entry e ON m.entry.id = e.id " +
            "WHERE m.account.id = :accountID " +
            "AND e.dateCreated BETWEEN :before AND :after " +
            "ORDER BY e.dateCreated ASC ")
    List<Movement> ledgerAccountBetween(@Param("accountID")Long accountID, @Param("before")Date before, @Param("after")Date after);

    boolean existsByAccountId(Long accountId);
}
