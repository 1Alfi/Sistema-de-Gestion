package com.sistema_contable.sistema.contable.repository;

import com.sistema_contable.sistema.contable.model.Account;
import com.sistema_contable.sistema.contable.model.BalanceAccount;
import com.sistema_contable.sistema.contable.model.ControlAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("DELETE FROM Account a WHERE a.id = :id")
    void deleteAccountById(@Param("id") Long id);

    @Query("SELECT a FROM Account a WHERE a.id = :id")
    Account searchById(@Param("id") Long id);

    @Query("SELECT a FROM BalanceAccount  a WHERE a.id = :id")
    BalanceAccount searchBalanceAccount(@Param("id") Long id);

    @Query("SELECT a FROM ControlAccount a WHERE a.id = :id ")
    ControlAccount searchControlAccount(@Param("id") Long id);

    @Query("SELECT a FROM BalanceAccount a ORDER BY a.code")
    List<BalanceAccount> getBalanceAccounts();

    @Query("SELECT a FROM Account a WHERE a.name = :name")
    Account searchByName(@Param("name") String name);

    @Query("SELECT a FROM ControlAccount a WHERE a.control_account_id IS NULL")
    List<ControlAccount> getRootAccounts();

    @Query(value = "SELECT m.account_balance "+
            "FROM movements m "+
            "JOIN entrys e ON m.movement_entry_id = e.id_entry "+
            "WHERE m.movement_account_id = :accountID "+
            "ORDER BY e.date_created DESC LIMIT 1",
            nativeQuery = true)
    Double searchLastBalance(@Param("accountID") Long accountID);
}
