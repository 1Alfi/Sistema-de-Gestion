package com.sistema_contable.sistema.contable.services.accounting;

import com.sistema_contable.sistema.contable.exceptions.AccountNotFindException;
import com.sistema_contable.sistema.contable.model.*;
import com.sistema_contable.sistema.contable.repository.EntryRepository;
import com.sistema_contable.sistema.contable.services.accounting.interfaces.AccountService;
import com.sistema_contable.sistema.contable.services.accounting.interfaces.EntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class EntryServiceImp implements EntryService {

    //dependencies
    @Autowired
    private EntryRepository repository;
    @Autowired
    private AccountService accountService;

    //CRUD
    @Override
    public void create(Entry entry, User userDB)throws Exception{
        entry.setDateCreated(new Date());
        entry.setUserCreator(userDB);
        this.configMovements(entry);
        repository.save(entry);}

    //SECONDARY METHODS
    private void configMovements(Entry entry)throws Exception{
        for (Movement movement : entry.getMovements()){
            System.out.println(movement.getAccount().getId());
            BalanceAccount account = accountService.searchBalanceAccount(movement.getAccount().getId());
            if(account==null){
                throw new AccountNotFindException();}
            else{
                movement.setEntry(entry);
                movement.setAccount(account);
                movement.addAccountBalance(accountService.lastBalance(account.getId()));}}}
}
