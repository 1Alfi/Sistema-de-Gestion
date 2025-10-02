package com.sistema_contable.sistema.contable.repository;

import com.sistema_contable.sistema.contable.model.Account;
import com.sistema_contable.sistema.contable.model.BalanceAccount;
import com.sistema_contable.sistema.contable.model.ControlAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    @Query("SELECT a FROM Account a WHERE a.id = :id")
    Account searchById(@Param("id") Long id);

    @Query("SELECT a FROM Account a WHERE a.id = :id and a.class = BalanceAccount ")
    BalanceAccount searchBalanceAccount(@Param("id") Long id);

    @Query("SELECT a FROM Account a WHERE a.id = :id and a.class = ControlAccount ")
    ControlAccount searchControlAccount(@Param("id") Long id);

    @Query("SELECT a FROM Account a WHERE a.name = :name")
    Account searchByName(@Param("name") String name);

    @Query("SELECT a FROM Account a WHERE a.class = BalanceAccount")
    List<BalanceAccount> getBalanceAccounts();

    @Query("SELECT a FROM Account a WHERE a.control_account_id is null")
    List<ControlAccount> getRootAccounts();


    //in development
    @Query("SELECT m.accountBalance FROM Movement m WHERE m.account.id = :accountID ORDER BY m.entry.dateCreated DESC LIMIT 1")
    Double searchLastBalance(@Param("accountID") Long accountID);
}
