package com.sistema_contable.sistema.contable.services.accounting;

import com.sistema_contable.sistema.contable.model.Account;

import java.util.List;

public interface AccountService {
    void create(Account account, Long accountID)throws Exception;
    void delete(Long id)throws Exception;
    List<Account> getAll()throws Exception;
}
