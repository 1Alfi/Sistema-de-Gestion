package com.sistema_contable.sistema.contable.services.accounting;

import com.sistema_contable.sistema.contable.exceptions.AccountNotActiveException;
import com.sistema_contable.sistema.contable.exceptions.AccountNotFindException;
import com.sistema_contable.sistema.contable.exceptions.NotEnoughBalanceException;
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
            BalanceAccount account = accountService.searchBalanceAccount(movement.getAccount().getId());
            if(account==null){
                throw new AccountNotFindException("Account not find to set to movements");}
            else{
                //check the state of account
                if (!account.isActive()){throw new AccountNotActiveException("Account not active ot set to movements");}
                movement.setEntry(entry);
                movement.setAccount(account);
                //check the balance of the account
                if (!movement.balanceEnough(accountService.lastBalance(account.getId()))){
                    throw new NotEnoughBalanceException("Account not enough balance to use in movements");}
                movement.addAccountBalance(accountService.lastBalance(account.getId()));}}}
}
