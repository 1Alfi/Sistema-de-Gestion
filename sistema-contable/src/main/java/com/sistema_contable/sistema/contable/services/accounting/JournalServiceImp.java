package com.sistema_contable.sistema.contable.services.accounting;

import com.sistema_contable.sistema.contable.model.Entry;
import com.sistema_contable.sistema.contable.repository.EntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class JournalServiceImp implements JournalService{

    //dependencies
    @Autowired
    private EntryRepository entryRepository;


    @Override
    public List<Entry> getJournalBetween(Date before, Date after) throws Exception{
        return entryRepository.findBetweenDate(before,after);
    }
}
