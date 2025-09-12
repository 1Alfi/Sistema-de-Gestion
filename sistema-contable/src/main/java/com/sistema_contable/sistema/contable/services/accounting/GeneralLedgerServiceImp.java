package com.sistema_contable.sistema.contable.services.accounting;

import com.sistema_contable.sistema.contable.model.Account;
import com.sistema_contable.sistema.contable.model.Entry;
import com.sistema_contable.sistema.contable.model.Movement;
import com.sistema_contable.sistema.contable.repository.EntryRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.util.List;

public class GeneralLedgerServiceImp extends GeneralLedgerService{

    @Autowired
    private EntryRepository entryRepository;

    //methods
    public List<Entry> getGeneralLedger(Date after, Date before, Account account){
        return entryRepository.findBetweenDate(before, after);
    }
}
