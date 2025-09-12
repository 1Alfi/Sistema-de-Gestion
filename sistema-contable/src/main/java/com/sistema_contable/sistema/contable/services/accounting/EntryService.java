package com.sistema_contable.sistema.contable.services.accounting;

import com.sistema_contable.sistema.contable.model.Entry;
import com.sistema_contable.sistema.contable.model.Movement;
import com.sistema_contable.sistema.contable.model.User;

import java.util.List;

public interface EntryService {
    void create(Entry entry, User userDB)throws Exception;
    void addLines(Long id,List<Movement> movement)throws Exception;
}
