package com.sistema_contable.sistema.contable.services.accounting.interfaces;

import com.sistema_contable.sistema.contable.model.Account;
import com.sistema_contable.sistema.contable.model.BalanceAccount;
import com.sistema_contable.sistema.contable.model.ControlAccount;

import java.util.List;

public interface AccountService {
    //CRUD
    void create(Account account, Long accountID)throws Exception;
    void delete(Long id)throws Exception;
    void update(Long id, String nombre) throws Exception;

    //Getters
    List<Account> getAll()throws Exception;
    List<BalanceAccount> getBalanceAccounts() throws Exception;
    List<ControlAccount> getRootAccounts()throws Exception;

    //search
    Account searchById(Long id) throws Exception;
    Account searchByName(String name) throws Exception;
    BalanceAccount searchBalanceAccount(Long id) throws Exception;
    ControlAccount searchControlAccount(Long id) throws Exception;

    //secondary
    Double lastBalance(Long id) throws Exception;
    void refreshCodes()throws Exception;

}
