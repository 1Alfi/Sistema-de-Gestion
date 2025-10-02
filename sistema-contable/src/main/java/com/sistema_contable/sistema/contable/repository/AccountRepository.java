package com.sistema_contable.sistema.contable.repository;

import com.sistema_contable.sistema.contable.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    @Query("SELECT a FROM Account a WHERE a.name = :name")
    Account findByName(@Param("name") String name);

    @Query("SELECT a FROM Account a WHERE a.class = BalanceAccount")
    List<Account> getBalanceAccounts();

    @Query("SELECT a FROM Account a WHERE a.control_account_id is null")
    List<Account> getRootAccounts();
}
