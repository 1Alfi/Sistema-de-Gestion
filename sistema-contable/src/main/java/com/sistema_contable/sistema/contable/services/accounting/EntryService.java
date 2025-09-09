package com.sistema_contable.sistema.contable.services.accounting;

import com.sistema_contable.sistema.contable.model.Entry;
import com.sistema_contable.sistema.contable.model.Movement;

import java.util.List;

public interface EntryService {
    void create(Entry entry)throws Exception;
    void addLines(Long id,List<Movement> movement)throws Exception;
}
