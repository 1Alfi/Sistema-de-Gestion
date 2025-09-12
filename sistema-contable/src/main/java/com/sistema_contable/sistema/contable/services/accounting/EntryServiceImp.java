package com.sistema_contable.sistema.contable.services.accounting;

import com.sistema_contable.sistema.contable.exceptions.BadEntryException;
import com.sistema_contable.sistema.contable.exceptions.ResourceNotFindException;
import com.sistema_contable.sistema.contable.model.*;
import com.sistema_contable.sistema.contable.repository.AccountRepository;
import com.sistema_contable.sistema.contable.repository.EntryRepository;
import org.apache.coyote.BadRequestException;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
public class EntryServiceImp implements EntryService{

    //dependencies
    @Autowired
    private EntryRepository repository;
    @Autowired
    private AccountRepository accountRepository;

    @Override
    public void create(Entry entry, User userDB)throws Exception{
        entry.setDateCreated(new Date());
        entry.setUserCreator(userDB);
        for (Movement movement : entry.getMovements()){
            BalanceAccount account = (BalanceAccount) Hibernate.unproxy(accountRepository.getById(movement.getAccount().getId()));
            movement.setEntry_id(entry);
            movement.setAccount(account);
        }
        repository.save(entry);
    }

    @Override
    public void addLines(Long id,List<Movement> movements)throws Exception{
        if(repository.findById(id).isEmpty()){throw new ResourceNotFindException();}
        Entry entryDB = repository.findById(id).get();
        entryDB.setMovements(movements);
    }

}
