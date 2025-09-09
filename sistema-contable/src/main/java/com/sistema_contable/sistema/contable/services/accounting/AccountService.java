package com.sistema_contable.sistema.contable.services.accounting;

import com.sistema_contable.sistema.contable.model.Account;

import java.util.List;

public interface AccountService {
    public void create(Account account)throws Exception;
    void delete(Long id)throws Exception;
    public List<Account> getAll()throws Exception;
}
