package com.sistema_contable.sistema.contable.services.accounting;

import com.sistema_contable.sistema.contable.exceptions.EntryNotFindException;
import com.sistema_contable.sistema.contable.model.Entry;
import com.sistema_contable.sistema.contable.repository.EntryRepository;
import com.sistema_contable.sistema.contable.services.accounting.interfaces.JournalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Date;
import java.util.List;

@Service
public class JournalServiceImp implements JournalService {

    //dependencies
    @Autowired
    private EntryRepository entryRepository;

    @Override
    public List<Entry> getLastEntrys()throws Exception{
        List<Entry> entrys = entryRepository.lastEntrys();
        if(entrys.isEmpty()){
            throw new EntryNotFindException("Not found entrys");
        }
        Collections.reverse(entrys);
        return entrys;
    }

    @Override
    public List<Entry> getJournalBetween(Date before, Date after) throws Exception{
        List<Entry> entrys = entryRepository.findBetweenDate(before,after);
        if(entrys.isEmpty()){throw new EntryNotFindException("Not found entry between dates");}
        return entrys;
    }
}
