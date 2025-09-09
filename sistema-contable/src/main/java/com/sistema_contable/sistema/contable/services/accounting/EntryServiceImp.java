package com.sistema_contable.sistema.contable.services.accounting;

import com.sistema_contable.sistema.contable.exceptions.BadEntryException;
import com.sistema_contable.sistema.contable.exceptions.ResourceNotFindException;
import com.sistema_contable.sistema.contable.model.Entry;
import com.sistema_contable.sistema.contable.model.Movement;
import com.sistema_contable.sistema.contable.repository.EntryRepository;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EntryServiceImp implements EntryService{

    //dependencies
    @Autowired
    private EntryRepository repository;

    @Override
    public void create(Entry entry)throws Exception{
        doubleEntryCheck(entry.getMovement());
        repository.save(entry);
    }

    @Override
    public void addLines(Long id,List<Movement> movements)throws Exception{
        if(repository.findById(id).isEmpty()){throw new ResourceNotFindException();}
        this.doubleEntryCheck(movements);
        Entry entryDB = repository.findById(id).get();
        entryDB.setLines(movements);
    }

    //secondary methods
    private void doubleEntryCheck(List<Movement> movements)throws Exception{
        Double debit = 0D;
        Double credit = 0D;
        for(Movement movement : movements){
            debit += movement.getDebit();
            credit += movement.getCredit();
        }
        if(debit-credit != 0){throw new BadEntryException();}
        else {return;}
    }
}
