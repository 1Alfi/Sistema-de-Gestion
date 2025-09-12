package com.sistema_contable.sistema.contable.services.accounting;

import com.sistema_contable.sistema.contable.exceptions.BadAccountException;
import com.sistema_contable.sistema.contable.exceptions.BadEntryException;
import com.sistema_contable.sistema.contable.exceptions.ResourceNotFindException;
import com.sistema_contable.sistema.contable.model.Account;
import com.sistema_contable.sistema.contable.model.ControlAccount;
import com.sistema_contable.sistema.contable.repository.AccountRepository;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountServiceImp implements AccountService{

    @Autowired
    private AccountRepository repository;

    @Override
    public void create(Account account, Long accountID)throws Exception{
        if(accountID!=null){
            ControlAccount accountBD = (ControlAccount) Hibernate.unproxy(repository.getById(accountID));
            if(accountBD==null){throw new BadAccountException();}
            account.setControl_account_id( accountBD);
            accountBD.addChildren(account);
            repository.save(accountBD);
        }
        repository.save(account);
    }

    @Override
    public void delete(Long id)throws Exception{
        if(repository.findById(id).isPresent()){repository.deleteById(id);}
        else {throw new ResourceNotFindException();}
    }

    @Override
    public List<Account> getAll() throws Exception {
        return repository.findAll();
    }
}
