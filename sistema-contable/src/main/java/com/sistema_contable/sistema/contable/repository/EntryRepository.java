package com.sistema_contable.sistema.contable.repository;

import com.sistema_contable.sistema.contable.model.Entry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface EntryRepository extends JpaRepository<Entry, Long> {

    @Query("SELECT e FROM Entry e ORDER BY e.dateCreated ASC LIMIT 10")
    List<Entry> lastEntrys();

    @Query("SELECT e FROM Entry e WHERE e.dateCreated BETWEEN :before AND :after")
    List<Entry> findBetweenDate(@Param("before") Date before, @Param("after") Date after);
}
