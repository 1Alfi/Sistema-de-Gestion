package com.sistema_contable.sistema.contable.services.accounting.interfaces;

import com.sistema_contable.sistema.contable.model.Entry;

import java.util.Date;
import java.util.List;

public interface JournalService {
    List<Entry> getLastEntrys()throws Exception;

    List<Entry> getJournalBetween(Date before, Date after)throws Exception;
}
